import React , { useState }from 'react';
import { useDispatch } from "react-redux";
import { notification} from 'antd';
import {  Input } from "antd";
import {  NEW_PRODUCT } from '../../../Redux/CrmSlicer';
import "./NewProduct.scss"
const NewProduct = () => {
   const [ file , setFile] = useState();
  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement , created) => {
    api.info({
      message: `You ${created} product `,
      placement,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if(file)formData.append("image", file);
    formData.append("title", e.target.title.value);
    formData.append("price", e.target.price.value);
    formData.append("category", e.target.category.value);
    formData.append("id", e.target.id.value);
    dispatch(NEW_PRODUCT(formData));
    openNotification('bottom' , "created")
  };
   return (
      <div className="container">
        {contextHolder}
        <form
          onSubmit={(e) => handleSubmit(e)}
          id="addForm"
          encType="multipart/form-data"
        >
          <Input type="text" name="title" placeholder="Title:" required/>
          <Input type="number" name="price" placeholder="Price:" required/>
          <Input type="text" name="category" placeholder="Category:" required/>
          <Input type="number" name="id" placeholder="ID:" required/>

          <Input
            type="file"
            name="image"
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">Добавить продукт</button>
        </form>
    </div>
   );
};

export default NewProduct;