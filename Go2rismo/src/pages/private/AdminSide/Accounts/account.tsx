/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { fetchData } from '../../../../hooks/useFetchData'
import { T_Accounts } from '../../../../types';
import CustomTable from '../../../../components/Table';
import { CustomButton } from '../../../../components/Button/CustomButton';

export const Accounts = () => {
  const [loading,setLoading] = useState(false)
  const [allAccount,setAllAccount] = useState<T_Accounts>({
    traveller:[],
    business:[]
  })

  async function Fetch(){
    setLoading(true)
    const travellers = await fetchData('tbl_traveller');
    const businesses = await fetchData('tbl_business');
    setAllAccount((prev) =>({
      ...prev,
      traveller:travellers?.map((item,idx) =>({...item,key:item.id,NoID:idx+1})),
      business:businesses?.map((item) =>({...item,key:item.id}))
    }))
    setLoading(false)
  }

  useEffect(() =>{
    Fetch()
  },[])

  const columns = [
    {
      key: 0,
      dataIndex: 'NoID',
      title: 'No.',
    },
    {
      key: 1,
      dataIndex: 'firstName',
      title: 'First Name',
    },
    {
      key: 2,
      dataIndex: 'lastName',
      title: 'Last Name',
    },
    {
      key: 3,
      dataIndex: 'phoneNumber',
      title: 'Phone Number',
    },
    {
      key: 4,
      dataIndex: 'email',
      title: 'Email',
    },
    {
      key: 5,
      dataIndex: 'address',
      title: 'Address',
    },
    {
      key: 6,
      title: 'Action',
      render: () => (
        <div className='flex gap-4'>
          <CustomButton
            children='Enable'
            htmlType='button'
            classes='bg-blue-500 text-white'
          />
          <CustomButton
            children='Disable'
            danger
          />
        </div>
      ),
    },
  ];
  
  
  return (
    <div className='p-8'>
      <div className='text-center'>
      <h1 className='font-bold text-2xl mb-4'>List of Travellers</h1>
      <CustomTable
        columns={columns}
        loading={loading}
        datasource={allAccount.traveller}
      />
      </div>

    </div>
  )
}
