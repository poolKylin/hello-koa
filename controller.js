const fs = require('fs');
const path = require('path');
function addControllers(router,dir){
    var files = fs.readdirSync(path.join(__dirname,dir));
    var js_files = files.filter(f=>{
        return f.endsWith('.js');
    });
    for(var f of js_files){
        console.log(`process controller:${f}...`);
        let mapping = require(path.join(__dirname,dir,f));
        addMapping(router,mapping);
    };
}
function addMapping(router,mapping){
    for(var url in mapping){
        if(url.toUpperCase().startsWith('GET')){
            var path = url.split(' ')[1];
            router.get(path,mapping[url]);
            console.log(`require URL mapping:GET ${path}`);
        }else if(url.toUpperCase().startsWith('POST')){
            var path = url.split(' ')[1];
            router.post(path,mapping[url]);
            console.log(`require URL mapping:POST ${path}`);
        }else{
            console.log(`invalid URL:${url}`);
        }
    }
}

module.exports=function(dir){
    let controllers_dir = dir||'controllers',
        router = require('koa-router')();
    addControllers(router,controllers_dir);
    return router.routes();
}