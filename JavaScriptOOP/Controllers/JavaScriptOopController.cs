using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JavaScriptOOP.Controllers
{
    /// <summary>
    /// JavaScript面向对象学习
    /// </summary>
    public class JavaScriptOopController : Controller
    {
        /// <summary>
        /// 面向对象的 JavaScript （动态类型语言和鸭子类型、多态 、封装 、原型模式和基于原型继承的 JavaScript 对象系统 ）
        /// this、call 和 apply
        /// 闭包和高阶函数
        /// </summary>
        /// <returns>第一部分：基础知识</returns>
        public ActionResult Index()
        {
            return View();
        }


        /// <summary>
        /// 设计模式
        /// </summary>
        /// <returns></returns>
        public ActionResult DesignPatterns()
        {
            return View();
        }
    }
}