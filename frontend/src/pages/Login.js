import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert
} from "reactstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

// Connect Login UI with redux
import { connect } from "react-redux";
import { signIn } from "../actions";

class LoginPage extends Component {
  /**
   * When we get the response from the server
   * we want to handle it here
   * thus we can use componentDidUPdate
   */
  componentDidUpdate() {
    //distruc error from props
    const { error, isAuth } = this.props;
    if (error && this.bag) {
      this.bag.setSubmitting(false);
    }
    if (isAuth) {
      this.props.history.push("/");
    }
  }
  __handleFormSubmit(values, bag) {
    // console.log(values);
    this.props.signIn(values);
    this.bag = bag;
  }
  _renderErrorIfAny() {
    const { error } = this.props;
    /**If there is any error return it */
    if (error) {
      return <Alert color="danger">{error}</Alert>;
    }
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
        <h3>Sign in to your account </h3>
        <hr />
        {/** Render errorss */}
        {this._renderErrorIfAny()}
        <Formik
          inititalValues={{ email: "", password: "" }}
          onSubmit={this.__handleFormSubmit.bind(this)}
          validationSchema={Yup.object().shape({
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
        <Link to="/signup"> Do not have an account? Sinup Now </Link>
      </div>
    );
  }
}
/**
 * This takes state from the auth_reducer
 * and map it to props
 *
 * it takes the state and returns
 *  the propse that I want in the commponent
 * in this cast we can destruct the state {auth}
 * and get everything from it
 */
const mapStateToProps = ({ auth }) => {
  return {
    attempLogin: auth.attempLogin,
    error: auth.error,
    isAuth: auth.isLogged
  };
};
//attemp to conenct with redux
/**
 * the first argument it takes is the mapstatetoprops
 * the second is mapdispatchtoprops which is {signIn}
 * the signIn is the action creator from ..auth_actons
 */
const Login = connect(
  mapStateToProps,
  { signIn }
)(LoginPage);
export { Login };