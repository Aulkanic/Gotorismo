/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import useStore from '../../../../zustand/store/store'
import { saveAllItinerary, selector } from '../../../../zustand/store/store.provide'
import { fetchDataCondition } from '../../../../hooks/useFetchData'
import { useNavigate } from 'react-router-dom';
import { Swiper,SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';
import { Navigation, Pagination } from 'swiper/modules';

export const TravelAdventure = () => {
  const traveller = useStore(selector('traveller'))
  const navigate = useNavigate()
   async function Fetch() {
    const res = await fetchDataCondition('tbl_itinerary',[{ field: "travellerId", operator: "==", value: traveller.info.id }])
    saveAllItinerary(res)
   }
   useEffect(() =>{
    Fetch()
   },[])

   const travels =traveller?.itinerary?.length > 0 && traveller?.itinerary[0]?.itinerary?.length > 0 ? traveller?.itinerary[0]?.itinerary : []
   console.log(travels)
  return (
    <div id='adv' className='px-4 md:px-16 py-8'>
      <p className='w-full text-center text-[25px] font-[700] text-[#060E61]'>My Adventure</p>
      <Swiper
        navigation={true}
        spaceBetween={30}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        slidesPerView={1}
        modules={[Pagination, Navigation]}
        pagination={{
          clickable: true,
        }}
      >
        {travels?.map((h:any,idx:number) =>{
          return(
          <SwiperSlide key={idx} className='px-16 py-8 h-full'>
              <div onClick={() => navigate(`/UserDashBoard/HomePage/${h.type}/${h.name}`)} className='rounded-xl cursor-pointer h-full'>
                <p>{h.name}</p>
                <div className='relative flex flex-col items-center justify-center w-full'>
                  <img className='w-full h-full' src={h.photos[0] || ''} alt="" />
                  {(h.location && h.address) && <p className='w-full text-left text-[14px] m-0'>Location: {h.address} {h.location}</p>}
                </div>
                <div className='w-full h-full text-[15px] font-[400] line-clamp-5 flex justify-start text-left items-top rounded-b-xl'>
                  {h.description}
                </div>
              </div>
              </SwiperSlide>
            )})}
      </Swiper>
    </div>
  )
}
