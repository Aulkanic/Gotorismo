/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import {  Form, Input,Select,Upload, notification,Button, Image, Flex, RadioChangeEvent, List, Skeleton, Rate, Popconfirm } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CustomButton } from '../../../../components/Button/CustomButton';
import { uploadImageToStorage } from '../../../../config/uploadFile';
import useStore from '../../../../zustand/store/store';
import { fetchBusiness, saveAllEvents, selector } from '../../../../zustand/store/store.provide';
import { fetchData } from '../../../../hooks/useFetchData';
import { addData } from '../../../../hooks/useAddData';
import CustomRadio from '../../../../components/radio/customRadio';
import { T_Business, T_Events } from '../../../../types';
import { updateData } from '../../../../hooks/useUpdateData';

type FieldType = {
  name?: string;
  location?: string;
  address?:string;
  type?: string;
  description?: string;
  photos?: string;
  price?:number;
};
const { TextArea } = Input;

export const MyBusiness = () => {
  const [form] = Form.useForm();
  const typeSelected = Form.useWatch('type',form)
  const business = useStore(selector('business'))
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleting,setDeleting] = useState(false)
  const [act,setAct] = useState('')
  const [post,setPost] = useState('')
  const [list, setList] = useState<T_Business[]>([]);
  const [list1, setList1] = useState<T_Events[]>([]);
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
        setIsLoading(true)
        notification.info({
          message: 'The task is being executed. Please wait until it is complete',
        });
        const uploading = Photos?.map(async (file:any) => {
            const filePath = `businessGallery/${file.name}_${business.info.id}`;
            const upload = await uploadImageToStorage(file.originFileObj,filePath)
            return upload
        })
        const imageUrl = await Promise.all(uploading)
        const dataToSend = typeSelected === 'Tourist Spots' ? {
        name:values.name,
        location: values.location,
        type:values.type,
        description:values.description,
        businessId:business.info.id,
        photos:imageUrl,
        address: values.address,
        isDeleted:false
    } : {
            name:values.name,
            location: values.location,
            type:values.type,
            price:values.price,
            description:values.description,
            businessId:business.info.id,
            address: values.address,
            photos:imageUrl,
            isDeleted:false
        }
        const response = await addData('tbl_postList',dataToSend)
        if(response){
          Fetch()
          setIsLoading(false)
          notification.success({
              message: 'New Record added successfully'
          });
          form.resetFields();
        }
      }else{
        setIsLoading(true)
        const dataToSend = {
            Title:values.name,
            Content: values.location,
            Date: new Date(Date.now()).toLocaleString(),
            businessId:business.info.id,
        }
        notification.info({
          message: 'The task is being executed. Please wait until it is complete',
        });
        const response = await addData('tbl_announcements&Events',dataToSend)
        if(response){
          Fetch()
          setIsLoading(false)
          notification.success({
              message: 'New Record added successfully'
          });
          form.resetFields();
        }        
      }     

  } catch (error) {
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
    setInitLoading(true)
    const response = await fetchData('tbl_postList')
    const res = await fetchData('tbl_announcements&Events')
    response.shift()
    if(response && res){
      fetchBusiness(response)
      saveAllEvents(res)
      setInitLoading(false)
    }
  }
  useEffect(() =>{
    Fetch()
  },[])
  useEffect(() =>{
    const list = business.businessList?.filter((item: { businessId: any; }) => item.businessId === business.info.id)
    const data = list?.map((item:any) => ({...item,loading:false}))
    const list1 = business.events
    const data1 = list1?.map((item:any) => ({...item,loading:false}))
    setList(data.slice(0, countPerPage));
    setList1(data1.slice(0, countPerPage))
  },[business.businessList, business.events, business.info.id])
  const countPerPage = 2;

  const onLoadMore = () => {
    setLoading(true);
    const nextItems = business.businessList?.slice(list.length, list.length + countPerPage);
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

  const onLoadMore1 = () => {
    setLoading(true);
    const nextItems = business.events?.slice(list.length, list.length + countPerPage);
    setList1([...list1, ...nextItems]);
    setLoading(false);
  };
  const loadMore1 =
  !initLoading && !loading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore1}>Load more</Button>
    </div>
  ) : null;

  const validateLocation = (_rule: any, value: string, callback: any) => {
    if (!value) {
      callback('Please select a location!');
      return;
    }
    // Extracting all option values from the Select component
    const optionValues = ['Alcantara', 'Alcoy', 'Alegria', 'Aloguinsan', 'Argao', 'Asturias', 'Badian', 'Balamban', 'Bantayan', 'Barili', 'Bogo City', 'Boljoon', 'Borbon', 'Carmen', 'Catmon', 'Compostela', 'Consolacion', 'Cordova', 'Daanbantayan', 'Danao City', 'Dalaguete', 'Dumanjug', 'Ginatilan', 'Lapu-Lapu City', 'Liloan', 'Madridejos', 'Mandaue City', 'Malabuyoc', 'Medellin', 'Minglanilla', 'Moalboal', 'Naga City', 'Oslob', 'Pilar', 'Pinamungajan', 'Poro', 'Ronda', 'Samboan', 'San Fernando', 'San Francisco', 'San Remigio', 'Santa Fe', 'Santander', 'Sibonga', 'Sogod', 'Tabogon', 'Tabuelan', 'Talisay City', 'Toledo City', 'Tuburan', 'Tudela'];
    // Checking if the selected value exists in the option values
    if (optionValues.includes(value)) {
      callback();
    } else {
      callback('Please select a valid location!');
    }
  };
  const deletePost = async(data:any) =>{
    setDeleting(true)
    await updateData('tbl_postList',data.id,{isDeleted:true})
    Fetch()
    setDeleting(false)
  }
  console.log(list)
  
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
                    <Select.Option value="Food & Restaurant">Food & Restaurant</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item<FieldType>
              label="Name"
              name="name"
              className='mb-2'
              rules={[{ required: true, message: 'Please provide name!' }]}
              >
              <Input />
              </Form.Item>
              <div>
              <Form.Item<FieldType>
              label="Address"
              name="address"
              className='mb-2'
              rules={[{ required: true, message: 'Please provide address!' }]}
              >
              <Input />
              </Form.Item>
              <Form.Item<FieldType>
              label="Location"
              name="location"
              className='mb-2'
              rules={[{ required: true, message: 'Please provide location!', validator: validateLocation }]}
              >
                <Select 
                >
                    <Select.Option value="">-select location-</Select.Option>
                    <Select.Option value="Alcantara">Alcantara</Select.Option>
                    <Select.Option value="Alcoy">Alcoy</Select.Option>
                    <Select.Option value="Alegria">Alegria</Select.Option>
                    <Select.Option value="Aloguinsan">Aloguinsan</Select.Option>
                    <Select.Option value="Argao">Argao</Select.Option>
                    <Select.Option value="Asturias">Asturias</Select.Option>
                    <Select.Option value="Badian">Badian</Select.Option>
                    <Select.Option value="Balamban">Balamban</Select.Option>
                    <Select.Option value="Bantayan">Bantayan</Select.Option>
                    <Select.Option value="Barili">Barili</Select.Option>
                    <Select.Option value="Bogo City">Bogo City</Select.Option>
                    <Select.Option value="Boljoon">Boljoon</Select.Option>
                    <Select.Option value="Borbon">BorbonBorbon</Select.Option>
                    <Select.Option value="Carmen">CarmenCarmen</Select.Option>
                    <Select.Option value="Catmon">Catmon</Select.Option>
                    <Select.Option value="Compostela">Compostela</Select.Option>
                    <Select.Option value="Consolacion">Consolacion</Select.Option>
                    <Select.Option value="Cordova">Cordova</Select.Option>
                    <Select.Option value="Daanbantayan">Daanbantayan</Select.Option>
                    <Select.Option value="Danao City">Danao City</Select.Option>
                    <Select.Option value="Dalaguete">Dalaguete</Select.Option>
                    <Select.Option value="Dumanjug">Dumanjug</Select.Option>
                    <Select.Option value="Ginatilan">Ginatilan</Select.Option>
                    <Select.Option value="Lapu-Lapu City">Lapu-Lapu City</Select.Option>
                    <Select.Option value="Liloan">Liloan</Select.Option>
                    <Select.Option value="Madridejos">Madridejos</Select.Option>
                    <Select.Option value="Mandaue City">Mandaue City</Select.Option>
                    <Select.Option value="Malabuyoc">Malabuyoc</Select.Option>
                    <Select.Option value="Medellin">Medellin</Select.Option>
                    <Select.Option value="Minglanilla">Minglanilla</Select.Option>
                    <Select.Option value="Moalboal">Moalboal</Select.Option>
                    <Select.Option value="Naga City">Naga City</Select.Option>
                    <Select.Option value="Oslob">Oslob</Select.Option>
                    <Select.Option value="Pilar">Pilar</Select.Option>
                    <Select.Option value="Pinamungajan">Pinamungajan</Select.Option>
                    <Select.Option value="Poro">Poro</Select.Option>
                    <Select.Option value="Ronda">Ronda</Select.Option>
                    <Select.Option value="Samboan">Samboan</Select.Option>
                    <Select.Option value="San Fernando">San Fernando</Select.Option>
                    <Select.Option value="San Francisco">San Francisco</Select.Option>
                    <Select.Option value="San Remigio">San Remigio</Select.Option>
                    <Select.Option value="Santa Fe">Santa Fe</Select.Option>
                    <Select.Option value="Santander">Santander</Select.Option>
                    <Select.Option value="Sibonga">Sibonga</Select.Option>
                    <Select.Option value="Sogod">Sogod</Select.Option>
                    <Select.Option value="Tabogon">Tabogon</Select.Option>
                    <Select.Option value="Tabuelan">Tabuelan</Select.Option>
                    <Select.Option value="Talisay City">Talisay City</Select.Option>
                    <Select.Option value="Toledo City">Toledo City</Select.Option>
                    <Select.Option value="Tuburan">Tuburan</Select.Option>
                    <Select.Option value="Tudela">Tudela</Select.Option>
                </Select>
              </Form.Item>
              </div>
              {typeSelected !== 'Tourist Spots' && <Form.Item<FieldType>
              label="Price"
              name="price"
              className='mb-2'
              rules={[{ required: true, message: 'Please provide price!' }]}
              >
              <Input />
              </Form.Item>}
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
              loading={isLoading}
              classes='w-32 rounded-xl'
            />
          </Form.Item>
      </Form>   
      {contextHolder}
      </div>
      <div className='flex flex-1 h-max flex-col gap-4 p-8 mt-4 mr-4 rounded-lg'>
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
        {post === 'Business' ? 
        <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item:any,idx:number) => {
          const allreview = item.reviews ? item.reviews : [];
          let totalRating = 0;
          let sumOfRating = 0;
          allreview.forEach((element:{reviewRate:number}) => {
            sumOfRating += element.reviewRate;
            totalRating++;
          });
          const reviewRate = sumOfRating /  totalRating;
          return(
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
            <div key={idx} className='min-w-[650px] bg-white p-4 rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
                    <div className='flex justify-between mb-2'>
                    <div className='flex justify-between w-full'>
                    <div>
                    <h3 className='font-bold text-lg'>{item.name}</h3>
                    <Rate value={reviewRate} allowHalf/>
                    </div>
                    <div>
                    <Popconfirm
                      title="Delete the post"
                      description="Are you sure to delete this post?"
                      onConfirm={() =>deletePost(item)}
                      okText="Yes"
                      cancelText="No"
                      placement="rightBottom"
                      okButtonProps={{ style: { background: '#ff4d4f', borderColor: '#ff4d4f' } }} 
                    >
                      <CustomButton
                        children='Delete'
                        danger
                        loading={deleting}
                      />
                    </Popconfirm>
                    </div>
                    </div>
                    <p className='text-lg font-semibold italic'></p>
                    </div>
                    <div className='flex gap-4'>
                      <div>
                      <Image.PreviewGroup
                        items={item?.photos}
                      >
                        <Image
                          width={200}
                          height={200}
                          className='rounded-lg border-2 border-[#00256E]'
                          src={item.photos?.length > 0 ? item.photos[0] : ''}
                        />
                      </Image.PreviewGroup>
                      </div>
                      <div>
                        <p className='line-clamp-4'>{item.description}</p>
                        {item.location && <p className='font-semibold'>Location: {item.location}</p>}
                        {item.address && <p className='font-semibold'>Address: {item.address}</p>}
                      </div>
                    </div>
            </div>
            </Skeleton>
          </List.Item>
        )}} /> : (
          <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore1}
          dataSource={list1}
          renderItem={(item:any,idx:number) => (
            <List.Item>
              <Skeleton avatar title={false} loading={item.loading} active>
              <div key={idx} className='min-w-[400px] bg-white p-4 rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
                <div className='flex flex-col gap-4'>
                  <div className='flex justify-between items-center'>
                  <h3 className='font-bold text-lg mb-2'>{item.Title}</h3>
                  <p>{item.Date}</p>
                  </div>
                  <div>
                    {item.Content}
                  </div>
                </div>
              </div>
              </Skeleton>
            </List.Item>
          )} />       
        )}
      </div>
    </div>
  )
}


