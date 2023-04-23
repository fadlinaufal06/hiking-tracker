import React from 'react'
import { ConditionContext } from "./ConditionContext";
import { useContext } from 'react';

function UserPopup({name}) {
const [latestPredict] = useContext(ConditionContext)

  return (
    <div>
        <h2>Hello! {latestPredict.heartrate}</h2>
        <p>This is my custom component.</p> 
        <button className='bg-green-500' onClick={()=>console.log('testest')}>aaa</button>
  </div>
  )
}

export default UserPopup