/* @flow */
/*
  被 ../core/index调用
*/
import config from "../config";
import { initUse } from "./use";
import { initMixin } from "./mixin";
import { initExtend } from "./extend";
import { initAssetRegisters } from "./assets";
import { set, del } from "../observer/index";
import { ASSET_TYPES } from "shared/constants";
import builtInComponents from "../components/index";
import { observe } from "core/observer/index";

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive,
} from "../util/index";

//入口文件调取的入口函数
export function initGlobalAPI(Vue: GlobalAPI) {
  // 添加只读的构造函数静态属性属性 config
  const configDef = {};
  configDef.get = () => config;
  if (process.env.NODE_ENV !== "production") {
    configDef.set = () => {
      warn(
        "Do not replace the Vue.config object, set individual fields instead."
      );
    };
  }
  Object.defineProperty(Vue, "config", configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive,
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => {
    observe(obj);
    return obj;
  };
  ////加了注释为啥会出现这个？？////////////***</T>

  // 创建options选项 挂载了一个空对象
  Vue.options = Object.create(null);
  //options 挂载 component directive filter
  ASSET_TYPES.forEach((type) => {
    Vue.options[type + "s"] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;
  // 属性合并
  extend(Vue.options.components, builtInComponents);
  //添加 Vue.use
  initUse(Vue);
  //初始化全局mixins方法
  initMixin(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}
