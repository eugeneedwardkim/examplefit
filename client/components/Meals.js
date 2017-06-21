import React from 'react';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { refreshLogin, sendData } from '../actions/auth';
import unirest from 'unirest';

class Meals extends React.Component {
  state = {data:{results:[], cuisine: '', query: '', number: '', type:''}, meals:{}}

  handleSubmit = (e) => {
    e.preventDefault();
    let calories = this.mealNum(this.state.type)*this.props.user.bmr;
    let recipe = 'true';
    let cuisine = this.state.cuisine;
    let excludeIngredients = 'peanut';
    let fillIngredients = 'false';
    let includeIngredients = 'beef';
    let instructionsRequired = 'false';
    let intolerances = '';
    let limitLicense = 'false';
    let maxCalories = calories;
    let maxCarbs = 200;
    let maxFat = 100;
    let maxProtein = 100;
    let minCalories = 300;
    let minCarbs = 150;
    let minFat = 100;
    let minProtein = 100;
    let number = this.state.number;
    let offset = 0;
    let query = this.state.query;
    let ranking = 1;
    let type = this.state.type;

    $.ajax({
        type: 'GET',
        headers: {
            'X-Mashape-Key': 'nP6VWgqTHxmshBXx1YQWWI9WHzSJp1ADIYOjsndhN7Zw2hjyAS'
        },
        url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=${recipe}&cuisine=${cuisine}&excludeIngredients=${excludeIngredients}&limitLicense=${limitLicense}&maxCalories=${maxCalories}&maxCarbs=${maxCarbs}&maxFat=${maxFat}&$maxProtein=${maxProtein}&minCalories=${maxCalories}&minCarbs=${maxCarbs}&minFat=${maxFat}&$minProtein=${maxProtein}&number=${number}&offset=${offset}&query=${query}&ranking=${ranking}`,
      }).done(data => {
          console.log("click")
          this.setState({data: {results: data.results}}, () => {
        });
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  mealNum = (type) => {
    switch (type) {
      case 'breakfast':
        return 0.25;
        break;
      case 'lunch':
        return 0.30;
        break;
      case 'dinner':
        return 0.35;
        break;
      case 'snack':
        return 0.10;
        break;
      default:
        return 0;
    }
  }

  addMeal = (id) => {
    let {location, dispatch, router} = this.props;
    let meal = this.state.data.results.filter(meal => meal.id === id)[0];
    console.log(meal)

    $.ajax({
      url:`/api/auth/meals`,
      type: 'PUT',
      data: {
        _id: this.props.user._id,
        meal
       }
    }).done( user => {
      console.log(user);
      dispatch(refreshLogin(user));
      router.push("dashboard");
      dispatch(setFlash('Your meal has been added!', 'success'));
    }).fail(err => {
      dispatch(setFlash(err.responseJSON.message, 'error'))
    });
  }

  render() {
    console.log(this.state.data.results)
    let recipes = this.state.data.results.map( recipe => {
      return(
          // <div key={recipe.id} className="row">
          //     <div className="col s12 m6">
          //       <div className="card blue-grey darken-1">
          //         <div className="card-content white-text">
          //           <span className="card-title">{recipe.title}</span>
          //           <h5>From {recipe.creditText}</h5>
          //           <p>Carbs: {recipe.carbs} | Protein: {recipe.protein} | Fat: {recipe.fat}</p>
          //           <br/>
          //           <img style={{width:'100%'}} src={recipe.image}/>
          //         </div>
          //         <div className="card-action">
          //           <a href={recipe.sourceUrl} target="_blank">Get the Recipe</a>
          //         </div>
          //         <div className="card-action">
          //           <a onClick={() => this.addMeal(recipe.id)}>Add to Meals</a>
          //         </div>
          //       </div>
          //     </div>
          //   </div>  
            <div className="col s12 m4">
              <div className="card">
                <div className="card-image">
                  <img src={recipe.image} />
                  <span className="card-title" style={{ fontWeight: 'bold', textShadow: 'rgba(0, 0, 0, 0.8) 2px 2px'}}>{recipe.title}</span>
                </div>
                <div className="card-content">
                    <h6 style={{ fontWeight: 'bold'}}>From {recipe.creditText}</h6>
                    <p>Carbs: {recipe.carbs} | Protein: {recipe.protein} | Fat: {recipe.fat}</p>
                    <br/>
                </div>
                <div className="card-action">
                    <a href={recipe.sourceUrl} target="_blank">Get the Recipe</a>
                    <a onClick={() => this.addMeal(recipe.id)}>Add to Meals</a>
                </div>
              </div>
            </div>
          
      )
    })

    return(
      <div className="container">
          <h2 className="center">Your {this.props.route.title} for Today Are:</h2>
            <div className="row">{recipes}</div>
            <form onSubmit={this.handleSubmit}>
              <p>What would you like to eat today?</p>
              <input type="text" name='cuisine' onChange={this.handleChange} placeholder="Chinese, American, Ethiopian?" />
              <p>How many choices do you want?</p>
              <input type="number" name='number' onChange={this.handleChange} placeholder="5" />
              <p>What do you want to include?</p>
              <input type="text" required={true} name='query' onChange={this.handleChange} placeholder="Beef, chicken, or pees?" />
              <p>What's this for?</p>
              <input type="radio" value="breakfast" required={true} onChange={this.handleChange} name='type' id='breakfast'/>
                <label htmlFor='breakfast'>Breakfast</label>
              <input type="radio" value="lunch"required={true} onChange={this.handleChange} name='type' id='lunch' />
                <label htmlFor='lunch'>Lunch</label>
              <input type="radio" value="dinner"required={true} onChange={this.handleChange} name='type' id='dinner'/>
                <label htmlFor='dinner'>Dinner</label>
              <input type="radio" value="snack"required={true} onChange={this.handleChange} name='type' id='snack' />
              <label htmlFor='snack'>Snack</label>
              <br/>
              <br/>
            <button className='btn center'>Get My Meal</button>
            </form>
            <br />
            <br />
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Meals);

