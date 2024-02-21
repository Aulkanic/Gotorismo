/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Form, Input,DatePicker,Select, Checkbox } from 'antd';
import { CustomUpload } from '../../../components/Upload/CustomUpload';
import { CustomButton } from '../../../components/Button/CustomButton';
import Logo from '../../../assets/app logo.png'

const { Option } = Select;

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70,backgroundColor:'white' }} defaultValue={'63'}>
        <Option value="63">+63</Option>
      </Select>
    </Form.Item>
  );

type FieldType = {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    address?: string;
    phoneNumber?: string;
    validId?: string;
    email?: string;
    password?: string;
  };

export const TravelFrm = () => {
    const onFinish = (values: any) => {
    console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    };
  return (
    <div className='w-full flex justify-center items-center relative'>  
    <img className='w-40 h-max absolute left-12 -top-24' src={Logo} alt="logo" />
    <Form
        name="basic"
        layout='vertical'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width:'60%',marginLeft:'70px' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <h3 className='text-[#00256E] font-bold text-3xl mb-4'>Sign up as Traveller</h3>
        <div className='flex gap-4 w-full flex-wrap'>
            <div className='flex-1'>
            <Form.Item<FieldType>
            label="First Name"
            name="firstName"
            className='mb-2'
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
            <Input />
            </Form.Item>
            <Form.Item<FieldType>
            label="Last Name"
            name="lastName"
            className='mb-2'
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
            <Input />
            </Form.Item>
            <Form.Item<FieldType>
            label="Birthdate:"
            name="birthDate"
            className='mb-2'
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
            <DatePicker className='w-full' />
            </Form.Item>
            <Form.Item<FieldType>
            label="Address"
            name="address"
            className='mb-2'
            rules={[{ required: true, message: 'Please input your password!' }]}
            >
            <Input />
            </Form.Item>
            </div>
            <div className='flex-1'>
            <Form.Item<FieldType>
                name="phoneNumber"
                label="Phone Number"
                 className='mb-2'
                >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item<FieldType>
                name="validId"
                label="Valid Id:"
                className='mb-2'
                >
            <CustomUpload
            />
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                className='mb-2'
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                {
                    validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                },
                ]}
            >
                <Checkbox className='text-nowrap ml-12'>
                I agree to the Terms and Conditions
                </Checkbox>
            </Form.Item>
            </div>
        </div>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='flex justify-end items-end mr-44'>
        <CustomButton
            children={'Submit'}
            type='primary'
            classes='w-32 rounded-xl'
          />
        </Form.Item>
    </Form>
  </div>
  )
}
