const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(async (ctx,next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next();
});
router.get('/hello/:name',async (ctx,next)=>{
    var name = ctx.params.name;
    ctx.response.body = `hello,${name}`;
});
router.get('/',async(ctx,next)=>{
    ctx.response.body = `<h1>Index</h1><form action="/signin" method="post">
        <p>Name:<input name="name" value="koa"></p>
        <p>Password:<input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
});
router.post('/signin',async (ctx,next)=>{
    var name = ctx.request.body.name||'',
        password = ctx.request.body.password||'';
    console.log(`signin with name:${name},password:${password}`);
    if(name==='koa'&&password==='123456'){
        ctx.response.body = `Welcome,${name}`;
    }else{
        ctx.response.body='<h1>Login failed!</h1><a href="/">Try again</a>'
    }

})
app.use(bodyParser());
app.use(router.routes());

app.listen(3030);
console.log('app is running at 3030');