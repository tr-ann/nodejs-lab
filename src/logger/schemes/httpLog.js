import mongoose from 'mongoose'

export default mongoose.Schema({
  type: String,
  date: Date,
  method: String,
  path: String,
  error: Object
});