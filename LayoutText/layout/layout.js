/**
 * @File: index.html
 * @Description: index
 *
 * @Author:  Pury <szwzjx@gmail.com>
 * @Version: 0.0.1
 * @Date:    2016-7-2
 *
 * Copyright © 2015 - 2016 pury.org.   
 * All rights reserved.
 */

var LayoutText = (function(){
	/**
	 * LayoutText
	 *
	 * @class
	 */
	function LayoutText()
	{
	
	}

	var p = LayoutText.prototype;

	/**
	 * justifyText
	 * 
	 * @method
	 * @param   canvas
	 * @param  {String} line 
	 * @param  {Number} width max width
	 * @return {String} result 
	 */
	p.justifyText = function(canvas, line, width)
	{
		var M = 0;
		var result = "";
		var words = line.split(" ");
		var N = words.length - 1;
		var spaceWidth = canvas.measureText(" ").width;
		var lastWidth = width - canvas.measureText(line).width;

		if(lastWidth < spaceWidth || N == 0)
		{
			return line;	
		}
		else
		{
			M = Math.floor(lastWidth / spaceWidth);	
		}

		var residue = M % N;
		var num = Math.floor(M / N);
		var positions = [];
		var ran = 0;
		var realNum = 0;

		for(var i = 0; i < residue; i++)
		{
			var ran = Math.floor(Math.random() * N);	
			positions[ran] = positions[ran] === undefined ? 0 : ++positions[ran];
		}
		
		for(i = 0; i < N; i++)
		{
			result += words[i] + " ";
			realNum = 0;

			if(positions[i] !== undefined)
			{
				realNum = positions[i] + 1;	
			}

			realNum += num;

			for(var j = 0; j < realNum; j++)
			{
				result += " ";	
			}
		}

		if(N > 0)
		{
			result += words[N];	
		}

		return result;
	};

	/**
	 * wrapBySpace
	 *
	 * @method
	 * @param   canvas  
	 * @param  {String}  width 
	 * @param  {String}  content 
	 * @param  {Boolean} justify Stretches the lines so that each line has equal width.
	 * @return {Array}   result 
	 */
	p.wrapBySpace = function(canvas, width, content, justify)
	{
		var self = this;
		var result = [];
		var item = "";
		var words = [];
		content = content.split("\n");

		for(var i = 0, len = content.length; i < len; i++)
		{
			var line = "";
			var lineTest = "";
			item = content[i];
			words = item.split(" ");
			
			for(var j = 0; j < words.length; j++)
			{
				lineTest = line + words[j] + " ";	

				if(canvas.measureText(lineTest).width > width)
				{
					line = line.substring(0, line.length - 1);
					result.push(justify ? self.justifyText(canvas, line, width) : line);
					line = words[j] + " ";		
				}
				else
				{
					line = lineTest;	
				}
			}

			if(line.length > 0)
			{
				result.push(justify ? self.justifyText(canvas, line.trim(), width) : line.trim());
			}
		}

		return result;
	};

	return new LayoutText;
	
})();

var cvs = document.getElementById("ctx");
var cvs2 = document.getElementById("ctx2");
var ctx = cvs.getContext("2d");
var ctx2 = cvs2.getContext("2d");
cvs.width = 100;
cvs.height = 400;
cvs2.width = 100;
cvs2.height = 400;
ctx.textBaseline = "top";
ctx2.textBaseline = "top";
ctx.rect(0, 0, cvs.width, cvs.height);
ctx2.rect(0, 0, cvs2.width, cvs2.height);
ctx.stroke();
ctx2.stroke();

function render_text(result, ctx, cvs)
{
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	ctx.rect(0, 0, cvs.width, cvs.height);
	ctx.stroke();

	for(var i = 0; i < result.length; i++)
	{
		ctx.fillText(result[i], 0, i * 30 + 10, cvs.width);	
	}
}

function showtext()
{
	var tt = document.getElementById("tt").value;
	var str = tt;
	var layout = LayoutText.wrapBySpace(ctx, cvs.width, str, false);
	render_text(layout, ctx, cvs);
	layout = LayoutText.wrapBySpace(ctx, cvs2.width, str, true);
	render_text(layout, ctx2, cvs2);
}
