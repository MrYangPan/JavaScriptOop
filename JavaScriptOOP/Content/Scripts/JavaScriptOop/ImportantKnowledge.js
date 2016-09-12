/*
this的指向 :
1. 作为对象的方法调用
2.作为普通函数调用。
3.构造器调用
4. Function.prototype.call 或 Function.prototype.apply 调用
*/
var query = {};
query.init = function () {

    //query.first();
    //query.second();
    //query.three();
    //query.four();
    query.callApply();

}

//作为对象的方法调用 :当函数作为对象的方法被调用时，this 指向该对象
query.first = function () {
    window.a = 'globalName';
    var obj = {
        a: 1,
        getA: function () {
            console.log(this === obj);    // 输出：true         
            console.log(this.a);    // 输出: 1  
        },
        getB: function () {
            return this.a;
        }
    };
    obj.getA();
}

// 作为普通函数调用 :也就是我们常说的普通函数方式，此时的 this 总是指向全局对象。在浏览器的 JavaScript里，这个全局对象是 window 对象
query.second = function () {

    window.name = 'globalName';
    var getName = function () {
        return this.name;
    };
    console.log(getName());    // 输出：globalName 

    //或者

    var myObject = {
        name: 'sven',
        getName: function () {
            return this.name;
        }
    };
    var getName2 = myObject.getName;
    console.log(getName2());    // globalName 
}

//JavaScript 中没有类，但是可以从构造器中创建对象，同时也提供了 new 运算符，使得构造 器看起来更像一个类,，通常情况下，构造器里的 this 就指向返回的这个对象
query.three = function () {
    var myClass = function () {
        this.name = 'sven';
    };
    var obj = new myClass();
    console.log(obj.name);     // 输出：sven 

    //但用 new 调用构造器时，还要注意一个问题，如果构造器显式地返回了一个 object 类型的对 象，那么此次运算结果终会返回这个对象，而不是我们之前期待的 this
    var myClass2 = function () {
        this.name = 'sven';
        return {    // 显式地返回一个对象         
            name: 'anne'
        }
    };
    var obj2 = new myClass2();
    console.log(obj2.name);     // 输出：anne 
}

//丢失的this
query.four = function () {

    var obj = {
        myName: 'sven',
        getName: function () {
            return this.myName;
        }
    };
    //console.log(obj.getName());    // 输出：'sven'  
    var getName2 = obj.getName;
    //console.log(getName2());    // 输出：undefined 

    /*
    在 Chrome、Firefox、IE10中执行过后就会发现，这段代码抛出了一个异常。这是因为许多 引擎的 document.getElementById 方法的内部实现中需要用到 this。
    这个 this 本来被期望指向 document，当 getElementById 方法作为 document 对象的属性被调用时，方法内部的 this 确实是指 向 document 的。
    
    我们可以尝试利用 apply 把 document 当作 this 传入 getId 函数，帮助“修正”this： 
    */

    document.getElementById = (function (func) {
        return function () {
            return func.apply(document, arguments);
        }
    })(document.getElementById);

    var getId = document.getElementById;
    var div = getId('div1');
    //自己的理解
    var div2 = getId.apply(null, ['div1']);
    console.log(div.id);    // 输出： div1 
    console.log(div2.id);
}

/*----------------------------------------------------------------------------------------------------------------------------*/

