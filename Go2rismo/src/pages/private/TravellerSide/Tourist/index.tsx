import React from 'react'
import { useParams } from 'react-router-dom';
import useStore from '../../../../zustand/store/store';
import { selector } from '../../../../zustand/store/store.provide';

export default function TouristSelected() {
    const { type,name } = useParams();
    const allPost = useStore(selector('traveller'))
    const details = allPost.post?.filter((item: { type: string | undefined; name: string | undefined; }) => item.type === type && item.name === name)
    console.log(details)
  return (
    <div>{name}{type}</div>
  )
}
