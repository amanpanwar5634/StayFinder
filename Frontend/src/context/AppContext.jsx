import axios from "axios";
import { useContext,useEffect } from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {useUser,useAuth} from "@clerk/clerk-react";
import { createContext } from "react";
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;
import {toast} from "react-hot-toast";
const AppContext=createContext();
export const AppProvider=({children})=>{
    const currency=import.meta.env.VITE_CURRENCY ||"$";
  const navigate=useNavigate();
  const {user}=useUser();
  const {getToken}=useAuth();
  const [isOwner,setIsOwner]=useState(false);
  const [showHotelReg,setShowHotelReg]=useState(false);
  const [searchedCities,setSearchedCities]=useState([]);
  const [rooms,setRooms]=useState([]);
  const fetchRoom=async()=>{
    try{
        const {data}=await axios.get('/api/rooms');
        if(data.success) {setRooms(data.rooms); console.log("rooms from api",data.rooms);}
       else{ toast.error(data.message);}
    }
    catch(err){
        console.log("error->",err.message);
toast.error(err.message);
    }
  }
  console.log("isOwner",isOwner);

  const fetchUser=async()=>{
   try{ const {data}=await axios.get("/api/user",{headers:{Authorization:`Bearer ${await getToken()}`}})
if(data.success){setIsOwner(data.role=="hotelOwner");setSearchedCities(data.recentSearchedCities)}
else{
    setTimeout(()=>{
        fetchUser()
    },5000)
}}
catch(err){
toast.error(err.message);
      } 
 }
         useEffect(()=>{
if(user){fetchUser();}
        },[user])

        useEffect(()=>{
            fetchRoom();
        },[])

    const value={
currency,navigate,user,getToken,isOwner,setIsOwner,axios,showHotelReg,setShowHotelReg,searchedCities,setSearchedCities,
rooms,setRooms
    }
    return(
        <AppContext.Provider value={value}>
{children}
        </AppContext.Provider>
    )
}
export  const useAppContext=()=>useContext(AppContext);