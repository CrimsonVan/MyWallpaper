<template>
			<view class="notice" v-if="noticeList">
				<view class="left">
					<uni-icons type="sound-filled" size="20"></uni-icons>
					<text class="text">公告</text>
				</view>
			    	<view class="center">
					<swiper class="swiper" vertical autoplay interval="1500" duration="300" circular>
						<swiper-item class="swiper-item" v-for="(item,index) in noticeList" :key="index">
							<navigator>
						        {{item.title}}
							</navigator>
						</swiper-item>
					</swiper>
				</view>
				<view class="right">
					<uni-icons type="right" size="16" color="#333"></uni-icons>
				</view>
			</view>
</template>

<script setup>
import { ref , onMounted}from'vue'	
import { apiGetNotice }from'@/api/api.js'	
const noticeList = ref([{title:'本小程序若涉及侵权本站立即删除'},
{title:'所有壁纸均从网络上获取仅供学习'}])

</script>

<style scoped lang="scss">
	.notice{
		margin-top: 20rpx;
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		background: #f9f9f9;
		border-radius: 80rpx;
		display: flex;
		justify-content: space-between;
		.left{
			width: 140rpx;
		}
		.center{
			flex:1;
			.swiper{
				width: 100%;
				height: 100%;
				.swiper-item{
					height: 100%;
					width: 100%;
					font-size: 30rpx;
					color:#666;
					// text-align: center;
					overflow: hidden;
					white-space: nowrap;
					text-overflow:ellipsis;
				}
			}
		}
		.right{
			// background-color: pink;
			width: 50px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding-right: 10rpx;
		}
	}
</style>