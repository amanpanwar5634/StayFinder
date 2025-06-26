import stripe from "stripe";
import Booking from "../models/Booking.js";
//api to handle stripe webhooks
export const stripeWebhooks=async(request,response)=>{
    console.log("inside stripeWebhooks");
    console.log("requese->",request);
    const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);
    const sig=request.headers['stripe-signature'];
    let event;
    try{
        event=stripeInstance.webhooks.constructEvent(request.body,sig,process.env.STRIPE_WEBHOOK_SECRET);
        console.log("event if it insie stripewEBHOOKS->",event);
    }
    catch(err){
        response.status(400).send(`Webhook Error->',${err.message}`);
    }
    //hanle the event
    if(event.type==="payment_intent.succeeded"){
        const paymentIntent=event.data.object;
        const paymentIntentId=paymentIntent.id;
        //getting sesssion metadata
        const session=await stripeInstance.checkout.sessions.list({
            payment_intent:paymentIntentId,
        });
        const {bookingId}=session.data[0].metadata;
        console.log("booking ID->",bookingId);
        //mark payment as paid;
        await Booking.findByIdAndUpdate(bookingId,{isPaid:true,paymentMethod:"stripe"})
        
    }else{
        console.log("unhandled eveny type",event.type);
    
    }
    response.json({received:true})
}
