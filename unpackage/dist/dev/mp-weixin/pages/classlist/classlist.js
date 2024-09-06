"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "classlist",
  setup(__props) {
    const queryParams = {
      pageNum: 1,
      pageSize: 12
    };
    const noData = common_vendor.ref(false);
    const classList = common_vendor.ref([]);
    common_vendor.onLoad((e) => {
      if (e == null ? void 0 : e.type) {
        queryParams.type = e == null ? void 0 : e.type;
      }
      if (e == null ? void 0 : e.id) {
        queryParams.classid = e == null ? void 0 : e.id;
      }
      common_vendor.index.setNavigationBarTitle({
        title: e == null ? void 0 : e.name
      });
      getClassList();
    });
    const getClassList = async () => {
      let res;
      if (queryParams.type) {
        res = await api_api.apiGetHistoryList(queryParams);
      }
      if (queryParams.classid) {
        res = await api_api.apiGetClassList(queryParams);
      }
      if (res.data.length < 12) {
        noData.value = true;
      }
      classList.value = [...classList.value, ...res.data];
      common_vendor.index.setStorageSync("storgClassList", classList.value);
    };
    common_vendor.onReachBottom(() => {
      if (noData.value)
        return;
      queryParams.pageNum++;
      getClassList();
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("storgClassList", []);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(classList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: "/pages/preview/preview?id=" + item._id,
            c: item._id
          };
        }),
        b: common_vendor.p({
          status: noData.value ? "noMore" : "loading"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd381383"], ["__file", "D:/ijavascript/myWallpaper/pages/classlist/classlist.vue"]]);
wx.createPage(MiniProgramPage);
