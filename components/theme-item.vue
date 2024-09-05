<template>
		<view class="themeItem">
			<navigator 		
			class="box" 
			v-if="!more"
			:url="'/pages/classlist/classlist?id='+data._id+'&name='+data.name"
			open-type="navigate"
			>	
				<image class="pic" :src="props.data.picurl" mode="aspectFill"></image>
				<view class="mask">{{props.data.name}}</view>
			</navigator>
			<navigator
			url="/pages/classify/classify"
			class="box" 
			open-type="switchTab"
			v-else
			>	
				<image class="pic" src="@/static/images/wallpaper/classify1.jpg" mode="aspectFill"></image>
				<view class="moreMask">
					<view class="text">
					   . . .
					</view>
					<view class="text">
					   更多	
					</view>
				</view>
			</navigator>
		</view>
</template>

<script setup>
import {ref} from 'vue'
const props=defineProps({
	more:{
		type:Boolean,
		default:false
		},
	data:{
		type:Object,
		default:{
			name:'暂无',
			picurl:"https://mp-0cb878b7-99ec-44ea-8246-12b123304b05.cdn.bspapp.com/xxmBizhi/20231010/1696900747351_2102.jpg"
		}
	}	
})
const name=ref(props.data.name)
const id=ref(props.data.id)
const goMoreTheme=()=>{
	uni.switchTab({
		url:'/pages/classify/classify'
	})
}
</script>

<style lang="scss" scoped>
.themeItem{
	.box{
		// margin-top: 5rpx;
		height: 340rpx;
		border-radius: 20rpx;
		width: 224rpx;
		overflow:hidden;
		position: relative;
		.pic{
			width: 100%;
			height: 100%;
		}
		.mask{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 70rpx;
			background-color: rgba(0,0,0,0.2);
			backdrop-filter: blur(20rpx);
			color:#fff;
			font-weight: 600;
			font-size: 30rpx;
			text-align: center;
			line-height: 70rpx;
		}
		.moreMask{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.2);
			backdrop-filter: blur(20rpx);
			color:#fff;
			font-weight: 600;
			font-size: 30rpx;
			display: flex;
			justify-content:center;
			align-items: center;
			flex-direction: column;
			.text{
				margin-bottom: 10rpx;
			}
			
			
		}
	   }
     }	   
	   
</style>