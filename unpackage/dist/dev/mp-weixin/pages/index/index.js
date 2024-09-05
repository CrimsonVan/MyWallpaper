"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
if (!Math) {
  (navPage + bannerPage + noticePage + commonTitle + themeItem)();
}
const navPage = () => "../../components/navPage.js";
const bannerPage = () => "./components/bannerPage.js";
const noticePage = () => "./components/noticePage.js";
const commonTitle = () => "../../components/common-title.js";
const themeItem = () => "../../components/theme-item.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const title = common_vendor.ref("推荐");
    const classifyList = common_vendor.ref();
    const randomList = common_vendor.ref();
    const getDayRandom = async () => {
      let res = await api_api.apiGetDayRandom();
      randomList.value = res.data;
      common_vendor.index.setStorageSync("storgClassList", randomList.value);
    };
    const goPreview = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/preview/preview?id=" + id
      });
    };
    const getClassifyList = async () => {
      let res = await api_api.apiGetClassify({
        pageSize: 8
      });
      classifyList.value = res.data;
    };
    common_vendor.onMounted(() => {
      getClassifyList();
      getDayRandom();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: title.value
        }),
        b: common_vendor.f(randomList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: item._id,
            c: common_vendor.o(($event) => goPreview(item._id), item._id)
          };
        }),
        c: common_vendor.f(classifyList.value, (item, index, i0) => {
          return {
            a: "1cf27b2a-5-" + i0,
            b: common_vendor.p({
              data: item,
              more: false
            }),
            c: index
          };
        }),
        d: common_vendor.p({
          more: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/ijavascript/myWallpaper/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
