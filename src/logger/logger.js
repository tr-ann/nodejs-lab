import mongoose from 'mongoose'
import httpLog from './schemes/httpLog'


mongoose.connect("mongodb://localhost:27017/logs_db", { useNewUrlParser: true, useUnifiedTopology: true });

const Log = mongoose.model("logs", httpLog);

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