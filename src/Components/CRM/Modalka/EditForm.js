import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {  Input } from "antd";
import { POST_PHOTO } from "../../../Redux/CrmSlicer";
import "./EditForm.scss";
const EditForm = ({ _id ,openNotification }) => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", e.target.title.value);
    formData.append("price", e.target.price.value);
    formData.append("category", e.target.category.value);
    dispatch(POST_PHOTO({ formData, _id }));
    openNotification('bottom' , "edited")
  };

  return (
    <div className="container">
      <form
        onSubmit={(e) => handleSubmit(e)}
        id="uploadForm"
        encType="multipart/form-data"
      >
        <Input type="text" name="title" placeholder="Title" />
        <Input type="number" name="price" placeholder="Price" />
        <Input type="text" name="category" placeholder="Category" />
        <Input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Изменить продукт</button>
      </form>
    </div>
  );
};

export default EditForm;
