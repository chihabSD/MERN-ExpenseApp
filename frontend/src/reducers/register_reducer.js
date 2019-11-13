import { USER_SAVED} from '../actions/types';
 
const INITIAL_STATE = {
  registered: false
}
export default (state = INITIAL_STATE, action) =>{
  switch(action.type){
    case USER_SAVED:
      return { ...state, registered: true}
    default: 
    return state
  }
}