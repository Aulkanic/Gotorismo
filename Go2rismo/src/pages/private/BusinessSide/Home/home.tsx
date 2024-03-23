/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Button, Image, List } from "antd";
import { fetchData } from "../../../../hooks/useFetchData";
import useStore from "../../../../zustand/store/store";
import { saveAllEvents, saveAllPostBusiness, selector } from "../../../../zustand/store/store.provide";
import { T_Events } from "../../../../types";
import { Swiper, SwiperSlide,type SwiperRef } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

export const BusinessDashboard = () => {
  const countPerPage = 1;
  const allPost = useStore(selector('business'))
  const swiperRef = useRef<SwiperRef>(null);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<T_Events[]>([]);
  console.log(allPost)
  async function Fetch(){
    setInitLoading(true);
    const response = await fetchData('tbl_postList');
    const res = await fetchData('tbl_announcements&Events')
    console.log(response)
    saveAllPostBusiness(response)
    saveAllEvents(res)
    setInitLoading(false);
  }
  useEffect(() =>{
    Fetch()
  },[])
  useEffect(() =>{
    const list1 = allPost.events
    const data1 = list1?.map((item:any) => ({...item,loading:false}))
    setList(data1.slice(0, countPerPage))
  },[allPost.events])

  const onLoadMore = () => {
    setLoading(true);
    const nextItems = allPost.events?.slice(list.length, list.length + countPerPage);
    setList([...list, ...nextItems]);
    setLoading(false);
  };

  const loadMore =
  !initLoading && !loading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>Load more</Button>
    </div>
  ) : null;
  console.log(list)
  return (
    <div className='flex flex-nowrap'>
      <div className='w-[1100px]'>

        <div className='px-8 flex flex-col pt-8'>
          <div>
            <h1 className='font-bold text-3xl'>Tourist Spots</h1>
            <div className='w-[980px] p-4'>
            <Swiper
              ref={swiperRef}
              slidesPerView={4}
              spaceBetween={0}
              navigation={true}
              modules={[Pagination, Navigation]}
              className=''
            >
             {allPost?.businessType?.beachResorts?.map((item:any,idx:number) =>(
              <SwiperSlide className=''>
                <div  key={idx} className='w-[222.5px] h-[150px] bg-white cursor-pointer rounded-lg relative'>
                <div className='relative'>
                <Image 
                src={item.photos[0]} 
                className="w-full rounded-lg w-[200px] h-[150px]"
                width={200}
                height={150}
                />
                <p className='bg-white/40 font-bold backdrop-blur-sm rounded-lg px-4 py-2 absolute bottom-4 left-4'>{item.name}</p>
                </div>
                </div>
              </SwiperSlide>
             ))}
            </Swiper>
            </div>
          </div>
          <div>
            <h1 className='font-bold text-3xl'>Hotel and Room</h1>
            <div className='w-[980px] p-4'>
            <Swiper
              ref={swiperRef}
              slidesPerView={4}
              spaceBetween={0}
              navigation={true}
              modules={[Pagination, Navigation]}
              className=''
            >
             {allPost?.businessType?.hotelRoom?.map((item:any,idx:number) =>(
              <SwiperSlide className=''>
                <div key={idx} className='w-[222.5px] h-[150px] bg-white cursor-pointer rounded-lg relative'>
                <div className='relative'>
                <Image 
                src={item.photos[0]} 
                className="w-full rounded-lg w-[200px] h-[150px]"
                width={200}
                height={150}
                />
                <p className='bg-white/40 font-bold backdrop-blur-sm rounded-lg px-4 py-2 absolute bottom-4 left-4'>{item.name}</p>
                </div>
                </div>
              </SwiperSlide>
             ))}
            </Swiper>
            </div>
          </div>
        </div>
      </div>
      <div className='flex-1 p-8'>
        <div className='shadow-border h-[670px] p-4 overflow-y-auto'>
            <h1 className='font-bold text-3xl'>Event/Announcements</h1>
            <List
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="horizontal"
              loadMore={loadMore}
              dataSource={list}
              renderItem={(item:any) => (
                <List.Item>
                  <div>
                    <h1>{item.Title}</h1>
                    <p>{item.Date}</p>
                    <p>{item.Content}</p>
                  </div>
                </List.Item>
              )}
            />
        </div>
      </div>
    </div>
  )
}
