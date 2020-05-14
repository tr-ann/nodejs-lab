import mongoose from 'mongoose'

export default mongoose.Schema({
  method: String,
  date: Date,
  query: String
})