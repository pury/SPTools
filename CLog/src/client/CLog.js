/**
 * @File: CLog.js
 * @Description: CLog
 *
 * @Author:  Pury <szwzjx@gmail.com>
 * @Version: 0.0.1
 * @Date:    2016-4-6
 *
 * Copyright © 2015 - 2016 pury.org.   
 * All rights reserved.
 */

var CLog = CLog || {};
CLog.IP = "192.168.1.102";
CLog.PORT = "80";
CLog.DEBUG = true;
CLog.mNickName = "test";
var XMLHttpReq;  

function createXMLHttpRequest() 
{  
    try 
    {  
        XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
    }  
    catch(E) 
    {  
        try 
        {  
            XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }  
        catch(E) 
        {  
            XMLHttpReq = new XMLHttpRequest();
        }  
    }  
}  

function sendAjaxRequest(content) 
{  
	var url = "http://" + CLog.IP + ":" + CLog.PORT + "/clog/src/server/CLog.php?log=" + content + "&nickName=" + (CLog.mNickName || "NULL");
    createXMLHttpRequest();                                
    XMLHttpReq.open("get", url, true);  
    XMLHttpReq.onreadystatechange = processResponse; 
    XMLHttpReq.send(null);  
}  

function processResponse() 
{ 
  
}  

/**
 * CLog
 *
 * @class
 */
function Log()
{
	return;
}

Log.getTime = function()
{
	var myDate = new Date();
	myDate.getYear();       
	myDate.getFullYear();   
	myDate.getMonth();      
	myDate.getDate();     
	myDate.getDay();      
	myDate.getTime();      
	myDate.getHours();      
	myDate.getMinutes();    
	myDate.getSeconds();  
	myDate.getMilliseconds();   
	myDate.toLocaleDateString();    
	var mytime=myDate.toLocaleTimeString();   
	myDate.toLocaleString( );       
	var time = "[";
	time += myDate.getFullYear() + "-" + myDate.getMonth() + "-" + myDate.getDate() + " "
			+ myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + "." + myDate.getMilliseconds() +  "]";
	return time;
}

Log.getMsg = function(type, data)
{
	var name = CLog.mNickName || "NULL"
	var time = Log.getTime();
	return time + " [" + type + "] " + "[" + name + "]: " + data;
};

Log.l = function(data, flag) 
{
	if(CLog.DEBUG)
	{
		var msg = Log.getMsg("Log", data);

		if(flag)
		{
			console.log("%c" + msg, "color, #3366cc");

		}
		else
		{
			console.log(msg)
		}

		sendAjaxRequest(msg);
	}
};

Log.w = function(data)
{
	if(CLog.DEBUG)
	{
		var msg = Log.getMsg("Warn", data);
		console.warn(msg)
		sendAjaxRequest(msg);
	}
};

Log.e = function(data)
{
	if(CLog.DEBUG)
	{
		var msg = Log.getMsg("Error", data);
		console.error(msg);
		sendAjaxRequest(msg);
	}
};

Log.i = function(data)
{
	if(CLog.DEBUG)
	{
		var msg = Log.getMsg("Info", data);
		console.info(msg);
		sendAjaxRequest(msg);
	}
};

CLog.Log = Log;