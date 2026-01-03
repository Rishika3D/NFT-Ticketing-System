import { bookSeats } from "../services/booking.service.js";
import { purchaseTicket } from "../services/ticket.service.js";

export const ticketHandler = async (req, res) => {
  try {
    const { eventId, seatIds, walletAddress } = req.body;

    if (!eventId || !walletAddress) {
      return res.status(400).json({ success: false, message: "Missing eventId or walletAddress" });
    }

    const userId = req.user?.id || "anonymous_user";

    // Optional: Check availability logic
    await bookSeats(userId, eventId, seatIds);

    // Purchase & Mint
    const result = await purchaseTicket(userId, eventId, walletAddress);

    return res.status(200).json({
      success: true,
      message: "Ticket Minted!",
      data: result
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};