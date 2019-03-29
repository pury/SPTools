var http = require('http');
var fs = require('fs');
//-- 创建多级目录
var mkdirp = require('mkdirp'); 

/*------------------------------------ */
/*-------- 自定义配置区域 ------------ */
/*------------------------------------ */

//-- 资源配置表名称(当前目录下)
var resFileName = "default.res.json";   
//-- 资源根目录路径
var resUrl = "http://game.ky206.com/resource/";  
//-- 下载资源后的保存路径
var resPath = "D:/ttt/egret4/";

/*------------------------------------ */
/*------------------------------------ */


//-- 获取资源配置表内容
var resData = fs.readFileSync(resFileName);
resData = JSON.parse(resData);
var len = resData.resources.length;

//-- 根据资源url创建多级目录
var mkdirs = function(dirpath, callback) {
    fs.exists(dirpath, function(exists) {
        if(exists) {
                callback();
        } else {
            //-- 尝试创建父目录，然后再创建当前目录
			mkdirs(path.dirname(dirpath), function(){
				fs.mkdir(dirpath,callback);
			});
        }
    })
};

//-- 根据资源url获取所在目录
var getDir = function(c)
{
	var r = "";

	for (var ii = 0; ii < c.length; ii++)
	{
		if (ii == c.length - 1) break;
		r += c[ii] + "/";
	}

	return r;
}

var index = 0;

//-- 执行操作
var go = function() 
{
    if (index >= resData.resources.length) return;
    var temp = resData.resources[index];
    index++;
    var res_url = resData.resources[index].url;
    var req = http.get(resUrl + res_url, function(res) 
    {
        var imgData = "";
        //-- 一定要设置response的编码为binary否则会下载下来的图片打不开
        res.setEncoding("binary"); 
        console.log("正在下载中...", index, "/", len);

        res.on("data", function(chunk) {
            imgData += chunk;
        });

        res.on("end", function() 
        {
            var res_dir = res_url.split("/");
            var dir = getDir(res_dir);
            mkdirp(resPath + dir, function(err) 
            {
                if (err) 
                {
                    console.error(err); go();
                } 
                else 
                {
                    fs.writeFile(resPath + res_url, imgData, "binary",
                    function(err) {
                        go()
                        if (err)  { return console.log("保存失败", index, err); }
                        console.log("保存成功", index, (100 * index / len).toFixed(2) + "%");
                    });
                }
            });
        });

        res.on("error", function(err) {
            console.log("请求失败");
        });
    });
};

go();
