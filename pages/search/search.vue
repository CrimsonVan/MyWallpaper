<template>
	<!-- 搜索框 -->
	<view class="searchHeader">
		<view class="search">
			<uni-search-bar 
			@confirm="goSearch"
			@cancel="initParams()"
			focus 
			placeholder="搜索"
			v-model="queryParams.keyword">
			</uni-search-bar>
		</view>
	</view>
	<!-- 搜索历史和推荐 -->
     <view v-if="!classList.length">
		 <!-- 搜索历史 -->
     	<view class="history"  v-if="historySearch.length>=1">
			<!-- 搜索历史标题栏 -->
     		<view class="topTitle">
     			<view class="text">最近搜索</view>
     			<view class="icon" @click="removeHistory()">
     				<uni-icons type="trash" size="25"></uni-icons>
     			</view>
     		</view>
			<!-- 搜索历史展示 -->
     		<view class="tabs">
     			<view @click="searchTab(tab)" class="tab" v-for="tab in historySearch" :key="tab" 
     			>{{tab}}</view>		
     		</view>
     	</view>
		<!-- 热门推荐 -->
		<view  class="history"  >
			<!-- 热门推荐标题栏 -->
			<view class="topTitle">
				<view class="text">热门推荐</view>
				
			</view>
			<!-- 热门推荐展示 -->
			<view class="tabs">
				<view @click="searchTab(tab)" class="tab" v-for="tab in recommendList" :key="tab" 
				>{{tab}}</view>		
			</view>
		</view>
	
     </view>
	
	<!-- 搜索结果展示 -->
     <view class="classlist">
     	<view class="content" 
     	    v-for="item in classList"
     		:key="item._id">
     		<navigator :url="'/pages/preview/preview?id='+item._id" open-type="navigate"  class="item" >			
     			<image :src="item.smallPicurl" mode="aspectFill"></image>
     		</navigator>
     	</view>   	
     </view>
	 
	 <!-- 加载条 -->
     <view class="loadingLayout" v-if="classList.length>=1" style="display: flex;justify-content: center;">
     	<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
     </view>
</template>

<script setup>
import { ref,computed } from 'vue'
import { apiSearchData } from '@/api/api.js'	
import { onReachBottom ,onUnload} from "@dcloudio/uni-app"
import { useStorgClassListStore,useHistoryStore } from "../../store";
const storgClassListStore=useStorgClassListStore()
const historyStore=useHistoryStore()
// const historySearch = ref(uni.getStorageSync("historySearch"))
const historySearch = computed(()=>historyStore.historyArr)
const recommendList = ref(["美女","帅哥","宠物","卡通"]);
const queryParams=ref({
	pageNum:1,
	pageSize:12,
	keyword:"帅哥"
})
const noData = ref(false)
const classList=ref([])
const searchTab=(tab)=>{
	queryParams.value.keyword = tab
	goSearch()
}
const goSearch =async () =>{
	uni.showLoading({
		title:"加载中"
	})
	// historySearch.value =
	// [...new Set([queryParams.value.keyword,...historySearch.value])].slice(0,10);
	
	// uni.setStorageSync("historySearch",historySearch.value);
	historyStore.setHistoryArr([...new Set([queryParams.value.keyword,...historySearch.value])].slice(0,10))
	try{
		let res =  await apiSearchData(queryParams.value);
		classList.value  =  [...classList.value,...res.data] ;
		// uni.setStorageSync("storgClassList",classList.value);
		storgClassListStore.setStorgClassList(classList.value)
		if(queryParams.value.pageSize > res.data.length) noData.value = true;
	    uni.hideLoading()
	}catch{
	       return
	}

}

//点击清空搜索记录
const removeHistory = ()=>{
	uni.showModal({
		title:"是否清空历史搜索？",
		success:res=>{
			if(res.confirm){
				historyStore.delHistoryArr()
			}
		}
	})
}

onReachBottom(()=>{
	queryParams.value.pageNum++
	console.log('打印页数',queryParams.value.pageNum);
	goSearch()
})

const initParams = ()=>{
	classList.value = [];
	noData.value = false;
	queryParams.value = {
		pageNum:1,
		pageSize:12,
		keyword:""
	}
}

// //关闭有页面
onUnload(()=>{
	// uni.removeStorageSync("storgClassList",[]);	
	storgClassListStore.delStorgClassList()
})
</script>

<style scoped lang="scss">
.history{
	padding:30rpx;
	.topTitle{
		display: flex;
		justify-content: space-between;
		font-size: 32rpx;
		color:#999;
	}
	.tabs{
		display: flex;
		.tab{
			background: #F4F4F4;
			font-size: 28rpx;
			color:#333;
			padding:10rpx 28rpx;
			border-radius: 50rpx;
			margin-right: 20rpx;
			margin-top: 20rpx;
		}
		
	}
}

.classlist{
		display: flex;
		flex-wrap: wrap;
		// justify-content: space-between;
		// background-color: pink;
		.content{
			margin-bottom: 3rpx;
			width: 33.3%;
			height: 440rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.item{
				width: 99%;
				height: 100%;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
