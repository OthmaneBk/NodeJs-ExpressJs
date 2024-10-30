 class BiblioService{
    constructor(db){
        this.db=db;
    }
    //tout focntion asyncu est promise
    async getAllAuthors(){
        let {result}=await this.db.select('Authors');
        return result.map(
            row=> ({id:row['Au_ID'],//soit fields[0]=Au_ID,..
                 name:row['Author'],
                 yearBorn: row['Year_Born']
                })//fabriquation d'objet
        )
       /*return[
           {id:101, name: 'Brendan Eich', yearBorn:1961},
           {id:102, name: 'Tim Berners-Lee', yearBorn:1955},
           {id:103, name: 'Tim Berners-Lee', yearBorn:1955}
       ]*/
    }

    async getAuthorById(id){
        let {result}=await this.db.select('Authors','Au_ID',id);
        result= result.map(
            row=> ({id:row['Au_ID'],//soit fields[0]=Au_ID,..
                 name:row['Author'],
                 yearBorn: row['Year_Born']
                })//fabriquation d'objet
        );

        if(result.length >0){
            return result[0];
        }else{
            return null;
        }
       /*return[
           {id:101, name: 'Brendan Eich', yearBorn:1961},
           {id:102, name: 'Tim Berners-Lee', yearBorn:1955},
           {id:103, name: 'Tim Berners-Lee', yearBorn:1955}
       ]*/
    }
}

module.exports = BiblioService;