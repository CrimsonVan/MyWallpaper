"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_height = require("../../utils/height.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const classList = common_vendor.ref([]);
    const currentIndex = common_vendor.ref(0);
    const currentInfo = common_vendor.ref();
    const maskState = common_vendor.ref(true);
    const scorePopup = common_vendor.ref(false);
    const userScore = common_vendor.ref(0);
    const isScore = common_vendor.ref(false);
    const clickScoreClose = () => {
      scorePopup.value.close();
      userScore.value = 0;
      isScore.value = false;
    };
    const storgClassList = common_vendor.ref(common_vendor.index.getStorageSync("storgClassList"));
    classList.value = storgClassList.value.map((item) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
    common_vendor.onLoad((e) => {
      currentIndex.value = classList.value.findIndex((item) => item._id == e.id);
      currentInfo.value = classList.value[currentIndex.value];
    });
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const swiperChange = (e) => {
      currentIndex.value = e.detail.current;
      currentInfo.value = classList.value[currentIndex.value];
    };
    const clickDownload = async () => {
      common_vendor.index.showLoading();
      let {
        classid,
        _id: wallId
      } = currentInfo.value;
      let res = await api_api.apiWriteDownload({
        classid,
        wallId
      });
      if (res.errCode != 0)
        throw res;
      common_vendor.index.getImageInfo({
        src: currentInfo.value.picurl,
        success: (res2) => {
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: res2.path,
            success: (res3) => {
              common_vendor.index.showToast({
                title: "保存成功，请到相册查看",
                icon: "none"
              });
            },
            fail: (err) => {
              if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                common_vendor.index.showToast({
                  title: "保存失败，请重新点击下载",
                  icon: "none"
                });
                return;
              }
              common_vendor.index.showModal({
                title: "授权提示",
                content: "需要授权保存相册",
                success: (res3) => {
                  if (res3.confirm) {
                    common_vendor.index.openSetting({
                      success: (setting) => {
                        console.log(
                          setting
                        );
                        if (setting.authSetting["scope.writePhotosAlbum"]) {
                          common_vendor.index.showToast({
                            title: "获取授权成功",
                            icon: "none"
                          });
                        } else {
                          common_vendor.index.showToast({
                            title: "获取权限失败",
                            icon: "none"
                          });
                        }
                      }
                    });
                  }
                }
              });
            },
            complete: () => {
              common_vendor.index.hideLoading();
            }
          });
        }
      });
      console.log("1");
    };
    const clickInfo = () => {
      console.log("1");
    };
    const clickScore = () => {
      console.log("打印currentInfo", currentInfo);
      if (currentInfo.value.userScore) {
        isScore.value = true;
        userScore.value = currentInfo.value.userScore;
      }
      scorePopup.value.open();
    };
    const submitScore = async () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      let {
        classid,
        _id: wallId
      } = currentInfo.value;
      let res = await api_api.apiGetSetupScore({
        classid,
        wallId,
        userScore: userScore.value
      });
      common_vendor.index.hideLoading();
      if (res.errCode === 0) {
        common_vendor.index.showToast({
          title: "评分成功",
          icon: "none"
        });
        classList.value[currentIndex.value].userScore = userScore.value;
        common_vendor.index.setStorageSync("storgClassList", classList.value);
        clickScoreClose();
      }
    };
    console.log("打印预览列表长度", classList.value.length);
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.f(classList.value, (item, index, i0) => {
          return {
            a: item.picurl,
            b: common_vendor.o(maskChange, item._id),
            c: item._id
          };
        }),
        b: common_vendor.o(swiperChange),
        c: currentIndex.value,
        d: maskState.value
      }, maskState.value ? {
        e: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        f: common_vendor.o(goBack),
        g: common_vendor.unref(utils_height.getStatusBarHeight)() + "px",
        h: common_vendor.t(currentIndex.value + 1),
        i: common_vendor.t(classList.value.length),
        j: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        k: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        l: common_vendor.p({
          type: "info",
          size: "28"
        }),
        m: common_vendor.o(clickInfo),
        n: common_vendor.p({
          type: "star",
          size: "28"
        }),
        o: common_vendor.t((_a = currentInfo.value) == null ? void 0 : _a.score),
        p: common_vendor.o(clickScore),
        q: common_vendor.p({
          type: "download",
          size: "23"
        }),
        r: common_vendor.o(clickDownload)
      } : {}, {
        s: common_vendor.t(isScore.value ? "评分过了~" : "壁纸评分"),
        t: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        v: common_vendor.o(clickScoreClose),
        w: common_vendor.o(($event) => userScore.value = $event),
        x: common_vendor.p({
          allowHalf: true,
          disabled: isScore.value,
          ["disabled-color"]: "#FFCA3E",
          modelValue: userScore.value
        }),
        y: common_vendor.t(userScore.value),
        z: common_vendor.o(submitScore),
        A: !userScore.value || isScore.value,
        B: common_vendor.sr(scorePopup, "2dad6c07-6", {
          "k": "scorePopup"
        }),
        C: common_vendor.p({
          ["is-mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"], ["__file", "D:/ijavascript/myWallpaper/pages/preview/preview.vue"]]);
wx.createPage(MiniProgramPage);
