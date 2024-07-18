import type { App } from "vue";
import FormComposite from "./FormComposite/index.vue";
import FormRender from "./FormRender/index.vue";
import selectProduct from "./selectProduct/index.vue";
import SvgIcon from "./SvgIcon/index.vue";
import UploadFile from "./UploadFile/index.vue";

export function registerComponents(app: App) {
  app.component("FormRender", FormRender);
  app.component("FormComposite", FormComposite);
  app.component("selectProduct", selectProduct);
  app.component("SvgIcon", SvgIcon);
  app.component("UploadFile", UploadFile);
}
