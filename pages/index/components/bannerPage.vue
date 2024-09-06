<template>
			<view class="banner">
				<swiper class="swiper" circular indicator-dots indicator-color="rgba(255,255,255,0.5)" 
				indicator-active-color="#fff" autoplay>
					<swiper-item class="swiper-item" v-for="item in bannerList" :key="item._id">
						
						<navigator  
						class="like"
						url="/pages/classify/classify"
						open-type="switchTab"
						>
							<image class="image" :src="item.picurl" mode="aspectFill"></image>
						</navigator>
						
					</swiper-item>				
				</swiper>
			</view>
</template>

<script setup>
import {ref,onMounted} from 'vue'	
import { apiGetBanner } from "@/api/api.js"
const bannerList=ref()
onMounted(async()=>{
 let res = await apiGetBanner()
 bannerList.value=res.data
})	
</script>


<style scoped lang="scss">	
	.banner{
		width: 100%;
		.swiper{
			width: 100%;
			height: 340rpx;
			.swiper-item{
				width: 100%;
				height: 340rpx;
				.like{
					width: 100%;
					height: 340rpx;
					.image{
						width: 100%;
						height: 340rpx;
						border-radius: 10rpx;
					}
				}
				}
			}
	}
</style>