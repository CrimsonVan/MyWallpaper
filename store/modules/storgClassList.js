import {defineStore} from'pinia'
import {ref} from'vue'

export const useStorgClassListStore =defineStore('storgPinia',()=>{
	// 分类部分
	const storgClassList=ref([])
    const setStorgClassList=(arr)=>{
      storgClassList.value=arr
    }
    const delStorgClassList=()=>{
		storgClassList.value=[]
	}
	return {storgClassList,setStorgClassList,delStorgClassList}
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