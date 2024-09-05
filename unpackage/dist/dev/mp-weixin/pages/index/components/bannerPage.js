"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_api = require("../../../api/api.js");
const _sfc_main = {
  __name: "bannerPage",
  setup(__props) {
    const bannerList = common_vendor.ref();
    common_vendor.onMounted(async () => {
      let res = await api_api.apiGetBanner();
      bannerList.value = res.data;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(bannerList.value, (item, k0, i0) => {
          return {
            a: item.picurl,
            b: item._id
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-04f7bdc3"], ["__file", "D:/ijavascript/myWallpaper/pages/index/components/bannerPage.vue"]]);
wx.createComponent(Component);
