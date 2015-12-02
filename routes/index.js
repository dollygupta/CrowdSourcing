
/*
 * GET home page.
 */

exports.index = function(req, res){
var userName = req.param("inputUserName");
console.log("DollyWasHere "+ userName );
  res.render('index', { userName: userName});
};