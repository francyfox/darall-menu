<script setup lang="ts">
import { NSpace, NDataTable, NButton } from 'naive-ui'

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
    <n-space vertical :size="12">
        <n-space>
            <n-button @click="sortName">Добавить товар</n-button>
        </n-space>
        <n-data-table
                ref="dataTableInst"
                :columns="columns"
                :data="data"
                :pagination="pagination"
        />
    </n-space>
</template>

<style scoped>

</style>