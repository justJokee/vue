/**
 * 被 src/platforms/web/runtime下的index.js引用
 * 扩展原型属性
 * 添加vue构造函数的静态属性和方法
 */

import Vue from "./instance/index"; // Vue的构造函数存储在这里
import { initGlobalAPI } from "./global-api/index";
import { isServerRendering } from "core/util/env";
import { FunctionalRenderContext } from "core/vdom/create-functional-component";

/**
 * initGlobalAPI 中为 vue 构造函数添加了 options 等一些静态属性和方法
 */

initGlobalAPI(Vue);
// 添加只读属性
Object.defineProperty(Vue.prototype, "$isServer", {
  get: isServerRendering,
});
// 添加只读属性
Object.defineProperty(Vue.prototype, "$ssrContext", {
  get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  },
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, "FunctionalRenderContext", {
  value: FunctionalRenderContext,
});

Vue.version = "__VERSION__";

export default Vue;
