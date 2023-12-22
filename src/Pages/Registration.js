import React , {useEffect} from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import "./Login.scss";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import WrapperHoc from "../hoc/WrapperHoc";
import { REGISTR_USER, cleaerValidationErrors } from "../Redux/LoginSlicer";
import { useDispatch, useSelector } from "react-redux";
import { validationSchema } from "../constants";
const Registration = () => {
  const dispatch = useDispatch();
  const { validationErrors, existsUSer } = useSelector((state) => state.login);
  console.log(existsUSer);
  useEffect(()=>{
    if(validationErrors){
      console.log(validationErrors);
    }
   

  },[validationErrors])
  useEffect(() => {
    return () => {
      dispatch(cleaerValidationErrors());
    };
  }, []);
  const handleSubmit = (values, { setErrors }) => {
    dispatch(REGISTR_USER(values));
    console.log(validationErrors);
    if (Array.isArray(validationErrors)) {
      let errors = {};

      validationErrors.forEach((el) => {
        if (el.path === "name") {
          errors.name = el.msg;
        } else if (el.path === "email") {
          errors.email = el.msg;
        } else if (el.path === "password") {
          errors.password = el.msg;
        }
      });
      
    setErrors(errors);
  }
  };

  return (
    <WrapperHoc>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form name="register" onFinish={handleSubmit} scrollToFirstError>
            <Form.Item
              name="name"
              validateStatus={touched.name && errors.name ? "error" : ""}
              help={touched.name && errors.name ? errors.name : ""}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </Form.Item>

            <Form.Item
              name="email"
              validateStatus={touched.email && errors.email ? "error" : ""}
              help={touched.email && errors.email ? errors.email : "" ||existsUSer}
            >
              <Input
                prefix={<MailOutlined />}
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </Form.Item>

            <Form.Item
              name="password"
              validateStatus={
                touched.password && errors.password ? "error" : ""
              }
              help={touched.password && errors.password ? errors.password : ""}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Form.Item>
              <h2>P@ssw0rd</h2>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
              OR{" "}
              <Button>
                <Link to="/login">LOGIN</Link>
              </Button>
              HERE
            </Form.Item>
          </Form>
        )}
      </Formik>
    </WrapperHoc>
  );
};
export default Registration;
