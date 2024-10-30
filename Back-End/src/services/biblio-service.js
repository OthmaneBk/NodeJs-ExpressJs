 class BiblioService{
    constructor(db){
        this.db=db;
    }

    async getAllAuthors(){
        let {result}=await this.db.select('Authors');
        return result.map(
            row=> ({id:row['Au_ID'],
                 name:row['Author'],
                 yearBorn: row['Year_Born']
                })
        )

    }

    async getAuthorById(id){
        let {result}=await this.db.select('Authors','Au_ID',id);
        result= result.map(
            row=> ({id:row['Au_ID'],
                 name:row['Author'],
                 yearBorn: row['Year_Born']
                })
        );

        if(result.length >0){
            return result[0];
        }else{
            return null;
        }
    }
}

module.exports = BiblioService;