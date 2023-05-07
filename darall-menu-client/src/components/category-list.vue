<script setup lang="ts">
import { LibraryAddSharp } from "@vicons/material";
import { NDataTable, DataTableColumns, DataTableRowKey, NButton, NInput, NSpace, useMessage } from "naive-ui";
import { Icon } from "@vicons/utils";
import { axiosInstance } from "../main.ts";
import { ref, h } from "vue";

const message = useMessage()
const categoryName = ref('')
const categoryList = ref([])
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
const collection = await getCategoryCollection()
categoryList.value = collection

type RowData = { id: string, name: string }
const createColumns = (): DataTableColumns<RowData> => [
    {
        type: 'selection'
    },
    {
        title: '№',
        key: 'index',
        render: (_, index) => {
            return `#${index + 1}`
        }
    },
    {
        title: 'Название',
        key: 'name',
        render (row, index) {
            return h(NInput, {
                value: row.name,
                onUpdateValue (v) {
                    categoryList.value[index].name = v
                }
            })
        }
    },
]

const columns = createColumns()


function handleCheck (rowKeys: DataTableRowKey[]) {
    checkedRowKeysRef.value = rowKeys
}
const addCategory = async () => {
    try {
        const response = await axiosInstance.post(`/category`, { name: categoryName.value })
        const { item } = response.data
        categoryList.value.push(item)
        message.create('Добавлена категория')
    } catch (e) {
        message.error(e)
    }
}

async function getCategoryCollection() {
    try {
        const response = await axiosInstance.get(`/category`)
        const { collections } = response.data as { collections: [], count: number }
        return collections
    } catch (e) {
        message.error(e)
    }
}

</script>

<template>
    <n-space vertical :size="12">
        <n-space>
            <n-input v-model:value="categoryName"
                     placeholder="Название"
            />
            <n-button @click="addCategory">
                <Icon size="24">
                    <LibraryAddSharp/>
                </Icon>
                Добавить
            </n-button>
        </n-space>
        <n-space>
            <n-button type="info">
                Обновить
            </n-button>
            <n-button type="error">
                Удалить
            </n-button>
        </n-space>
        <ul class="col _h-gap-sm">
            <n-data-table
                :columns="columns"
                :data="categoryList"
                :row-key="(row: RowData) => row.name"
                :pagination="{ pageSize: 10 }"
                @update:checked-row-keys="handleCheck"
            />
        </ul>
    </n-space>
</template>

<style scoped>

</style>