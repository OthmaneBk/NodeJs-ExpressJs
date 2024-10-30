function requestLogger(req, res, next) {
    //req les infos sur les request
    console.log(` ## requestLogger Middleware: ${req.method} ${req.url}
        body (post): `, req.body, ', query : ',req.query, ', params : ', req.params);
    next();//poursuivre la chaine
    //on par arriver a la fin de la request, quand on desactiver next()
}


//design pattern single responsability
module.exports=requestLogger;