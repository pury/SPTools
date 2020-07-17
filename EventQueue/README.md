###Test Demo

        PLib.Queue.start();
        
        var handleEvent = function()
        {
        	setTimeout(PLib.Queue.pop.bind(PLib.Queue), 2000);	
        };
        
        function TestQueue(name)
        {
        	this.name = name;	
        }
        
        TestQueue.prototype.show = function(value)
        {
        	console.log(this.name + ': ' + value);
        	handleEvent();
        };
        
        var demo1 = new TestQueue('demo1');
        var demo2 = new TestQueue('demo2');
        var demo3 = new TestQueue('demo3');
        
        PLib.Queue.push(demo1.show, demo1, ['value1']);
        PLib.Queue.push(demo2.show, demo2, ['value2']);
        PLib.Queue.push(demo3.show, demo3, ['value3']);
