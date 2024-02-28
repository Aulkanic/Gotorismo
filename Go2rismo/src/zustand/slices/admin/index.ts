/* eslint-disable @typescript-eslint/no-explicit-any */

import { type StateCreator } from "zustand/vanilla";
import { T_Admin } from "../../../types";


interface AdminState {
    loading:boolean;
    info: T_Admin | null;
    responseMsg:string;
}
export interface AdminSlice{
    admin: AdminState | null;
    saveAdminInfo:(payload:any) => void;
    logoutAdmin: () => void;
}

const initialState: AdminState ={
    loading:false,
    info:null,
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

})

export default createAdminSlice