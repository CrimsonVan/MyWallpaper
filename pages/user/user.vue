<template>
	<view class="userLayout pageBg" v-if="userinfo">
		<!-- 安全高度 -->
		<view :style="{height:getNavBarHeight()+'px'}"></view>
	
		<!-- 身份信息 -->
		<view class="userInfo">
			<!-- 头像 -->
			<view class="avatar">
				<image src="https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/O4S9HnBMw7Tv9169c1cf7b8daa9237440516e6d028d7.jpg" mode="aspectFill"></image>
			</view>
			<!-- ip地址 -->
			<view class="ip">{{userinfo.IP}}</view>
			<!-- 省市县地址 -->
			<view class="address">来自于：
	        {{ userinfo.address.city || userinfo.address.province || userinfo.address.country}}
			</view>
		</view>
		
		<view class="section">
			<view class="list">
				<!-- 下载数量 -->
				<navigator 
				url="/pages/classlist/classlist?name=我的下载&type=download" 
				>
				<view class="row">
					<view class="left">
						<uni-icons type="download-filled" size="20" ></uni-icons>
						<view class="text">我的下载</view>
					</view>
							
					<view class="right">
						<view class="text">{{userinfo.downloadSize}}</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
				</navigator>
				<!-- 评分数量 -->
				<navigator  
				url="/pages/classlist/classlist?name=我的评分&type=score"
				>
				<view class="row">
					<view class="left">
						<uni-icons type="star-filled" size="20"></uni-icons>
						<view class="text">我的评分</view>
					</view>
					<view class="right">
						<view class="text">{{userinfo.scoreSize}}</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
				</navigator>
				<!-- 联系客服 -->
				<view class="row">
					<view class="left">
						<uni-icons type="chatboxes-filled" size="20"></uni-icons>
						<view class="text">联系客服</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>			
			</view>
		</view>
	 </view>
	 <view class="loadingLayout" v-else>
	 	<view :style="{height:getNavBarHeight()+'px'}"></view>
	 	<uni-load-more status="loading"></uni-load-more>
	 </view>  
</template>

<script setup>
import {getNavBarHeight} from "@/utils/height.js"
import {ref,onMounted} from 'vue'	
import {apiUserInfo} from "@/api/api.js"
const title=ref('我的')
const userinfo = ref(null)
onMounted(async()=>{

    let res = await apiUserInfo()
	console.log('打印用户信息',res.data);
	userinfo.value = res.data

})
</script>

<style scoped lang="scss">
.userLayout{
	.userInfo{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;		
		padding:50rpx 0;
		margin: 0 auto;
		.avatar{
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.ip{
			font-size: 44rpx;
			color:#333;
			padding:20rpx 0 5rpx;
		}
		.address{
			font-size: 28rpx;
			color:#aaa;
		}
	}
     
	 .section{
	 	width: 690rpx;
	 	margin:50rpx auto;
	 	border:1px solid #eee;
	 	border-radius: 10rpx;
	 	box-shadow: 0 0 30rpx rgba(0,0,0,0.05);
	 	.list{
			display: flex;
			flex-direction: column;
			// align-items: center;
	 		.row{
	 			display:flex;
	 			justify-content: space-between;
	 			align-items: center;
	 			padding:0 30rpx;
	 			height: 100rpx;
				// width: 100%;
	 			border-bottom: 1px solid #eee;
	 			// position: relative;
	 			background: #fff;
				// &:last-child{border-bottom:0}
				.left{
					display: flex;
					align-items: center;
					// justify-content:center;
					// background-color: pink;
					.text{
						padding-left: 20rpx;
						color:#666
					}
					}
				.right{
					display: flex;
					align-items: center;
					// justify-content:center;
					// background-color: gold;
					.text{
						font-size: 28rpx;
						color:#aaa;
						
					}
					}	
				}
			}
		}		
	 }
</style>
