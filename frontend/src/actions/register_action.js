import {
    USER_SAVED, EXPENSE_SAVED
  } from './types'



  import {apiRegister} from '../api/user'
  export const saveUser = (user, history) => {
    return async dispatch => {
      try {
        // const {data} = await apiRegister(user);
        // console.log(data)
        await apiRegister(user)
        dispatch({ type: EXPENSE_SAVED})
        history.push('/login');
        console.log('User response' + user)
       

      } catch (e) {
        const {data:{error}} = e.response
        console.error(error)
      }
    };
  };
  


  