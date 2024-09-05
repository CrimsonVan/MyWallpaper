"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
if (!Math) {
  (navPage + themeItem)();
}
const navPage = () => "../../components/navPage.js";
const themeItem = () => "../../components/theme-item.js";
const _sfc_main = {
  __name: "classify",
  setup(__props) {
    const title = common_vendor.ref("分类");
    const classifyList = common_vendor.ref();
    common_vendor.onMounted(async () => {
      let res = await api_api.apiGetClassify({
        pageSize: 15
      });
      classifyList.value = res.data;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: title.value
        }),
        b: common_vendor.f(classifyList.value, (item, index, i0) => {
          return {
            a: "6bcfa975-1-" + i0,
            b: common_vendor.p({
              more: false,
              data: item
            }),
            c: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6bcfa975"], ["__file", "D:/ijavascript/myWallpaper/pages/classify/classify.vue"]]);
wx.createPage(MiniProgramPage);
