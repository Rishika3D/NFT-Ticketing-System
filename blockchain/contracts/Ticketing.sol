// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TicketSystem {
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

    mapping(uint256 => Event) public events;
    mapping(uint256 => uint256) public ticketToEvent;
    mapping(uint256 => address) public ticketOwner;

    uint256 public nextEventId = 1;
    uint256 public nextTicketId = 1;

    event EventCreated(uint256 indexed eventId, string name, address indexed organizer);
    event TicketPurchased(uint256 indexed eventId, address indexed buyer, uint256 ticketId);

    // Create new event
    function createEvent(
        string memory _name,
        uint256 _price,
        uint256 _totalTickets,
        string memory _metadataURI
    ) public {
        require(_totalTickets > 0, "Total tickets must be greater than 0");

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

    // Buy a ticket for an existing event
    function buyTicket(uint256 _eventId) public payable {
        Event storage e = events[_eventId];
        require(e.exists, "Event does not exist");
        require(e.sold < e.totalTickets, "All tickets sold out");
        require(msg.value == e.price, "Incorrect payment amount");

        e.sold++;

        ticketToEvent[nextTicketId] = _eventId;
        ticketOwner[nextTicketId] = msg.sender;

        emit TicketPurchased(_eventId, msg.sender, nextTicketId);

        nextTicketId++;

        (bool success, ) = e.organizer.call{value: msg.value}("");
        require(success, "Payment transfer failed");
    }

    // Organizer can withdraw event funds (optional if you don’t want instant payout)
    function withdrawFunds(uint256 _eventId) public {
        Event storage e = events[_eventId];
        require(e.exists, "Event not found");
        require(msg.sender == e.organizer, "Not organizer");

        uint256 balance = e.sold * e.price;
        e.sold = 0; // reset sold counter if you want to prevent re-withdraw

        (bool success, ) = e.organizer.call{value: balance}("");
        require(success, "Withdraw failed");
    }

    // View function: check ticket owner
    function getTicketOwner(uint256 _ticketId) public view returns (address) {
        return ticketOwner[_ticketId];
    }

    // Fallback in case ETH sent directly
    receive() external payable {}
}