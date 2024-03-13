/* eslint-disable @typescript-eslint/no-explicit-any */

import { type StateCreator } from "zustand/vanilla";
import { T_Admin } from "../../../types";


interface AdminState {
    loading:boolean;
    info?: T_Admin | null;
    businessType?:any;
    allPost?:any;
    allUser?:any;
    events?:any;
    responseMsg?:string;
}
export interface AdminSlice{
    admin: AdminState | null;
    saveAdminInfo:(payload:any) => void;
    logoutAdmin: () => void;
    saveAllBusiness:(payload:any) => void;
    saveAllUser:(payload:any) => void;
    saveAllEventsAdmin:(payload:any) => void;
    saveAllPostAdmin:(payload:any) => void;
}

const initialState: AdminState ={
    loading:false,
    info:null,
    businessType:[],
    allUser:[],
    responseMsg:""
}
const createAdminSlice: StateCreator<AdminSlice> = (set) =>({
    admin: initialState,
    saveAdminInfo:async(payload:any) =>{
        try {
            const process = await new Promise((resolve) =>{
                setTimeout(() => {
                    resolve(true);
                  }, 2000);
            })
            if (typeof payload !== 'string' && process) {
                set((state) => ({
                  ...state,
                  admin: {
                    ...state.admin,
                    info: payload,
                    loading: false,
                    responseMsg: '',
                  },
                }));
              }           
        } catch (error) {
            console.log('Error at: ', error);
            set((state) => ({
              ...state,
              admin: {
                ...state.admin,
                info: null,
                loading: false,
                responseMsg: 'Invalid Credentials',
              },
            }));        
        }
    },
    logoutAdmin:async() =>{
        try {
            set(() => ({
              admin: initialState, 
            }));
          } catch (error) {
            console.error('Logout error:', error);
          }
    },
    saveAllBusiness:async(payload:any) =>{
      try {
          set((state) => ({
            ...state,
            admin: {
              ...state.admin,
              businessType:{
                hotelRoom:payload?.filter((item: { type: string; }) => item.type === 'Hotel & Rooms'),
                beachResorts:payload?.filter((item: { type: string; }) => item.type === 'Beach Resorts'),
                touristSpots:payload?.filter((item: { type: string; }) => item.type === 'Tourist Spots'),
                foodRestaurant:payload?.filter((item: { type: string; }) => item.type === 'Food/Restaurant'),
              },
              loading: false,
              responseMsg: '',
            },
          }));          
      } catch (error) {
          console.log('Error at: ', error);
          set((state) => ({
            ...state,
            admin: {
              ...state.admin,
              info: null,
              loading: false,
              responseMsg: 'Invalid Credentials',
            },
          }));        
      }
    },
    saveAllUser:async(payload:any) =>{
      try {
          set((state) => ({
            ...state,
            admin: {
              ...state.admin,
              allUser:{
                Traveller:payload?.filter((item: { userType: string; }) => item.userType === 'traveller'),
                Admin:payload?.filter((item: { userType: string; }) => item.userType === 'admin'),
                Business:payload?.filter((item: { userType: string; }) => item.userType === 'business')
              },
              loading: false,
              responseMsg: '',
            },
          }));          
      } catch (error) {
          console.log('Error at: ', error);
          set((state) => ({
            ...state,
            admin: {
              ...state.admin,
              info: null,
              loading: false,
              responseMsg: 'Invalid Credentials',
            },
          }));        
      }
    },
    saveAllEventsAdmin:async(payload:any) =>{
      try {
          set((state) => ({
            ...state,
            admin: {
              ...state.admin,
              events:payload,
              loading: false,
              responseMsg: '',
            },
          }));          
      } catch (error) {
          console.log('Error at: ', error);
          set((state) => ({
            ...state,
            admin: {
              ...state.admin,
              events: null,
              loading: false,
              responseMsg: 'Invalid Credentials',
            },
          }));        
      }
    },
    saveAllPostAdmin:async(payload:any) =>{
      try {
          set((state) => ({
            ...state,
            admin: {
              ...state.admin,
              businessType:{
                hotelRoom:payload?.filter((item: { type: string; }) => item.type === 'Hotel & Rooms'),
                beachResorts:payload?.filter((item: { type: string; }) => item.type === 'Beach Resorts'),
                touristSpots:payload?.filter((item: { type: string; }) => item.type === 'Tourist Spots'),
                foodRestaurant:payload?.filter((item: { type: string; }) => item.type === 'Food/Restaurant'),
              },
              allPost:payload,
              loading: false,
              responseMsg: '',
            },
          }));          
      } catch (error) {
          console.log('Error at: ', error);
          set((state) => ({
            ...state,
            admin: {
              ...state.admin,
              businessType: [],
              loading: false,
              responseMsg: 'Invalid Credentials',
            },
          }));        
      }
    },
})

export default createAdminSlice