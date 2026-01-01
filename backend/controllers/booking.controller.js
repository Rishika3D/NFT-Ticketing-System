import { bookSeats } from "../services/booking.service.js";

export const ticketHandler = async (req, res) => {
  try {
    const { eventId, seatIds } = req.body;

    if (!eventId || !seatIds?.length) {
      return res.status(400).json({
        success: false,
        message: "eventId and seatIds are required"
      });
    }

    // temporary user (replace with auth later)
    const userId = req.user?.id ?? "anonymous_user";

    const result = await bookSeats(userId, eventId, seatIds);

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message || "Booking failed"
    });
  }
};
