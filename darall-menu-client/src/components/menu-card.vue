<script setup lang="ts">
import { useMenuStore } from "../store/store.menu.ts";
import { storeToRefs } from "pinia";
import { NCard } from 'naive-ui'
import { router } from "../routes";

const store = useMenuStore()
const { getCategoryCollection } = store
const { collectionRef } = storeToRefs(store)
await getCategoryCollection({ include: { image: true } })
</script>

<template>
    <div class="card" v-for="item in collectionRef">
        <a href="#" @click.prevent="router.push(`/category/${item.id}`)">
            <n-card :title="item.name">
                <template #cover>
                    <img :src="item.image.link" :alt="item.name">
                </template>
            </n-card>
        </a>
    </div>
</template>

<style scoped>

</style>