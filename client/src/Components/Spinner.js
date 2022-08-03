import React from 'react'
import { Spin } from 'antd'
import "../index.css"
const Spinner = () => {
  return (
    <div className='spinner'>
        <Spin size='large'/>
    </div>
  )
}

export default Spinner