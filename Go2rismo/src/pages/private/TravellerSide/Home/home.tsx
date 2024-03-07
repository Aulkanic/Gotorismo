/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Input, List } from "antd";
import { fetchData } from "../../../../hooks/useFetchData";
import useStore from "../../../../zustand/store/store";
import { saveAllEventsForTraveller, saveAllPost, selector } from "../../../../zustand/store/store.provide";
import { CustomSwiper } from "../../../../components/swiper/CustomSwiper";
import { T_Events } from "../../../../types";

const  { Search } = Input
export const TravelDashboard = () => {
  const countPerPage = 1;
  const allPost = useStore(selector('traveller'))
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<T_Events[]>([]);
  async function Fetch(){
    setInitLoading(true);
    const response = await fetchData('tbl_postList');
    const res = await fetchData('tbl_announcements&Events')
    saveAllPost(response)
    saveAllEventsForTraveller(res)
    setInitLoading(false);
  }
  useEffect(() =>{
    Fetch()
  },[])
  const onLoadMore = () => {
    setLoading(true);
    const nextItems = allPost.announcements?.slice(list.length, list.length + countPerPage);
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
  return (
    <div className='flex flex-nowrap'>
      <div className='w-[1100px]'>
        <div className='p-4 w-96'> 
        <Search
        allowClear 
        placeholder="input search text" 
        size="large" 
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
              dataSource={allPost.announcements?.slice(0, countPerPage)}
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
