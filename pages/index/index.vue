<template>
	<navPage :title="title"></navPage>
	<view class="home">
		<!-- 轮播图 -->
		<bannerPage></bannerPage>
		<!-- 通知 -->	
		<noticePage></noticePage>
		<!-- 今日推荐 -->
		<view class="select">
			<!-- 标题头 -->
			<commonTitle>
				<template #name>每日推荐</template>
				<template #custom>
					<navigator url="/pages/classify/classify" open-type="switchTab" class="more" style="font-size: 32rpx;
				color:#888;">More+</navigator>
				</template>
			</commonTitle>
			<!-- 推荐模块 -->
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="item in randomList" :key="item._id" 
					@click="goPreview(item._id)">					
						<image :src="item.smallPicurl" mode="aspectFill"></image>					
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 专题精选 -->
		<view class="theme">
			<!-- 标题头 -->
			<commonTitle>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="/pages/classify/classify" open-type="switchTab" class="more" style="font-size: 32rpx;
				color:#888;">More+</navigator>
				</template>
			</commonTitle>
			<!--分类模块  -->
			<view class="content">
				<view class="itemBox" v-for="(data,index) in classifyList " :key="index">
					<themeItem :data=data :more="false" ></themeItem>	
				</view>
				<view class="itemBox" >
					<themeItem  :more="true" ></themeItem>	
				</view>
			</view>
		</view>
	

	</view>
</template>

<script setup>
import {ref,onMounted, computed} from 'vue'	
import navPage from "@/components/navPage.vue"
import bannerPage from "./components/bannerPage.vue"
import noticePage from "./components/noticePage.vue"
import commonTitle from "@/components/common-title.vue"
import themeItem from "../../components/theme-item.vue"
import { apiGetDayRandom } from "@/api/api.js"
import { useCateStore,useStorgClassListStore } from '../../store'
const title=ref('推荐')
const randomList=ref()
const cateStore=useCateStore()
const storgClassListStore=useStorgClassListStore()
const getDayRandom = async ()=>{
	let res =await apiGetDayRandom();
	randomList.value = res.data	
	// uni.setStorageSync("storgClassList",randomList.value);
	storgClassListStore.setStorgClassList(randomList.value)
	
}
const goPreview = (id)=>{
	// uni.setStorageSync("storgClassList",randomList.value);
	storgClassListStore.setStorgClassList(randomList.value)
	uni.navigateTo({
		url:'/pages/preview/preview?id='+id
	})
}
const classifyList=computed(()=>{
	return cateStore.classifyList?.slice(0,8)
})
 cateStore.getClassifyList()
 getDayRandom()

</script>

<style scoped lang="scss">
	.home {
		// width: 100%;
		margin-top: 25rpx;
		padding: 0 30rpx;
		.select{
			// width: 100%;
			margin-top: 50rpx;
			.content{
				width: 720rpx;
				margin-top: 30rpx;
				// display: flex;
				scroll-view{
					white-space: nowrap;

					.box{
						width: 200rpx;
						height: 430rpx;
						margin-right: 15rpx;
						display: inline-block;
						image{
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}
					.box:last-child{
						margin-right: 30rpx;
					}
				}
			}
			
			
			}
		.theme{
			// width: 100%;
			margin-top: 50rpx;
			.content {
				// width: 100%;
				display: flex;
				flex-wrap: wrap;
				// justify-content: space-between;
				margin-top: 20rpx;
				// background-color: pink;
				.itemBox{
					width: 33.3%;
					height: 345rpx;
					
					// background-color: gold;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			
			}
		}

	}
</style>
