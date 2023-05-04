<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui'
</script>

<template>
    <n-config-provider :theme-overrides="{ common: { fontWeightStrong: '600' } }">
        <n-message-provider>
            <router-view v-slot="{ Component }">
                <transition name="fade">
                    <component :is="Component" />
                </transition>
            </router-view>
        </n-message-provider>
    </n-config-provider>
</template>

<style scoped>

</style>
