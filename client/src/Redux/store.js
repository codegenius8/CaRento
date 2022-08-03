import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"
import { carReducer } from './reducers/carReducer';
import { alertsReducer } from './reducers/alertsReducer';
const composeEnhancers = composeWithDevTools({
  
});

const rootReducers = combineReducers({
  carReducer : carReducer,
  alertsReducer : alertsReducer
})
 
const store = createStore(
  rootReducers,
  composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

export default store