/**
 * @File: index.js
 * 
 * @Author: Pury
 * @Version: 0.0.1
 * @Date: 2020-7-15
 *
 * Copyright (c) pury.org.
 * All rights reserved.
 */

var fs = require( 'fs' ),
  stat = fs.stat;
PNG = require('pngjs').PNG;
var path = require('path');

/**
 * 原文件目录
 */
var inputDir = "./input/";
/**
 * 目标文件目录
 */
var outputDir = "./output/";

/**
 * 裁剪
 * @param fullpath 文件路径
 */
function doTask(fullPath) {
    fs.createReadStream(fullPath)
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function() {
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
            var radius = this.height / 2;
            if(y >= Math.sqrt(Math.pow(radius, 2) - Math.pow(x - radius, 2)) + radius || y <= -(Math.sqrt(Math.pow(radius, 2) - Math.pow(x - radius, 2))) + radius) {
                this.data[idx + 3] = 0;
            }
        }
    }
        this.pack().pipe(fs.createWriteStream(fullPath));
    });
}

/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
var copy = function( src, dst ){
  // 读取目录中的所有文件/目录
  fs.readdir( src, function( err, paths ){
    if( err ){
      throw err;
    }
    paths.forEach(function( path ){
      var _src = src + '/' + path,
        _dst = dst + '/' + path,
        readable, writable;   
      stat( _src, function( err, st ){
        if( err ){
          throw err;
        }
        // 判断是否为文件
        if( st.isFile() ){
          // 创建读取流
          readable = fs.createReadStream( _src );
          // 创建写入流
          writable = fs.createWriteStream( _dst ); 
          // 通过管道来传输流
          readable.pipe( writable ).on('finish',function(){
             console.log("finish", _src, _dst);
             doTask(_dst);
          });;
        }
        // 如果是目录则递归调用自身
        else if( st.isDirectory() ){
          exists( _src, _dst, copy );
        }
      });
    });
  });
};

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( src, dst, callback ){
  fs.exists( dst, function( exists ){
    // 已存在
    if( exists ){
      callback( src, dst );
    }
    // 不存在
    else{
      fs.mkdir( dst, function(){
        callback( src, dst );
      });
    }
  });
};

 /** 删除目录 */
function delDir(path){
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}

// 清空目录
delDir(outputDir);

// 复制目录
exists(inputDir, outputDir, copy);