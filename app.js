const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static("public")); // to serve static files 

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
	res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req, res){

	var firstName = req.body.firstName; 
	var lastName = req.body.lastName;
	var email = req.body.email;

	var data = {
		members: [
		{
			email_address: email, 
			status: "subscribed",
			merge_fields: {
				FNAME: firstName,
				LNAME: lastName
			}
		}
		]
	};

	var jsonData = 	JSON.stringify(data);

	var options = {
		url : "https://us20.api.mailchimp.com/3.0/lists/61d191297c",
		method : "POST",
		headers: {
			"Authorization" : "subha 7d4edbe9394ca2c3fe47197cadd98744-us20"  //Basic Authorization to Mailchimp server
		},
		body: jsonData

	};

	request(options,function(error, response, body){
		
		if(error){
			res.sendFile(__dirname + "/failure.html");
		} 

		else{
			if(response.statusCode == 200){
				res.sendFile(__dirname + "/success.html");
			}
			res.sendFile(__dirname + "/failure.html");		}

		});

});

app.post("/failure",function(req, res){
res.redirect("/");

});



app.listen(process.env.PORT || 3000,function(){
	console.log("Server is running on port 3000");
});

