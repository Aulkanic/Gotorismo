import React, { useState } from 'react'
import { Avatar,Input } from 'antd';
import {  UserOutlined } from '@ant-design/icons';
import useStore from '../../../../zustand/store/store';
import { selector } from '../../../../zustand/store/store.provide';
import { CustomButton } from '../../../../components/Button/CustomButton';

export const TravelProfile = () => {
  const traveller = useStore(selector('traveller'))
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  return (
    <div className='flex gap-16'>
      <div className='p-8 flex flex-col justify-center item-center w-[700px]'>
        <div className='flex gap-8 items-center justify-center'>
        <Avatar
          size={200}
          icon={<UserOutlined />}
        />
        <p className='text-4xl font-bold line-clamp-1'>{traveller.info.firstName}</p>
        </div>
        <div className='flex'>
          <div className=' h-max p-4 flex flex-col items-center justify-center gap-4'>
            <div className='flex flex-col'>
            <label htmlFor="">First Name</label>
            <Input className='w-72' size='large' value={traveller.info.firstName} readOnly/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Last Name</label>
            <Input className='w-72' size='large' value={traveller.info.lastName} readOnly/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Birthday</label>
            <Input className='w-72' size='large' value={new Date(traveller.info.birthDate).toLocaleDateString()} readOnly/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Address</label>
            <Input className='w-72' size='large' value={traveller.info.address} readOnly/>
            </div>

          </div>
          <div className='p-4 flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label htmlFor="">Email</label>
            <Input className='w-72' size='large' value={traveller.info.email} readOnly/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Password</label>
            <Input.Password visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
            className='w-72' size='large' value={traveller.info.lastName} readOnly/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Confirm Password</label>
            <Input.Password visibilityToggle={{ visible: passwordVisible1, onVisibleChange: setPasswordVisible1 }}
            className='w-72' size='large' value={new Date(traveller.info.birthDate).toLocaleDateString()} readOnly/>
            </div>  
            <div className='flex'>
            <CustomButton
              children='Edit & Save'
              classes='bg-sky-700 text-white  hover:opacity-90 m-4 w-32'
            />  
            <CustomButton
              children='Delete Account'
              classes='bg-sky-700 text-white  hover:opacity-90 m-4 w-32'
            />  
            </div>
      
          </div>
        </div>
      </div>
      <div className='p-8 pb-0 flex flex-col justify-between h-[720px]'>
        <div className='w-[800px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] h-[500px] p-4'>
          <h1 className='font-bold text-2xl'>Notifications</h1>
        </div>
        <div className='flex items-end justify-end'>
          <CustomButton
            children='Emergency Hotlines'
            classes='bg-sky-700 text-white  hover:opacity-90 m-4 w-52'
          />
        </div>
      </div>
    </div>
  )
}
