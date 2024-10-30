function requestLogger(req, res, next) {
    console.log(` ## requestLogger Middleware: ${req.method} ${req.url}
        body (post): `, req.body, ', query : ',req.query, ', params : ', req.params);
    next();
}

module.exports=requestLogger;