const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TicketSystem", function () {
  let ticketSystem;
  let owner, organizer, user;

  beforeEach(async () => {
    [owner, organizer, user] = await ethers.getSigners();

    const TicketSystem = await ethers.getContractFactory("TicketSystem");
    ticketSystem = await TicketSystem.deploy();
    await ticketSystem.waitForDeployment();
  });

  it("creates an event", async () => {
    await ticketSystem
      .connect(organizer)
      .createEvent(
        "Concert",
        ethers.parseEther("0.01"),
        100,
        "ipfs://event-metadata"
      );

    const event = await ticketSystem.events(1);
    expect(event.name).to.equal("Concert");
    expect(event.totalTickets).to.equal(100);
  });

  it("mints NFT ticket on purchase", async () => {
    await ticketSystem
      .connect(organizer)
      .createEvent(
        "Concert",
        ethers.parseEther("0.01"),
        1,
        "ipfs://event-metadata"
      );

    await ticketSystem
      .connect(user)
      .buyTicket(1, { value: ethers.parseEther("0.01") });

    expect(await ticketSystem.ownerOf(1)).to.equal(user.address);
  });

  it("prevents reuse of ticket", async () => {
    await ticketSystem
      .connect(organizer)
      .createEvent(
        "Concert",
        ethers.parseEther("0.01"),
        1,
        "ipfs://event-metadata"
      );

    await ticketSystem
      .connect(user)
      .buyTicket(1, { value: ethers.parseEther("0.01") });

    await ticketSystem.connect(organizer).useTicket(1);

    expect(await ticketSystem.verifyTicket(1)).to.equal(false);
  });
});
