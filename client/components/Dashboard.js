import React from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import CaloriesGraph from './CaloriesGraph';
import Joke from './Joke';


class Dashboard extends React.Component {

  render() {
    
    let { weight, height, age, goals, activityLevel, restrictions } = this.props.user;
    return(
    <div className="container">
      <CaloriesGraph />
      <Joke />
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Dashboard);