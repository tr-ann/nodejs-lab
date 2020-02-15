import mongoose from 'mongoose'

const logSchema = mongoose.Schema({
  date: Date,
  method: String,
  path: String,
  error: Object
});

mongoose.connect("mongodb://localhost:27017/logs_db", { useNewUrlParser: true, useUnifiedTopology: true });

const Log = mongoose.model("logs", logSchema);

export default async(ctx, next) => {
  try {
    
    await next();

    let log = new Log({
      date: Date.now(),
      method: ctx.method,
      path: ctx.originalUrl
    })

    await log.save();

  }
  catch(error) {

    await new Log({
      date: Date.now(),
      method: ctx.method,
      path: ctx.url,
      error: {
        name: error.name,
        message: error.message,
        status: error.status
      }
    }).save()

    throw error;
  }
}