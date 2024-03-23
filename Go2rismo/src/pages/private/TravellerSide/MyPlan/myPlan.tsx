/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import useStore from '../../../../zustand/store/store'
import { saveAllItinerary, selector } from '../../../../zustand/store/store.provide'
import { Image, Input, InputNumber,Rate, notification } from 'antd';
import { CustomButton } from '../../../../components/Button/CustomButton';
import { currencyFormat } from '../../../../utils/utils';
import { CalculateRating } from '../../../../config/calculateRate';
import { AddToAdventure } from '../../../../config/addItinerary';
import { fetchDataCondition } from '../../../../hooks/useFetchData';

export const TravelPlan = () => {
  
  const traveller = useStore(selector('traveller'))
  const [filter,setFilter] = useState({
    place:'',
    budget:0,
  })
  const [filterData,setFilterData] = useState(traveller.post  || [])
   const [selectedItems, setSelectedItems] = useState<any[]>([]);
   const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

   async function Fetch() {
    const res = await fetchDataCondition('tbl_itinerary',[{ field: "travellerId", operator: "==", value: traveller.info.id }])
    saveAllItinerary(res)
   }
   useEffect(() =>{
    Fetch()
   },[])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFilter((prev) =>({...prev,place: e.target.value}))
  };
  const onChangePrice = (value: number | null) => {
    setFilter((prev) =>({...prev,budget: value || 0}))
  };

  const handleCalculate = () =>{
    const filterData = traveller.post?.filter((place:any) => {
      const location = !filter.place || filter.place.toLowerCase().includes(place.location.toLowerCase())
      const price = filter.budget === 0 || place.price <= filter.budget 
      return location && price
    });
    setFilterData(filterData)
  }
  const handleCheckboxChange = (data: any) => {
     const existingIndex = selectedItems?.findIndex((item:any) => item.id === data.id);
       if (existingIndex === -1) {
        // If item not found, add it to the array
        setSelectedItems((prev) => [...prev, data]);
      } else {
        setSelectedItems((prev) => {
          const newArray = [...prev]; // Create a copy of the array
          newArray.splice(existingIndex, 1); // Remove the item at existingIndex
          return newArray; // Return the new array
        });
      }
  };
  const handleAddToAdventure = async(event: {
      [x: string]: any; stopPropagation: () => void; 
  },data:any) =>{
      try {
        event.preventDefault();
        event.stopPropagation();
        if(!traveller.info && traveller.info?.id){
          notification.error({
              message: "Please login to add the tourists"
          })
          return
        }
        setLoadingMap(prevLoadingMap => ({
          ...prevLoadingMap,
          [data.id]: true // Set loading state to true for the clicked product ID
      }));
        await AddToAdventure(data,traveller.info)
        notification.success({
          message:'Added to your Adventure'
        })
        setLoadingMap(prevLoadingMap => ({
          ...prevLoadingMap,
          [data.id]: false 
      }));  
      Fetch()
      } catch (error) {
      console.error("Error adding:", error);
        setLoadingMap(prevLoadingMap => ({
            ...prevLoadingMap,
            [data.id]: false
        }));
    }
  }
  const list = traveller.itinerary?.length > 0 ? traveller.itinerary[0] : []
  return (
    <div className='flex'>
      <div className='flex flex-col gap-2 py-4 bg-[#00256E]/70 min-h-screen h-full text-white px-4'>
      <h1 className='font-bold text-lg tracking-wider'>Budget Travel Tool</h1>
        <div className='flex flex-col gap-2'>
        <label htmlFor="place">Enter Place: </label>
        <Input style={{width:'350px'}} size='large' placeholder="Place" allowClear onChange={onChange} />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">Enter Budget:</label>
          <InputNumber
            min={0}
            style={{width:'350px'}}
            onChange={onChangePrice}
          />
        </div>
          <CustomButton
          children='Calculate'
          onClick={() => handleCalculate()}
          size='large'
          classes='w-[350px] mt-4 text-white'
          />
      </div>
      <div className='px-8 flex flex-col gap-4 mt-4'>
        <div className='w-full flex justify-between items-center'>
        <h1 className='font-bold text-lg'>Suggested Places:</h1>
        </div>

        <div className='flex flex-wrap gap-4'>
        {filterData?.map((item:any,idx:number) =>{
          const rating = CalculateRating(item.reviews) || 0
          const isIn = list?.itinerary?.find((i: { id: string; }) => i.id === item.id) || null
          return isIn ? null : (
          <div onClick={() =>handleCheckboxChange(item)} key={idx} className='w-[230px] h-[300px] flex flex-col flex-wrap shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] '>
            <div className='rounded-t-lg relative'>
              <Image src={item.photos[0]} alt={item.name} width={230} height={150} className='rounded-t-lg'/>
              <p className='absolute bottom-4 bg-white/60 px-2 left-2'>{item.location}</p>
            </div>
            <div className='pl-2 flex flex-col gap-2'>
              <p>{item.name}</p>
              <Rate value={rating} defaultValue={rating} disabled></Rate>
              <span>{currencyFormat(item.price)}</span>
            </div>
            <div className='flex-1 justify-center items-center flex'>
            <CustomButton
              children='Add to Adventure'
              classes='bg-[#00256E]/60 text-white'
              loading={loadingMap[item.id]}
              onClick={(event) => handleAddToAdventure(event, item)}
            />
            </div>
          </div>
            )})}
        </div>

      </div>
    </div>
  )
}
