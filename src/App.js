import React, { Fragment } from 'react';
import classes from './App.module.css';
import NavigationBar from './components/DashBoardLayout/HorizontalNavigationBar/NavigationBar.js';
import LeftNavBar from './components/DashBoardLayout/LeftNavBar/NavBar';
import ContentLayout from './components/DashBoardLayout/FileContentLayout/ContentLayout';
import { connect} from 'react-redux';
import UserAuth from './components/UserAuthentication/UserAuth';
import { LOGGED_OUT } from './store/staticVariable';
import {sagaFetchFileActionRequest} from './store/actions/FetchMyFilesInfoAction'




const App = (props) => {

  //const getLogginStatus = useSelector(state => state.Auth.status);
  const getLogginStatus = props.stateNow.status;
  console.log(getLogginStatus)
  
  if(getLogginStatus === LOGGED_OUT){
    return (
      <div className={classes.containerClass}>  
        <UserAuth />
      </div>
      
    )
  }
  else {

    props.initialFIles(props.stateNow.data.id);


    return (
      <Fragment>
        <NavigationBar />
        <div className={classes.containerClass}>
          <div className={classes.box1}>
            <div className={classes.imageBox}></div>
            <LeftNavBar />
          </div>
          <div className={classes.box2}>
            <ContentLayout />
          </div>
        </div>
      </ Fragment>
    );
  }
  
}

const mapStateToProps = (state , ownProps) => {
    return {
      ...ownProps,
      stateNow : state.Auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      initialFIles : (data) => dispatch(sagaFetchFileActionRequest(data))
    }
}


export default connect(mapStateToProps ,mapDispatchToProps)(App);
