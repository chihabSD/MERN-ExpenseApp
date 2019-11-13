// import React, { Component } from 'react';
// import axios from 'axios';
// import { BrowserRouter } from 'react-router-dom';
// import { Redirect } from 'react-router'

// class Signup extends Component {

//     constructor(props) {
//         super(props);
//         this.onChangeName = this.onChangeName.bind(this);
//         this.onChangeEmail = this.onChangeEmail.bind(this);
//         this.onChangePassword = this.onChangePassword.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);

//         this.state = {
//             name: '',
//             email: '',
//             password: '',
//             redirect: false
//         }
//     }
//     onChangeName(e) {
//         this.setState({
//             name: e.target.value
//         });
//     }
//     onChangeEmail(e) {
//         this.setState({
//             email: e.target.value
//         });
//     }
//     onChangePassword(e) {
//         this.setState({
//             password: e.target.value
//         });
//     }
//     onSubmit(e) {
//         e.preventDefault();
//         const user = {
//             name: this.state.name,
//             email: this.state.email,
//             password: this.state.password,
    
//         }
//         axios.post('http://localhost:3000/api/v1/register', user)
//         .then(res => console.log(res.data));
        
//         this.setState({
//             name: '',
//             email: '',
//             password: '',
//             redirect: true
//         });
//     }
//     render() {
//       // const { redirect } = this.state;
//       // if(redirect){
//       //   return <Redirect to="/login" />
//       // }
//       return (
//           <div style={{marginTop: 50}}>
//               <h3>Add New Server</h3>
//               <form onSubmit={this.onSubmit}>
//                   <div className="form-group">
//                       <label> Name:  </label>
//                       <input type="text" className="form-control" value={this.state.name}  onChange={this.onChangeName}/>
//                   </div>
//                   <div className="form-group">
//                       <label>Email: </label>
//                       <input type="text" className="form-control" value={this.state.email}  onChange={this.onChangeEmail}/>
//                   </div>
//                   <div className="form-group">
//                       <label>Password: </label>
//                       <input type="password" className="form-control" value={this.state.password}  onChange={this.onChangePassword}/>
//                   </div>
//                   <div className="form-group">
//                       <input type="submit" value="Register" className="btn btn-primary" />
//                   </div>
//               </form>
//           </div>
//       )
//   }
// }
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