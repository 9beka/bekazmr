import React ,{useEffect,useState}from 'react';
import { Pagination } from "@mui/material";
import { Stack } from "@mui/material";
import { useDispatch ,useSelector} from "react-redux";
import { PAGINATION_CRM, setCurrentPage } from '../../Redux/CrmSlicer';
const PaginationCRM = () => {
   const { pages ,currentPage} = useSelector((state) => state.crm);
   console.log(currentPage);
   const dispatch = useDispatch();
   useEffect(()=>{
    dispatch(PAGINATION_CRM(currentPage))
   },[dispatch,currentPage])
   return (
        <Stack spacing={2}>
        <Pagination
          page={currentPage}
          count={pages}
          color="primary"
          onChange={(e, value) => dispatch(setCurrentPage(value))}
        />
    </Stack>
   );
};

export default PaginationCRM;