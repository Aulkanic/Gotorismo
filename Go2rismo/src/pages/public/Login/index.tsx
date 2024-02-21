/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Logo from '../../../assets/app logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd';

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};


export const Login = () => {
  const navigate = useNavigate()
  const onFinish = (values: any) => {
    navigate('/UserDashBoard/HomePage')
    console.log('Success:', values);
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
            className='mb-0 w-full'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            className='mb-4 w-full'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 20, span: 24 }} className='w-full'>
            <Button type="primary" className='bg-blue-600 hover:bg-blue-900 rounded-xl' htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

