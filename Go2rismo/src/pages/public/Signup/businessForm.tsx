/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Form, Input,DatePicker,Select, Checkbox,Upload, notification, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CustomButton } from '../../../components/Button/CustomButton';
import { uploadImageToStorage } from '../../../config/uploadFile';
import Logo from '../../../assets/app logo.png'
import { addData } from '../../../hooks/useAddData';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    businessName?:string;
    location?:string;
    businessType?:string;
    phoneNumber?: string;
    validId?: string;
    businessPermit?:string;
    email?: string;
    password?: string;
  };

export const BusinessFrm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [api, contextHolder] = notification.useNotification();
    const [loading,setLoading] = useState(false)
    const onFinish = async(values: any) => {
        try {
            setLoading(true)
            const validIdFiles = values.validId;
            const businessPermitFile = values.businessPermit;
            const uploadingValidFile = validIdFiles.map(async (file:any) => {
                const filePath = `documents/${file.name}`;
                const upload = await uploadImageToStorage(file.originFileObj,filePath)
                return upload
            })
            const uploadingBusinessPermit = businessPermitFile.map(async (file:any) => {
                const filePath = `documents/${file.name}`;
                const upload = await uploadImageToStorage(file.originFileObj,filePath)
                return upload
            })
            const [validIdUrls,businessPermitUrls] = await Promise.all([Promise.all(uploadingValidFile),Promise.all(uploadingBusinessPermit)])
            const dataToSend = {
                address:values.address,
                birthDate: values.birthDate.toISOString(),
                businessName:values.businessName,
                location:values.location,
                businessType:values.businessType,
                email:values.email,
                firstName:values.firstName,
                lastName:values.lastName,
                password:values.password,
                phoneNumber: values.phoneNumber,
                validId: validIdUrls[0],
                businessPermit:businessPermitUrls[0],

            }
            await addData('tbl_business',dataToSend);
            api.success({
                message: 'Form Submission',
                description: 'Form submitted successfully!',
            });
            setLoading(false)
            form.resetFields();
            setTimeout(() =>{
                navigate('/Login')
            },2000)
        } catch (error) {
            console.log(error)
            api.error({
                message:'Form Submission',
                description: 'Failed to submit form. Please try again later.',
            })
            setLoading(false)
        }
    };
    const normFile = (e: any) => {
    if (Array.isArray(e)) {
        console.log(e)
        return e;
    }
    console.log(e?.fileList)
    return e?.fileList;
    };
      return (
        <div className='w-full flex justify-center items-center relative'>  
        <img className='w-40 h-max absolute left-12 -top-24' src={Logo} alt="logo" />
        <Form
        form={form}
        name="basic"
        layout='vertical'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        style={{ width:'60%',marginLeft:'70px' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        >
            <h3 className='text-[#00256E] font-bold text-3xl mb-4'>Sign up as Business</h3>
            <div className='flex gap-4 w-full flex-wrap'>
                <div className='flex-1'>
                <Form.Item<FieldType>
                label="First Name"
                name="firstName"
                className='mb-0'
                rules={[{ required: true, message: 'Please input your firstname!' }]}
                >
                <Input />
                </Form.Item>
                <Form.Item<FieldType>
                label="Last Name"
                name="lastName"
                className='mb-0'
                rules={[{ required: true, message: 'Please input your lastname!' }]}
                >
                <Input />
                </Form.Item>
                <Form.Item<FieldType>
                label="Birthdate:"
                name="birthDate"
                className='mb-0'
                rules={[{ required: true, message: 'Please input your birthday!' }]}
                >
                <DatePicker className='w-full' />
                </Form.Item>
                <Form.Item<FieldType>
                label="Address"
                name="address"
                className='mb-0'
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input />
                </Form.Item>
                <Form.Item<FieldType>
                label="Business Name"
                name="businessName"
                className='mb-0'
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input />
                </Form.Item>
                <Form.Item<FieldType>
                label="Location"
                name="location"
                className='mb-0'
                rules={[{ required: true, message: 'Please input your Business Location!' }]}
                >
                <Input />
                </Form.Item>
                <Form.Item<FieldType>
                label="Type of Business"
                name="businessType"
                className='mb-0'
                rules={[{ required: true, message: 'Please input Type of your Business!' }]}
                >
                <Input />
                </Form.Item>
                </div>
                <div className='flex-1'>
                <Form.Item label="Business Permit" name='businessPermit' valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188" listType="picture" maxCount={1}>
                <Button className='w-full bg-white' icon={<UploadOutlined />}>Upload here</Button>
                </Upload>
                </Form.Item>
                <Form.Item label="Valid ID" name='validId' valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188" listType="picture" maxCount={1}>
                <Button className='w-full bg-white' icon={<UploadOutlined />}>Upload here</Button>
                </Upload>
                </Form.Item>
                <Form.Item<FieldType>
                name="phoneNumber"
                label="Phone Number"
                className='mb-0'
                >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                name="email"
                label="E-mail"
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
                className='mb-0'
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
                className='mb-0'
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
            loading={loading}
            children={'Submit'}
            htmlType='submit'
            type='primary'
            classes='w-32 rounded-xl'
              />
            </Form.Item>
        </Form>
        {contextHolder}
      </div>
      )
}
