<template>
	<view class="classlist">
		<view class="content" 
		    v-for="item in classList"
			:key="item._id">
			<navigator :url="'/pages/preview/preview?id='+item._id" open-type="navigate"  class="item" >			
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>	
	</view>
	<view  class="loadingLayout" style="display: flex;justify-content: center;">
		<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
	</view>
</template>

<script setup>
import { onLoad,onReachBottom,onUnload } from "@dcloudio/uni-app"
import { apiGetClassList,apiGetHistoryList } from '@/api/api.js'
import { ref } from 'vue'
import { useStorgClassListStore } from "../../store";
const storgClassListStore=useStorgClassListStore()
//定义data参数
const queryParams = {
	pageNum:1,
	pageSize:12
}
const noData=ref(false)
const classList = ref([])
onLoad((e)=>{	
	// let {id,name,type} = e;
	
	if(e?.type) {queryParams.type = e?.type}
    if(e?.id){queryParams.classid = e?.id}	
	
	// pageName = name	
	//修改导航标题
	uni.setNavigationBarTitle({
		title:e?.name
	})
	//执行获取分类列表方法
	getClassList();
})
const getClassList =async () => {
	let res
	if(queryParams.type){res = await apiGetHistoryList(queryParams)}
	if(queryParams.classid){res = await apiGetClassList(queryParams)}
	if(res.data.length<12){
		noData.value=true
	}
	classList.value = [...classList.value,...res.data]
	// uni.setStorageSync("storgClassList",classList.value);
	storgClassListStore.setStorgClassList(classList.value)
}
onReachBottom(()=>{
	if(noData.value) return;
	queryParams.pageNum++;
	getClassList();
})


// //关闭有页面
onUnload(()=>{
	storgClassListStore.delStorgClassList()
})
</script>

<style scoped lang="scss">
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
