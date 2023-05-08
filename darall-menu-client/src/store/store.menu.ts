import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { axiosInstance } from "../main.ts";

export type CategoryItem = {
  id: string
  name: string
}
export const useMenuStore = defineStore('menu', () => {
  const collectionRef: Ref<CategoryItem[]> = ref([])
  async function getCategoryCollection() {
    const response = await axiosInstance.get(`/category`)
    const { collections} = response.data as { collections: [], count: number }

    collectionRef.value = collections.map((element: CategoryItem, index) => ({
      ...element,
      key: index
    }))
  }

  return {
    collectionRef,
    getCategoryCollection
  }
})