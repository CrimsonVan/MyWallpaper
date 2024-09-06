<template>
	<view class="preview" v-if="currentInfo" >
		<swiper class="swiper" @change="swiperChange" circular :current="currentIndex" >
			<swiper-item v-for="(item,index) in classList" :key="item._id">
				<image  :src="item.picurl" mode="aspectFill" @click="maskChange"></image>
			</swiper-item>
		</swiper>
	 
		
		<!-- 遮罩层 -->
		<view class="mask" v-if="maskState">
			<!-- 返回按钮 -->
			<view class="goBack" @click="goBack" :style="{top:getStatusBarHeight()+'px'}">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			
			<!-- 当前页/页数 -->
			<view class="count">{{currentIndex+1}} / {{classList.length}}</view>
			<!-- 时间 -->
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
			</view>
			<!-- 日期 -->
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
			</view>
			<!-- 下载 收藏 -->
			<view class="footer">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">信息</view>
				</view>
			
				<view class="box" @click="clickScore">
					<uni-icons type="star" size="28"></uni-icons>
					<view class="text">{{currentInfo?.score}}分</view>
				</view>
			
				<view class="box" @click="clickDownload">
					<uni-icons type="download" size="23"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>	
		
		<!-- 评分弹窗 -->
		<uni-popup ref="scorePopup" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view class="title">{{isScore?'评分过了~':'壁纸评分'}}</view>
					<view class="close" @click="clickScoreClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
		
				<view class="content">
					<uni-rate v-model="userScore" allowHalf :disabled="isScore" disabled-color="#FFCA3E" />
					<text class="text">{{userScore}}分</text>
				</view>
		
				<view class="footer">
					<button @click="submitScore"  :disabled="!userScore || isScore" type="default" size="mini"
						plain>确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>							
</template>

<script setup>
import {ref} from "vue";
import { onLoad } from '@dcloudio/uni-app'
import { getStatusBarHeight } from '@/utils/height.js'
import { apiGetSetupScore,apiWriteDownload } from '@/api/api.js'
const classList=ref([])
const currentIndex=ref(0)
const currentInfo=ref(null)
const maskState=ref(true)
const scorePopup=ref(false)
const userScore=ref(0)
const isScore=ref(false)
const clickScoreClose=()=>{
	scorePopup.value.close();
	userScore.value = 0;
	isScore.value = false;
}
const storgClassList=ref(uni.getStorageSync("storgClassList"))
	classList.value = storgClassList.value.map(item => {
		return {
			...item,
			picurl: item.smallPicurl.replace("_small.webp", ".jpg")
		}
	})
onLoad((e)=>{
	currentIndex.value = classList.value.findIndex(item => item._id == e.id)
	currentInfo.value = classList.value[currentIndex.value]
	console.log('测试preview的e');
})

//返回上一页
const goBack = () => {
		uni.navigateBack({
			success: () => {
				
			},
			fail: (err) => {
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		})
	}
const maskChange=()=>{
	maskState.value = !maskState.value
}
const swiperChange=(e)=>{
	// console.log('打印切换轮播图',e.detail.current);
	currentIndex.value = e.detail.current
	currentInfo.value = classList.value[currentIndex.value]
}
const clickDownload=async()=>{
	uni.showLoading()
	let {
		classid,
		_id: wallId
	} = currentInfo.value;
	let res = await apiWriteDownload({
		classid,
		wallId
	})
	if (res.errCode != 0) throw res;
	uni.getImageInfo({
		src: currentInfo.value.picurl,
		success: (res) => {
			uni.saveImageToPhotosAlbum({
				filePath: res.path,
				success: (res) => {
					uni.showToast({
						title: "保存成功，请到相册查看",
						icon: "none"
					})
				},
				fail: err => {
					if (err.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
						uni.showToast({
							title: '保存失败，请重新点击下载',
							icon: "none"
						})
						return;
					}
					uni.showModal({
						title: "授权提示",
						content: "需要授权保存相册",
						success: res => {
							if (res.confirm) {
								uni.openSetting({
									success: (setting) => {
										console.log(
											setting);
										if (setting
											.authSetting[
												'scope.writePhotosAlbum'
												]) {
											uni.showToast({
												title: "获取授权成功",
												icon: "none"
											})
										} else {
											uni.showToast({
												title: "获取权限失败",
												icon: "none"
											})
										}
									}
								})
							}
						}
					})
				},
				complete: () => {
					uni.hideLoading();
				}
			})
	
		}
	})
	console.log('1');
}
const clickInfo=()=>{
	console.log('1');
}
const clickScore=()=>{
	console.log('打印currentInfo',currentInfo);
	if (currentInfo.value.userScore) {
		isScore.value = true;
		userScore.value = currentInfo.value.userScore;
	}
	scorePopup.value.open();
}
	

	//确认评分
const submitScore = async () => {
		uni.showLoading({
			title: "加载中..."
		})
		let {
			classid,
			_id: wallId
		} = currentInfo.value;
		let res = await apiGetSetupScore({
			classid,
			wallId,
			userScore: userScore.value
		})
		uni.hideLoading();
		if (res.errCode === 0) {
			uni.showToast({
				title: "评分成功",
				icon: "none"
			})
			classList.value[currentIndex.value].userScore = userScore.value;
			uni.setStorageSync("storgClassList", classList.value);
			clickScoreClose();
		}
	}
console.log('打印预览列表长度',classList.value.length);
</script>

<style lang="scss" scoped>
	.preview {
		width: 100%;
		height: 100vh;
		position: relative;

		.swiper {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}
		
		.mask{
			color: #fff;
			.goBack{
				position: absolute;
				width: 38px;
				height: 38px;
				background: rgba(0, 0, 0, 0.5);
				left: 30rpx;
				border-radius: 100px;
				backdrop-filter: blur(10rpx);
				border: 1rpx solid rgba(255, 255, 255, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;
			}
			
			.count{
				    position: absolute;
					top: 10vh;
					left: 0;
					margin: auto;
					right: 0;
					width: fit-content;
					background: rgba(0, 0, 0, 0.3);
					font-size: 28rpx;
					border-radius: 40rpx;
					padding: 8rpx 28rpx;
					backdrop-filter: blur(10rpx);		
			}
			
			.time {
				position: absolute;
				font-size: 140rpx;
				top: calc(10vh + 80rpx);
				left: 0;
				margin: auto;
				right: 0;
				width: fit-content;
				font-weight: 100;
				line-height: 1em;
				text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
			}
			
			.date {
				position: absolute;
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				left: 0;
				margin: auto;
				right: 0;
				width: fit-content;
				text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
			}
			
			.footer{
				position: absolute;
				left: 0;
				margin: auto;
				right: 0;
				bottom: 10vh;
				width: fit-content;
				display: flex;
				justify-content: space-around;
				align-items: center;
				background: rgba(255, 255, 255, 0.8);
				width: 60vw;
				height: 120rpx;
				border-radius: 120rpx;
				box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
				backdrop-filter: blur(20rpx);
				.box{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.text {
						font-size: 26rpx;
						color: #676767;
					}
				}
				
			}


		}
		
		.scorePopup {
			background: #fff;
			padding: 30rpx;
			width: 70vw;
			border-radius: 30rpx;
		    .popHeader{
				display: flex;
				justify-content: space-between;
				font-size: 26rpx;
			}
			.content {
				padding: 30rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;
		
				.text {
					color: #FFCA3E;
					padding-left: 10rpx;
					width: 80rpx;
					line-height: 1em;
					text-align: right;
					font-size: 28rpx;
				}
			}
		
			.footer {
				padding: 10rpx 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		}
</style>
