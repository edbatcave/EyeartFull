const checkToken = (req, res, next) =>{
    console.log('Pasa por el midleware');

    next();
}
module.exports = {checkToken};