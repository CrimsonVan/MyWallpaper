<template>
	<view class="nav">
		<view class="statusBar" :style="{height:getStatusBarHeight()+'px'}"></view>
	    <view class="titleBar"
	    :style="{height:getTitleBarHeight()+'px'}">
		    <!-- 首页文字 -->
			<view class="title">{{title}}</view>
			<!--  搜索框-->
			<navigator url="/pages/search/search" class="search">
				 <uni-icons class="icon" type="search" color="#888" size="18"></uni-icons>
				 <text class="text">搜索</text>
			</navigator>
	    </view>
	</view>
	<view class="fill" :style="{height:getNavBarHeight()+'px'}">		
	</view>
</template>

<script setup>
import {ref} from 'vue'	
import {getNavBarHeight,getStatusBarHeight,getTitleBarHeight} from "@/utils/height.js"
const props=defineProps({
	title:{
		type:String,
		default:'壁纸'
		}
})

</script>

<style scoped lang="scss">
	.nav{
		position: fixed;
		top:0;
		left:0;
		width: 100%;
		z-index: 10;
		background-color: #ffffff;
		.titleBar{
			display: flex;
			align-items: center;
			padding:0 30rpx;
			.title{
				font-size: 22px;
				font-weight: 700;
				color: black;	
			}
			.search{
				border: 1px solid #ccc;
				width: 220rpx;
				height: 50rpx;
				border-radius: 60rpx;
				background: rgba(255,255,255,0.4);
				margin-left:30rpx;
				color:#999;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				.icon{
					margin-left:5rpx;			
				}
				.text{
					padding-left:10rpx;
					
				}
			}
		}
	}
</style>