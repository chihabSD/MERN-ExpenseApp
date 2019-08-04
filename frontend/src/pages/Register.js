import React, { Component } from "react";
import { Button, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
class Register extends Component {
  __handleFormSubmit(values) {
    console.log(values);
  }
  render() {
    const login = {
      margin: "auto",
      width: "300px"
    };
    // const i = {
    //   color: "blue",
    //   margin: "auto",
    //   width: "300px",
    //   textAlign: "center",
    //   marginTop: "100px"
    // };
    const loginButton = {
      color: "white",
      // background: "#00B4DB" /* fallback for old browsers */,
      // background:
      //   "-webkit-linear-gradient(to right, #0083B0, #00B4DB)" /* Chrome 10-25, Safari 5.1-6 */,
      background:
        "linear-gradient(to right, #0083B0, #00B4DB)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    };
    return (
      <div style={login}>
        {/*<i class="fas fa-unlock-alt fa-5x" style={i} />**/}
        <h3>Register a new account </h3>
        <hr />
        <Formik
          inititalValues={{ name: "", email: "", password: "" }}
          onSubmit={this.__handleFormSubmit.bind(this)}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .min(6)
              .required(),
            email: Yup.string()
              .email()
              .required(),
            password: Yup.string()
              .min(6)
              .required()
          })}
          render={({
            handleChange,
            handleSubmit,
            isValid,
            isSubmitting,
            handleBlur,
            errors,
            touched
          }) => (
            <div>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  invalid={errors.name && touched.name}
                  name="name"
                  type="text"
                  placeholder="Your name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <FormFeedback>{errors.name}</FormFeedback>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  invalid={errors.email && touched.email}
                  name="email"
                  type="email"
                  placeholder="someone@hotmail.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <FormFeedback>{errors.email}</FormFeedback>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  invalid={errors.password && touched.password}
                  name="password"
                  type="password"
                  placeholder="Your password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <FormFeedback>{errors.password}</FormFeedback>
                ) : null}
              </FormGroup>
              <Button
                style={loginButton}
                outline
                color="info"
                onClick={handleSubmit}
                disabled={!isValid || isSubmitting}
              >
                Sign In
              </Button>{" "}
            </div>
          )}
        />
        <h4> </h4>
        <Link to="/login">Already signed up? Login </Link>
      </div>
    );
  }
}
export { Register };