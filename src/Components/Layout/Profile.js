import React from "react";

import { notification} from 'antd';

import { useSelector } from "react-redux";
import "./Profile.scss";
import ModalProfile from "./ModalProfile";

const ProfilePage = () => {
  const { UserData } = useSelector((state) => state.login);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement , changed) => {
    api.info({
      message: `You ${changed} setting `,
      placement,
    });
  };
  return (
    <div className="container">
      <div className="profile_Wrapper">
      {contextHolder}
        <h2>USER : {UserData?.user?.name}</h2>
        <img
          className="img"
          src={UserData?.user?.image||"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EAC0QAQACAQIEBQIGAwAAAAAAAAABAgMEEQUhMUESIlFhcSNSEzJigZHRJDNy/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APogAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbm4AAAAAAAAAAAAAAAAAAAAAbu7R8MyZ9r5PJSf5kHHjpbJeKY6za09oSODg2S3PPeK+1ecpTT6bFp67YqRX37twI6OEaeI5zkn93nJwfHMfTyWrPvzSYCuanQZ9PE2tXxV+6HLvG2/b1WyY3jaY3hH6rheLJvbD9O/XbtIIRhszYb4Mngyx4bdfaWsAAAAAAAAAAAAAAAD4B38J0kZ8k5ckb0r0ie8p3o06LFGLS46xG3LeflvAAAAAYlkBz6vTY9VimmSOfa3ordqzS80t1rO0rYgeM4opqotEbRevP5BwAAAAAAAAAAAAAAPWON8lY9ZiHl7wztmx7/AHxILTEbREMgAAAAAAAiuPR5MVveYSqL49/oxx+oEMMsAAAAAAAAAAAAAG/mifQdXD9LGqzTW/5KxvOwLDjnxY6z6xD0xWIrWIjpEbMgAAAAAAIfj1vPir7TKYcPEtJXUY5vvtkpEzUEAEAAAAAAAAAAAAACX4FEeHNPfeIRCQ4Nm/D1NsczyyRy+YBOgAAAAAAAMSy0azN+Bpsl9+cRy+QVm8bXtEdN5AAAAAAAAAAAAAAe8OScWWmSOtZ3eAFm02qxaiu+O8TO3OO8N6v8It4ddXn+aswsAAAAAAAMTaKxMzO0R3lDcW1tM1IxYp8Vd97THdIcSt4dFmn9OyuQBHQAAAAAAAAAAAAAAAGzT5Pwc1Mn22iZWetotWLV5xMbqosHCbTfQ03npvAO0AAAAGARnHM0Riri35zO8/CGdXErTbXZfFO+07Q5QAAAAAAAAAAAAAAAdmm4dnzzE2j8Onrbv+wONO8Fn/Cjl0tLOPhWlrHmi159Zt/TsxYqYaeDHXavpuD2AAAAxLICs66ZnWZv+mhY8ug02W1rXx+aesxaXFqeERtvprTE/bb+wRI2ZcOTDbbJS0fMNYAAAAAAAAAzWLWnakTM+kJHS8JyW2tnmaV6+GvWf6BHREzO1YmZ9Id2m4Xmy7Tk3x19+qYwabDgj6dIj37twObT6PBgjyUibfdPV0MgAAAAAAAAAAPN6VvG16xaPSYRuq4TS/m09vBP2z0lKAKvn02bBO2SkxHr1hqWyYi0bTETDg1PDMGbeafTt7dP4BBDfqNHm00/UrvHa1ejQAAB327unRaLJqp3r5ab87PfDdHGqvM35UrPOI7+yfpWKVitYiIjlEA06XSYtNXbHXn3tPWXQAAAAAAAAAAAAAAAAAAAMWiLRMTG8T2lFazhUTvfTcp+ztKWAVO1LUtNbx4ZjrEwwsOv0VdVTePLkjpPr8q/MTWZrbrE7A//2Q=="}
          alt="Загрузите фото профиля"
        />
        <h3>EMAIL : {UserData?.user?.email}</h3>
        <ModalProfile openNotification={openNotification}/>
      </div>
    </div>
  );
};

export default ProfilePage;