/*call 和 apply 的用途 
Function.prototype.call 和 Function.prototype.apply 都是非常常用的方法。它们的作用一模 一样，区别仅在于传入参数形式的不同
apply 接受两个参数，第一个参数指定了函数体内 this 对象的指向，第二个参数为一个带下 标的集合，这个集合可以为数组，也可以为类数组apply
call 传入的参数数量不固定，跟 apply 相同的是，第一个参数也是代表函数体内的 this 指向， 从第二个参数开始往后，每个参数被依次传入函数

当使用 call 或者 apply 的时候，如果我们传入的第一个参数为 null，函数体内的 this 会指 向默认的宿主对象，在浏览器中则是 window
*/
query.callApply = function () {

    var func = function (a, b, c) {
        //console.log(this === window);    // 输出 true
    }
    func.apply(null, [1, 2, 3]);

    //有时候我们使用 call 或者 apply 的目的不在于指定 this 指向，而是另有用途，比如借用其 他对象的方法。那么我们可以传入 null 来代替某个具体的对象： 
    var re = Math.max.apply(null, [1, 2, 5, 3, 4]); // 输出：5 
    //console.log(re);

    /*用法： */

    //1. 改变 this 指向 ,call 和 apply 常见的用途是改变函数内部的 this 指向
    var method1 = (function () {
        //假如该事件函数中有一个内部函数 func，在事件内部调用 func 函数时，func 函数体内的 this 就指向了 window，而不是我们预期的 div
        document.getElementById('div1').onclick = function () {
            console.log(this.id); // 输出：div1     
            var func = function () {
                console.log(this.id); // 输出：undefined    
            }
            func();
        };

        //这时候我们用 call 来修正 func 函数内的 this，使其依然指向 div： 
        document.getElementById('div1').onclick = function () {
            var func = function () {
                console.log(this.id); // 输出：div1    
            }
            func.call(this);
        };
    })();

    // 2.Function.prototype.bind 
    var method2 = (function () {
        //大部分高级浏览器都实现了内置的Function.prototype.bind，用来指定函数内部的this指向， 即使没有原生的 Function.prototype.bind 实现，我们来模拟一个也不是难事
        Function.prototype.bind = function (context) {
            var self = this; // 保存原函数     
            return function () { // 返回一个新的函数         
                return self.apply(context, arguments); // 执行新的函数的时候，会把之前传入的 context                                                     
                // 当作新函数体内的 this    
            }
        };
        var obj = {
            name: 'sven'
        };
        var func = function () {
            console.log(this.name); // 输出：sven 
        }.bind(obj);
        func();

        /*
        在 Function.prototype.bind 的内部实现中，我们先把 func 函数的引用保存起来，然后返回一 个新的函数。当我们在将来执行 func 函数时，实际上先执行的是这个刚刚返回的新函数。
        在新 函数内部，self.apply( context, arguments )这句代码才是执行原来的 func 函数，并且指定 context 对象为 func 函数体内的 this

        这是一个简化版的 Function.prototype.bind 实现，通常我们还会把它实现得稍微复杂一点， 使得可以往 func 函数中预先填入一些参数： 
        */

        Function.prototype.bind = function () {
            var self = this,    // 保存原函数         
                context = [].shift.call(arguments),    // 需要绑定的 this 上下文         
                args = [].slice.call(arguments);    // 剩余的参数转成数组     
            return function () {    // 返回一个新的函数         
                return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
                // 执行新的函数的时候，会把之前传入的 context 当作新函数体内的 this             
                // 并且组合两次分别传入的参数，作为新函数的参数       
            }
        };
        var obj = {
            name: 'sven'
        };
        var func = function (a, b, c, d) {
            console.log(this.name);        // 输出：sven     
            console.log([a, b, c, d]); // 输出：[ 1, 2, 3, 4 ] 
        }.bind(obj, 1, 2);
        func(3, 4);

    })();

    //3.借用其他对象的方法 
    var method3 = (function () {
        //我们知道，杜鹃既不会筑巢，也不会孵雏，而是把自己的蛋寄托给云雀等其他鸟类，让它们 代为孵化和养育。同样，在 JavaScript中也存在类似的借用现象
        //借用方法的第一种场景是“借用构造函数”，通过这种技术，可以实现一些类似继承的效果
        var A = function (name) {
            this.name = name;
        };
        var B = function () {
            A.apply(this, arguments);
        };
        B.prototype.getName = function () {
            return this.name;
        };
        var b = new B('sven');
        console.log(b.getName());  // 输出： 'sven' 

        /*
        函数的参数列表 arguments 是一个类数组对象，虽然它也有“下标”，但它并非真正的数组， 所以也不能像数组一样，进行排序操作或者往集合里添加一个新的元素。
        这种情况下，我们常常 会借用 Array.prototype 对象上的方法。比如想往 arguments 中添加一个新的元素，通常会借用 Array.prototype.push
        */
        (function () {
            Array.prototype.push.call(arguments, 3,4,5,6,7);
            console.log(arguments);    // 输出[1,2,3,4,5,6,7] 
        })(1, 2);


    })();
}