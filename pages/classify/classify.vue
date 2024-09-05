<template>
	<navPage :title="title"></navPage>
	<view class="content">
		<view class="itemBox" v-for="(item,index) in classifyList" :key="index">
			<themeItem :more="false" :data="item" ></themeItem>	
		</view>
	</view>
</template>

<script setup>
import {ref,onMounted} from 'vue'	
import navPage from "@/components/navPage.vue"
import themeItem from "@/components/theme-item.vue"
import { apiGetClassify } from "@/api/api.js"
const title=ref('分类')
const classifyList=ref()
onMounted(async()=>{
 let res = await apiGetClassify({
		pageSize:15
	})

 classifyList.value=res.data

})

</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-wrap: wrap;
		// justify-content: space-between;
		margin-top: 20rpx;
		padding: 0 30rpx;
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
</style>
