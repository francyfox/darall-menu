<script setup lang="ts">

import { AccountCircleSharp, LogOutFilled } from "@vicons/material";
import { Icon } from "@vicons/utils";
import { NButton, NSpace } from "naive-ui";
import { useUserStore } from "../store/store.user.ts";

const store = useUserStore()
const { logOut } = store

defineProps<{
  email: string
}>()
</script>

<template>
    <n-space v-if="email">
      <n-button>
          <Icon size="24">
              <AccountCircleSharp/>
          </Icon>
          {{ email }}
      </n-button>

      <n-button @click="logOut"
      >
          <Icon size="24">
              <LogOutFilled/>
          </Icon>
          Выйти из учетной записи
      </n-button>
    </n-space>
</template>

<style scoped>

</style>