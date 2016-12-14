/**
 * @File: go.js
 * @Brief: json2xls
 * 
 * @Author: Pury
 * @Version: 0.0.1
 * @Date: 2016-12-14
 *
 * Copyright (c) pury.org.
 * All rights reserved.
 */

var fs = require("fs");
var json2xls = require('json2xls');
var args = process.argv.splice(2);

if (args && args.length)
{
	var file = args[0];
	console.log(file);
	fs.readFile(file, "utf8", (err, data) => {
		
		if (err)
		{
			throw err;	
		}

		try
		{
			var jsonData = JSON.parse(data);	
			var xls = json2xls(jsonData);
			fs.writeFileSync(file.split(".")[0] + ".xlsx", xls, "binary");
			console.log("Success!");
		}
		catch (e)
		{
			throw e;	
		}
	});
}
else
{
	console.log("Please input a file name");
}
