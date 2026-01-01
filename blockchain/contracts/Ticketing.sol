// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketSystem is ERC721, Ownable {

    struct Event {
        uint256 id;
        string name;
        uint256 price;
        uint256 totalTickets;
        uint256 sold;
        address payable organizer;
        string metadataURI;
        bool exists;
    }

    uint256 public nextEventId = 1;
    uint256 public nextTicketId = 1;

    mapping(uint256 => Event) public events;
    mapping(uint256 => uint256) public ticketToEvent;
    mapping(uint256 => bool) public ticketUsed;

    event EventCreated(uint256 indexed eventId, string name, address organizer);
    event TicketMinted(uint256 indexed eventId, uint256 indexed tokenId, address buyer);
    event TicketUsed(uint256 indexed tokenId);

    // ✅ FIX 1: Ownable now needs initialOwner
    constructor() ERC721("EventTicket", "ETIX") Ownable(msg.sender) {}

    // ------------------------
    // CREATE EVENT
    // ------------------------
    function createEvent(
        string memory _name,
        uint256 _price,
        uint256 _totalTickets,
        string memory _metadataURI
    ) external {
        require(_totalTickets > 0, "Invalid ticket count");
        require(_price > 0, "Price must be > 0");

        events[nextEventId] = Event({
            id: nextEventId,
            name: _name,
            price: _price,
            totalTickets: _totalTickets,
            sold: 0,
            organizer: payable(msg.sender),
            metadataURI: _metadataURI,
            exists: true
        });

        emit EventCreated(nextEventId, _name, msg.sender);
        nextEventId++;
    }

    // ------------------------
    // BUY TICKET (MINT NFT)
    // ------------------------
    function buyTicket(uint256 _eventId) external payable {
        Event storage e = events[_eventId];

        require(e.exists, "Event does not exist");
        require(e.sold < e.totalTickets, "Tickets sold out");
        require(msg.value == e.price, "Incorrect ETH");

        uint256 tokenId = nextTicketId++;

        _safeMint(msg.sender, tokenId);
        ticketToEvent[tokenId] = _eventId;
        e.sold++;

        emit TicketMinted(_eventId, tokenId, msg.sender);

        (bool success, ) = e.organizer.call{value: msg.value}("");
        require(success, "Payment failed");
    }

    // ------------------------
    // METADATA
    // ------------------------
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return events[ticketToEvent[tokenId]].metadataURI;
    }

    // ------------------------
    // VERIFY & USE TICKET
    // ------------------------
    function verifyTicket(uint256 tokenId) external view returns (bool) {
        return _ownerOf(tokenId) != address(0) && !ticketUsed[tokenId];
    }

    function useTicket(uint256 tokenId) external {
        require(_ownerOf(tokenId) != address(0), "Invalid ticket");
        require(!ticketUsed[tokenId], "Ticket already used");

        uint256 eventId = ticketToEvent[tokenId];
        require(msg.sender == events[eventId].organizer, "Only organizer");

        ticketUsed[tokenId] = true;
        emit TicketUsed(tokenId);
    }

    // ------------------------
    // ✅ FIX 2: NEW OZ v5 TRANSFER HOOK
    // ------------------------
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {

        address from = _ownerOf(tokenId);

        // block transfers AFTER usage (but allow minting)
        if (from != address(0)) {
            require(!ticketUsed[tokenId], "Used ticket cannot be transferred");
        }

        return super._update(to, tokenId, auth);
    }

    receive() external payable {
        revert("Direct ETH not accepted");
    }
}
