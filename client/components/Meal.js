import React from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';

class Meal extends React.Component {
  state = {users :[]}
  componentDidMount() {
    // let meals = JSON.parse(this.props.meals.items[0].value)
    // console.log(meals);
  }

  render() {
    return(
      <h1>hell</h1>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Meal);
