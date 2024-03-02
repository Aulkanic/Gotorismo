/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { CustomSwiper } from '../../../../components/swiper/CustomSwiper';
import { fetchData } from '../../../../hooks/useFetchData';
import { saveAllBusiness, selector } from '../../../../zustand/store/store.provide';
import useStore from '../../../../zustand/store/store';

const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const tourist = [
  {url:'https://4.bp.blogspot.com/-K3tbURW2M2s/US286xPwprI/AAAAAAAAAKU/6Yzgz37tJJY/s1600/Mayon-Volcano.jpg',name:'tourist1'},
  {url:'https://th.bing.com/th/id/OIP.Oc80ei2V8fmpnXnA1iG3hQHaD4?rs=1&pid=ImgDetMain',name:'tourist2'},
  {url:'https://th.bing.com/th/id/OIP.4SqXQIU1PiJLrhXSKCg6VQHaD4?rs=1&pid=ImgDetMain',name:'tourist3'},
  {url:'https://content.skyscnr.com/m/4c718ac4d7d4256e/original/Bohol-Philippines-2019-Brendan-van-Son-25.jpg',name:'tourist4'},
]

export const AdminDashboard = () => {
  const allPost = useStore(selector('admin'))
  async function Fetch(){
    const response = await fetchData('tbl_postList');
    saveAllBusiness(response)
  }
  useEffect(() =>{
    Fetch()
  },[])
  
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
              images={allPost.businessType?.beachResorts?.map((item: { photos: any; name: any; }) =>({url:item.photos,name:item.name}))}
              slideNum={2}
              spaceBetween={32}
              />
            </div>

          </div>
          <div>
            <h1 className='font-bold text-3xl'>Hotel and Room</h1>
            <div className='w-full p-4'>
            <CustomSwiper
              images={allPost.businessType?.hotelRoom?.map((item: { photos: any; name: any; }) =>({url:item.photos,name:item.name}))}
              slideNum={4}
              spaceBetween={32}
              />
            </div>

          </div>
          <div>
            <h1 className='font-bold text-3xl'>Activities</h1>
            <div className='w-full p-4'>
            <CustomSwiper
              images={tourist}
              slideNum={4}
              spaceBetween={32}
              />
            </div>
          </div>
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
