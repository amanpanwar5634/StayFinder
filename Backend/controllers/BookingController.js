import transporter from "../config/nodemailer.js";
import Booking from "../models/Booking.js"
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import stripe from "stripe";
const checkAvailability=async({checkInDate,checkOutDate,room})=>{
try{
    const bookings=await Booking.find({ room, checkInDate:{$lte:checkOutDate}, checkOutDate:{$gte:checkInDate} });
    const isAvailable=bookings.length==0;
    return isAvailable;
}catch(err){ 
console.log("err->",err);
}
}
//api to check the availability of room
//POST/api/bokings/check-availability
export const checkAvailabilityAPI=async(req,res)=>{
    try{
        const {room,checkInDate,checkOutDate}=req.body;
        const isAvailable=await checkAvailability({checkInDate,checkOutDate,room});
        res.json({success:true,isAvailable});
    }
    catch(err){
         res.json({success:false,message:err.message});
    }
}
//api to create new Booking
//POST/ api/bookings/book
export const createBooking=async(req,res)=>{
    try{
         const {room,checkInDate,checkOutDate,guests}=req.body;
         const user=req.user._id;
   
         //before checking availability
         const isAvailable=await checkAvailability({checkInDate,checkOutDate,room});
         if(!isAvailable){ return res.json({success:false,message:"Room is Not Available"});}
         //get TotalPrice from Room
         const roomData=await Room.findById(room).populate("hotel");
         let totalPrice=roomData.pricePerNight;
         //calculate totalprice based in nights
         const checkIn=new Date(checkInDate);
         const checkOut=new Date(checkOutDate);
         const timeDiff=checkOut.getTime()-checkIn.getTime();
         const nights=Math.ceil(timeDiff/(1000*3600*24));
         totalPrice*=nights;
         const booking=await Booking.create({
            user,
            room,
            hotel:roomData.hotel._id,
            guests:+guests,
            checkInDate,
            checkOutDate,
            totalPrice,
         })
         const mailOptions={
            from:process.env.SENDER_EMAIL,
            to:req.user.email,
            subject:'Hotel Booking Details',
            html:`<h2>Your Booking Details</h2>
            <p>Dear ${req.user.username}</p2>
            <p>Thank you for your booking! Here are your details:</p>
            <ul>
            <li> Booking Id:${booking._id}</li>
           <li> Hotel Name:${roomData.hotel.name}}</li>
           <li> Location:${roomData.hotel.address}</li>
           <li> Date:${booking.checkInDate.toDateString()}</li>
           <li> price per night:${'$'}${booking.totalPrice}night</li>
            </ul>
            <p>We look forward to welcoming you!</p>
            <p>if you need to make the changes ,feel free to contact us.</p>
            `
         }
         await transporter.sendMail(mailOptions)
         res.json({success:true,message:"Booking created Successfully"});
    }
     catch(err){
        console.log("erro in create booking->",err);
         res.json({success:false,message:"failed to create Bookingc"});
    }
}
//api to get all bokings for a user
export const getUserBookings=async(req,res)=>{
    try{
        const user=req.user._id;
        const bookings=await Booking.find({user}).populate("room hotel").sort({createdAt:-1})
        res.json({success:true,bookings});
    }
    catch(err){
        res.json({success:false,message:"Failed to fetch bookings"});
    }
}
//api to get hotel booking
export const getHotelBookings=async(req,res)=>{
    try{
        const hotel=await Hotel.findOne({owner:req.user._id});
        if(!hotel) return res.json({success:true,message:"No hotel Found"});
        const bookings=await Booking.find({hotel:hotel._id}).populate("room hotel user").sort({createdAt:-1});
        //total Booking
        const totalBookings=bookings.length;
//total revenue
const totalRevenue=bookings.reduce((acc,booking)=>acc+booking.totalPrice,0);
res.json({success:true,dashboardData:{totalBookings,totalRevenue,bookings}});
    }
    catch(err){
        res.json({success:false,message:"Failed to get Hotel bookings"});
    }
}
//strip payment
export const stripePayment=async(req,res)=>{
    try{
        const {bookingId}=req.body;
        const booking=await Booking.findById(bookingId);
        const roomData=await Room.findById(booking.room).populate('hotel');
        const totalPrice=booking.totalPrice;
            const {origin}=req.headers;
            const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);
            const line_items=[
                {
                    price_data:{currency:"usd",
                        product_data:{name:roomData.hotel.name,},
                        unit_amount:totalPrice *100
                    },
                    quantity:1,
                }
            ]
            //create checkout sesssion
            const session=await stripeInstance.checkout.sessions.create({
                line_items,
                mode:"payment",
                success_url:`${origin}/loader/my-bookings`,
                cancel_url:`${origin}/my-bookings`,
                metadata:{
                    bookingId,
                }
            })
            res.json({success:true,url:session.url})
    }
    catch(err){
        console.log("errro in payment",err);
res.json({success:false,message:"payment failed"})
    }
}
