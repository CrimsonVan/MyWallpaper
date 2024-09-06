"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "noticePage",
  setup(__props) {
    const noticeList = common_vendor.ref([
      { title: "本小程序若涉及侵权本站立即删除" },
      { title: "所有壁纸均从网络上获取仅供学习" }
    ]);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: noticeList.value
      }, noticeList.value ? {
        b: common_vendor.p({
          type: "sound-filled",
          size: "20"
        }),
        c: common_vendor.f(noticeList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: index
          };
        }),
        d: common_vendor.p({
          type: "right",
          size: "16",
          color: "#333"
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eff1f831"], ["__file", "D:/ijavascript/myWallpaper/pages/index/components/noticePage.vue"]]);
wx.createComponent(Component);
