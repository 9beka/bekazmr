import React, { useState } from "react";
import { Button, Modal} from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditForm from "./EditForm";
const EditModal = ({ _id , openNotification }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    console.log(_id);
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <EditOutlined />
        EDIT
      </Button>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <EditForm _id={_id} openNotification={openNotification}/>
      </Modal>
    </>
  );
};

export default EditModal;
