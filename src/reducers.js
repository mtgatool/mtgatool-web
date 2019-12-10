
import { SET_DB, SET_QUERY_STATE } from './actions';

const initialState = {
  database: {},
  queryState: 0
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DB:
      return {
        ...state,
        database: action.database
      };
      case SET_QUERY_STATE:
        return {
          ...state,
          queryState: action.state
        };
  
    default:
      return state;
  };
}

export default rootReducer;