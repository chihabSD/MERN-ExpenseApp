import React from 'react';
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRouteComp = ({ isAuth, component:Component, ...rest}) => {
    return (
        <Route 
        {...rest}
        render={props => isAuth ? <Component {...props}/> : <Redirect to='/login' />}
        />
    )
}

const mapStateToProps = ({auth}) =>{
    return {
        isAuth: auth.isAuth
    }
}

const ProtectedRoute = connect(mapStateToProps)(ProtectedRouteComp)
export {ProtectedRoute}
