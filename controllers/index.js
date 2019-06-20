var fn_index = async(ctx,next)=>{
    ctx.response.body = `<h1>Index</h1><form action="/signin" method="post">
        <p>Name:<input name="name" value="koa"></p>
        <p>Password:<input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
};
var fn_signin = async (ctx,next)=>{
    var name = ctx.request.body.name||'',
        password = ctx.request.body.password||'';
    console.log(`signin with name:${name},password:${password}`);
    if(name==='koa'&&password==='123456'){
        ctx.response.body = `Welcome,${name}`;
    }else{
        ctx.response.body='<h1>Login failed!</h1><a href="/">Try again</a>'
    }

};
module.exports={
    'GEt /':fn_index,
    'Post /signin':fn_signin
}