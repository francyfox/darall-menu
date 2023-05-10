<script setup lang="ts">
import { useMenuStore } from "../store/store.menu.ts";
import { LibraryAddSharp, DeleteRound } from "@vicons/material";
import {
    NDataTable,
    DataTableColumns,
    DataTableRowKey,
    NButton,
    NInput,
    NSpace,
    useMessage,
    NModal,
    NUpload, NDivider, UploadFileInfo, NImage
} from "naive-ui";
import { Icon } from "@vicons/utils";
import { axiosInstance } from "../main.ts";
import { ref, h } from "vue";
import { storeToRefs} from "pinia";

const store = useMenuStore()
const { getCategoryCollection } = store
const { collectionRef } = storeToRefs(store)
await getCategoryCollection({ include: { image: true } })

const isModalShow = ref(false)
const fileList = ref<UploadFileInfo[]>([])

const message = useMessage()
const category = ref({
    name: '',
    image: { connect: { id: ''}}
})
const checkedRowKeys = ref<DataTableRowKey[]>([])

function uploadFinish({ file, event }: { file: UploadFileInfo, event?: ProgressEvent }) {
    const image = JSON.parse((event?.target as XMLHttpRequest).response).item
    message.success(`Картинка ${image.name} загружена`)
    category.value.image.connect.id = image.id
    return file
}

async function deleteManyRows() {
    try {
        const listId = checkedRowKeys.value.map((key: any) => {
            return collectionRef.value[key].id
        })

        await axiosInstance.post(`/category/bulk/delete`, { listId })
        for (const key of checkedRowKeys.value as number[]) {
            collectionRef.value.splice(key, 1)
        }

        message.info('Категории удалены')
    } catch (e: any) {
        message.info(e)
    }

}

async function updateRow(index: number, id: string, name: string) {
    try {
        await axiosInstance.patch(`/category/${id}`, { name })
        message.info(`Категория #${index + 1} обновлена`)
    } catch (e: any) {
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
        render: (_: any, index: number) => {
            return `#${index + 1}`
        }
    },
    {
        title: 'Фото',
        key: 'image',
        render: (_: any, index: number) => {
            const src = collectionRef.value[index].image?.link ?? '/empty.jpeg'
            return h(NImage, { src, width: 25 })
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
        await axiosInstance.post(`/category`, category.value)
        message.create('Добавлена категория')
        window.location.reload()
    } catch (e: any) {
        message.error(e)
    }
}

</script>

<template>
    <n-space vertical :size="12">
        <n-space>
            <n-button @click="isModalShow = true">
                Создать
            </n-button>
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
            *Сохранение при клике вне поля ввода
        </small>
    </n-space>
    <n-modal
        v-model:show="isModalShow"
        class="custom-card"
        preset="card"
        :style="{ width: '600px'}"
        title="Добавить категорию"
        :bordered="false"
        size="huge"
    >
        <n-upload
            action="http://localhost:3000/api/image"
            :default-file-list="fileList"
            :multiple="false"
            @finish="uploadFinish"
            list-type="image-card"
            name="file"
            :max="1"
        >
            Добавить фото
        </n-upload>
        <n-divider/>
        <n-space>
            <n-input v-model:value="category.name"
                     placeholder="Название"
            />
            <n-button @click="addCategory">
                <Icon size="24">
                    <LibraryAddSharp/>
                </Icon>
                Добавить
            </n-button>
        </n-space>
    </n-modal>
</template>

<style scoped>

</style>