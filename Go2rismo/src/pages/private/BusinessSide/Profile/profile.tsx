import React from 'react'
import { Avatar,Input } from 'antd';
import {  UserOutlined } from '@ant-design/icons';
import useStore from '../../../../zustand/store/store';
import { selector } from '../../../../zustand/store/store.provide';
import { CustomButton } from '../../../../components/Button/CustomButton';

export const BusinessProfile = () => {
  const business = useStore(selector('business'))
  console.log(business)
  return (
    <div className='p-8 flex flex-col justify-center items-center gap-24'>
      <div className='relative'>
        <div className='w-[800px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] h-[300px]'>

        </div>
        <div className='absolute -bottom-24 left-12 flex flex-col justify-center item-center'>
          <Avatar
            size={250}
            className='z-50 bg-gr'
            icon={<UserOutlined />}
          />
          <h1 className='font-bold text-4xl line-clamp-1'>{business.info.businessName}</h1>
        </div>
        <div className=''>
          
        </div>
      </div>
      <div className='w-[800px] h-[300px] p-4 flex flex-col gap-4'>
        <div className='flex flex-col'>
        <label htmlFor="">First Name</label>
        <Input className='w-72' size='large' value={business.info.firstName} readOnly/>
        </div>
        <div className='flex flex-col'>
        <label htmlFor="">Last Name</label>
        <Input className='w-72' size='large' value={business.info.lastName} readOnly/>
        </div>
        <div className='flex flex-col'>
        <label htmlFor="">Email Name</label>
        <Input className='w-72' size='large' value={business.info.email} readOnly/>
        </div>
        <CustomButton
          children='Edit Profile'
          classes='bg-sky-700 text-white  hover:opacity-90 m-4 w-32'
        />
      </div>
    </div>
  )
}
