import { Col, Form, Input, Row } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../Components/DefaultLayout'
import { addCar } from '../Redux/actions/carActios'
import Spinner from '../Components/Spinner'
const AddCar = () => {
    const {loading}=useSelector(state=>state.alertsReducer)
const dispatch = useDispatch()
    const onFinish=(values)=>{
     console.log("form values",values)
     values.bookedTimeSlots=[]
     dispatch(addCar(values))
    }
  return (
    <DefaultLayout>
        {loading === true && <Spinner />}
        <Row justify='center mt-5' >
            <Col lg={12} sm={24}>
                <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                    <h3><b>Add New Car</b></h3>
                    <Form.Item name='name' label='Car Name'  rules={[{required : true}]} >
                        <Input />
                    </Form.Item>
                    <Form.Item name='image' label="Car Image" rules={[{required : true}]}>
                        <Input  />
                    </Form.Item>
                    <Form.Item name='rentPerHour' label="Rent Per Hours" rules={[{required : true}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='capacity' label="Capacity" rules={[{required : true}]}> 
                        <Input />
                    </Form.Item>
                    <Form.Item name='fuelType' label="Fuel Type" rules={[{required : true}]}> 
                        <Input />
                    </Form.Item>
                    <div className='text-right'>
                    <button className='btn1 mb-3'>ADD CAR</button>
                    </div>
                    
                </Form>
            </Col>
        </Row>
    </DefaultLayout>
  )
}

export default AddCar
