import cron from 'node-cron'
import PostRepository from '../repositories/PostRepository'

export default () => {
  cron.schedule('* * * 1 * *', async () => {  // each 2 days -- '1 * */2 * *'
    let posts = await PostRepository.get({ attributes: [ 'id', 'createdAt' ]});

    for(let post of posts) {
      if ((Date.now() - post.createdAt) > 1000*60*60) { // 30 days -- 1000*60*60*24 * 3
        await post.destroy();
      }
    }
  })
}