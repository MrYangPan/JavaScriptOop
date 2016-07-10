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


        return { example2: example2 };
    }


    return { strategyMode: strategyMode };


}();