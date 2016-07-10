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






    }










}();