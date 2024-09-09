import {defineStore} from'pinia'
import {ref} from'vue'
import { apiGetClassify} from '@/api/api.js'

export const useCateStore =defineStore('catePinia',()=>{
	// 分类部分
	const classifyList=ref(null)
    const getClassifyList=async ()=>{
    	let res = await apiGetClassify({
    			pageSize:15
    		})
    	classifyList.value=res.data
    }
    // 历史记录部分
	// const historyArr=ref([])
	// const addHistory=(item)=>{

	// 	historyArr.value =
	// 	[...new Set([item,...historyArr.value])].slice(0,10);
		
	// }
	// const removeHistory=()=>{
	// 	historyArr.value=[]
		
	// }
	
	return {classifyList,getClassifyList}
}
,

  {
  // 配置持久化
  persist: {
    // 调整为兼容多端的API
    storage: {
      setItem(key, value) {
        uni.setStorageSync(key, value) // [!code warning]
      },
      getItem(key) {
        return uni.getStorageSync(key) // [!code warning]
      },
    },
  },
},
)