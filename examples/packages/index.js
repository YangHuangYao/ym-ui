import { install } from "vuex";

const isntall = Vue => {
  if (install.installed) return;
  install.installed = true;
  components.map(component => Vue.use(component));
  if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
  }
};
export default {
  install,
  ...components
};
