import React from 'react';
import {connect} from 'react-redux';

class Joke extends React.Component {
  state={ joke: []};

  componentDidMount() {

    $.ajax({
      url: '/api/auth/joke',
      type: 'GET',
      dataType: 'JSON'
    }).done( joke => {
      // console.log(joke);
      this.setState({ joke });
      // console.log( this.state.joke.text );
    }).fail( err => {
      // handle fail better
      console.log(err);
    });
    
  }
      // getJoke = (e) => {
      //   e.preventDefault();
      // }

      // <form ref="boardForm" onSubmit={this.getJoke}>
      //   <input type="submit" ref="handle" value="Get a Joke" />
      // </form>

render() {
  return(
    <div className="joke">
      <h5>Your daily dose of laughter</h5>
      <blockquote>
        { this.state.joke.text }
      </blockquote>
    </div>
  )
} // end render

} // end Joke component

// const mapStateToProps = (state) => {
//   return { user: state.user }
// }

export default connect()(Joke);