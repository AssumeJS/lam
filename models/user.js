var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
const SALT_FACTOR = 10;
var userSchema = mongoose.Schema({
	username : { type : String, require : true, unique : true},
	password : { type : String, require : true},
	createdAt: { type : String, default : Date.now},
	displayName : String,
	bio : String
})



var noop = function(){}

userSchema.pre('save', function(done){
	var user = this
	if(!user.isModified('password')){
		return done()
	}

	bcrypt.genSalt(SALT_FACTOR, function(error, salt){
		if(error){
			return done(error)
		}
		bcrypt.hash(user.password, salt, noop, function(error, hashedPassword){
			if(error){
				return done(error)
			} 
			user.password = hashedPassword
		})
	})
})

userSchema.methods.checkPassword = function(guess, done){
	bcrypt.compare(guess, this.password, function(error, isMatch){
		done(error,isMatch)
	})
}

userSchema.methods.name = function(){
	return this.displayName || this.username
}

var User = mongoose.model("User", userSchema)
module.exports = User