const Server = require("./src/server");//commun js, pas la peine de faire .js

function exp01() {
    const app=express(); //server

//Definir les routes
//1er la router, 2eme callBack, requesr, response



/*app.listen(3000,()=>{
    console.log('Serveur démarré...')
})*/
}

function main() {
    let server =new Server();
    server.start();
    // ## requestLogger Middleware: GET /html
}

main();