const express=require('express');
const cors=require('cors');
const requestLogger = require('./middlewares/reqest-logger');
const BiblioService = require('./services/biblio-service');
const MySQLRepository = require('./repository/mysql-repository');
const AuthorsRouter = require('./routes/authors-router');


class Server{
 
    constructor(port=3000){
        this.db=new MySQLRepository('Biblio');
        this.service=new BiblioService(this.db);
        this.authorsRouter=new AuthorsRouter(this.service);

        this.port=port;
        this.app=express();
        this.config();
        this.routes();        
    }

    config(){
        this.app.use(requestLogger);
        this.app.use(express.static('public'))
    }


    routes(){
        this.app.get('/html',(req, res) =>{
            res.send('<h1>Serveur Express (Node.js)<h1>');
        } )
        this.app.use('/biblio/authors',this.authorsRouter.router)

    }

    start(callback){
        if(callback == undefined){
            callback =() => {
                console.log('Serveur démarré sous le N de port: '+this.port+'...')
            }
        }
        this.db.open()
        .then(msg =>{
            console.log(msg);
            this.app.listen(this.port, callback);
        })
    }
}

module.exports=Server;