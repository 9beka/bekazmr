import React, {useEffect} from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {useSelector } from "react-redux"
import Wrapper from "./Components/Layout/Wrapper";
import Profile from "./Components/Layout/Profile";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import CrmSystem from "./Components/CRM/СrmSystem"
import Details from "./Components/CRM/Details/Details"
const Views = () => {
   const {token} = useSelector(state=>state.login)
const {UserData} = useSelector(state=>state.login)  
console.log(UserData);

   return (
      <Routes>
        <Route path="/" element={token?<Wrapper/>:<Navigate to="/login" replace />} >
          <Route index element={token&&UserData?.user?.verified?<Profile />:<Navigate to="crud" replace />} />
          <Route path="crud"  element={<CrmSystem />} />
          <Route path="/details/:id" element={<Details/>} />
        </Route>
        <Route path="/login" element={token?<Navigate to="/" replace />:<Login/>}/>
        <Route path="/register" element={token?<Navigate to="/" replace />:<Registration/>}/>
      </Routes>
  );
};

export default Views;
