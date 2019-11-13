import { combineReducers } from 'redux'
import auth from './auth_reducer'
import register from './register_reducer'

export default combineReducers({
    auth,
    register
})