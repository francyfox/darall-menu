<script setup lang="ts">
import { NSpace, NDataTable, NButton, NModal, NImage } from 'naive-ui'
import { ref, h } from "vue";
import FormProduct from "./form/form-product.vue";
import { useMenuStore } from "../store/store.menu.ts";

const store = useMenuStore()
const { getProductList } = store
const isModalShow = ref(false)
const tableData = ref()
const columns = [
    {
        title: '№',
        key: 'key',
        render: (_, index) => {
            return `#${index + 1}`
        }
    },
    {
        title: 'Фото',
        key: 'image',
        render: (_, index) => {
            console.log(tableData.value[index])
            return h(NImage, { src: tableData.value[index].image.link, width: 25 })
        }
    },
  {
    title: 'Название',
    key: 'name'
  },
  {
      title: 'Состав',
      key: 'contain'
  },
    {
        title: 'Цена',
        key: 'price'
    }
]

tableData.value = await getProductList()
</script>

<template>
    <div class="product-table">
        <n-space vertical :size="12">
            <n-space>
                <n-button @click="isModalShow = true">Добавить товар</n-button>
            </n-space>
            <n-data-table
                ref="dataTableInst"
                :columns="columns"
                :data="tableData"
                :pagination="{ pageSize: 6 }"
            />
        </n-space>

        <n-modal
            v-model:show="isModalShow "
            class="custom-card"
            preset="card"
            :style="{ width: '600px'}"
            title="Добавить товар"
            :bordered="false"
            size="huge"
        >
           <form-product/>
        </n-modal>
    </div>

</template>

<style scoped>

</style>