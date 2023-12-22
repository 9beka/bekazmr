import React  from "react";
import { Button, Flex,Modal } from "antd";
import { useDispatch } from "react-redux";
import { DeleteOutlined} from "@ant-design/icons";
import { DELETE_PRODUCT } from "../../Redux/CrmSlicer";
import EditModal from "./Modalka/EditModal";
import { notification} from 'antd';
import "./TablesCrud.scss"
const ButtonCrud = ({ _id }) => {

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement , remove) => {
    api.info({
      message: `You ${remove} product `,
      placement,
    });
  };
  const dispatch = useDispatch();
  const handleDelete = (_id) => {
    console.log(_id );
    dispatch(DELETE_PRODUCT(_id));
    openNotification('bottom' , "delete")
  };
  
  return (
    <>
    {contextHolder}
      <Flex wrap="wrap" gap="small" className="site-button-ghost-wrapper">
      <EditModal _id={_id} openNotification={openNotification} />
        {/* <Button onClick={() => handleEdit(_id)} type="primary" ghost>
          <EditOutlined />
          EDIT
        </Button> */}

        <Button onClick={() => handleDelete(_id)} type="primary" danger ghost>
          <DeleteOutlined />
          DELETE
        </Button>
      </Flex>
   
        
     
      
    </>
  );
};
export const ProductTable = [
  {
    title: "DEMO",
    dataIndex: "image",
    //   sorter: (a, b) => a.id - b.id,
    render: (imageUrl) => (
      <img src={imageUrl} alt="Product" style={{ width: 60, height: 50 }} />
    ),
  },

  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
    sortDirection: ["descend", "ascend"],
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (text) => `${text}$`,
    sorter: (a, b) => a.price - b.price,
    sortDirection: ["descend", "ascend"],
  },
  {
    title: "Category",
    dataIndex: "category",

    width: 300,
    sorter: (a, b) => a.category.localeCompare(b.category),
    sortDirection: ["descend", "ascend"],
  },
  {
    title: "CRUD",
    dataIndex: "_id",
    render: (_id ) => <ButtonCrud _id={_id}  />,
  },
  {
    title: "ID",
    dataIndex: "id",
    sorter: (a, b) => a.id - b.id,
    sortDirection: ["descend", "ascend"],
  },
];
export const UserTable = [
  {
    title: "Users",
    dataIndex: "image",
    //   sorter: (a, b) => a.id - b.id,
    render: (imageUrl) => (
      <img
        src={imageUrl}
        alt="Product"
        style={{ width: 60, height: 50, borderRadius: 50 }}
      />
    ),
  },

  {
    title: "Username",
    dataIndex: "username",
    sorter: (a, b) => a.title.localeCompare(b.title),
    sortDirection: ["descend", "ascend"],
  },
  {
    title: "Phone",
    dataIndex: "phone",
    render: (text) => `+${text}`,
    sorter: (a, b) => a.price - b.price,
    sortDirection: ["descend", "ascend"],
  },

  {
    title: "ID",
    dataIndex: "id",
    sorter: (a, b) => a.id - b.id,
    sortDirection: ["descend", "ascend"],
  },
];
