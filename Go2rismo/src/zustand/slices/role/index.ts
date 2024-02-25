/* eslint-disable @typescript-eslint/no-explicit-any */

import { type StateCreator } from "zustand/vanilla";

interface UserState {
    userType: 'admin' | 'traveller' | 'business' | '';
    isLogin:boolean;
    responseMsg:string;
}
export interface UserSlice{
    user: UserState | null;
    setUserType: (userType: 'admin' | 'traveller' | 'business') => void;
    removeUserType: () => void
}

const initialState: UserState ={
    userType:'',
    isLogin:false,
    responseMsg:""
}
const createUserSlice: StateCreator<UserSlice> = (set) =>({
    user: initialState,
    setUserType:async(payload:'admin' | 'traveller' | 'business' | '') =>{
        console.log(payload)
        try {
            const process = await new Promise((resolve) =>{
                setTimeout(() => {
                    resolve(true);
                  }, 2000);
            })
            if (typeof payload === 'string' && process) {
                set((state) => ({
                  ...state,
                  user: {
                    ...state.user,
                    userType:payload,
                    isLogin:true,
                    responseMsg: '',
                  },
                }));
            }           
        } catch (error) {
            console.log('Error at: ', error);
            set((state) => ({
              ...state,
              user: {
                ...state.user,
                userType:'',
                isLogin:false,
                responseMsg: 'Invalid Credentials',
              },
            }));        
        }
    },
    removeUserType:async() =>{
        try {
            set(() => ({
              user: initialState, 
            }));
          } catch (error) {
            console.error('Logout error:', error);
          }
    }
})

export default createUserSlice