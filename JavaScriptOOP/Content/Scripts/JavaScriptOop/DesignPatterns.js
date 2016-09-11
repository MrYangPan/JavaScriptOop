//设计模式
var designPatterns = function () {

    //策略模式
    var strategyMode = function () {

        /*
        策略模式的思想：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换

        定义一系列的算法，把它们各自封装成策略类，算法被
        封装在策略类内部的方法里。在客户对 Context 发起请求的时候， Context 总是把请求委托给这些
        策略对象中间的某一个进行计算。
        */

        var example = function () {
            var performanceS = function () { };
            performanceS.prototype.calculate = function (salary) {
                return salary * 4;
            };
            var performanceA = function () { };
            performanceA.prototype.calculate = function (salary) {
                return salary * 3;
            };
            var performanceB = function () { };
            performanceB.prototype.calculate = function (salary) {
                return salary * 2;
            };
            //接下来定义奖金类 Bonus：
            var Bonus = function () {
                this.salary = null; // 原始工资
                this.strategy = null; // 绩效等级对应的策略对象
            };
            Bonus.prototype.setSalary = function (salary) {
                this.salary = salary; // 设置员工的原始工资
            };
            Bonus.prototype.setStrategy = function (strategy) {
                this.strategy = strategy; // 设置员工绩效等级对应的策略对象
            };
            Bonus.prototype.getBonus = function () { // 取得奖金数额
                return this.strategy.calculate(this.salary); // 把计算奖金的操作委托给对应的策略对象
            };

            return function () {
                var bonus = new Bonus();
                bonus.setSalary(10000);
                bonus.setStrategy(new performanceS()); // 设置策略对象
                console.log(bonus.getBonus()); // 输出： 40000
                bonus.setStrategy(new performanceA()); // 设置策略对象
                console.log(bonus.getBonus()); // 输出： 30000
            }
        }

        //JavaScript 版本的策略模式
        var exampleRewrite = function () {

            /*
            在 上 节中，我们让 strategy 对象从各个策略类中创建而来，这是模拟一些传统面向对象语
            言的实现。实际上在 JavaScript 语言中，函数也是对象，所以更简单和直接的做法是把 strategy
            直接定义为函数：

            同样， Context 也没有必要必须用 Bonus 类来表示，我们依然用 calculateBonus 函数充当
            Context 来接受用户的请求。经过改造，代码的结构变得更加简洁：
            */

            var strategies = {
                "S": function (salary) {
                    return salary * 4;
                },
                "A": function (salary) {
                    return salary * 3;
                },
                "B": function (salary) {
                    return salary * 2;
                }
            };

            var calculateBonus = function (level, salary) {
                return strategies[level](salary);
            };

            return function () {
                console.log(calculateBonus('S', 20000)); // 输出： 80000
                console.log(calculateBonus('A', 10000)); // 输出： 30000
            }
        }

        //让小球运动起来,动画案例
        var example2 = function () {
            var tween = {
                linear: function (t, b, c, d) {
                    return c * t / d + b;
                },
                easeIn: function (t, b, c, d) {
                    return c * (t /= d) * t + b;
                },
                strongEaseIn: function (t, b, c, d) {
                    return c * (t /= d) * t * t * t * t + b;
                },
                strongEaseOut: function (t, b, c, d) {
                    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
                },
                sineaseIn: function (t, b, c, d) {
                    return c * (t /= d) * t * t + b;
                },
                sineaseOut: function (t, b, c, d) {
                    return c * ((t = t / d - 1) * t * t + 1) + b;
                }
            }
            var Animate = function (dom) {
                this.dom = dom; // 进行运动的 dom 节点
                this.startTime = 0; // 动画开始时间
                this.startPos = 0; // 动画开始时， dom 节点的位置，即 dom 的初始位置
                this.endPos = 0; // 动画结束时， dom 节点的位置，即 dom 的目标位置
                this.propertyName = null; // dom 节点需要被改变的 css 属性名
                this.easing = null; // 缓动算法
                this.duration = null; // 动画持续时间
            };
            Animate.prototype.start = function (propertyName, endPos, duration, easing) {
                this.startTime = +new Date; // 动画启动时间
                this.startPos = this.dom.getBoundingClientRect()[propertyName]; // dom 节点初始位置
                this.propertyName = propertyName; // dom 节点需要被改变的 CSS 属性名
                this.endPos = endPos; // dom 节点目标位置
                this.duration = duration; // 动画持续事件
                this.easing = tween[easing]; // 缓动算法

                var self = this;
                var timeId = setInterval(function () { // 启动定时器，开始执行动画
                    if (self.step() === false) { // 如果动画已结束，则清除定时器
                        clearInterval(timeId);
                    }
                }, 3);
            };
            Animate.prototype.step = function () {
                var t = +new Date; // 取得当前时间
                if (t >= this.startTime + this.duration) { // (1)
                    this.update(this.endPos); // 更新小球的 CSS 属性值
                    return false;
                }
                var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
                // pos 为小球当前位置
                this.update(pos); // 更新小球的 CSS 属性值
                return true;
            };
            Animate.prototype.update = function (pos) {
                this.dom.style[this.propertyName] = pos + 'px';
            };

            return function () {
                var div = document.getElementById('div');
                var animate = new Animate(div);
                animate.start('left', 500, 1000, 'strongEaseOut');
                // animate.start( 'top', 1500, 500, 'strongEaseIn' );
            };
            //return { awe: awe }
        };

        //原始验证
        var originalValidate = function () {
            var registerForm = document.getElementById('registerForm');
            registerForm.onsubmit = function () {
                if (registerForm.userName.value === '') {
                    alert(' 用户名不能为空');
                    return false;
                }
                if (registerForm.password.value.length < 6) {
                    alert(' 密码长度不能少于 6 位');
                    return false;
                }
                if (!/(^1[3|5|8][0-9]{9}$)/.test(registerForm.phoneNumber.value)) {
                    alert(' 手机号码格式不正确 ');
                    return false;
                }
                return true;
            }
        }

        //策略模式重构验证(单一验证)
        var strategyValidate = function () {

            var strategies = {
                isNonEmpty: function (value, errorMsg) { // 不为空
                    if (value === '') {
                        return errorMsg;
                    }
                },
                minLength: function (value, length, errorMsg) { // 限制最小长度
                    if (value.length < length) {
                        return errorMsg;
                    }
                },
                isMobile: function (value, errorMsg) { // 手机号码格式
                    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
                        return errorMsg;
                    }
                }
            };

            var Validator = function () {
                this.cache = []; // 保存校验规则
            };
            Validator.prototype.add = function (dom, rule, errorMsg) {
                var ary = rule.split(':'); // 把 strategy 和参数分开
                this.cache.push(function () { // 把校验的步骤用空函数包装起来，并且放入 cache
                    var strategy = ary.shift(); // 用户挑选的 strategy
                    ary.unshift(dom.value); // 把 input 的 value 添加进参数列表
                    ary.push(errorMsg); // 把 errorMsg 添加进参数列表
                    return strategies[strategy].apply(dom, ary);
                });
            };
            Validator.prototype.start = function () {
                for (var i = 0, validatorFunc; validatorFunc === this.cache[i++];) {
                    var msg = validatorFunc(); // 开始校验，并取得校验后的返回信息
                    if (msg) { // 如果有确切的返回值，说明校验没有通过
                        return msg;
                    }
                }
            };

            var validataFunc = function () {
                var validator = new Validator(); // 创建一个 validator 对象
                /***************添加一些校验规则 ****************/
                validator.add(registerForm.userName, 'isNonEmpty', ' 用户名不能为空');
                validator.add(registerForm.password, 'minLength:6', ' 密码长度不能少于 6 位');
                validator.add(registerForm.phoneNumber, 'isMobile', ' 手机号码格式不正确 ');
                var errorMsg = validator.start(); // 获得校验结果
                return errorMsg; // 返回校验结果
            };

            var volidate = function () {
                var registerForm = document.getElementById('registerForm');
                registerForm.onsubmit = function () {
                    var errorMsg = validataFunc(); // 如果 errorMsg 有确切的返回值，说明未通过校验
                    if (errorMsg) {
                        alert(errorMsg);
                        return false; // 阻止表单提交
                    }
                }
            }

            return { volidate: volidate };
        }

        ////策略模式重构验证(多重验证)
        var strategyManyValidate = function () {

            var strategies = {
                isNonEmpty: function (value, errorMsg) { // 不为空
                    if (value === '') {
                        return errorMsg;
                    }
                },
                minLength: function (value, length, errorMsg) { // 限制最小长度
                    if (value.length < length) {
                        return errorMsg;
                    }
                },
                isMobile: function (value, errorMsg) { // 手机号码格式
                    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
                        return errorMsg;
                    }
                }
            };

            var Validator = function () {
                this.cache = [];
            };
            Validator.prototype.add = function (dom, rules) {
                var self = this;
                for (var i = 0, rule; rule = rules[i++];) {
                    (function (rule) {
                        var strategyAry = rule.strategy.split(':');
                        var errorMsg = rule.errorMsg;
                        self.cache.push(function () {
                            var strategy = strategyAry.shift();
                            strategyAry.unshift(dom.value);
                            strategyAry.push(errorMsg);
                            return strategies[strategy].apply(dom, strategyAry);
                        });
                    })(rule);
                }
            };
            Validator.prototype.start = function () {
                for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
                    var errorMsg = validatorFunc();
                    if (errorMsg) {
                        return errorMsg;
                    }
                }
            };

            var validate = function () {
                var registerForm = document.getElementById('registerForm');
                var validataFunc = function () {
                    var validator = new Validator();
                    validator.add(registerForm.userName, [{
                        strategy: 'isNonEmpty',
                        errorMsg: ' 用户名不能为空'
                    }, {
                        strategy: 'minLength:6',
                        errorMsg: ' 用户名长度不能小于 10 位'
                    }]);
                    validator.add(registerForm.password, [{
                        strategy: 'minLength:6',
                        errorMsg: ' 密码长度不能小于 6 位'
                    }]);
                    validator.add(registerForm.phoneNumber, [{
                        strategy: 'isMobile',
                        errorMsg: ' 手机号码格式不正确 '
                    }]);
                    var errorMsg = validator.start();
                    return errorMsg;
                };
                registerForm.onsubmit = function () {
                    var errorMsg = validataFunc();
                    if (errorMsg) {
                        alert(errorMsg);
                        return false;
                    }
                }
            }
            return { validate: validate };

        }

        return { example2: example2 };
    }

    //代理模式
    var proxy = function () {

        //图片加载
        var example = function () {
            var myImage = (function () {
                var imgNode = document.createElement('img');
                document.body.appendChild(imgNode);
                return {
                    setSrc: function (src) {
                        imgNode.src = src;
                    }
                }
            })();
            myImage.setSrc('http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg');
        }

        //虚拟代理实现图片预加载 
        var example1 = function () {

            var myImage = (function () {
                var imgNode = document.createElement('img');
                document.body.appendChild(imgNode);
                return {
                    setSrc: function (src) {
                        imgNode.src = src;
                    }
                }
            })();
            var proxyImage = (function () {
                var img = new Image;
                img.onload = function () {
                    myImage.setSrc(this.src);
                }
                return {
                    setSrc: function (src) {
                        myImage.setSrc('file:// /C:/Users/svenzeng/Desktop/loading.gif');
                        img.src = src;
                    }
                }
            })();
            proxyImage.setSrc('http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg');
        }

        //代理和本体接口的一致性 
        var example2 = function () {
            var myImage = (function () {
                var imgNode = document.createElement('img');
                document.body.appendChild(imgNode);
                return function (src) {
                    imgNode.src = src;
                }
            })();
            var proxyImage = (function () {
                var img = new Image;
                img.onload = function () {
                    myImage(this.src);
                }
                return function (src) {
                    myImage('file:// /C:/Users/svenzeng/Desktop/loading.gif');
                    img.src = src;
                }
            });
            proxyImage('http:// imgcache.qq.com/music// N/k/000GGDys0yA0Nk.jpg');
        }

        //缓存代理
        var example3 = function () {
            //缓存代理的例子——计算乘积 
            var mult = function () {
                console.log('开始计算乘积');
                var a = 1;
                for (var i = 0, l = arguments.length; i < l; i++) {
                    a = a * arguments[i];
                }
                return a;
            };
            var proxyMult = (function () {
                var cache = {};
                return function () {
                    var args = Array.prototype.join.call(arguments, ',');
                    if (args in cache) {
                        return cache[args];
                    }
                    return cache[args] =
                        mult.apply(this, arguments);
                }
            })();
            mult(2, 3);    // 输出：6 
            mult(2, 3, 4);    // 输出：24 
        }

        //用高阶函数动态创建代理

    }

    //迭代器模式
    var iterator = function () {

        /*迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象 的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，
        即 使不关心对象的内部构造，也可以按顺序访问其中的每个元素
        */

        //Jquery中的$.each 函数
        $.each([1, 2, 3], function (i, n) {
            console.log('当前下标为： ' + i); console.log('当前值为:' + n);
        });

        //自己实现
        var each = function (ary, callback) {
            for (var i = 0, l = ary.length; i < l; i++) {
                callback.call(ary[i], i, ary[i]);  // 把下标和元素当作参数传给 callback 函数    
            }
        };
        each([1, 2, 3], function (i, n) {
            alert([i, n]);
        });






    }

    //测试
    return { strategyMode: strategyMode };


}();