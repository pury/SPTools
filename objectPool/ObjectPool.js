/**
 * 对象池
 */
var ObjectPool = (function () {
    function ObjectPool() {
        this._pool = {};
        this._list = [];
    }

    /** 
     * 创建一个对象
     * @param classFactory {Function} 对象类
     * @param createClass  {Function} 自定义创建带参对象
     */
    ObjectPool.prototype.createObject = function (classFactory, createClass) {
        var result_sj;
        var key = classFactory.key;
        var arr = this._pool[key];
        if (arr != null && arr.length) {
            result_sj = arr.shift();
        }
        else {
            if (createClass)
            {
                result_sj = createClass();
            }
            else
            {
                result_sj = new classFactory();
            }
            result_sj.key = key;
        }
        this._list.push(result_sj);
        return result_sj;
    };

    /**
     * 销毁一个对象
     */
    ObjectPool.prototype.destroyObject = function (obj) {
        var key = obj.key;
        if (this._pool[key] == null) {
            this._pool[key] = [];
        }
        this._pool[key].push(obj);
        var index = this._list.indexOf(obj);
        if (index != -1) {
            this._list.splice(index, 1);
        }
    };

    ObjectPool.getInstance = function () {
        if (ObjectPool._instance == null) {
            ObjectPool._instance = new ObjectPool();
        }
        return ObjectPool._instance;
    };
    return ObjectPool;
}());
