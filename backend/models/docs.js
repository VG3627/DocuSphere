const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
mongoose.pluralize(null) ;
const authorSchema = new mongoose.Schema({
  userMail: { type: String, required: true },
  role: { type: String, enum: ['owner', 'read', 'edit'], required: true }
});

const documentSchema = new mongoose.Schema({
  title: { type: String},
  body: { type: String},
  authors: {
    type: [authorSchema],
    required:true
  }
});

const Docs = mongoose.model('docs', documentSchema);

module.exports = Docs;
