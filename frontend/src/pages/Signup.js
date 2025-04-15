import React, { Component } from "react";
import { Button, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import {Link, Redirect} from 'react-router-dom'
import { Formik } from "formik";
import * as Yup from "yup";
import { saveUser} from '../actions/register_action'
import { connect} from 'react-redux'

class SignupComp extends Component {
  
 
  _handleFormSubmit(values) {
    const { saved} = this.props;

    console.log({saved})
      this.props.saveUser(values)
     if(saved){
      return <Redirect to="/login" />
    }
      console.log(values);
    
    
 }
  render() {

    
    return (
      <div style={{ padding: 20 }}>
        <h3>Create new account</h3>
        <hr />
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={this._handleFormSubmit.bind(this)}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required(),
            password: Yup.string()
              .min(6)
              .required(),
            name: Yup.string().min(5)
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
                  placeholder="enter yoru name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                
                {errors.name && touched.name ? <FormFeedback>{errors.name}</FormFeedback>: null}
              </FormGroup>
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
        <Link to='/login' > Have an account? login </Link>
      </div>
    );
  }
}

const mapStateToProps = ({register}) => {
  return {
    register: register.registered
  }
}

const Signup = connect(mapStateToProps, { saveUser })(SignupComp)
export { Signup };
