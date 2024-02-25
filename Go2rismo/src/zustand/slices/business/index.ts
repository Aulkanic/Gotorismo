/* eslint-disable @typescript-eslint/no-explicit-any */

import { type StateCreator } from "zustand/vanilla";
import { T_Business } from "../../../types";


interface BusinessState {
    loading:boolean;
    info: T_Business | null;
    responseMsg:string;
}
export interface BusinessSlice{
    business: BusinessState | null;
    saveBusinessInfo:(payload:any) => void;
    logoutBusiness: () => void
}

const initialState: BusinessState ={
    loading:false,
    info:null,
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
    }
})

export default createBusinessSlice