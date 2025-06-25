import React from "react";
import HomeContent from "./HomeContent";
import HotelsMenu from "./HotelsMenu";
import ExclusiveMenu from "./Exclusivemenu";
import Testimonial from "./Testimonial";
import RecommendedHotels from "../RecommendedHotels";
export default function Home(){
    return(
        <>
        <HomeContent/>
        <RecommendedHotels/>
        <HotelsMenu/>
        <ExclusiveMenu/>
        <Testimonial/>
        </>
    )
}
 
    