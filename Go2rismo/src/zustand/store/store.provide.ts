/* eslint-disable @typescript-eslint/no-explicit-any */
import useStore from "./store";
const selector = (key:string) => (state:any) => state[key];
const storeProvider = useStore.getState();
export const{
    saveAdminInfo,
    saveBusinessInfo,
    saveTravellerInfo,
    logoutAdmin,
    logoutBusiness,
    logoutTraveller,
    setUserType,
    removeUserType,
    allUser
} = storeProvider

export { selector, storeProvider };