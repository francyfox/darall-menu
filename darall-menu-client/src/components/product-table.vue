<script setup lang="ts">
import {
    NSpace,
    NDataTable,
    NButton,
    NModal,
    NImage,
    useMessage,
    DataTableRowKey,
    NInput
} from 'naive-ui'
import { ref, h } from "vue";
import FormProduct from "./form/form-product.vue";
import { ProductItem, useMenuStore } from "../store/store.menu.ts";
import { DeleteRound } from "@vicons/material";
import { Icon } from "@vicons/utils";
import { axiosInstance } from "../main.ts";

const store = useMenuStore()
const { getProductList } = store
const isModalShow = ref(false)
const tableData = ref()

tableData.value = await getProductList({ include: { image: true }})
const checkedRowKeys = ref<DataTableRowKey[]>([])

const message = useMessage()

const columns: any = [
    {
        type: 'selection',
        options: [
            'all',
            'none'
        ],
    },
    {
        type: 'expand',
        renderExpand: (rowData: ProductItem, index: number) => {
            return h(NInput, {
                value: rowData.contain,
                type: 'textarea',
                autosize: true,
                onUpdateValue (v) {
                    rowData.contain = v
                },
                onBlur () {
                    const id = rowData.id
                    const contain = rowData.contain
                    updateRow(index, id, { contain })
                }
            })
        }
    },
    {
        title: '№',
        key: 'key',
        render: (_: any, index: number) => {
            return `#${index + 1}`
        }
    },
    {
        title: 'Фото',
        key: 'image',
        render: (_: any, index: number) => {
            const src = tableData.value[index].image?.link ?? '/empty.jpeg'
            return h(NImage, { src, width: 25 })
        }
    },
  {
    title: 'Название',
    key: 'name',
      render (row: ProductItem, index: number) {
          return h(NInput, {
              value: row.name,
              onUpdateValue (v) {
                  tableData.value[index].name = v
              },
              onBlur () {
                  const id = tableData.value[index].id
                  const name = tableData.value[index].name
                  updateRow(index, id, { name })
              }
          })
      }
  },
    {
        title: 'Цена (руб)',
        key: 'price',
        render (row: ProductItem, index: number) {
            return h(NInput, {
                value: row.price,
                onUpdateValue (v) {
                    tableData.value[index].price = v
                },
                onBlur () {
                    const id = tableData.value[index].id
                    const price = tableData.value[index].price
                    updateRow(index, id, { price })
                }
            })
        }
    }
]

async function deleteManyRows() {
    try {
        const listId = checkedRowKeys.value.map((key) => {
            return tableData.value[key].id
        })

        console.log(checkedRowKeys.value)

        await axiosInstance.post(`/product/bulk/delete`, { listId })
        for (const key of checkedRowKeys.value as number[]) {
            tableData.value.splice(key, 1)
        }

        message.info('Товары удалены')
    } catch (e: any) {
        message.info(e)
    }

}

async function updateRow(index: number, id: string, data: object) {
    try {
        await axiosInstance.patch(`/product/${id}`, data)
        message.info(`Товар #${index + 1} обновлен`)
    } catch (e: any) {
        message.info(e)
    }
}
</script>

<template>
    <div class="product-table">
        <n-space vertical :size="12">
            <n-space>
                <n-button @click="isModalShow = true">Добавить товар</n-button>
                <n-button @click="deleteManyRows"
                >
                    <Icon :size="24">
                        <DeleteRound/>
                    </Icon>
                    Удалить выбранные
                </n-button>
            </n-space>
            <n-data-table
                v-model:checked-row-keys="checkedRowKeys"
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