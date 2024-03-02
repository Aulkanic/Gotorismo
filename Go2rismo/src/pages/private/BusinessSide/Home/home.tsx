/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { CustomSwiper } from '../../../../components/swiper/CustomSwiper';
import { fetchData } from '../../../../hooks/useFetchData';
import { saveAllBusinessForBusinessMan, selector } from '../../../../zustand/store/store.provide';
import useStore from '../../../../zustand/store/store';

const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

export const BusinessDashboard = () => {
  const business = useStore(selector('business'))
  async function Fetch():Promise<void> {
    const response = await fetchData('tbl_postList');
    saveAllBusinessForBusinessMan(response)
  }
  useEffect(() =>{
    Fetch()
  },[])
    console.log(business)
  return (
    <div className='flex flex-wrap'>
      <div className='w-[1100px]'>
        <div className='p-4 w-96'> 
        <Search
        allowClear 
        placeholder="input search text" 
        size="large" 
        onSearch={onSearch} 
        />
        </div>
        <div className='px-8 flex flex-col'>
          <div>
            <h1 className='font-bold text-3xl'>Tourist Spots</h1>
            <div className='w-full p-4'>
            <CustomSwiper
              images={business?.businessType.beachResorts?.map((item: { photos: any; name: any; }) =>({url:item.photos,name:item.name}))}
              slideNum={2}
              spaceBetween={32}
              />
            </div>

          </div>
          <div>
            <h1 className='font-bold text-3xl'>Hotel and Room</h1>
            <div className='w-full p-4'>
            <CustomSwiper
              images={business?.businessType.hotelRoom?.map((item: { photos: any; name: any; }) =>({url:item.photos,name:item.name}))}
              slideNum={4}
              spaceBetween={32}
              />
            </div>

          </div>
          {/* <div>
            <h1 className='font-bold text-3xl'>Activities</h1>
            <div className='w-full p-4'>
            <CustomSwiper
              images={allBusiness}
              slideNum={4}
              spaceBetween={32}
              />
            </div>
          </div> */}
        </div>
      </div>
      <div className='flex-1 p-8'>
        <div className='shadow-border h-[670px] p-4'>
            <h1 className='font-bold text-3xl'>Event/Announcements</h1>
        </div>
      </div>
    </div>
  )
}
