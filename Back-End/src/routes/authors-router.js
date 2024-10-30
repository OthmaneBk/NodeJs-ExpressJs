const {Router}=require('express');

class AuthorsRouter{
    constructor(service){
        this.service=service;
        this.router=new Router();
        this.endPoints();
    }

    endPoints(){

        this.router.get('/',(req, res) =>{ 
            this.service.getAllAuthors().then(
            authors => {
                res.send(authors)
            }
        )
        })

        this.router.get('/:id',(req, res) =>{
            console.log('params = ',req.params);
            let id=req.params.id;
            this.service.getAuthorById(id).then(
                author => {
                        if(author != null){
                            res.send(author);
                        }else{
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