"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "theme-item",
  props: {
    more: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: {
        name: "暂无",
        picurl: "https://mp-0cb878b7-99ec-44ea-8246-12b123304b05.cdn.bspapp.com/xxmBizhi/20231010/1696900747351_2102.jpg"
      }
    }
  },
  setup(__props) {
    const props = __props;
    common_vendor.ref(props.data.name);
    common_vendor.ref(props.data.id);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !__props.more
      }, !__props.more ? {
        b: props.data.picurl,
        c: common_vendor.t(props.data.name),
        d: "/pages/classlist/classlist?id=" + __props.data._id + "&name=" + __props.data.name
      } : {
        e: common_assets._imports_0
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cbd23e84"], ["__file", "D:/ijavascript/myWallpaper/components/theme-item.vue"]]);
wx.createComponent(Component);
