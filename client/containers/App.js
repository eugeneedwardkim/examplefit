import React from 'react';
import { Link } from 'react-router';
import { logout, refreshLogin } from '../actions/auth';
import { connect } from 'react-redux';
import Flash from '../components/Flash';
import Home from '../components/Home';


class App extends React.Component {
  componentDidMount() {
    $(".button-collapse").sideNav({ closeOnClick: true });
    this.props.dispatch(refreshLogin());
  }

  // links = () => {
  //   return [
  //     { name: 'Home', path: '/' },
  //   ].map( (link, i) => {
  //     return this.link(i, link.name, link.path)
  //   })
  // }
  // style={}

  link = (i, name, path, icon ) => {
    let activeClass = this.props.location.pathname === path ? 'active' : '';
    return (
      <li key={i} className={activeClass}>
        <Link to={path}>{name}</Link>
      </li>
    )
  }

  authLinks = () => {
    if (Object.keys(this.props.user).length) {
       let links = [
         { name: 'Dashboard', path: '/dashboard'},
         { name: 'Settings', path: '/about-diet'},
         { name: 'Meals', path: '/meals'}
        ].map( (link, i) => {
          return this.link(i, link.name, link.path)
        });
        links.push(
            <li key="logout">
              <a 
                href="#" 
                onClick={ e => {
                  this.props.dispatch(logout(this.props.router))
                }}
              >
                Logout
              </a>
            </li>
            
        )
      return links;
    } else {
      return [
        { name: 'Home', path: '/' },
        { name: 'Sign In', path: '/signin' },
        { name: 'Sign Up', path: '/signup' },
      ].map( (link, i) => {
        let active = this.props.location.pathname === link.path ? 'active' : '';
        return this.link(i, link.name, link.path)
      })
    }
  }

  render() {
    return (
      <div>
        <div>
          <nav>
            <div className="nav-wrapper grey darken-4">
              <a href="#!" className="brand-logo">Finner</a>
              <a href="#" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                { /* this.links() */ }
                { this.authLinks() }
              </ul>
              <ul className="side-nav" id="mobile">
                { /* this.links() */ }
                { this.authLinks() }
              </ul>
            </div>
          </nav>
          <Flash />
          {this.props.children}
        </div>
       </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(App);
