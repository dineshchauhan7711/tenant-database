const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const tenantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: value => bcrypt.hashSync(value, 10)
  },
  company_name: {
    type: String,
    unique: true,
    required: true,
  },
  database: {
    type: String,
    unique: true,
    required: true,
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: {
    getters: true,
    setters: true
  },
  toObject: {
    getters: true,
    setters: true
  }
})

module.exports = new Map([['tenants', tenantSchema]]);
