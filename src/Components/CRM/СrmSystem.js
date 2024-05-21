import React, { useEffect } from "react";
import { Table } from "antd";
import { ProductTable } from "./TablesCrud";
import { useDispatch, useSelector } from "react-redux";
import { GET_FAKESHOP, GET_DETAILS_SHOP ,PAGINATION_CRM} from "../../Redux/CrmSlicer";
import { useNavigate } from "react-router-dom";
import { GET_USER } from "../../Redux/LoginSlicer";
import NewProduct from "./NewProduct/NewProduct";
import PaginationCRM from "./PaginationCRM";
import Loading from '../../loading/Loading.js';

const СrmSystem = () => {
  const { fakeData ,fakeShop,isLoading} = useSelector((state) => state.crm);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(GET_USER())
  }, [dispatch]);

  const handleClick = (record) => {
    dispatch(GET_DETAILS_SHOP(record.id));
    navigate(`/details/${record.id}`);
    console.log(fakeData);
  };
  console.log(fakeShop);
  return (
    <div>
     
      <NewProduct/>
      {/* {isLoading && <Loading />} */}
      <Table
        dataSource={fakeShop}
        columns={ProductTable}
        rowKey="_id"
        loading={isLoading}
        pagination={false} 
        scroll={{ y: 420 }}
        onRow={(record) => ({
          onDoubleClick: () => handleClick(record),
        })}
      />
      <PaginationCRM/>  
    </div>
  );
};

export default СrmSystem;
