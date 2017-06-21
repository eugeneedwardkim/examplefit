import React from 'react';
import {connect} from 'react-redux';
import {refreshLogin, setUser} from '../actions/auth';
import {setFlash} from '../actions/flash';
import {store} from '../store.js';
// import { someStyle, greatStyle } from './styles.scss';

class Diet extends React.Component{
  state = {
    sex: this.props.user.sex, 
    goals: this.props.user.goals,  
    activity: this.props.user.activity , 
    restrictions: this.props.user.restrictions,
    weight: this.props.user.weight,
    height: this.props.user.height,
    age: this.props.user.age
 }

  componentDidMount() {
    this.setState({ ...this.props.user }, () => {
      console.log(this.state)
    })
  }
  
  handleSubmit= (e) => {
    e.preventDefault();
    let { goals, activity, restrictions, weight, height, age } = this.state;
    let { location, dispatch, router } = this.props;
    let bmr = this.calculateBmr(weight, height, age, activity, goals );
    console.log(bmr, goals, restrictions, activity);

    $.ajax({
      url:`/api/auth/about-diet`,
      type: 'PUT',
      data: { 
        _id: this.props.user._id,
        goals,
        restrictions,
        activity,
        bmr
      }
    }).done( user => {
      console.log(user);
      // updates the store and react updates the UI with the new data
      dispatch(refreshLogin(user));
      router.push("dashboard");
      dispatch(setFlash('Your settings have been updated!', 'success'));
    }).fail(err => {
      dispatch(setFlash(err.responseJSON.message, 'error'))
    });
    
  }

  numGoals = (goals) => {
    switch (goals) {
      case "lose":
        return -300;
        break;
      case "gain":
        return 300;
        break;
      default:
        return 0;
    }
  }

  numActivity = (activity) => {
    switch (activity) {
      case 'low':
        return 600;
        break;
      case 'medium':
        return 800;
        break;
      case 'high':
        return 1000;
        break;
      default:
        return 0;
    }
  }

  calculateBmr = (bmrWeight, bmrHeight, bmrAge, bmrActivity, bmrGoals) => {
    if (this.state.sex === 'male') {
      return parseInt(66 + (6.23 * bmrWeight) + (12.7 * bmrHeight) - (6.8 * bmrAge) + this.numActivity(bmrActivity) + this.numGoals(bmrGoals))
    } else {
      return parseInt(655 + ( 4.35 * bmrWeight) + ( 4.7 * bmrHeight ) - ( 4.7 * bmrAge ) + this.numActivity(bmrActivity) + this.numGoals(bmrGoals))
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.id })
    console.log(e.target.name, e.target.id);
  }

  renderGoals = () => {
    return [
      { id: 'lose', text: 'Lose Weight' },
      { id: 'gain', text: 'Gain Weight' },
      { id: 'maintain', text: 'Maintain Weight' } ].map( (radio, i) => {
      let { goals } = this.state;
      let checked = goals === radio.id ? {checked: true} : {}
      return (
        <div key={i}>
          <input type="radio" {...checked} onChange={this.handleChange} name="goals" id={radio.id} />
          <label htmlFor={radio.id}>{radio.text}</label>
        </div>
      )
    });
  }

  renderActivityLevel = () => {
    return [
      { id: 'low', text: 'Low Activity' },
      { id: 'medium', text: 'Medium Activity' },
      { id: 'high', text: 'High Activity' } ].map( (radio, i) => {
      let { activity } = this.state;
      let checked = activity === radio.id ? {checked: true} : {}
      return (
        <div key={i}>
          <input type="radio" {...checked} onChange={this.handleChange} name="activity" id={radio.id} />
          <label htmlFor={radio.id}>{radio.text}</label>
        </div>
      )
    });
  }

  renderRestrictions = () => {
    return [
      { id: 'vegetarian', text: 'Vegetarian' },
      { id: 'vegan', text: 'Vegan' },
      { id: 'nogluten', text: 'Gluten Free' },
      { id: 'nodairy', text: 'Dairy Free' },
      { id: 'norestrictions', text: 'None' } ].map( (radio, i) => {
      let { restrictions } = this.state;
      let checked = restrictions === radio.id ? {checked: true} : {}
      return (
        <div key={i}>
          <input type="radio" {...checked} onChange={this.handleChange} name="restrictions" id={radio.id} />
          <label htmlFor={radio.id}>{radio.text}</label>
        </div>
      )
    });
  }
  

  render() {
    return (
      <div className="container">
        <h2 className="center">Settings</h2>
          <form onSubmit={this.handleSubmit}>
          <h5>Your goals</h5>
          { this.renderGoals() }
          <h5>Your activity level</h5>
          { this.renderActivityLevel() }
          <h5>Your dietary restrictions</h5>
          { this.renderRestrictions() }
            <hr/>
              <br/>
           <button className="btn center">Update</button>
         </form>
      </div>
    )
  }

  
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Diet);