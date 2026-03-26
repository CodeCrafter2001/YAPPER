import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import Message from '../../../Backend/src/models/Message';

export const  useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,

  checkAuth: async () => {
  try {
    const res = await axiosInstance.get("/auth/check");
    set({ authUser: res.data });
  } catch (error) {
    if (error.response?.status !== 401) {
      console.error("Auth check failed:", error);
    }
    set({ authUser: null });
  } finally {
    set({ isCheckingAuth: false });
  }
},

signup: async(data)=>{
   set({isSigningUp:true});
   try {
    const res= axiosInstance.post("/auth/signup",data);
    set({authUser: res.data})
    toast.success("account created Successfully")
    
   } catch (error) {
    toast.error(error.response.data.message);
   }finally{
    set({isSigningUp:false})
   }
},    
}));