const Server = require("./src/server");//commun js, pas la peine de faire .js


function main() {
    let server =new Server();
    server.start();
}

main();