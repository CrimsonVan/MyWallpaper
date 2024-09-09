import {defineStore} from'pinia'
import {ref} from'vue'

export const useHistoryStore =defineStore('historyPinia',()=>{
	// 分类部分
	const historyArr=ref([])
    const setHistoryArr=(arr)=>{
      historyArr.value=arr
    }
    const delHistoryArr=()=>{
		historyArr.value=[]
	}
	return {historyArr,setHistoryArr,delHistoryArr}
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