/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from 'react'
import { RouterUrl } from '../routes';
import clsx from 'clsx';
import Logo from '../../src/assets/app logo.png'
import { Link, Outlet } from 'react-router-dom';

export default function Private(){
  const typeUser:string = 'admi';
  const [selected,setSelected] = useState(0)

  const links = typeUser === 'traveller' ?
  [
    {id:0,name:'Home',url:RouterUrl.TRAVELLERSIDE},
    {id:1,name:'Booking',url:RouterUrl.TRAVELLERBOOKING},
    {id:2,name:'My Plan',url:RouterUrl.TRAVELLERPLAN},
    {id:3,name:'Travel Talk',url:RouterUrl.TRAVELLERTALK},
    {id:4,name:'Adventure',url:RouterUrl.TRAVELLERADVENTURE},
    {id:5,name:'Maps',url:RouterUrl.TRAVELLERMAPS},
    {id:6,name:'Profile',url:RouterUrl.TRAVELLERPROFILE},
  ] : typeUser === 'admin' ?
  [
    {id:0,name:'Home',url:RouterUrl.ADMINSIDE},
    {id:1,name:'Booking',url:RouterUrl.ADMINBOOKING},
    {id:2,name:'Accounts',url:RouterUrl.ADMINACCOUNTS},
    {id:3,name:'Travel Talk',url:RouterUrl.ADMINTRAVELTALK},
    {id:4,name:'Admin',url:RouterUrl.ADMINPROFILE},
  ] : [
    {id:0,name:'Home',url:RouterUrl.BUSINESSSIDE},
    {id:1,name:'Booking',url:RouterUrl.BUSINESSBOOKING},
    {id:2,name:'My Business',url:RouterUrl.BUSINESSMINE},
    {id:3,name:'Travel Talk',url:RouterUrl.BUSINESSTALK},
    {id:4,name:'Profile',url:RouterUrl.BUSINESSPROFILE},
  ]

   const onSeletedMenu = useCallback((item:any) =>{
      setSelected(item.id)
   },[selected])
  return (
    <div>
      <header className='bg-[#41E8D1] px-4 py-2 flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
        <img className='w-16' src={Logo} alt="" />
        <p className='text-[#00256E] font-bold text-xl'>Go2rismo</p>
        </div>
        <div>
          <ul className='flex gap-12'>
            {links?.map((data,idx) =>{
              return(
                <li key={idx} 
                className={clsx('cursor-pointer',selected === data.id ? 'text-white font-extrabold' : 'text-[#00256E] font-bold')}
                >
                 <Link onClick={()=>onSeletedMenu(data)} to={data.url}>
                 {data.name}
                 </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}
