//chainde vide ne contient pas des espaces

const mysql=require('mysql');

class MySQLRepository{
    constructor(source, host="localhost", user='root', password=''){
        this.params={
            host,
            database:source,
            user,
            password
        };
        this.db=mysql.createConnection(this.params);
    }
    //open ca sera une promisse
    open(){
        return new Promise((resolve, reject) =>{
            this.db.connect(err =>{
                if(err){
                    reject(err);
                }
                else{
                    resolve('Connexion bien etablie...');
                }
            })
        })
    }

    close(){
        this.db.end();
    }

    //la fonction select est promise
    //let {result, fields} = db.select('Authors');
    /*select(tableName){
        return new Promise((resolve, reject) =>{
            let query=`SELECT * FROM ${tableName}`;

            this.db.query(query, (err,result,fields)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve({result,fields:fields.map(f =>f.name)})
                }
            })
        })
    }*/

    select(tableName, key, value){
        let query;
        if(key==undefined){
            query=`SELECT * FROM ${tableName}`;
        }else{
            query=`SELECT * FROM ${tableName} WHERE ${key}='${value}'`;
        }
        return new Promise((resolve, reject) =>{
            this.db.query(query, (err,result,fields)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve({result,fields:fields.map(f =>f.name)})
                }
            })
        })
    }
}

module.exports=MySQLRepository;