import { bookSeats } from "../services/booking.service"

export const ticketHandler = async( req , res)=>{
   try{ 
    const {eventId, seatIds}= req.body;
    const userId= req.user?.id || "test_user";

    const result= await bookSeats(userId,eventId, seatIds );

    res.status(200).json({
        success: true,
        data: result
    })
}catch(err){
    res.status(400).json({
        success: false,
        data: err.message
    })
    console.log(err);
}
}