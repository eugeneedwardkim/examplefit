import React from 'react';
import { connect } from 'react-redux';
import { refreshLogin, sendData } from '../actions/auth';
import { setFlash } from '../actions/flash';

class SignUp extends React.Component {
  state = { sex: '', bmr: 0, activity: ''}
  
  handleSubmit = (e) => {
    e.preventDefault();
    let { email, password, weight, height, age, sex, goals, restrictions, activity, props: { location, dispatch, router }} = this;
    let bmr = this.calculateBmr(weight.value, height.value, age.value, this.state.activity, this.state.goals );
    this.setState({bmr: bmr });
    console.log(bmr)
    
    $.ajax({
      url: `/api/auth${location.pathname}`,
      type: 'POST',
      data: { email: email.value, 
        password: password.value, 
        weight: weight.value, 
        height: height.value, 
        age: age.value, 
        sex: this.state.sex,
        goals: this.state.goals,
        restrictions: this.state.restrictions,
        activity: this.state.activity,
        bmr: bmr
      }
    }).done( user => {
      dispatch(refreshLogin(user));
      router.push("/dashboard")
    }).fail( err => {
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

// Men: BMR = 66 + (6.23 x weight in pounds) + (12.7 x height in inches) - (6.8 x age in years)
// Women: BMR = 655 + (4.35 x weight in pounds) + (4.7 x height in inches) - (4.7 x age in years)

  calculateBmr = (weight, height, age, activity, goals) => {
    if (this.state.sex === 'male') {
      return parseInt(66 + (6.23 * weight) + (12.7 * height) - (6.8 * age) + this.numActivity(activity) + this.numGoals(goals))
    } else {
      return parseInt(655 + ( 4.35 * weight) + ( 4.7 * height ) - ( 4.7 * age ) + this.numActivity(activity) + this.numGoals(goals))
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="container" style={{marginBottom: '50px'}}>
        <h2 className="center">{this.props.route.title}</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="email" required={true} ref={ n => this.email = n } placeholder="Email" />
            <input type="password" required={true} ref={n => this.password = n } placeholder="Password" />
            <input type="number" required={true} ref={n => this.weight =n } placeholder='Weight (lbs)'/>
            <input type="number" required={true} ref={n => this.height =n } placeholder='Height (inches)'/>
            <input type="number" required={true} ref={n => this.age =n } placeholder='Age'/>
            <p>
            <input type="radio" required={true} onChange={this.handleChange} value="male" name='sex' ref={n => this.sex =n } id='male'/>
              <label htmlFor='male'>Male</label>
            </p>
            <p>
            <input type="radio" required={true} name='sex' onChange={this.handleChange} value="female" ref={n => this.sex =n } id='female' />
              <label htmlFor='female'>Female</label>
            </p>
             <h6 style={{ fontWeight: 'bold' }}>Your goals</h6>
            <input type="radio" value="lose" required={true} onChange={this.handleChange} name='goals' ref={n => this.goals =n } id='lose'/>
              <label htmlFor='lose'>Lose Weight</label>
            <input type="radio" value="gain"required={true} onChange={this.handleChange} name='goals' ref={n => this.goals =n } id='gain' />
              <label htmlFor='gain'>Gain Weight</label>
            <input type="radio" value="maintain"required={true} onChange={this.handleChange} name='goals' ref={n => this.goals =n } id='maintain'/>
              <label htmlFor='maintain'>Maintain Weight</label>
            <input type="radio" value="othergoal"required={true} onChange={this.handleChange} name='goals' ref={n => this.goals =n } id='othergoal' />
              <label htmlFor='othergoal'>Other</label>
            <h6 style={{ fontWeight: 'bold' }}>Your activity level</h6>
            <input type="radio" value="low" required={true} onChange={this.handleChange} name='activity' ref={n => this.activity =n } id='low'/>
              <label htmlFor='low'>Low Activity</label>
            <input type="radio" value="medium" required={true} onChange={this.handleChange} name='activity' ref={n => this.activity =n } id='medium' />
              <label htmlFor='medium'>Medium Activity</label>
            <input type="radio" value="high" required={true} onChange={this.handleChange} name='activity' ref={n => this.activity =n } id='high'/>
              <label htmlFor='high'>High Activity</label>
            <input type="radio" value="otheractivity" required={true} onChange={this.handleChange} name='activity' ref={n => this.activity =n } id='otheractivity' />
              <label htmlFor='otheractivity'>Other</label>
            <h6 style={{ fontWeight: 'bold' }}>Your dietary restrictions</h6>
            <input type="radio" value="vegetarian" required={true} onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='vegetarian'/>
              <label htmlFor='vegetarian'>Vegetarian</label>
            <input type="radio" value="vegan" required={true} onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='vegan' />
              <label htmlFor='vegan'>Vegan</label>
            <input type="radio" value="nogluten" required={true} onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='nogluten'/>
              <label htmlFor='nogluten'>Gluten Free</label>
            <input type="radio" value="nodairy" required={true} onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='nodairy' />
              <label htmlFor='nodairy'>Dairy Free</label>
            <input type="radio" value="norestrictions" required={true} onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='norestrictions' />
              <label htmlFor='norestrictions'>None</label>
            <hr/>
           <button className="btn center"> Sign Up</button>
         </form>
      </div>
    )
  }
}

export default connect()(SignUp);
