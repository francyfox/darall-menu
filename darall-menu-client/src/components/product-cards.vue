<script setup lang="ts">
import { useMenuStore } from "../store/store.menu.ts";
import {useRoute} from 'vue-router'
import { NCard, NImage } from 'naive-ui'
import { ref } from "vue";

const route=useRoute()
const store = useMenuStore()
const { getProductList } = store
const tableData = ref()
const categoryId = route.params.id
tableData.value = await getProductList({ where: { categoryId }, include: { image: true }})
</script>

<template>
    <div class="menu--card-list">
        <div class="card" v-for="item in tableData">
            <n-card :title="item.name">
                <template #cover>
                    <n-image :src="item.image.link" :alt="item.name"></n-image>
                </template>
                <div class="col _h-gap-sm">
                    <div class="price">
                        Цена: <strong> {{ item.price.toLocaleString('en-US') }} руб. </strong>
                    </div>
                    <div class="contain">
                        {{ item.contain }}
                    </div>
                </div>

            </n-card>
        </div>
    </div>
</template>

<style scoped>

</style>