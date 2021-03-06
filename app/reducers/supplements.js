export default function supplements(state = {}, action){
  switch(action.type){
    case  'DISPLAY_SUPPLEMENT_SUCCESS':
     return Object.assign({}, state, {
       supplementaryAction: action.payload
     });
     case 'DISPLAY_SUPPLEMENT_FAIL':
      return action.error;
      default:
        return state;
  }
}
