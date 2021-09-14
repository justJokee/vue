import { initMixin } from "./init";
import { stateMixin } from "./state";
import { renderMixin } from "./render";
import { eventsMixin } from "./events";
import { lifecycleMixin } from "./lifecycle";
import { warn } from "../util/index";

function Vue(options) {
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }
  this._init(options);
}
// vue 原型上添加 _init 方法
initMixin(Vue);
// vue 原型上添加了 $watch $data $props 等等方法/属性
stateMixin(Vue);
// vue 原型上添加了 $on $once $off $emit四个方法
eventsMixin(Vue);
// vue 原型上添加了 _update $forceUpdate $destory方法
lifecycleMixin(Vue);
// vue原型上添加了 .$nextTick _render方法
renderMixin(Vue);

export default Vue;
