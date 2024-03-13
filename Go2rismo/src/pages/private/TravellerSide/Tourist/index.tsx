/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useStore from '../../../../zustand/store/store';
import { saveAllPost, selector } from '../../../../zustand/store/store.provide';
import { Avatar, Button, Form, Image, List, Rate, notification } from 'antd';
import { CustomButton } from '../../../../components/Button/CustomButton';
import TextArea from 'antd/es/input/TextArea';
import { updateData } from '../../../../hooks/useUpdateData';
import { T_Reviews } from '../../../../types';
import { fetchData } from '../../../../hooks/useFetchData';

export default function TouristSelected() {
    const { type,name } = useParams();
    const [form] = Form.useForm();
    const [isOpen,setIsOpen] = useState(false);
    const [isLoading,setIsLoading] = useState(false)
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<T_Reviews[]>([]);
    const allPost = useStore(selector('traveller'))
    const details = allPost.post?.filter((item: { type: string | undefined; name: string | undefined; }) => item.type === type && item.name === name)
    const countPerPage = 2;

    async function Fetch(){
      setInitLoading(true);
      const response = await fetchData('tbl_postList')
      saveAllPost(response)
      setInitLoading(false);
    }
    
    useEffect(() =>{
      setInitLoading(true)
      const data1 = details[0]?.reviews?.map((item:any) => ({...item,loading:false}))
      setList(data1?.slice(0, countPerPage))
      setInitLoading(false)
    },[details])
  
    const onLoadMore = () => {
      setLoading(true);
      const nextItems = details[0]?.reviews?.slice(list.length, list.length + countPerPage);
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

    const onFinish = async(values:any) =>{
      try {
        setIsLoading(true)
        const dataToSend = {
          travellerId: allPost.info.id,
          travellerName: `${allPost.info.firstName} ${allPost.info.lastName}`,
          travellerEmail: allPost.info.email,
          reviewContent: values.content,
          reviewRate:values.rate,
          date:new Date(Date.now()).toLocaleString()
        }
        const postId = details[0].id;
        const existingReviews = details[0].reviews || [];
    
        const updatedReviews = [...existingReviews, dataToSend];
        console.log(updatedReviews)
        await updateData('tbl_postList', postId, { reviews: updatedReviews });
    
        form.resetFields();
    
        notification.success({
          message: 'Review has been added',
        });
        setIsLoading(false)
        setIsOpen(false)
        Fetch()
      } catch (error) {
        console.error('Failed to add review:', error);
        notification.error({
            message:'Failed',
        });
        setIsLoading(false)
      }
    } 
  return (
    <div className='pt-8 flex flex-nowrap'>
      <div className='pl-8 w-1/2'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold'>{type}</h1>
          <div>
            <Image width={700} height={400} className='rounded-lg' src={details[0].photos[0]} alt="" />
          </div>
        </div>
        <div>
          <div className='w-full flex justify-between'>
            <h1 className='text-3xl'>{name}</h1>
            <CustomButton
              children='Add to Favorites'
              classes='bg-sky-600 text-white'
            />
          </div>
          <div>
          <Rate allowHalf defaultValue={2.5} />
          </div>
        </div>
        <div>

        </div>
      </div>
      <div className='p-8 flex flex-col gap-8'>
        <div className='w-full h-60 p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
          <h1>Description</h1>
          <p>{details[0].description}</p>
        </div>
        <div className='px-4 py-2 w-full h-max shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
          <div className='flex justify-between items-center'>
          <h1>Customer Reviews:</h1>
          <CustomButton
            children={isOpen ? 'Cancel' : 'Add review'}
            classes='bg-sky-600 text-white'
            onClick={() => setIsOpen(!isOpen)}
          />
          </div>
          {isOpen && <Form
          form={form}
          onFinish={onFinish}
        >
      <Form.Item label="Rating" name="rate" rules={[{ required: true }]}>
        <Rate />
      </Form.Item>

      <Form.Item label="Review" name="content" rules={[{ required: true }]}>
        <TextArea rows={4} className='bg-gray-200' placeholder='Write your comments here' />
      </Form.Item>

      <Form.Item label="" className='w-full flex justify-end items-end'>
        <Button type="default" disabled={isLoading} className='bg-sky-400 text-white' htmlType="submit">
          {isLoading ? 'Submitting' : 'Submit Review'}
        </Button>
      </Form.Item>          
        </Form>}
          <div>
            {details[0].reviews && details[0].reviews.length > 0 ? (
              <div>
             <List
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="horizontal"
              loadMore={loadMore}
              dataSource={list}
              renderItem={(item:T_Reviews) => (
                <List.Item>
                  <div className='flex gap-2'>
                    <div>
                    <Avatar size={60}>{item.travellerName}</Avatar>
                    </div>
                    <div>
                    <Rate value={item.reviewRate}/>
                    <h1>{item.travellerEmail}</h1>
                    <p>{item.date}</p>
                    <p>{item.reviewContent}</p>
                    </div>

                  </div>
                </List.Item>
              )}
            />               
              </div>
            ) : (
              <div>
                <p>No customer review yets.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
