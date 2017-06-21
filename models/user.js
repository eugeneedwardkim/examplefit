let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');

let User = new Schema({
  username: { type : String, unique : true, required : true, dropDups: true },
  password: { type : String },
  role: { type: String, default: 'user' },
  age: {type: Number},
  weight: {type: Number},
  height: {type: Number},
  sex: {type: String},
  bmr: {type: Number},
  activity: {type: String},
  goals: {type: String},
  restrictions: {type: String},
  meal: {type: Object}
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model( 'User', User );
