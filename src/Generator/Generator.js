import React from "react";
import WrapperHoc from "../hoc/WrapperHoc";
import { Button, Select,InputNumber, Form, Input } from "antd";
import {EditOutlined,GithubFilled,GoldFilled} from '@ant-design/icons';
import { useDispatch ,useSelector} from 'react-redux';
import "./Generator.scss"
import { GENERATE_IMG_ASYNC } from "../Redux/SlicerGenerator";
const Generator = () => {
  const dispatch =useDispatch()
  const {IMGdata} = useSelector(state=>state.image)
  const onFinish = (values) => {
    console.log("Received values of form:", values);
    dispatch(GENERATE_IMG_ASYNC(values))
  }; 
  return (
      <div className="container">
         <div className="Generator_WRAPPER">
            <Form
              name="generator"
              className="generator-form"
              onFinish={onFinish}
              scrollToFirstError 
            >
            <Form.Item name="Field" rules={[
                     {
                       required: true,
                       message: "Please input your text!",
                     },
                   ]}>
                <Input prefix={<EditOutlined />} placeholder="Text:"/>
            </Form.Item>
            {/* <Form.Item 
            name="Size" rules={[
              {
                required: true,
                message: "Please input your size!",
              },
            ]}>
              
              <Select placeholder="Size:">
                <Select.Option value="256x256">Small</Select.Option>
                <Select.Option value="512x512">Medium</Select.Option>
                <Select.Option value="1024x1024">Large</Select.Option>
              </Select>
            </Form.Item > */}
            <Form.Item name="Quantity"  className="form-item-custom" rules={[
              {
                required: true,
                message: "Please input quantity!",
              },
            ]} >
            <Input prefix={<GithubFilled />} type="number" placeholder="Quantity:" />
            </Form.Item>
            <Form.Item 
            >
            <div className="centered-button">
          <Button htmlType="submit" type="primary" danger>Generate</Button>
        </div>
            </Form.Item>
            </Form>
            {Array.isArray(IMGdata) && IMGdata.map(el => <img src={el} alt="" />)}
         </div>
      </div>
  );
};

export default Generator;
