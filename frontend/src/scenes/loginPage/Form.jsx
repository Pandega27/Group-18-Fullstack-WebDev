import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import Dropzone from "react-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit} className="container mt-5">
          <div className="row g-3">
            {isRegister && (
              <>
                <div className="col-md-6">
                  <label className="form-label" style={{color:"white"}}>First Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      touched.firstName && errors.firstName
                        ? "is-invalid"
                        : ""
                    }`}
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                  />
                  <div className="invalid-feedback">
                    {touched.firstName && errors.firstName}
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={{color:"white"}}>Last Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      touched.lastName && errors.lastName ? "is-invalid" : ""
                    }`}
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                  />
                  <div className="invalid-feedback">
                    {touched.lastName && errors.lastName}
                  </div>
                </div>
                <div className="col-md-12" style={{color:"white"}}>
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className={`form-control ${
                      touched.location && errors.location ? "is-invalid" : ""
                    }`}
                    name="location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                  />
                  <div className="invalid-feedback">
                    {touched.location && errors.location}
                  </div>
                </div>
                <div className="col-md-12" style={{color:"white"}}>
                  <label className="form-label">Occupation</label>
                  <input
                    type="text"
                    className={`form-control ${
                      touched.occupation && errors.occupation
                        ? "is-invalid"
                        : ""
                    }`}
                    name="occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                  />
                  <div className="invalid-feedback">
                    {touched.occupation && errors.occupation}
                  </div>
                </div>
                <div className="col-md-12">
                  <label className="form-label">Picture</label>
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className="border rounded p-3 text-center"
                        style={{ cursor: "pointer", color:"#39FF14" }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p style={{padding:"10px 0 0 0"}}>Add Picture Here</p>
                        ) : (
                          <div className="d-flex justify-content-between">
                            <span>{values.picture.name}</span>
                            <i className="bi bi-pencil-square"></i>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </>
            )}

            <div className="col-md-12">
              <label className="form-label" style={{color:"white"}}>Email</label>
              <input
                type="email"
                className={`form-control ${
                  touched.email && errors.email ? "is-invalid" : ""
                }`}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              <div className="invalid-feedback">
                {touched.email && errors.email}
              </div>
            </div>

            <div className="col-md-12">
              <label className="form-label" style={{color:"white"}}>Password</label>
              <input
                type="password"
                className={`form-control ${
                  touched.password && errors.password ? "is-invalid" : ""
                }`}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
              />
              <div className="invalid-feedback">
                {touched.password && errors.password}
              </div>
            </div>
          </div>

          <div className="d-grid mt-4" style={{padding:"20px 0 0 0"}}>
            <button
              type="submit"
              className="btn btn-primary btn-lg" style={{backgroundColor:"#39FF14", color:"black"}}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </button>
          </div>
          <p
            className="text-center mt-3"
            style={{ cursor: "pointer", textDecoration: "underline", color:"#39FF14" }}
            onClick={() => {
              setPageType(isLogin ? "register" : "login");
              resetForm();
            }}
          >
            {isLogin
              ? "Don't have an account? Sign Up here."
              : "Already have an account? Login here."}
          </p>
        </form>
      )}
    </Formik>
  );
};

export default Form;
