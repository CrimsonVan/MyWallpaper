"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2 + _easycom_uni_load_more2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const historySearch = common_vendor.ref(common_vendor.index.getStorageSync("historySearch"));
    const recommendList = common_vendor.ref(["美女", "帅哥", "宠物", "卡通"]);
    const queryParams = common_vendor.ref({
      pageNum: 1,
      pageSize: 12,
      keyword: "帅哥"
    });
    const noData = common_vendor.ref(false);
    const classList = common_vendor.ref([]);
    const searchTab = (tab) => {
      queryParams.value.keyword = tab;
      goSearch();
    };
    const goSearch = async () => {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      historySearch.value = [.../* @__PURE__ */ new Set([queryParams.value.keyword, ...historySearch.value])].slice(0, 10);
      common_vendor.index.setStorageSync("historySearch", historySearch.value);
      try {
        let res = await api_api.apiSearchData(queryParams.value);
        classList.value = [...classList.value, ...res.data];
        common_vendor.index.setStorageSync("storgClassList", classList.value);
        if (queryParams.value.pageSize > res.data.length)
          noData.value = true;
        common_vendor.index.hideLoading();
      } catch {
        return;
      }
    };
    const removeHistory = () => {
      common_vendor.index.showModal({
        title: "是否清空历史搜索？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("historySearch");
            historySearch.value = [];
          }
        }
      });
    };
    common_vendor.onReachBottom(() => {
      queryParams.value.pageNum++;
      console.log("打印页数", queryParams.value.pageNum);
      goSearch();
    });
    const initParams = () => {
      classList.value = [];
      noData.value = false;
      queryParams.value = {
        pageNum: 1,
        pageSize: 12,
        keyword: ""
      };
    };
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("storgClassList", []);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goSearch),
        b: common_vendor.o(($event) => initParams()),
        c: common_vendor.o(($event) => queryParams.value.keyword = $event),
        d: common_vendor.p({
          focus: true,
          placeholder: "搜索",
          modelValue: queryParams.value.keyword
        }),
        e: !classList.value.length
      }, !classList.value.length ? common_vendor.e({
        f: historySearch.value.length >= 1
      }, historySearch.value.length >= 1 ? {
        g: common_vendor.p({
          type: "trash",
          size: "25"
        }),
        h: common_vendor.o(($event) => removeHistory()),
        i: common_vendor.f(historySearch.value, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab),
            b: common_vendor.o(($event) => searchTab(tab), tab),
            c: tab
          };
        })
      } : {}, {
        j: common_vendor.f(recommendList.value, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab),
            b: common_vendor.o(($event) => searchTab(tab), tab),
            c: tab
          };
        })
      }) : {}, {
        k: common_vendor.f(classList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: "/pages/preview/preview?id=" + item._id,
            c: item._id
          };
        }),
        l: classList.value.length >= 1
      }, classList.value.length >= 1 ? {
        m: common_vendor.p({
          status: noData.value ? "noMore" : "loading"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "D:/ijavascript/myWallpaper/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
