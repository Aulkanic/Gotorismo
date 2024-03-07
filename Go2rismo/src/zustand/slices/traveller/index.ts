/* eslint-disable @typescript-eslint/no-explicit-any */

import { type StateCreator } from "zustand/vanilla";
import { T_Traveller } from "../../../types";


interface TravellerState {
    loading:boolean;
    info?: T_Traveller | null;
    businessType?:any;
    announcements?:any;
    responseMsg:string;
}
export interface TravellerSlice{
    traveller: TravellerState | null;
    saveTravellerInfo:(payload:any) => void;
    saveAllPost:(payload:any) => void;
    saveAllEventsForTraveller:(payload:any) => void;
    logoutTraveller: () => void
}

const initialState: TravellerState ={
    loading:false,
    info:null,
    businessType:[],
    announcements:[],
    responseMsg:""
}
const createTravellerSlice: StateCreator<TravellerSlice> = (set) =>({
    traveller: initialState,
    saveTravellerInfo:async(payload:any) =>{
        try {
            const process = await new Promise((resolve) =>{
                setTimeout(() => {
                    resolve(true);
                  }, 2000);
            })
            if (typeof payload !== 'string' && process) {
                set((state) => ({
                  ...state,
                  traveller: {
                    ...state.traveller,
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
              traveller: {
                ...state.traveller,
                info: null,
                loading: false,
                responseMsg: 'Invalid Credentials',
              },
            }));        
        }
    },
    logoutTraveller:async() =>{
        try {
            set(() => ({
                traveller: initialState, 
            }));
          } catch (error) {
            console.error('Logout error:', error);
          }
    },
    saveAllPost:async(payload:any) =>{
      try {
          set((state) => ({
            ...state,
            traveller: {
              ...state.traveller,
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
            traveller: {
              ...state.traveller,
              businessType: [],
              loading: false,
              responseMsg: 'Invalid Credentials',
            },
          }));        
      }
    },
    saveAllEventsForTraveller:async(payload:any) =>{
      try {
          set((state) => ({
            ...state,
            traveller: {
              ...state.traveller,
              announcements:payload,
              loading: false,
              responseMsg: '',
            },
          }));          
      } catch (error) {
          console.log('Error at: ', error);
          set((state) => ({
            ...state,
            traveller: {
              ...state.traveller,
              announcements: [],
              loading: false,
              responseMsg: 'Invalid Credentials',
            },
          }));        
      }
    },
})

export default createTravellerSlice