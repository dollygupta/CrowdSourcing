exports.login = function(req,res)
{
	console.log("in login");
	var userName = req.param("inputUserName");  	
	console.log(userName);
   res.render('index', { userName: userName });
        	
};