export const bookSeats = async (userId, eventId, seatIds) => {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
  
    if (event.availableSeats === 0) {
      throw new Error("No seats available");
    }
  
    if (seatIds.length > event.availableSeats) {
      throw new Error("Insufficient seats available");
    }
  
    // Find and validate seats
    const seatsToBook = seatIds.map((seatId) => {
      const seat = event.seats.find(s => s.seatId === seatId);
  
      if (!seat) {
        throw new Error(`Seat ${seatId} not found`);
      }
  
      if (seat.booked) {
        throw new Error(`Seat ${seatId} already booked`);
      }
  
      return seat;
    });
  
    // Book seats
    seatsToBook.forEach(seat => {
      seat.booked = true;
    });
  
    // Update availability
    event.availableSeats -= seatsToBook.length;
  
    // Persist changes
    await event.save();
  
    return {
      eventId,
      bookedSeats: seatIds
    };
  };
  