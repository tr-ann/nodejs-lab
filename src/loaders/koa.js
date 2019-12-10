import json from 'koa-json'
import bodyparser from 'koa-bodyparser'

export default (app) => {
    app
        .use(json())
        .use(bodyparser())
}