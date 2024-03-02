/* eslint-disable @typescript-eslint/no-explicit-any */

import { type StateCreator } from "zustand/vanilla";
import { T_Business } from "../../../types";
import { customAlert, executeOnProcess } from "../../../utils/utils";
import { MESSAGES } from "../../../utils/constant";
import { addData } from "../../../hooks/useAddData";


interface BusinessState {
    loading:boolean;
    info?: T_Business | null;
    businessList?: any;
    businessType?:any;
    responseMsg?:string;
}
export interface BusinessSlice{
    business: BusinessState | null;
    saveBusinessInfo:(payload:any) => void;
    logoutBusiness: () => void;
    createBusiness:(payload:any) => void;
    fetchBusiness:(payload:any) => void;
    saveAllBusinessForBusinessMan:(payload:any) => void;
}

const initialState: BusinessState ={
    loading:false,
    info:null,
    businessList:[],
    responseMsg:""
}
const createBusinessSlice: StateCreator<BusinessSlice> = (set) =>({
    business: initialState,
    saveBusinessInfo:async(payload:any) =>{
        try {
            const process = await new Promise((resolve) =>{
                setTimeout(() => {
                    resolve(true);
                  }, 2000);
            })
            if (typeof payload !== 'string' && process) {
                set((state) => ({
                  ...state,
                  business: {
                    ...state.business,
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
              business: {
                ...state.business,
                info: null,
                loading: false,
                responseMsg: 'Invalid Credentials',
              },
            }));        
        }
    },
    logoutBusiness:async() =>{
        try {
            set(() => ({
              business: initialState, 
            }));
          } catch (error) {
            console.error('Logout error:', error);
          }
    },
    createBusiness:async(payload) =>{
      try {
        set((state) => ({
          ...state,
          business: {
            ...state.business,
            loading: true,
          },
        }));
        const process = await executeOnProcess(() =>
          customAlert('info', MESSAGES.PLEASE_WAIT, MESSAGES.EXECUTING_TASK),
        );
        const response = await addData(payload.tbl, payload.data);
        if(response && process){
            customAlert('success', MESSAGES.SUCCESS, MESSAGES.ADDED);
            set((state) => ({
              ...state,
              business: {
                ...state.business,
                loading: false,
                responseMsg: '',
              },
            }));
        }
      } catch (error:any) {
        set((state) => ({
          business: {
            ...state.business,
            loading: false,
            responseMsg: error,
          },
        }));       
      }
    },
    fetchBusiness:async(payload) =>{
      set((state) => ({
        ...state,
        business: {
          ...state.business,
          businessList: payload,
          loading: false,
          responseMsg: '',
        },
      }));
    },
    saveAllBusinessForBusinessMan:async(payload:any) =>{
      try {
          set((state) => ({
            ...state,
            business: {
              ...state.business,
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
            business: {
              ...state.business,
              info: null,
              loading: false,
              responseMsg: 'Invalid Credentials',
            },
          }));        
      }
    },
})

export default createBusinessSlice