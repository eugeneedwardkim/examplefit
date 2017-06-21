import React from 'react';
import { connect } from 'react-redux';
import { refreshLogin } from '../actions/auth';
import { setFlash } from '../actions/flash';

class PreferencesForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    let { email, password, weight, height, age, sex, props: { location, dispatch, router }} = this;

    $.ajax({
      url: `/api/auth/${location.pathname}`,
      type: 'POST',
      data: { email: email.value, 
        password: password.value, 
        weight: weight.value, 
        height: height.value, 
        age: age.value, 
        sex: sex.value 
      }
    }).done( user => {
      dispatch(refreshLogin(user));
      router.push("/")
    }).fail( err => {
      dispatch(setFlash(err.responseJSON.message, 'error'))
    });
  }

  render() {
    return (
      <div>
        <h2 className="center">{this.props.route.title}</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="email" required={true} ref={ n => this.email = n } placeholder="Email" />
            <input type="password" required={true} ref={n => this.password = n } placeholder="Password" />
            <input type="number" required={true} ref={n => this.weight =n } placeholder='Weight'/>
            <input type="number" required={true} ref={n => this.height =n } placeholder='Height'/>
            <input type="number" required={true} ref={n => this.age =n } placeholder='Age'/>
            <p>
            <input type="radio" required={true} name='sex' ref={n => this.sex =n } id='male'/>
              <label htmlFor='male'>Male</label>
            </p>
            <p>
            <input type="radio" required={true} name='sex' ref={n => this.sex =n } id='female' />
              <label htmlFor='female'>Female</label>
            </p>
              <br/>
           <button className="btn center">{this.props.route.title}</button>
         </form>
      </div>
    )
  }
}

export default connect()(PreferencesForm);
