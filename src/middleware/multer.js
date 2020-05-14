import multer from 'koa-multer'

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalName)
  }
})

let upload = multer({storage});

/*async function uploadSingle(ctx, next) {
  upload.single('image');

  ctx.request.body = ctx.req;
  console.log(ctx.request.body.description)
  ctx.request.body.image = ctx.req.file.originalName;

  await next();
}*/

export default uploadSingle;