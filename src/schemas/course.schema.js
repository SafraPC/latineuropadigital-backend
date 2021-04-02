const mongoose = require('mongoose');
const validator = require('validator');

const fileSystem = require('fs');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, 'É necessário informar quem publicou este Courseo'],
	},
	title: {
		type: String,
		required: [true, 'É necessário informar o título do Courseo'],
		trim: true,
	},
	subtitle: {
		type: String,
		required: [true, 'É necessário informar o subtítulo do Courseo'],
		trim: true
	},
	content: {
		type: String,
		required: [true, 'É necessário informar o conteudo do Courseo'],
		trim: true
	},
	imagePath: {
		type: String,
		required: [true, 'É necessário cadastrar uma imagem do Courseo']
	},
	tags: [{
		type: Schema.Types.ObjectId,
		ref: "Tag"
	}],
	views: {
		type: Number,
		default: 0
	}
}, {
	timestamps: true,
});

courseSchema.pre("remove", async function (next) {
	/*
	fileSystem.unlinkSync(__basedir+"/public"+this.imagePath);
	next();
	*/
	try {
		fileSystem.unlinkSync(__basedir+"/public"+this.imagePath);
	} catch (error) {

	}
  	next();
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;