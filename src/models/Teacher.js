import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const teacherShema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: String,
    first_name: String,
    last_name: String,
}, {
    collection: 'teacher'
});

teacherShema.pre('save', function (next) {

	if (!this.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(10, (erro, salt) => {
		if (erro) return next(err);
		bcrypt.hash(this.password, salt, (err, hash) => {
			if (erro) return next(err);
			this.password = hash;
			next();
		});
	})

});

export default model('teacher',teacherShema);