/// <var>The java script oop</var>
var javaScriptOop = function () {

    /*
    编程语言按照数据类型大体可以分为两类，一类是静态类型语言，另一类是动态类型语言。 静态类型语言在编译时便已确定变量的类型，而动态类型语言的变量类型要到程序运行的时 候，待变量被赋予某个值之后，才会具有某种类型。 
    静态类型优缺点：在编译时就能发现类型不匹配的错误，明确地规定了数据类型，编译器还可以针对这些信息对程序进行一些优化工作，提高程序执行速度
                    类型的声明也会增加更多的代码，在程序编写过 程中，这些细节会让程序员的精力从思考业务逻辑上分散开来
    动态类型优缺点：编写的代码数量更少，看起来也更加简洁，程序员可以把精力更多地放在业务逻辑上面
                    无法保证变量的类型，从而在程序的运行期有可能发生跟类型相关的错误

    在 JavaScript 中，当我们对一个变量赋值时，显然不需要考虑它的类型，因此，JavaScript 是一门典型的动态类型语言
    动态类型语言对变量类型的宽容给实际编码带来了很大的灵活性。由于无需进行类型检测， 我们可以尝试调用任何对象的任意方法，而无需去考虑它原本是否被设计为拥有该方法
    这一切都建立在鸭子类型（duck typing）的概念上，鸭子类型的通俗说法是：“如果它走起 路来像鸭子，叫起来也是鸭子，那么它就是鸭子。” 
    
    案例：从前在 JavaScript王国里，有一个国王，他觉得世界上最美妙的声音就是鸭子的叫 声，于是国王召集大臣，要组建一个 1000 只鸭子组成的合唱团。大臣们找遍了全国， 终于找到 999只鸭子，但是始终还差一只，最后大臣发现有一只非常特别的鸡，
    它的叫 声跟鸭子一模一样，于是这只鸡就成为了合唱团的最后一员
    */

    /// <summary>
    /// 鸭子和鸡的案例
    /// </summary>
    /// <returns></returns>
    var duckAndChicken = function () {
        var duck = {
            duckSinging: function () {
                console.log('嘎嘎嘎');
            }
        };
        var chicken = {
            duckSinging: function () {
                console.log('嘎嘎嘎');
            }
        }
        var choir = [];    // 合唱团 
        var joinChoir = function (animal) {
            if (animal && typeof animal.duckSinging === 'function') {
                choir.push(animal);
                console.log('恭喜加入合唱团');
                console.log('合唱团已有成员数量:' + choir.length);
            }
        };
        return function () {
            joinChoir(duck);    // 恭喜加入合唱团 
            joinChoir(chicken);    // 恭喜加入合唱团
        }

        /*
        我们看到，对于加入合唱团的动物，大臣们根本无需检查它们的类型，而是只需要保证它们 拥有 duckSinging 方法。如果下次期望加入合唱团的是一只小狗，而这只小狗刚好也会鸭子叫， 我相信这只小狗也能顺利加入。 

        在动态类型语言的面向对象设计中，鸭子类型的概念至关重要。利用鸭子类型的思想，我们 不必借助超类型的帮助，就能轻松地在动态类型语言中实现一个原则：“面向接口编程，而不是 面向实现编程”。例如，一个对象若有 push 和 pop 方法，
        并且这些方法提供了正确的实现，它就 可以被当作栈来使用。一个对象如果有 length 属性，也可以依照下标来存取属性（好还要拥 有 slice 和 splice 等方法），这个对象就可以被当作数组来使用。 
        
        在静态类型语言中，要实现“面向接口编程”并不是一件容易的事情，往往要通过抽象类或 者接口等将对象进行向上转型。当对象的真正类型被隐藏在它的超类型身后，这些对象才能在类 型检查系统的“监视”之下互相被替换使用。
        只有当对象能够被互相替换使用，才能体现出对象 多态性的价值。 

        “面向接口编程”是设计模式中重要的思想，但在 JavaScript语言中，“面向接口编程”的 过程跟主流的静态类型语言不一样，因此，在 JavaScript中实现设计模式的过程与在一些我们熟 悉的语言中实现的过程会大相径庭。 
        */
    }

    /// <summary>
    /// 多态
    /// </summary>
    /// <returns></returns>
    var polymorphism = function () {

        /*
        案例：主人家里养了两只动物，分别是一只鸭和一只鸡，当主人向它们发出“叫”的命令 时，鸭会“嘎嘎嘎”地叫，而鸡会“咯咯咯”地叫。这两只动物都会以自己的方式来发 出叫声。它们同样“都是动物，并且可以发出叫声”，
        但根据主人的指令，它们会各自发出不同的叫声
        */

        /// <summary>
        /// 重构之前
        /// </summary>
        /// <returns></returns>
        var morphism = function () {
            var duck = function () { };
            var chicken = function () { };
            var makeSound = function (animal) {
                if (animal instanceof duck) {
                    console.log('嘎嘎嘎');
                } else if (animal instanceof chicken) {
                    console.log('咯咯咯');
                }
            };
            return function () {
                makeSound(new duck());      // 嘎嘎嘎 
                makeSound(new chicken());   // 咯咯咯
            }

            /*
            说明：这段代码确实体现了“多态性”，当我们分别向鸭和鸡发出“叫唤”的消息时，它们根据此 消息作出了各自不同的反应。但这样的“多态性”是无法令人满意的，如果后来又增加了一只动 物，比如狗，显然狗的叫声是“汪汪汪”，
            此时我们必须得改动 makeSound 函数，才能让狗也发出 叫声。修改代码总是危险的，修改的地方越多，程序出错的可能性就越大，而且当动物的种类越 来越多时，makeSound 有可能变成一个巨大的函数
            
            多态背后的思想是将“做什么”和“谁去做以及怎样去做”分离开来，也就是将“不变的事 物”与 “可能改变的事物”分离开来。在这个故事中，动物都会叫，这是不变的，但是不同类 型的动物具体怎么叫是可变的。把不变的部分隔离出来，
            把可变的部分封装起来，这给予了我们 扩展程序的能力，程序看起来是可生长的，也是符合开放—封闭原则的，相对于修改代码来说， 仅仅增加代码就能完成同样的功能，这显然优雅和安全得多
            */
        }

        /// <summary>
        /// 重构之后
        /// </summary>
        /// <returns></returns>
        var morphism2 = function () {
            var makeSound = function (animal) {
                animal.sound();
            };
            var duck = function () { }
            duck.prototype.sound = function () {
                console.log('嘎嘎嘎');
            };
            var chicken = function () { }
            chicken.prototype.sound = function () {
                console.log('咯咯咯');
            };
            makeSound(new duck());        // 嘎嘎嘎 
            makeSound(new chicken());     // 咯咯咯 

            /*
            现在我们向鸭和鸡都发出“叫唤”的消息，它们接到消息后分别作出了不同的反应。如果有 一天动物世界里又增加了一只狗，这时候只要简单地追加一些代码就可以了，而不用改动以前的 makeSound 函数，如下所示:
            */
            var dog = function () { }
            dog.prototype.sound = function () {
                console.log('汪汪汪');
            };
            makeSound(new dog());     // 汪汪汪 
        }

        /*
        从前面的讲解我们得知，多态的思想实际上是把“做什么”和“谁去做”分离开来，要实现 这一点，归根结底先要消除类型之间的耦合关系。如果类型之间的耦合关系没有被消除，那么我 们在 makeSound 方法中指定了发出叫声的对象是某个类型，
        它就不可能再被替换为另外一个类型。 在 Java中，可以通过向上转型来实现多态。 
        而 JavaScript的变量类型在运行期是可变的。一个 JavaScript对象，既可以表示 Duck 类型的 对象，又可以表示 Chicken 类型的对象，这意味着 JavaScript对象的多态性是与生俱来的
        这种与生俱来的多态性并不难解释。JavaScript作为一门动态类型语言，它在编译时没有类型 检查的过程，既没有检查创建的对象类型，又没有检查传递的参数类型。在1.2.2节的代码示例中， 我们既可以往 makeSound 函数里传递 duck 对象当作参数，
        也可以传递 chicken 对象当作参数
        由此可见，某一种动物能否发出叫声，只取决于它有没有 makeSound 方法，而不取决于它是 否是某种类型的对象，这里不存在任何程度上的“类型耦合”。这正是我们从上一节的鸭子类型 中领悟的道理。在 JavaScript中，
        并不需要诸如向上转型之类的技术来取得多态的效果

        多态在面向对象程序设计中的作用 :
        Martin Fowler在《重构：改善既有代码的设计》里写到：  
            多态的最根本好处在于，你不必再向对象询问“你是什么类型”而后根据得到的答案调用对象的某个行为——你只管调用该行为就是了，其他的一切多态机制都会为你安 排妥当
        Martin Fowler的话可以用下面这个例子很好地诠释： 
            在电影的拍摄现场，当导演喊出“action”时，主角开始背台词，照明师负责打灯 光，后面的群众演员假装中枪倒地，道具师往镜头里撒上雪花。在得到同一个消息时， 每个对象都知道自己应该做什么。如果不利用对象的多态性，
            而是用面向过程的方式来 编写这一段代码，那么相当于在电影开始拍摄之后，导演每次都要走到每个人的面前， 确认它们的职业分工（类型），然后告诉他们要做什么。如果映射到程序中，那么程序 中将充斥着条件分支语句。 

        假设我们要编写一个地图应用，现在有两家可选的地图 API提供商供我们接入自己的应用。 目前我们选择的是谷歌地图，谷歌地图的 API中提供了 show 方法，负责在页面上展示整个地图。 示例代码如下： 
        */

        var map = function () {
            var googleMap = {
                show: function () {
                    console.log('开始渲染谷歌地图');
                }
            };
            var renderMap = function () {
                googleMap.show();
            };
            renderMap();    // 输出：开始渲染谷歌地图 
        }

        /*
        后来因为某些原因，要把谷歌地图换成百度地图，为了让 renderMap 函数保持一定的弹性， 我们用一些条件分支来让 renderMap 函数同时支持谷歌地图和百度地图： 
        */

        var map2 = function () {
            var googleMap = {
                show: function () {
                    console.log('开始渲染谷歌地图');
                }
            };
            var baiduMap = {
                show: function () {
                    console.log('开始渲染百度地图');
                }
            };
            var renderMap = function (type) {
                if (type === 'google') {
                    googleMap.show();
                } else if (type === 'baidu') {
                    baiduMap.show();
                }
            };
            renderMap('google');    // 输出：开始渲染谷歌地图  
            renderMap('baidu');     // 输出：开始渲染百度地图 
        }

        /*
        可以看到，虽然 renderMap 函数目前保持了一定的弹性，但这种弹性是很脆弱的，一旦需要 替换成搜搜地图，那无疑必须得改动 renderMap 函数，继续往里面堆砌条件分支语句
        我们还是先把程序中相同的部分抽象出来，那就是显示某个地图： 
        */

        var map3 = function () {
            var renderMap = function (map) {
                if (map.show instanceof Function) {
                    map.show();
                }
            };
            var googleMap = {
                show: function () {
                    console.log('开始渲染谷歌地图');
                }
            };
            var baiduMap = {
                show: function () {
                    console.log('开始渲染百度地图');
                }
            };
            renderMap(googleMap);    // 输出：开始渲染谷歌地图  
            renderMap(baiduMap);     // 输出：开始渲染百度地图 

            /*
            现在来找找这段代码中的多态性。当我们向谷歌地图对象和百度地图对象分别发出“展示地 图”的消息时，会分别调用它们的 show 方法，就会产生各自不同的执行结果。对象的多态性提 示我们，“做什么”和“怎么去做”是可以分开的，
            即使以后增加了搜搜地图，renderMap 函数仍 然不需要做任何改变，如下所示： 
            */

            var sosoMap = {
                show: function () {
                    console.log('开始渲染搜搜地图');
                }
            };
            renderMap(sosoMap);     // 输出：开始渲染搜搜地图 
        }
        /*
        在这个例子中，我们假设每个地图 API提供展示地图的方法名都是 show，在实际开发中也许 不会如此顺利，这时候可以借助适配器模式来解决问题。
        */
    }

    /// <summary>
    /// 封装
    /// </summary>
    /// <returns></returns>
    var encapsulation = function () {

        /*
        在许多语言的对象系统中，封装数据是由语法解析来实现的，这些语言也许提供了 private、 public、protected 等关键字来提供不同的访问权限。 
        但 JavaScript并没有提供对这些关键字的支持，我们只能依赖变量的作用域来实现封装特性， 而且只能模拟出 public 和 private 这两种封装性。
        */

        var myObject = (function () {
            var name = 'sven';    // 私有（private）变量     
            return {
                getName: function () {    // 公开（public）方法            
                    return name;
                }
            }
        })();
        console.log(myObject.getName());    // 输出：sven 
        console.log(myObject.name); // 输出：undefined 

        /*
        封装类型 :封装类型是静态类型语言中一种重要的封装方式。一般而言，封装类型是通过抽象类和接口 来进行的①。把对象的真正类型隐藏在抽象类或者接口之后，相比对象的类型，客户更关心对象 的行为。在许多静态语言的设计模式中，
                  想方设法地去隐藏对象的类型，也是促使这些模式诞生 的原因之一。比如工厂方法模式、组合模式等
        当然在 JavaScript中，并没有对抽象类和接口的支持。JavaScript本身也是一门类型模糊的语 言。在封装类型方面，JavaScript没有能力，也没有必要做得更多。对于 JavaScript的设计模式实 现来说，不区分类型是一种失色，也可以说是一种解脱。

        封装变化:从设计模式的角度出发，封装在更重要的层面体现为封装变化.
        《设计模式》一书曾提到如下文字:“考虑你的设计中哪些地方可能变化，这种方式与关注会导致重新设计的原因相反。 它不是考虑什么时候会迫使你的设计改变，而是考虑你怎样才能够在不重新设计的情况 下进行改变。
                                        这里的关键在于封装发生变化的概念，这是许多设计模式的主题。” 
        这段文字即是《设计模式》提到的“找到变化并封装之”。《设计模式》一书中共归纳总结了23 种设计模式。从意图上区分，这23种设计模式分别被划分为创建型模式、结构型模式和行为型模式
        拿创建型模式来说，要创建一个对象，是一种抽象行为，而具体创建什么对象则是可以变化 的，创建型模式的目的就是封装创建对象的变化。而结构型模式封装的是对象之间的组合关系。 行为型模式封装的是对象的行为变化。 
        通过封装变化的方式，把系统中稳定不变的部分和容易变化的部分隔离开来，在系统的演变 过程中，我们只需要替换那些容易变化的部分，如果这些部分是已经封装好的，替换起来也相对容易。这可以大程度地保证程序的稳定性和可扩展性。
        */

    }

    /// <summary>
    /// 原型模式和基于原型继承的 JavaScript对象系统 
    /// </summary>
    /// <returns></returns>
    var prototypeModel = function () {

        /*
        在 Brendan Eich为 JavaScript设计面向对象系统时，借鉴了 Self和 Smalltalk这两门基于原型 的语言。之所以选择基于原型的面向对象系统，并不是因为时间匆忙，它设计起来相对简单，而 是因为从一开始 Brendan Eich就没有打算在 JavaScript中加入类的概念。 
        在以类为中心的面向对象编程语言中，类和对象的关系可以想象成铸模和铸件的关系，对象 总是从类中创建而来。而在原型编程的思想中，类并不是必需的，对象未必需要从类中创建而来， 一个对象是通过克隆另外一个对象所得到的。
        就像电影《第六日》一样，通过克隆可以创造另外 一个一模一样的人，而且本体和克隆体看不出任何区别
        原型模式不单是一种设计模式，也被称为一种编程泛型。
        
        使用克隆的原型模式 :从设计模式的角度讲，原型模式是用于创建对象的一种模式，如果我们想要创建一个对象， 一种方法是先指定它的类型，然后通过类来创建这个对象。原型模式选择了另外一种方式，我们 不再关心对象的具体类型，而是找到一个对象，
        然后通过克隆来创建一个一模一样的对象。 

        原型模式的实现关键，是语言本身是否提供了clone方法。ECMAScript 5提供了Object.create 方法，可以用来克隆对象。代码如下： 
        */

        var Plane = function () {
            this.blood = 100;
            this.attackLevel = 1;
            this.defenseLevel = 1;
        };
        var plane = new Plane();
        plane.blood = 500;
        plane.attackLevel = 10;
        plane.defenseLevel = 7;
        var clonePlane = Object.create(plane);
        console.log(clonePlane);   // 输出：Object {blood: 500, attackLevel: 10, defenseLevel: 7} 

        //在不支持 Object.create 方法的浏览器中，则可以使用以下代码： 
        Object.create = Object.create || function (obj) {
            var F = function () { };
            F.prototype = obj;
            return new F();
        }

        /*
        通过上一节的代码，我们看到了如何通过原型模式来克隆出一个一模一样的对象。但原型模式的真正目的并非在于需要得到一个一模一样的对象，而是提供了一种便捷的方式去创建某个类型的对象，克隆只是创建这个对象的过程和手段。 
        在用 Java 等静态类型语言编写程序的时候，类型之间的解耦非常重要。依赖倒置原则提醒我们创建对象的时候要避免依赖具体类型，而用 new XXX 创建对象的方式显得很僵硬。工厂方法模式和抽象工厂模式可以帮助我们解决这个问题，
        但这两个模式会带来许多跟产品类平行的工厂 类层次，也会增加很多额外的代码

        原型模式提供了另外一种创建对象的方式，通过克隆对象，我们就不用再关心对象的具体类型名字。这就像一个仙女要送给三岁小女孩生日礼物，虽然小女孩可能还不知道飞机或者船怎么 说，但她可以指着商店橱柜里的飞机模型说“我要这个”。
        
        当然在 JavaScript这种类型模糊的语言中，创建对象非常容易，也不存在类型耦合的问题。从设计模式的角度来讲，原型模式的意义并不算大 。但 JavaScript本身是一门基于原型的面向对象语言，它的对象系统就是使用原型模式来搭建的，
        在这里称之为原型编程范型也许更合适。 
        */

        /*
        从上一节的讲解中，我们看到了如何在 Io 语言中从无到有地创建一些对象。跟使用“类” 的语言不一样的地方是，Io语言中初只有一个根对象 Object，其他所有的对象都克隆自另外一 个对象。如果 A对象是从 B对象克隆而来的，那么 B对象就是 A对象的原型

        在上一小节的例子中，Object 是 Animal 的原型，而 Animal 是 Dog 的原型，它们之间形成了一 条原型链。这个原型链是很有用处的，当我们尝试调用 Dog 对象的某个方法时，而它本身却没有 这个方法，那么 Dog 对象会把这个请求委托给它的原型 Animal 对象，
        如果 Animal 对象也没有这 个属性，那么请求会顺着原型链继续被委托给 Animal 对象的原型 Object 对象，这样一来便能得 到继承的效果，看起来就像 Animal 是 Dog 的“父类”，Object 是 Animal 的“父类”。 

        这个机制并不复杂，却非常强大，Io和 JavaScript一样，基于原型链的委托机制就是原型继 承的本质。 

        我们来进行一些测试。在 Io的解释器中执行 Dog makeSound 时，Dog 对象并没有 makeSound 方 法，于是把请求委托给了它的原型 Animal 对象 ，而 Animal 对象是有 makeSound 方法的，所以该条 语句可以顺利得到输出
        现在我们明白了原型编程中的一个重要特性，即当对象无法响应某个请求时，会把该请求委 托给它自己的原型

        后整理一下本节的描述，我们可以发现原型编程范型至少包括以下基本规则:
            1.所有的数据都是对象
            2.要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
            3.对象会记住它的原型
            4.如果对象无法响应某个请求，它会把这个请求委托给它自己的原型
        */

        /*
        JavaScript在设计的时候，模仿 Java引入了两套类型机制：基本类型和对象类型。基本类型 包括 undefined、number、boolean、string、function、object。从现在看来，这并不是一个好的 想法
        按照 JavaScript设计者的本意，除了 undefined 之外，一切都应是对象。为了实现这一目标， number、boolean、string 这几种基本类型数据也可以通过“包装类”的方式变成对象类型数据来 处理。
        我们不能说在 JavaScript中所有的数据都是对象，但可以说绝大部分数据都是对象。那么相 信在 JavaScript中也一定会有一个根对象存在，这些对象追根溯源都来源于这个根对象

        事实上，JavaScript中的根对象是 Object.prototype 对象。Object.prototype 对象是一个空的对象。我们在 JavaScript 遇到的每个对象，实际上都是从 Object.prototype 对象克隆而来的， Object.prototype 对象就是它们的原型。
        比如下面的 obj1 对象和 obj2 对象
        */

        var obj1 = new Object();
        var obj2 = {};
        //可以利用 ECMAScript 5提供的 Object.getPrototypeOf 来查看这两个对象的原型： 
        console.log(Object.getPrototypeOf(obj1) === Object.prototype);    // 输出：true 
        console.log(Object.getPrototypeOf(obj2) === Object.prototype);    // 输出：true 

        //在 JavaScript语言里，我们并不需要关心克隆的细节，因为这是引擎内部负责实现的。我 们所需要做的只是显式地调用 var obj1 = new Object()或者 var obj2 = {}。此时，引擎内部会从 Object.prototype 上面克隆一个对象出来，我们终得到的就是这个对象。
        //再来看看如何用 new 运算符从构造器中得到一个对象，下面的代码我们再熟悉不过了： 
        var example = function () {
            function Person(name) {
                this.name = name;
            };
            Person.prototype.getName = function () {
                return this.name;
            };
            var a = new Person('sven');
            console.log(a.name);    // 输出：sven 
            console.log(a.getName());     // 输出：sven 
            console.log(Object.getPrototypeOf(a) === Person.prototype);     // 输出：true 
        }

        /*
        在 JavaScript中没有类的概念，这句话我们已经重复过很多次了。但刚才不是明明调用了 new Person()吗?
        在这里 Person 并不是类，而是函数构造器，JavaScript的函数既可以作为普通函数被调用， 也可以作为构造器被调用。当使用 new 运算符来调用函数时，此时的函数就是一个构造器。 用 new 运算符来创建对象的过程，
        实际上也只是先克隆 Object.prototype 对象，再进行一些其他额 外操作的过程。① 
        */

        //在 Chrome和 Firefox等向外暴露了对象__proto__属性的浏览器下，我们可以通过下面这段代 码来理解 new 运算的过程： 
        var example2 = function () {
            function Person(name) {
                this.name = name;
            };
            Person.prototype.getName = function () {
                return this.name;
            };
            var objectFactory = function () {
                var obj = new Object(), // 从 Object.prototype 上克隆一个空的对象        
                    Constructor = [].shift.call(arguments); // 取得外部传入的构造器，此例是 Person 
                obj.__proto__ = Constructor.prototype; // 指向正确的原型     
                var ret = Constructor.apply(obj, arguments); // 借用外部传入的构造器给 obj 设置属性 
                return typeof ret === 'object' ? ret : obj; // 确保构造器总是会返回一个对象 
            };
            var a = objectFactory(Person, 'sven');
            console.log(a.name);    // 输出：sven 
            console.log(a.getName());     // 输出：sven 
            console.log(Object.getPrototypeOf(a) === Person.prototype);      // 输出：true 

            //我们看到，分别调用下面两句代码产生了一样的结果： 
            var b = objectFactory(A, 'sven');
            var c = new A('sven');
        }

        /*
        实际上，虽然 JavaScript 的对象初都是由 Object.prototype 对象克隆而来的，但对象构造 器的原型并不仅限于 Object.prototype 上，而是可以动态指向其他对象。这样一来，当对象 a 需 要借用对象 b 的能力时，
        可以有选择性地把对象 a 的构造器的原型指向对象 b，从而达到继承的 效果。下面的代码是我们常用的原型继承方式： 

        首先，尝试遍历对象 a 中的所有属性，但没有找到 name 这个属性
        查找 name 属性的这个请求被委托给对象 a 的构造器的原型，它被 a.__proto__ 记录着并且 指向 A.prototype，而 A.prototype 被设置为对象 obj
        在对象 obj 中找到了 name 属性，并返回它的值。 
        */
        var obj = { name: 'sven' };
        var A = function () { };
        A.prototype = obj;
        var a = new A();
        console.log(a.name);    // 输出：sven 

        //当我们期望得到一个“类”继承自另外一个“类”的效果时，往往会用下面的代码来模拟实现
        var A = function () { };
        A.prototype = {
            name: 'sven'
        };
        var B = function () { };
        B.prototype = new A();
        var b = new B();
        console.log(b.name);    // 输出：sven 
        /*
        首先，尝试遍历对象 b 中的所有属性，但没有找到 name 这个属性
        查找 name 属性的请求被委托给对象 b 的构造器的原型，它被 b.__proto__ 记录着并且指向 B.prototype，而 B.prototype 被设置为一个通过 new A()创建出来的对象
        在该对象中依然没有找到 name 属性，于是请求被继续委托给这个对象构造器的原型 A.prototype
        在 A.prototype 中找到了 name 属性，并返回它的值。
        
        和把 B.prototype 直接指向一个字面量对象相比，通过 B.prototype = new A()形成的原型链比 之前多了一层。但二者之间没有本质上的区别，都是将对象构造器的原型指向另外一个对象，继 承总是发生在对象和对象之间

        后还要留意一点，原型链并不是无限长的。现在我们尝试访问对象 a 的 address 属性。而 对象 b 和它构造器的原型上都没有 address 属性，那么这个请求会被终传递到哪里呢?
        解答：实际上，当请求达到 A.prototype，并且在 A.prototype 中也没有找到 address 属性的时候， 请求会被传递给 A.prototype 的构造器原型 Object.prototype，显然 Object.prototype 中也没有 address 属性，但 Object.prototype 的原型是 null，
        说明这时候原型链的后面已经没有别的节点了。 所以该次请求就到此打住，a.address 返回 undefined

        设计模式在很多时候其实都体现了语言的不足之处。Peter Norvig 曾说，设计模式是对语言 不足的补充，如果要使用设计模式，不如去找一门更好的语言。这句话非常正确。不过，作为 Web 前端开发者，
        相信 JavaScript在未来很长一段时间内都是唯一的选择。虽然我们没有办法换 一门语言，但语言本身也在发展，说不定哪天某个模式在 JavaScript中就已经是天然的存在，不再 需要拐弯抹角来实现。比如 Object.create 就是原型模式的天然实现。
        使用 Object.create 来完成原 型继承看起来更能体现原型模式的精髓。目前大多数主流浏览器都提供了 Object.create 方法

        但美中不足是在当前的 JavaScript引擎下，通过 Object.create 来创建对象的效率并不高，通 常比通过构造函数创建对象要慢。此外还有一些值得注意的地方，比如通过设置构造器的 prototype 来实现原型继承的时候，
        除了根对象 Object.prototype 本身之外，任何对象都会有一个 原型。而通过 Object.create( null )可以创建出没有原型的对象。 

        另外，ECMAScript 6带来了新的 Class语法。这让 JavaScript看起来像是一门基于类的语言， 但其背后仍是通过原型机制来创建对象。通过 Class创建对象的一段简单示例代码①如下所示 ：
        class Animal {   
            constructor(name) {
                      this.name = name;
            } 
            getName() {
                 return this.name;
            }
        }
        class Dog extends Animal {
             constructor(name) {
                  super(name);
             }   speak() {
                 return "woof";
             }
        }
        var dog = new Dog("Scamp");
        console.log(dog.getName() + ' says ' + dog.speak());
        */
    }

    /// <summary>
    /// this、call 和 apply 
    /// </summary>
    /// <returns></returns>
    var thisCallApply = function () {

        /*
        跟别的语言大相径庭的是，JavaScript的 this 总是指向一个对象，而具体指向哪个对象是在 运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境
        除去不常用的 with 和 eval 的情况，具体到实际应用中，this 的指向大致可以分为以下 4种。 
            1.作为对象的方法调用。
            2.作为普通函数调用。 
            3.构造器调用
            4.Function.prototype.call 或 Function.prototype.apply 调用
        */

        //this的指向 
        var thisFunction = function () {

            //当函数作为对象的方法被调用时，this 指向该对象： 
            var thisObjects = function () {
                var obj = {
                    a: 1,
                    getA: function () {
                        alert(this === obj);    // 输出：true         
                        alert(this.a);    // 输出: 1     
                    }
                };
                obj.getA();
            }

            //作为普通函数调用:当函数不作为对象的属性被调用时，也就是我们常说的普通函数方式，此时的 this 总是指 向全局对象。在浏览器的 JavaScript里，这个全局对象是 window 对象
            var normalFunction = function () {

                window.name = 'globalName';
                var getName = function () {
                    return this.name;
                };
                console.log(getName());    // 输出：globalName 

                //或者：

                /*
                window.name = 'globalName';
                var myObject = {
                    name: 'sven',
                    getName: function() {
                         return this.name;
                    }
                };
                var getName = myObject.getName;
                console.log(getName());    // globalName 
                */

                /*
                有时候我们会遇到一些困扰，比如在 div 节点的事件函数内部，有一个局部的 callback 方法， callback 被作为普通函数调用时，callback 内部的 this 指向了 window，但我们往往是想让它指向 该 div 节点，见如下代码： 
                <html>     
                    <body>         
                        <div id="div1">我是一个 div</div>     
                    </body>     
                    <script>  
                    window.id = 'window';  
                        document.getElementById( 'div1' ).onclick = function(){         
                            alert ( this.id );        // 输出：'div1'         
                            var callback = function(){             
                                alert ( this.id );        // 输出：'window'         
                            }        
                            callback();     
                        }; 
                    </script> 
                </html>
                此时有一种简单的解决方案，可以用一个变量保存 div 节点的引用： 
                <html>     
                    <body>         
                        <div id="div1">我是一个 div</div>     
                    </body>     
                    <script>  
                    window.id = 'window';  
                        document.getElementById( 'div1' ).onclick = function(){  
                            var that = this;    // 保存 div 的引用 
                            var callback = function(){             
                                alert ( that.id );        // 输出：'div1'          
                            }        
                            callback();     
                        }; 
                    </script> 
                </html>
                */
            }

            //构造器调用 
            var constructorFunction = function () {

                /*
                JavaScript 中没有类，但是可以从构造器中创建对象，同时也提供了 new 运算符，使得构造 器看起来更像一个类。 
                除了宿主提供的一些内置函数，大部分 JavaScript函数都可以当作构造器使用。构造器的外 表跟普通函数一模一样，它们的区别在于被调用的方式。当用 new 运算符调用函数时，该函数总 会返回一个对象，通常情况下，
                构造器里的 this 就指向返回的这个对象，见如下代码
                */
                var MyClass = function () {
                    this.name = 'sven';
                };
                var obj = new MyClass();
                alert(obj.name);     // 输出：sven 

                //但用 new 调用构造器时，还要注意一个问题，如果构造器显式地返回了一个 object 类型的对 象，那么此次运算结果终会返回这个对象，而不是我们之前期待的 this： 
                var MyClass = function () {
                    this.name = 'sven';
                    return {    // 显式地返回一个对象         
                        name: 'anne'
                    }
                };
                var obj = new MyClass();
                alert(obj.name);     // 输出：anne 

                //如果构造器不显式地返回任何数据，或者是返回一个非对象类型的数据，就不会造成上述 问题： 
                var MyClass = function () {
                    this.name = 'sven';
                    return 'anne';    // 返回 string 类型 
                };
                var obj = new MyClass();
                alert(obj.name);     // 输出：sven   

            }

            // Function.prototype.call 或 Function.prototype.apply 调用 
            var callApply = function () {

                /*
                跟普通的函数调用相比，用 Function.prototype.call 或 Function.prototype.apply 可以动态地改变传入函数的 this：
                call 和 apply 方法能很好地体现 JavaScript的函数式语言特性，在 JavaScript中，几乎每一次 编写函数式语言风格的代码，都离不开 call 和 apply。在 JavaScript诸多版本的设计模式中，也 用到了 call 和 apply。在下一节会详细介绍它们。 
                */
                var callTest = function () {
                    var obj1 = {
                        name: 'sven',
                        getName: function () {
                            return this.name;
                        }
                    };
                    var obj2 = {
                        name: 'anne'
                    };
                    console.log(obj1.getName());     // 输出: sven 
                    console.log(obj1.getName.call(obj2));    // 输出：anne 
                }

                /*
                丢失的this 
                当调用 obj.getName 时，getName 方法是作为 obj 对象的属性被调用的，根据 2.1.1节提到的规 律，此时的 this 指向 obj 对象，所以 obj.getName()输出'sven'。 
                当用另外一个变量 getName2 来引用 obj.getName，并且调用 getName2 时，根据 2.1.2节提到的 规律，此时是普通函数调用方式，this 是指向全局 window 的，所以程序的执行结果是 undefined。 
                */
                var thisLose = function () {
                    var obj = {
                        myName: 'sven',
                        getName: function () {
                            return this.myName;
                        }
                    };
                    console.log(obj.getName());    // 输出：'sven'  

                    var getName2 = obj.getName;
                    console.log(getName2());    // 输出：undefined 
                }

                /*
                Function.prototype.call 和 Function.prototype.apply 都是非常常用的方法。它们的作用一模一样，区别仅在于传入参数形式的不同。 
                apply 接受两个参数，第一个参数指定了函数体内 this 对象的指向，第二个参数为一个带下标的集合，这个集合可以为数组，也可以为类数组，apply方法把这个集合中的元素作为参数传递给被调用的函数
                call 传入的参数数量不固定，跟 apply 相同的是，第一个参数也是代表函数体内的 this 指向， 从第二个参数开始往后，每个参数被依次传入函数
                */
                var applyfunc = function () {
                    var func = function (a, b, c) {
                        alert([a, b, c]);    // 输出 [ 1, 2, 3 ] 
                    };
                    func.apply(null, [1, 2, 3]);
                }
                var callfunc = function () {
                    var func = function (a, b, c) {
                        alert([a, b, c]);    // 输出 [ 1, 2, 3 ] 
                    };
                    func.call(null, 1, 2, 3);
                }

                /*
                当调用一个函数时，JavaScript 的解释器并不会计较形参和实参在数量、类型以及顺序上的 区别，JavaScript的参数在内部就是用一个数组来表示的。从这个意义上说，apply 比 call 的使用 率更高，
                我们不必关心具体有多少参数被传入函数，只要用 apply 一股脑地推过去就可以了
                当使用 call 或者 apply 的时候，如果我们传入的第一个参数为 null，函数体内的 this 会指 向默认的宿主对象，在浏览器中则是 window
                */
                var example = function () {
                    var func = function (a, b, c) {
                        alert(this === window); // 输出 true 
                    }
                    func.apply(null, [1, 2, 3]);
                }
                //但如果是在严格模式下，函数体内的 this 还是为 null： 
                var example2 = function () {
                    var func = function (a, b, c) {
                        "use strict";
                        alert(this === null);     // 输出 true 
                    }
                    func.apply(null, [1, 2, 3]);
                }

                //有时候我们使用 call 或者 apply 的目的不在于指定 this 指向，而是另有用途，比如借用其 他对象的方法。那么我们可以传入 null 来代替某个具体的对象： 
                Math.max.apply(null, [1, 2, 5, 3, 4]); // 输出：5 

                /*
                call和apply的用途 
                1.改变 this 指向 
                2. Function.prototype.bind 
                3.借用其他对象的方法
                */
                var callorApplyUse = function () {

                    // 1.改变 this 指向 
                    var changeThis = function () {

                        //call 和 apply 常见的用途是改变函数内部的 this 指向，我们来看个例子:
                        var example = function () {
                            var obj1 = {
                                name: 'sven'
                            };
                            var obj2 = {
                                name: 'anne'
                            };
                            window.name = 'window';
                            var getName = function () {
                                alert(this.name);
                            };
                            getName();    // 输出: window 
                            getName.call(obj1);    // 输出: sven 
                            getName.call(obj2);    // 输出: anne 
                        }

                        //在实际开发中，经常会遇到 this 指向被不经意改变的场景，比如有一个 div 节点，div 节点 的 onclick 事件中的 this 本来是指向这个 div 的： 
                        var example2 = function () {
                            document.getElementById('div1').onclick = function () {
                                alert(this.id);        // 输出：div1 
                            };
                            //假如该事件函数中有一个内部函数 func，在事件内部调用 func 函数时，func 函数体内的 this 就指向了 window，而不是我们预期的 div，见如下代码： 
                            var func = function () {
                                alert(this.id); // 输出：undefined     
                            };
                            func();
                        }
                        //这时候我们用 call 来修正 func 函数内的 this，使其依然指向 div： 
                        var example2Revise = function () {
                            document.getElementById('div1').onclick = function () {
                                var func = function () {
                                    alert(this.id); // 输出：div1     
                                };
                                func.call(this);
                            };
                        }
                    }

                    // 2.Function.prototype.bind 
                    var prototypeBind = function () {

                        //大部分高级浏览器都实现了内置的Function.prototype.bind，用来指定函数内部的this指向， 即使没有原生的 Function.prototype.bind 实现，我们来模拟一个也不是难事，代码如下： 

                        /*
                        我们通过 Function.prototype.bind 来“包装”func 函数，并且传入一个对象 context 当作参 数，这个 context 对象就是我们想修正的 this 对象。 
                        在 Function.prototype.bind 的内部实现中，我们先把 func 函数的引用保存起来，然后返回一 个新的函数。当我们在将来执行 func 函数时，实际上先执行的是这个刚刚返回的新函数。在新 函数内部，
                        self.apply( context, arguments )这句代码才是执行原来的 func 函数，并且指定 context 对象为 func 函数体内的 this
                        */
                        var example = function () {
                            Function.prototype.bind = function (context) {
                                var self = this;        // 保存原函数     
                                return function () {        // 返回一个新的函数         
                                    return self.apply(context, arguments);    // 执行新的函数的时候，会把之前传入的 context 当作新函数体内的 this     
                                }
                            };
                            var obj = {
                                name: 'sven'
                            };
                            var func = function () {
                                alert(this.name);    // 输出：sven 
                            }.bind(obj);
                            func();
                        }

                        //这是一个简化版的 Function.prototype.bind 实现，通常我们还会把它实现得稍微复杂一点， 使得可以往 func 函数中预先填入一些参数： 
                        var example2 = function () {
                            Function.prototype.bind = function () {
                                var self = this,    // 保存原函数         
                                    context = [].shift.call(arguments),    // 需要绑定的 this 上下文         
                                    args = [].slice.call(arguments);    // 剩余的参数转成数组     
                                return function () {    // 返回一个新的函数         
                                    return self.apply(context, [].concat.call(args, [].slice.call(arguments))); // 执行新的函数的时候，会把之前传入的 context 当作新函数体内的 this    并且组合两次分别传入的参数，作为新函数的参数         
                                }
                            };
                            var obj = {
                                name: 'sven'
                            };
                            var func = function (a, b, c, d) {
                                alert(this.name);        // 输出：sven     
                                alert([a, b, c, d]); // 输出：[ 1, 2, 3, 4 ] 
                            }.bind(obj, 1, 2);
                            func(3, 4);
                        }



                    }

                    // 3.借用其他对象的方法 
                    var borrowObjects = function () {

                        //我们知道，杜鹃既不会筑巢，也不会孵雏，而是把自己的蛋寄托给云雀等其他鸟类，让它们 代为孵化和养育。同样，在 JavaScript中也存在类似的借用现象。 借用方法的第一种场景是“借用构造函数”，通过这种技术，可以实现一些类似继承的效果： 
                        var example = function () {
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
                            函数的参数列表 arguments 是一个类数组对象，虽然它也有“下标”，但它并非真正的数组， 所以也不能像数组一样，进行排序操作或者往集合里添加一个新的元素。这种情况下，我们常常 会借用 Array.prototype 对象上的方法。
                            比如想往 arguments 中添加一个新的元素，通常会借用 Array.prototype.push：
                            */
                            (function () {
                                Array.prototype.push.call(arguments, 3);
                                console.log(arguments);    // 输出[1,2,3] 
                            })(1, 2);
                        }

                        /*
                        想把 arguments 转成真正的数组的时候，可以借用 Array.prototype.slice 方法；想截去 arguments 列表中的头一个元素时，又可以借用 Array.prototype.shift 方法。那么这种机制的内 部实现原理是什么呢？
                        我们不妨翻开 V8的引擎源码，以 Array.prototype.push 为例，看看 V8引 擎中的具体实现：
                        function ArrayPush() {     
                            var n = TO_UINT32( this.length );    // 被 push 的对象的 length     
                            var m = %_ArgumentsLength();     // push 的参数个数     
                            for (var i = 0; i < m; i++) {         
                                this[ i + n ] = %_Arguments( i );   // 复制元素     (1)     
                            }     
                            this.length = n + m;      // 修正 length 属性的值    (2)     
                            return this.length; 
                        };

                        通过这段代码可以看到，Array.prototype.push 实际上是一个属性复制的过程，把参数按照 下标依次添加到被 push的对象上面，顺便修改了这个对象的 length 属性。至于被修改的对象是 谁，到底是数组还是类数组对象，这一点并不重要。 
                        由此可以推断，我们可以把“任意”对象传入 Array.prototype.push： 
                        */
                        var example2 = function () {
                            var a = {};
                            Array.prototype.push.call(a, 'first');
                            alert(a.length);    // 输出：1 
                            alert(a[0]);    // first 

                            //这段代码在绝大部分浏览器里都能顺利执行，但由于引擎的内部实现存在差异，如果在低版 本的 IE浏览器中执行，必须显式地给对象 a 设置 length 属性： 
                            var a = {
                                length: 0
                            };
                        }
                        /*
                        前面我们之所以把“任意”两字加了双引号，是因为可以借用 Array.prototype.push 方法的对 象还要满足以下两个条件，从 ArrayPush 函数的(1)处和(2)处也可以猜到，这个对象至少还要满足：
                        1.对象本身要可以存取属性
                        2.对象的 length 属性可读写
                        */
                    }
                }




            }
        }
    }

    /// <summary>
    /// 闭包和高阶函数 
    /// </summary>
    /// <returns></returns>
    var closureHigherOrderFunctions = function () {

        /*
        闭包的形成与 变量的作用域以及变量的生存周期密切相关;

        变量的作用域：就是指变量的有效范围

        变量的生存周期：对于全局变量来说，全局变量的生存周期当然是永久的，除非我们主动销毁这个全局变量。 而对于在函数内用 var 关键字声明的局部变量来说，当退出函数时，这些局部变量即失去了 它们的价值，
        它们都会随着函数调用的结束而被销毁
        */

        //闭包
        var closureFunction = function () {

            /*
            利用闭包我们可以完成许多奇妙的工作，下面介绍一个闭包的经典应用。假设页面上有 5个 div 节点，我们通过循环来给每个 div 绑定 onclick 事件，按照索引顺序，点击第 1个 div 时弹出 0，
            点击第 2个 div 时弹出1，以此类推。代码如下：
            */
            var example = function () {
                var nodes = document.getElementsByTagName('div');
                for (var i = 0, len = nodes.length; i < len; i++) {
                    nodes[i].onclick = function () {
                        alert(i);
                    }
                };

                /*
                测试这段代码就会发现，无论点击哪个 div，最后弹出的结果都是 5。这是因为 div 节点的 onclick 事件是被异步触发的，当事件被触发的时候，for 循环早已结束，此时变量 i 的值已经是 5，
                所以在 div 的 onclick 事件函数中顺着作用域链从内到外查找变量 i 时，查找到的值总是 5。 
                解决方法是在闭包的帮助下，把每次循环的 i 值都封闭起来。当在事件函数中顺着作用域链 中从内到外查找变量 i 时，会先找到被封闭在闭包环境中的 i，如果有 5个 div，这里的 i 就分别 是 0,1,2,3,4： 
                */

                for (var i = 0, len = nodes.length; i < len; i++) {
                    (function (i) {
                        nodes[i].onclick = function () {
                            console.log(i);
                        }
                    })(i);
                };

                //根据同样的道理，我们还可以编写如下一段代码

                var Type = {};
                for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
                    (function (type) {
                        Type['is' + type] = function (obj) {
                            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
                        }
                    })(type);
                };
                Type.isArray([]);     // 输出：true 
                Type.isString("str");     // 输出：true 

            }

            var example2 = function () {

                //闭包可以帮助把一些不需要暴露在全局的变量封装成“私有变量”。假设有一个计算乘积的 简单函数:
                var mult = function () {
                    var a = 1;
                    for (var i = 0, l = arguments.length; i < l; i++) {
                        a = a * arguments[i];
                    }
                    return a;
                };

                //mult 函数接受一些 number 类型的参数，并返回这些参数的乘积。现在我们觉得对于那些相同 的参数来说，每次都进行计算是一种浪费，我们可以加入缓存机制来提高这个函数的性能： 
                var mult2 = function () {
                    var cache = {};
                    var args = Array.prototype.join.call(arguments, ',');
                    if (cache[args]) {
                        return cache[args];
                    }
                    var a = 1;
                    for (var i = 0, l = arguments.length; i < l; i++) {
                        a = a * arguments[i];
                    }
                    return cache[args] = a;
                };
                //重构
                var mult2Reconstruct = (function () {
                    var cache = {};
                    var calculate = function () { // 封闭 calculate 函数 
                        var a = 1;
                        for (var i = 0, l = arguments.length; i < l; i++) {
                            a = a * arguments[i];
                        }
                        return a;
                    };
                    return function () {
                        var args = Array.prototype.join.call(arguments, ',');
                        if (args in cache) {
                            return cache[args];
                        }
                        return cache[args] = calculate.apply(null, arguments);
                    }
                })();

                //img 对象经常用于进行数据上报，如下所示： 
                var report = function (src) {
                    var img = new Image();
                    img.src = src;
                };
                report('http://xxx.com/getUserInfo');

                /*
                但是通过查询后台的记录我们得知，因为一些低版本浏览器的实现存在 bug,
                在这些浏览器 下使用 report 函数进行数据上报会丢失 30%左右的数据，也就是说，report 函数并不是每一次 都成功发起了 HTTP请求。
                丢失数据的原因是 img 是 report 函数中的局部变量，当 report 函数的 调用结束后，img 局部变量随即被销毁，而此时或许还没来得及发出 HTTP请求，所以此次请求 就会丢失掉。 

                现在我们把 img 变量用闭包封闭起来，便能解决请求丢失的问题：
                */

                var report2 = (function () {
                    var imgs = [];
                    return function (src) {
                        var img = new Image();
                        imgs.push(img);
                        img.src = src;
                    }
                })();
            }

            //闭包和面向对象设计 
            var example3 = function () {

                /*
                过程与数据的结合是形容面向对象中的“对象”时经常使用的表达。对象以方法的形式包含 了过程，而闭包则是在过程中以环境的形式包含了数据。通常用面向对象思想能实现的功能，用 闭包也能实现。反之亦然。
                在 JavaScript 语言的祖先 Scheme 语言中，甚至都没有提供面向对象 的原生设计，但可以使用闭包来实现一个完整的面向对象系统
                */

                var example = function () {
                    var extent = function () {
                        var value = 0;
                        return {
                            call: function () {
                                value++;
                                console.log(value);
                            }
                        };
                    }
                    var extent = extent();
                    extent.call();     // 输出：1 
                    extent.call();     // 输出：2 
                    extent.call();     // 输出：3 
                }

                //如果换成面向对象的写法，就是： 

                var example2 = function () {
                    var extent = {
                        value: 0,
                        call: function () {
                            this.value++;
                            console.log(this.value);
                        }
                    };
                    extent.call();     // 输出：1 
                    extent.call();     // 输出：2 
                    extent.call();     // 输出：3 
                }
            }

            /*
            闭包是一个非常强大的特性，但人们对其也有诸多误解。一种耸人听闻的说法是闭包会造成 内存泄露，所以要尽量减少闭包的使用。 

            局部变量本来应该在函数退出的时候被解除引用，但如果局部变量被封闭在闭包形成的环境 中，那么这个局部变量就能一直生存下去。从这个意义上看，闭包的确会使一些数据无法被及时 销毁。
            使用闭包的一部分原因是我们选择主动把一些变量封闭在闭包中，因为可能在以后还需要 使用这些变量，把这些变量放在闭包中和放在全局作用域，对内存方面的影响是一致的，这里并 不能说成是内存泄露。
            如果在将来需要回收这些变量，我们可以手动把这些变量设为 null。 

            跟闭包和内存泄露有关系的地方是，使用闭包的同时比较容易形成循环引用，如果闭包的作 用域链中保存着一些 DOM节点，这时候就有可能造成内存泄露。但这本身并非闭包的问题，也 并非 JavaScript的问题。在 IE浏览器中，
            由于 BOM和 DOM中的对象是使用 C++以 COM对象 的方式实现的，而 COM对象的垃圾收集机制采用的是引用计数策略。在基于引用计数策略的垃圾回收机制中，如果两个对象之间形成了循环引用，那么这两个对象都无法被回收，
            但循环引用 造成的内存泄露在本质上也不是闭包造成的。 

            同样，如果要解决循环引用带来的内存泄露问题，我们只需要把循环引用中的变量设为 null 即可。将变量设置为 null 意味着切断变量与它此前引用的值之间的连接。当垃圾收集器下次运 行时，就会删除这些值并回收它们占用的内存。 

            */

        }

        //高阶函数
        var higherOrderFunctions = function () {

            /*
            高阶函数是指至少满足下列条件之一的函数。 
                1.函数可以作为参数被传递
                2.函数可以作为返回值输出
            */

            //函数作为参数传递 
            var parameterPassing = function () {

                //1.回调函数 
                var callBackFunction = function () {
                    return function () {
                        var getUserInfo = function (userId, callback) {
                            $.ajax('http://xxx.com/getUserInfo?' + userId, function (data) {
                                if (typeof callback === 'function') {
                                    callback(data);
                                }
                            });
                        }
                        getUserInfo(13157, function (data) {
                            alert(data.userName);
                        });
                    }
                }

                //2. Array.prototype.sort 
                var prototypeSort = function () {

                    /*
                    Array.prototype.sort 接受一个函数当作参数，这个函数里面封装了数组元素的排序规则。从 Array.prototype.sort 的使用可以看到，我们的目的是对数组进行排序，这是不变的部分；而使 用什么规则去排序，
                    则是可变的部分。把可变的部分封装在函数参数里，动态传入 Array.prototype.sort，使 Array.prototype.sort 方法成为了一个非常灵活的方法，代码如下： 
                    */

                    return function () {
                        [1, 4, 3].sort(function (a, b) {
                            return a - b;
                        });
                        // 输出: [ 1, 3, 4 ] 
                        [1, 4, 3].sort(function (a, b) {
                            return b - a;
                        });
                        // 输出: [ 4, 3, 1 ] 
                    }
                }
            }

            //函数作为返回值输出 
            var resurnValue = function () {

                //相比把函数当作参数传递，函数当作返回值输出的应用场景也许更多，也更能体现函数式编程的巧妙。让函数继续返回一个可执行的函数，意味着运算过程是可延续的。 

                //1. 判断数据的类型 
                var example1 = function () {

                    /*
                    我们来看看这个例子，判断一个数据是否是数组，在以往的实现中，可以基于鸭子类型的概 念来判断，比如判断这个数据有没有 length 属性，有没有 sort 方法或者 slice 方法等。但更好 的方式是用 Object.prototype.toString 来计算。
                    Object.prototype.toString.call( obj )返回一个 字符串，比如 Object.prototype.toString.call( [1,2,3] ) 总是返回"[object Array]" ，而 Object.prototype.toString.call( “str”)总是返回"[object String]"。
                    所以我们可以编写一系列的 isType 函数。代码如下：
                    */
                    var isString = function (obj) { return Object.prototype.toString.call(obj) === '[object String]'; };
                    var isArray = function (obj) { return Object.prototype.toString.call(obj) === '[object Array]'; };
                    var isNumber = function (obj) { return Object.prototype.toString.call(obj) === '[object Number]'; };

                    //重构之后：
                    var reconstruct = function () {
                        return function () {
                            var isType = function (type) {
                                return function (obj) {
                                    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
                                }
                            };
                            var isString = isType('String');
                            var isArray = isType('Array');
                            var isNumber = isType('Number');
                            console.log(isArray([1, 2, 3]));     // 输出：true
                        }
                    }

                    //我们还可以用循环语句，来批量注册这些 isType 函数： 
                    var reconstruct2 = function () {
                        var Type = {};
                        for (var i = 0, type; type === ['String', 'Array', 'Number'][i++];) {
                            (function (type) {
                                Type['is' + type] = function (obj) {
                                    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
                                }
                            })(type);
                        };
                        Type.isArray([]);     // 输出：true 
                        Type.isString("str");     // 输出：true
                    }
                }

                //2.单例模式
                var getSingle = function () {

                    var getSingle = function (fn) {
                        var ret;
                        return function () {
                            return ret || (ret = fn.apply(this, arguments));
                        };
                    };
                }
            }

            //高阶函数实现AOP 
            var aopFunction = function () {

                /*
                AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些 跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。把这些功能抽离出来之后， 再通过“动态织入”的方式掺入业务逻辑模块中。
                这样做的好处首先是可以保持业务逻辑模块的纯净和高内聚性，其次是可以很方便地复用日志统计等功能模块。

                在 Java语言中，可以通过 反射 和 动态代理机制 来实现 AOP技术。而在 JavaScript这种动态 语言中，AOP的实现更加简单，这是 JavaScript与生俱来的能力。 

                通常，在 JavaScript中实现AOP，都是指把一个函数“动态织入”到另外一个函数之中，具 体的实现技术有很多，本节我们通过扩展 Function.prototype 来做到这一点。代码如下：
                */

                Function.prototype.before = function (beforefn) {
                    var self = this;    // 保存原函数的引用     
                    return function () {    // 返回包含了原函数和新函数的"代理"函数         
                        beforefn.apply(this, arguments);     // 执行新函数，修正 this         
                        return self.apply(this, arguments);    // 执行原函数     
                    }
                };

                Function.prototype.after = function (afterfn) {
                    var self = this;
                    return function () {
                        var ret = self.apply(this, arguments);
                        afterfn.apply(this, arguments);
                        return ret;
                    }
                };
                var func = function () {
                    console.log(2);
                };
                func = func.before(function () {
                    console.log(1);
                }).after(function () {
                    console.log(3);
                });
                func();
                //我们把负责打印数字 1和打印数字 3的两个函数通过 AOP的方式动态植入 func 函数。通过 执行上面的代码，我们看到控制台顺利地返回了执行结果 1、2、3。 
            }
        }
    }
}();



