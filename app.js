const Koa = require('koa');

const app = new Koa();

app.use(async (ctx,next)=>{
    ctx.response.head  = "text/html";
    ctx.response.body = "Hello"
});
app.listen(3030);
console.log('app is running at 3030');