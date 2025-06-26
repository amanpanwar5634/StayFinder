import React from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const Loader=()=>{
    const {navigate}=useAppContext();
    const {nextUrl}=useParams();
    useEffect(()=>{
        if(nextUrl){setTimeout(()=>{navigate(`/${nextUrl}`)},8000)}
    },[nextUrl])
    return (
         <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
  <div className="text-center">
    <div className="relative w-24 h-24 mx-auto mb-6">
      <div className="absolute inset-0 rounded-full border-8 border-indigo-300 border-t-indigo-600 animate-spin shadow-lg"></div>
      <div className="absolute inset-3 bg-white rounded-full shadow-inner"></div>
    </div>
    <h2 className="text-2xl font-bold text-indigo-700 mb-2">Processing Your Booking...</h2>
    <p className="text-indigo-600 text-sm">Redirecting shortly. Please don’t refresh or press back.</p>
  </div>
</div>

    )
}
export default Loader;