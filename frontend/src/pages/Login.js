import React, { Component } from "react";
import { Button, FormGroup, Label, Input, FormFeedback , Alert} from "reactstrap";
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {signIn} from '../actions'
import { Formik } from "formik";
class LoginPage extends Component {
  componentDidUpdate() {
    const { error, isAuth } =  this.props
    if(error && this.bag) {
      this.bag.setSubmitting(false);
    }
    if(isAuth){
      this.props.history.push('/')
    }
  }
  _handleFormSubmit(values, bag) {
    console.log(values);
    this.props.signIn(values);
    this.bag = bag;

  }
  _renderErrorIfAny() {
    const { error } = this.props
    if(error){
      return (
        <Alert color="danger">
        {error}
      </Alert>
      )
    }
  }
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h3>Sin in to your account</h3>
        <hr />
        {this._renderErrorIfAny()}
       
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={this._handleFormSubmit.bind(this)}
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
                  placeholder="someon@gmail.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                
                {errors.email && touched.email ? <FormFeedback>{errors.email}</FormFeedback>: null}
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                invalid={errors.password && touched.password}
                name="password"
                type="password"
                placeholder="password"
                onChange={handleChange}
                onBlur={handleBlur}
                />
                {errors.password && touched.password ? <FormFeedback>{errors.password}</FormFeedback>: null}
              </FormGroup>
              <Button
                color="primary"
                block
                onClick={handleSubmit}
                disabled={!isValid || isSubmitting}
              >
                Sign in
              </Button>
            </div>
          )}
        />
            <Link to='/signup' > Don't have an account? signup </Link>
      </div>
    );
  }
}
// Got to the state and get the attempting, erro and others and map it to props or sending it to props
const mapStateToProps = ({auth}) => {
  return {
    attempting: auth.attempting,
    error: auth.error,
    isAuth: auth.isAuth
  }
}
// The {signIn } are action types that  are a destruct of map dispatch to props
const Login = connect(mapStateToProps, {signIn})(LoginPage);
export { Login };
