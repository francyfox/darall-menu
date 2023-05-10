<script setup lang="ts">
import { NConfigProvider, NMessageProvider, darkTheme } from 'naive-ui'
</script>

<template>
    <n-config-provider :theme="darkTheme" :theme-overrides="{ common: { fontWeightStrong: '600' } }">
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
.fade-enter-active
{
    animation: fade 0.25s;
}

.fade-leave-active
{
    animation: fade 0.25s reverse;
}

@keyframes fade
{
    from
    {
        opacity: 0%;
    }

    to
    {
        opacity: 100%;
    }
}
</style>
