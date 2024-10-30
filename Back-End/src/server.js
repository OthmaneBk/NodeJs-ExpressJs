//la syntaxe commun Js
const express=require('express');//fonction pour creere notre serveur
const cors=require('cors');
const requestLogger = require('./middlewares/reqest-logger');
const BiblioService = require('./services/biblio-service');
const MySQLRepository = require('./repository/mysql-repository');
const AuthorsRouter = require('./routes/authors-router');


class Server{
    //cons de initialisation
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
        //Middlewares(Intercepteurs des requetes HTTP)
        this.app.use(requestLogger);//j'utilsie la configuration
        //je la passe comme parametere, je l'approgamme, apres l'exuction des requests
        //a chque request les configuration seeont intercepterait
        this.app.use(express.static('public'))//il permet de confifure les chamies satatiques public
    }


    //End-Points Rest (Web Service Rest)
    //?name=NAME
    routes(){
        this.app.get('/html',(req, res) =>{
            res.send('<h1>Serveur Express (Node.js)<h1>');//envoyer du HTML
        } )
        this.app.use('/biblio/authors',this.authorsRouter.router)//j'ouvre le router si le prefix commance par /biblio/authors

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

//exportation
module.exports=Server;