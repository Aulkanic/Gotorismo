/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import Logo from '../../../assets/app logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input,Select, notification } from 'antd';
import { fetchData } from '../../../hooks/useFetchData';
import { CustomButton } from '../../../components/Button/CustomButton';
import { saveAdminInfo, saveBusinessInfo, saveTravellerInfo, setUserType } from '../../../zustand/store/store.provide';

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
  type?:string;
};


export const Login = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const onFinish = async(values: any) => {
      setLoading(true)
      try {
          const data = await fetchData(values.type)
          data?.shift()
          const isExist = data?.find((item:any) => item.email === values.email && item.password === values.password);
          if (isExist) {
            setLoading(false)
            notification.success({
              message: 'Login Successfully',
            });
            switch (values.type){
              case 'tbl_traveller':
                setUserType('traveller')
                saveTravellerInfo(isExist)
                setTimeout(() =>{
                  navigate('/UserDashBoard/HomePage');
                },2000)
                break;
              case 'tbl_business':
                setUserType('business')
                saveBusinessInfo(isExist)
                setTimeout(() =>{
                  navigate('/BusinessDashBoard');
                },2000)
                break;
              case 'tbl_admin':
                setUserType('admin')
                saveAdminInfo(isExist)    
                setTimeout(() =>{
                  navigate('/AdminDashboard/Home');
                },2000)
                break;
              default:
                break            
            }
          } else {
            setLoading(false)
            notification.error({
              message: 'Login Failed',
              description: 'Invalid username or password. Please try again.',
            });
          }
      } catch (error) {
        notification.error({
            message:'Form Submission',
            description: 'Failed to submit form. Please try again later.',
        })
        setLoading(false)
      }
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    
  };
  return (
    <div className='h-screen w-full bg-gradient-to-b from-white via-green-400 to-cyan-500 flex justify-center relative items-center pt-24'>
      <div className='absolute top-0 right-0 flex flex-nowrap p-4 text-lg tracking-widest'> 
        <p className='text-[#00256E78] font-bold'>Don't have an account? </p>
        <Link className='text-[#00256E] font-bold' to={'/Signup'}> Sign up</Link>
      </div>
      <div className='w-1/2 flex  flex-col justify-center items-center'>
        <img className='w-64' src={Logo} alt="logo" />
        <h3 className='text-[#00256E] font-bold text-[45px] m-0 text-nowrap'>A travel buddy for everybody</h3>
        <Form
          name="basic"
          layout='vertical'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          style={{ width:'60%' }}
          className='flex justify-center items-center flex-col'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            className='mb-2 w-full'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            className='mb-2 w-full'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType> 
          label="Select Type"
          name='type'
          className='w-full'
          rules={[{ required: true, message: 'Please select your usertype first!' }]}
          >
          <Select>
            <Select.Option value="">-select type-</Select.Option>
            <Select.Option value="tbl_admin">Admin</Select.Option>
            <Select.Option value="tbl_traveller">Traveller</Select.Option>
            <Select.Option value="tbl_business">Business</Select.Option>
          </Select>
        </Form.Item>
          <Form.Item wrapperCol={{ offset: 20, span: 24 }} className='w-full'>
          <CustomButton
            children={'Login'}
            type='primary'
            htmlType='submit'
            loading={loading}
            classes='rounded-xl'
          />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

