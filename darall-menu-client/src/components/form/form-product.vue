<script setup lang="ts">
import {
    NForm,
    NFormItem,
    NInput,
    NInputNumber,
    NButton,
    NSelect,
    FormRules,
    NUpload,
    NDivider,
    FormInst,
    useMessage
} from 'naive-ui'
import type { UploadFileInfo } from 'naive-ui'
import { Ref, ref } from "vue";
import { useMenuStore } from "../../store/store.menu.ts";
import { storeToRefs } from "pinia";
import { axiosInstance } from "../../main.ts";

type categoryOptionItem = { label: string, value: string}

const store = useMenuStore()
const { collectionRef } = storeToRefs(store)
const categoryOptions: Ref<categoryOptionItem[]> = ref([])

categoryOptions.value = collectionRef.value.map((i) => ({
    label: i.name,
    value: i.id
}))

const message = useMessage()
const formRef = ref<FormInst | null>(null)
const fileList = ref<UploadFileInfo[]>([])
type Product = {
    name: string
    price: number
    contain: string
    category: { connect: { id: string } }
    image: { connect: { id: string }}
}
const formData: Ref<{ product: Product }> = ref({
    product: {
        name: '',
        price: 0,
        contain: '',
        category: {
            connect: { id: ''}
        },
        image: {
            connect: { id: ''}
        }
    }
})
const rules: FormRules = {
    name: [
        {
            required: true,
            message: 'Поле имя не заполнено'
        }
    ],
    price: [
        {
            required: true,
            message: 'Поле цена не заполнено'
        }
    ],
    category: [
        {
            required: true,
            message: 'Выберите категорию'
        }
    ],
    file: [
        {
            required: true,
            message: 'Выберите фото'
        }
    ]
}

function uploadFinish({ file, event }: { file: UploadFileInfo, event?: ProgressEvent }) {
    const image = JSON.parse((event?.target as XMLHttpRequest).response).item
    message.success(`Картинка ${image.name} загружена`)
    formData.value.product.image.connect.id = image['id']
    return file
}
function formatCurrency(value: number | null) {
    if (value === null) return ''
    return value.toLocaleString('en-US')
}
function parseCurrency(input: string) {
    const nums = input.replace(/,/g, '').trim()
    if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums)
    return nums === '' ? null : Number.NaN
}
async function handleSubmit(e: MouseEvent) {
    e.preventDefault()

    try {
        await formRef.value?.validate()
        await axiosInstance.post(`/product` , formData.value.product)
        message.success('Форма отправлена!')
        window.location.reload()
    } catch (e: any) {
        message.error(`Форма заполнена неверно ${e.message}`)
    }
}

</script>

<template>
    <n-form ref="formRef" :model="formData.product" :rules="rules">
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
        <n-form-item path="name" label="Название">
            <n-input v-model:value="formData.product.name"
                     placeholder=""
                     @keydown.enter.prevent
            />
        </n-form-item>
        <n-form-item path="price" label="Цена">
            <n-input-number v-model:value="formData.product.price"
                            :default-value="0"
                            placeholder=""
                            :format="formatCurrency"
                            :parse="parseCurrency"
                            clearable
                            @keydown.enter.prevent
            />
        </n-form-item>
        <n-form-item path="category.connect" label="Категория">
            <n-select v-model:value="formData.product.category.connect.id"
                      placeholder="Выберите категорию"
                     :options="categoryOptions"
            />
        </n-form-item>
        <n-form-item path="contain" label="Состав">
            <n-input v-model:value="formData.product.contain"
                     type="textarea"
                     placeholder=""
            />
        </n-form-item>
        <n-row :gutter="[0, 24]">
            <n-col :span="24">
                <div style="display: flex; justify-content: flex-end">
                    <n-button round
                              type="primary"
                              @click="handleSubmit"
                    >
                        Создать
                    </n-button>
                </div>
            </n-col>
        </n-row>
    </n-form>
</template>

<style scoped>

</style>