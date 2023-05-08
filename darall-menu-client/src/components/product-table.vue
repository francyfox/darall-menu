<script setup lang="ts">
import { NSpace, NDataTable, NButton, NModal } from 'naive-ui'
import { ref } from "vue";
import FormProduct from "./form/form-product.vue";

const isModalShow = ref(false)
const columns = [
  {
    title: 'Название',
    key: 'name'
  },
  {
      title: 'Состав',
      key: 'contain'
  }
]

const data = [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    chinese: 98,
    math: 60,
    english: 70
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    chinese: 98,
    math: 66,
    english: 89
  }
]

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
                :data="data"
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