exports.login = function(req,res)
{
	console.log("in login");
	var userName = req.param("inputUserName");
	req.session.userName=userName;
	console.log(userName);
   res.render('index', { userName: userName });
        	
};