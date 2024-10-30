const {Router}=require('express');

class AuthorsRouter{
    constructor(service){
        //proprietes da la classe
        this.service=service;
        this.router=new Router();
        this.endPoints();
    }

    endPoints(){
        //Definition des end-points
        //La reporesentaion de json
        //la cle entre guillement
        //lorsuqe la valeur n'est pas numeric, c'eest entre guillement
        this.router.get('/',(req, res) =>{ //protocole http
            this.service.getAllAuthors().then(
            authors => {
                res.send(authors)
            }
        )
        })

        this.router.get('/:id',(req, res) =>{//:id creer une variable
            console.log('params = ',req.params);
            let id=req.params.id;//recupere un id 
            this.service.getAuthorById(id).then(
                author => {
                        if(author != null){
                            res.send(author);
                        }else{
                            //403 le serveur ne repond
                            //500 une erreur
                            res.status(500).send({
                                status :'error',
                                message :'Auteur Introuvable'
                            });
                        }
                    }
                )
        })
    }
}



module.exports=AuthorsRouter;