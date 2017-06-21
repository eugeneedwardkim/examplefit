 import React from 'react';
 import {connect} from 'react-redux';
 import parallaxbg from '../images/fit-fitness.jpg';

class Home extends React.Component{
    componentDidMount() {
        $('.parallax').parallax();
    }
    render(){
        return(
        <div>
                <div id="index-banner" className="parallax-container">
                <div className="section no-pad-bot">
                <div className="container">
                        <br/><br/>
                        <h1 className="header center white-text">WELCOME TO FINNER</h1>
                        <div className="row center">
                        <h5 className="header col s12 light">A health and wellness application to help you keep track of calories and <br /> suggest meals that fit within your diet and personal preferences.</h5>
                        </div>
                </div>
                </div>
                <div className="parallax"><img alt="Unsplashed background img 1" /></div>
                </div>
                <div className="row container" style={{marginTop: '1em'}}>
                    <div className="col s12 m3" >
                    <i className="material-icons large center"
                    style={{display: 'block', float: 'right', marginTop: '10'}}
                    >settings</i>
                    </div>
                    <div className="col s12 m9"><h4> How does it work? </h4>
                                <p> When you sign up we'll ask you a few basic questions about you to determine your BMR.
                                Then we use that information to find your recommended daily caloric intake. From there
                                we're able to take all of that information and generate a meal plan for you 
                                that fits within your dietary needs and personal preferences. </p></div>
                </div>
                <div id="index-banner-2" className="parallax-container">
                        <div className="section no-pad-bot">
                        <div className="container">
                        </div>
                        </div>
                        <div className="parallax"><img src={"/images/fit-fitness.jpg"} alt="Unsplashed background img 1" /></div>
                </div> 
        </div>
        );    
    }
}

export default (Home)