import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { axiosInstance } from "../main.ts";

export interface CategoryItem {
  id: string
  name: string,
  image: {
    id: string,
    name: string,
    link: string
  }
}

export interface ProductItem extends CategoryItem{
  price: string,
  contain: string,
}
export const useMenuStore = defineStore('menu', () => {
  const collectionRef: Ref<CategoryItem[]> = ref([])
  async function getCategoryCollection(params?: object) {
    const response = await axiosInstance.get(`/category`, { params })
    const { collections} = response.data as { collections: [], count: number }

    collectionRef.value = collections.map((element: CategoryItem, index) => ({
      ...element,
      key: index
    }))
  }

  async function getProductList(params: object) {
    const response = await axiosInstance.get(`/product`, { params })
    const { collections} = response.data as { collections: [], count: number }

    return collections.map((element: ProductItem, index) => ({
      ...element,
      key: index
    }))
  }

  return {
    collectionRef,
    getCategoryCollection,
    getProductList
  }
})