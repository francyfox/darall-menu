<script setup lang="ts">
import { useMenuStore } from "../store/store.menu.ts";
import { LibraryAddSharp, DeleteRound } from "@vicons/material";
import { NDataTable, DataTableColumns, DataTableRowKey, NButton, NInput, NSpace, useMessage } from "naive-ui";
import { Icon } from "@vicons/utils";
import { axiosInstance } from "../main.ts";
import { ref, h } from "vue";
import { storeToRefs} from "pinia";

const store = useMenuStore()
const { getCategoryCollection } = store
const { collectionRef } = storeToRefs(store)
await getCategoryCollection()

const message = useMessage()
const categoryName = ref('')
const checkedRowKeys = ref<DataTableRowKey[]>([])

async function deleteManyRows() {
    try {
        const listId = checkedRowKeys.value.map((key) => {
            return collectionRef.value[key].id
        })

        await axiosInstance.post(`/category/bulk/delete`, { listId })
        for (const key: number of checkedRowKeys.value) {
            collectionRef.value.splice(key, 1)
        }

        message.info('Категории удалены')
    } catch (e) {
        message.info(e)
    }

}

async function updateRow(index: number, id: string, name: string) {
    try {
        await axiosInstance.patch(`/category/${id}`, { name })
        message.info(`Категория #${index + 1} обновлена`)
    } catch (e) {
        message.info(e)
    }

}


type RowData = { id: string, name: string }
const createColumns = (): DataTableColumns<RowData> => [
    {
        type: 'selection',
        options: [
            'all',
            'none'
        ],
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
                    collectionRef.value[index].name = v
                },
                onBlur () {
                    const id = collectionRef.value[index].id
                    const name = collectionRef.value[index].name
                    updateRow(index, id, name)
                }
            })
        }
    },
]

const columns = createColumns()


function handleCheck (rowKeys: DataTableRowKey[]) {
    checkedRowKeys.value = rowKeys
}
const addCategory = async () => {
    try {
        const response = await axiosInstance.post(`/category`, { name: categoryName.value })
        const { item } = response.data
        collectionRef.value.push(item)
        message.create('Добавлена категория')
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
            <n-button @click="deleteManyRows"
            >
                <Icon :size="24">
                    <DeleteRound/>
                </Icon>
                Удалить выбранные
            </n-button>
        </n-space>
        <ul class="col _h-gap-sm">
            <n-data-table
                v-model:checked-row-keys="checkedRowKeys"
                :columns="columns"
                :data="collectionRef"
                :pagination="{ pageSize: 6 }"
                @update:checked-row-keys="handleCheck"
            />
        </ul>
        <small>
            *Сохрание при клике вне поля ввода
        </small>
    </n-space>
</template>

<style scoped>

</style>