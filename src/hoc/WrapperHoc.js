import React from 'react';
import "./WrapperHoc.scss"
const WrapperHoc = ({children}) => {
   return (
      <div className='container'>
         <div className='container_wrapper'>
            <div className="center-container">
               {children}
            </div>
         </div>
      </div>
   );
};

export default WrapperHoc;