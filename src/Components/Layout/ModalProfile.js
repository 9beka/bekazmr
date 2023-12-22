import React, { useState } from "react";
import { Button, Modal,Form, Input,Upload} from "antd";
import { useDispatch ,useSelector} from "react-redux";
import { EditOutlined ,UploadOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { validationSchema } from "../../constants";
import { CHANGE_USER } from "../../Redux/ProfileChangeSlicer";
const ModalProfile = ({openNotification}) => {
   const { validationErrors, existsUSer ,UserData} = useSelector((state) => state.login);
const id = UserData.user._id;
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const dispatch = useDispatch(); 
 
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
   setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
      formData.append("name", e.target.name.value);
      formData.append("email", e.target.email.value);
      formData.append("password", e.target.password.value);
    formData.append('image', file); 
    console.log(formData);
   dispatch(CHANGE_USER({formData ,id }));
   openNotification('bottom' , "changed")

 };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        <EditOutlined />
        UPDATE PROFILE
      </Button>
      <Modal
        title="Change Profile"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
           <div className="container">
      <form
        onSubmit={(e) => handleSubmit(e)}
        id="uploadForm"
        encType="multipart/form-data"
      >
        <Input type="text" name="name" placeholder="name"  />
        <Input type="email" name="email" placeholder="email"  />
        <Input type="password" name="password" placeholder="password"  />
        <Input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Изменить пользователя</button>
      </form>
    </div>
      </Modal>
    </>
  );
};

export default ModalProfile;
