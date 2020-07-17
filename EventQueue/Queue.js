/**
 * @File: Queue.js
 * @Description: Queue
 *
 * @Author:  Pury <szwzjx@gmail.com>
 * @Version: 0.0.1
 * @Date:    2016-5-18
 *
 * Copyright © 2015 - 2016 pury.org.   
 * All rights reserved.
 */
 
var PLib = PLib || {};

/**
 * Queue
 * 
 * @class
 */
function Queue()
{
	this.init();
}

Queue.prototype.init = function()
{
	this.mEvent = {};
	this.mQuene = [];
	this.mLength = 0;
	this.mTimer = null;
};

Queue.prototype.push = function(fun, classins, param)
{
	this.mQuene.push({
		fun: fun,
		classins: classins,
		param: param,
		flag: false
	});

	console.log("[Queue.push]: length = " + this.mQuene.length);
};

Queue.prototype.pop = function()
{
	var self = this;

	if(self.mQuene && self.mQuene.length)
	{
		if(self.mQuene[0].flag)
		{
			var quene = self.mQuene.shift();
			quene = null;
			console.log("[Queue.pop]: length = " + this.mQuene.length);
		}
		else
		{
			console.error("[Queue.pop]: flag is false || fun = " + self.mQuene[0].fun);
		}
	}
	else
	{
		console.error("[Queue.pop]: self.mQuene.length <= 0");
	}
};

Queue.prototype.update = function()
{
	var self = this;

	if(self.mQuene && self.mQuene.length)
	{
		var quene = self.mQuene[0];

		if(!quene.flag)
		{
			quene.flag = true;
			quene.fun.apply(quene.classins, quene.param);
		}
	}
};

Queue.prototype.start = function()
{
	var self = this;
	var fun = function()
	{
		self.update();
	};

	self.stop();
	self.mLength = 0;
	self.mTimer = setInterval(fun, 300);
};

Queue.prototype.stop = function()
{
	if(this.mTimer)
	{
		clearInterval(this.mTimer)
		this.mTimer = null;
	}	
};

Queue.getInstance = function()
{
	if(!Queue.instance)
	{
		Queue.instance = new Queue;
	}

	return Queue.instance; 	
};

PLib.Queue = Queue.getInstance();
