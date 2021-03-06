import React from 'react';
import { IndexRoute, Route} from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App';
import Splash from './components/Splash';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Login from './components/Account/Login';
import Signup from './components/Account/Signup';
import EditProfile from './components/Account/EditProfile';
import Profile from './components/Account/profile/Profile';
import Forgot from './components/Account/Forgot';
import Reset from './components/Account/Reset';
import Exercise from './components/Regime/Exercise/Exercise';
import Diet from './components/Regime/Diet/Diet';
import Supplement from './components/Supplement/SupplementView';
import { displayExercise, displayDiet } from './actions/regime';
import { loadProfile } from './actions/profile';
import { displaySupplement } from './actions/supplements';

export default function getRoutes(store) {
  const isAuthenticated = () => {
    return store.getState().auth.token !== undefined;
  };
  const ensureAuthenticated = (nextState, replace) => {
    if (!isAuthenticated()) {
      replace('/login');
    }
  };
  const skipIfAuthenticated = (nextState, replace) => {
    if (isAuthenticated()) {
      replace('/');
    }
  };
  const clearMessages = () => {
    store.dispatch({
      type: 'CLEAR_MESSAGES'
    });
  };
  const loadProfileData = (nextState, replace) => {
    if(isAuthenticated()) {
      store.dispatch(loadProfile(store.getState().auth.user.id));
    } else {
      replace('/login');
    }
  };

  const loadDiet = (nextState, replace) => {
    if(isAuthenticated()) {
      store.dispatch(displayDiet());
    } else {
      replace('/login');
    }
  };

  const loadExercise = (nextState, replace) => {
    if(isAuthenticated()) {
      store.dispatch(displayExercise());
    } else {
      replace('/login');
    }
  };

  const loadSupplement = (nextState, replace) => {
    if(isAuthenticated()) {
      store.dispatch(displaySupplement());
    }else {
      replace('/login');
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Splash} onLeave={clearMessages}/>
      <Route path="/supplement" component={Supplement} onEnter={loadSupplement} onLeave={clearMessages}/>
      <Route path="/exercise" component={Exercise} onEnter={loadExercise} onLeave={clearMessages} />
      <Route path="/diet" component={Diet} onEnter={loadDiet} onLeave={clearMessages} />
      <Route path="/contact" component={Contact} onLeave={clearMessages}/>
      <Route path="/login" component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/signup" component={Signup} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/account" component={EditProfile} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/profile" component={Profile} onEnter={loadProfileData} onLeave={clearMessages}/>
      <Route path="/forgot" component={Forgot} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path='/reset/:token' component={Reset} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="*" component={NotFound} onLeave={clearMessages}/>
    </Route>
  );
}
