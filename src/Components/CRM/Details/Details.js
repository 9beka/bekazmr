import React , {useEffect} from "react";
import { useParams, useNavigate } from "react-router";
import { Card } from "antd";
import s from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GET_DETAILS_SHOP } from "../../../Redux/CrmSlicer";
const Details = () => {
   const dispatch = useDispatch()
   const { id } = useParams();
   const {fakeDetail} = useSelector(state => state.crm) || { title: "", image: "", price: 0, category: "" };
   console.log(fakeDetail);
  const navigate = useNavigate();

  useEffect(()=>{
   dispatch(GET_DETAILS_SHOP(id))
},[dispatch,id])

if(!fakeDetail){
 return console.log("fakeDetail undefined");
}
  const maxID = 19
  const handleRowClick = (id) => {
   dispatch(GET_DETAILS_SHOP(+id + 1))
    navigate(`/details/${+id + 1}`);
  };
  const handlePrev = (id) => {
   dispatch(GET_DETAILS_SHOP(+id - 1))
    navigate(`/details/${+id - 1}`);
  };

  return (
      <div className={s.deatails__wrapper}>
         {fakeDetail && fakeDetail.length > 0 && (
        <Card
          title={fakeDetail[0].title}
          bordered={true}
          cover={
            <img
              className={s.detail__img}
              alt={fakeDetail[0].category}
              src={fakeDetail[0].image}
            />
          }
        >
          <h3>Price: {`${fakeDetail[0].price}$`}</h3>
          <h3>Category: {fakeDetail[0].category}</h3>
          <div className={s.deatails__btn__wrapper}>
            <button
              onClick={() => {
                navigate("/crud");
              }}
            >
              BACK
            </button>
            <button
              onClick={() => handlePrev(id)}
              disabled={+id <= 1 || !fakeDetail}
            >
              PREV
            </button>
            <button disabled={+id>maxID}onClick={() => handleRowClick(id)}>NEXT</button>
          </div>
        </Card>
         )}
      </div>
  );
};

export default Details
