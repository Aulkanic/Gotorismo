/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect,useRef, useState } from 'react'
import {  Form, Input,Select,Upload, notification,Button, Image, Flex, RadioChangeEvent } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CustomButton } from '../../../../components/Button/CustomButton';
import { uploadImageToStorage } from '../../../../config/uploadFile';
import useStore from '../../../../zustand/store/store';
import { fetchBusiness, saveAllEvents, selector } from '../../../../zustand/store/store.provide';
import { fetchData } from '../../../../hooks/useFetchData';
import { addData } from '../../../../hooks/useAddData';
import { customAlert, executeOnProcess } from '../../../../utils/utils';
import { MESSAGES } from '../../../../utils/constant';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation,Thumbs ,FreeMode, Pagination} from 'swiper/modules';
import { Swiper, SwiperSlide,type SwiperRef } from 'swiper/react';
import CustomRadio from '../../../../components/radio/customRadio';

type FieldType = {
  name?: string;
  location?: string;
  type?: string;
  description?: string;
  photos?: string;
};
const { TextArea } = Input;

export const MyBusiness = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const [form] = Form.useForm();
  const business = useStore(selector('business'))
  const [act,setAct] = useState('')
  const [post,setPost] = useState('')
  const [api, contextHolder] = notification.useNotification();
  const onFinish = async(values: any) => {
    try {    
      if(act === 'Business') {
        const Photos = values.photos;
        if(!Array.isArray(Photos)){
            api.error({
                message:'Form Submission',
                description: 'Failed to submit form. Please input all necessary details.',
            })
            return
        }
        const uploading = Photos?.map(async (file:any) => {
            const filePath = `businessGallery/${file.name}_${business.info.id}`;
            const upload = await uploadImageToStorage(file.originFileObj,filePath)
            return upload
        })
        const imageUrl = await Promise.all(uploading)
        const dataToSend = {
            name:values.name,
            location: values.location,
            type:values.type,
            description:values.description,
            businessId:business.info.id,
            photos:imageUrl
        }
        await executeOnProcess(() =>
            customAlert('info', MESSAGES.PLEASE_WAIT, MESSAGES.EXECUTING_TASK),
          );
        const response = await addData('tbl_postList',dataToSend)
        if(response){
          Fetch()
          form.resetFields();
        }
      }else{
        const dataToSend = {
            Title:values.name,
            Content: values.location,
            Date: new Date(Date.now()).toLocaleString()
        }
        await executeOnProcess(() =>
            customAlert('info', MESSAGES.PLEASE_WAIT, MESSAGES.EXECUTING_TASK),
          );
        const response = await addData('tbl_announcements&Events',dataToSend)
        if(response){
          Fetch()
          form.resetFields();
        }        
      }     

  } catch (error) {
      console.log(error)
      api.error({
          message:'Form Submission',
          description: 'Failed to submit form. Please try again later.',
      })
  }
  };
  const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
  };
  const normFile = (e: any) => {
      if (Array.isArray(e)) {
          console.log(e)
        return e;
      }
      return e?.fileList;
  };
  const onChange = (e: RadioChangeEvent,field:string) => {
    if(field === 'form'){
      setAct(e.target.value);
    }else{
      setPost(e.target.value)
    }

  };
  async function Fetch(){
    const response = await fetchData('tbl_postList')
    const res = await fetchData('tbl_announcements&Events')
    if(response && res){
      fetchBusiness(response)
      saveAllEvents(res)
    }
  }
  useEffect(() =>{
    Fetch()
  },[])
  console.log(business)
  return (
    <div className='flex flex-wrap'>
      <div className='p-4 w-[600px]'>
      <Form
      form={form}
      name="basic"
      layout='vertical'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      style={{ width:'100%' }}
      initialValues={{ remember: true }}
      className='shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-4 rounded-lg'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      >
          <h3 className=' font-bold text-3xl mb-4'>Add Post</h3>
          <Flex vertical gap="middle" className='mb-4'>
              <CustomRadio
                onChange={(e) => onChange(e,'form')}
                choices={['Business', 'Announcement/Events']}
                value={act}
              />
            </Flex>
          {act === 'Business' ? <div className='flex gap-2 w-full flex-wrap'>
              <div className='flex-1'>
              <Form.Item<FieldType>
              label="Name"
              name="name"
              className='mb-2'
              rules={[{ required: true, message: 'Please provide name!' }]}
              >
              <Input />
              </Form.Item>
              <Form.Item<FieldType>
              label="Location"
              name="location"
              className='mb-2'
              rules={[{ required: true, message: 'Please provide location!' }]}
              >
              <Input />
              </Form.Item>
              <Form.Item<FieldType>
              label="Type:"
              name="type"
              className='mb-2'
              rules={[{ required: true, message: 'Please select  type!' }]}
              >
                <Select 
                allowClear
                >
                    <Select.Option value="">-select business-</Select.Option>
                    <Select.Option value="Beach Resorts">Beach Resorts</Select.Option>
                    <Select.Option value="Hotel & Rooms">Hotel & Rooms</Select.Option>
                    <Select.Option value="Tourist Spots">Tourist Spots</Select.Option>
                    <Select.Option value="Food/Restaurant">Food/Restaurant</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item<FieldType>
              label="Description"
              name="description"
              className='mb-2'
              rules={[{ required: true, message: 'Please provide description!' }]}
              >
              <TextArea rows={4} />
              </Form.Item>
              <Form.Item label="Photos" name='photos' valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188" multiple listType="picture" maxCount={3}>
              <Button className='w-full bg-white' icon={<UploadOutlined />}>Upload here</Button>
              </Upload>
              </Form.Item>
              </div>
          </div> : (
            <div>
              <Form.Item<FieldType>
              label="Title"
              name="name"
              className='mb-2'
              rules={[{ required: true, message: 'Please provide name!' }]}
              >
              <Input />
              </Form.Item>
              <Form.Item<FieldType>
              label="Content"
              name="location"
              className='mb-2'
              rules={[{ required: true, message: 'Please provide content!' }]}
              >
              <TextArea rows={5} />
              </Form.Item>              
            </div>
          )}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='flex justify-end items-end mr-20'>
          <CustomButton
              children={'Add'}
              type='primary'
              htmlType='submit'
              loading={business.loading}
              classes='w-32 rounded-xl'
            />
          </Form.Item>
      </Form>   
      {contextHolder}
      </div>
      <div className='flex flex-1 flex-col gap-4 p-8 mt-4 mr-4 rounded-lg'>
        <h1 className='font-bold text-3xl'>Post</h1>
        <div>
        <Flex vertical gap="middle" className='mb-0'>
          <CustomRadio
            onChange={(e) => onChange(e,'post')}
            choices={['Business', 'Announcement/Events']}
            value={post}
          />
        </Flex>
        </div>
        {post === 'Business' ? <Swiper
          modules={[FreeMode, Navigation, Thumbs,Pagination]}
          spaceBetween={32}
          direction={'vertical'}
          slidesPerView={3}
          pagination={{
            clickable: true,
          }}
          watchSlidesProgress={true}
          ref={swiperRef}
          className='w-full flex flex-col h-[700px] p-4'
        >
          {business.businessList?.map((data:any,idx:number) =>(
            <SwiperSlide key={idx} virtualIndex={idx}>
          <div key={idx} className='bg-white p-4 rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
            <h3 className='font-bold text-lg mb-2'>{data.name}</h3>
            <div className='flex gap-4'>
              <div>
              <Image.PreviewGroup
                items={data?.photos}
              >
                <Image
                  width={200}
                  className='rounded-lg border-2 border-[#00256E]'
                  src={data.photos?.length > 0 ? data.photos[0] : ''}
                />
              </Image.PreviewGroup>
              </div>
              <div>
                {data.description}
              </div>
            </div>
          </div>
            </SwiperSlide>
          ))}
        </Swiper> : (
        <Swiper
        modules={[FreeMode, Navigation, Thumbs,Pagination]}
        spaceBetween={32}
        direction={'vertical'}
        slidesPerView={3}
        pagination={{
          clickable: true,
        }}
        watchSlidesProgress={true}
        ref={swiperRef}
        className='w-full flex flex-col h-[700px] p-4'
        >
        {business.events?.map((data:any,idx:number) =>(
          <SwiperSlide key={idx} virtualIndex={idx}>
              <div key={idx} className='bg-white p-4 rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>

                <div className='flex flex-col gap-4'>
                  <div className='flex justify-between items-center'>
                  <h3 className='font-bold text-lg mb-2'>{data.Title}</h3>
                  <p>{data.Date}</p>
                  </div>
                  <div>
                    {data.Content}
                  </div>
                </div>
              </div>
                </SwiperSlide>
        ))}
      </Swiper>         
        )}
      </div>
    </div>
  )
}
