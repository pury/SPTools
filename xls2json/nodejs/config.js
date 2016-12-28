/**
 * @File: config.js
 * @Brief: excel表格导出json文件
 *
 * @Author: Pury
 * @Date: 2016-12-16
 * Copyright (c) doingame.com.
 * All rights reserved.
 */

var xlsx = require("node-xlsx");
var fs = require("fs");
/**
 * excel 目录路径
 */
var origin = "../table";

/**
 * json文件路径
 */
var source = "./config.json";
var source_min = "./config.min.json";
var list = null;
var data = null;
var index = 0;
var content = {};

fs.readdir(origin, (err, files) => {
	files.forEach(file => {
		index++;
		console.log(">>" + file);
		var file_name = file.split(".")[0];
		content[file_name] = {};
		list = xlsx.parse(origin + "/" + file);
		data = list[0].data;

		for (var i = 2; i < data.length; i++)
		{
			if (data[i])
			{
				if (!data[i][0])
				{
					continue;	
				}

				content[file_name][data[i][0]] = {};
				var cell = content[file_name][data[i][0]];

				for (var j = 0; j < data[i].length; j++)
				{
					cell[data[1][j]] = data[i][j];	
				}
			}
			else
			{
				break;	
			}
		}
	});

	fs.writeFileSync(source, JSON.stringify(content, null, 2), 'utf8');
	fs.writeFileSync(source_min, JSON.stringify(content), 'utf8');
	console.log("count: " + index, "\nDone!");
});
