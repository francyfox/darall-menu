<script setup lang="ts">
import ProductTable from "../components/product-table.vue";
import CategoryList from "../components/category-list.vue";
import { NSpace, NButton } from 'naive-ui'
import { router } from "../routes";
import UserSettings from "../components/user-settings.vue";
import { useUserStore } from "../store/store.user.ts";
import { storeToRefs } from "pinia";

const store = useUserStore()
const { user } = storeToRefs(store)
</script>

<template>
  <section class="menu">

      <div class="container _h-ai-c">
          <div class="col _h-w-100">
              <div class="row _h-gap-md _h-ai-c _h-jc-sb _h-mb-2">
                  <h1>Редактор меню</h1>

                  <n-space>
                      <n-button type="primary"
                                @click="router.push('/')"
                      >
                          Вернуться в меню
                      </n-button>
                      <user-settings :email="user.email"/>
                  </n-space>
              </div>
              <div class="row _h-gap-md">
                  <div class="col">
                      <div class="card">
                          <n-space vertical :size="12">
                              <div class="_t-fz-h4">Категории</div>

                              <Suspense>
                                  <category-list/>
                                  <template #fallback>
                                      Загрузка...
                                  </template>
                              </Suspense>

                          </n-space>
                      </div>
                  </div>
                  <div class="col">
                      <div class="card">
                          <n-space vertical :size="12">
                              <div class="_t-fz-h4">Товары</div>
                              <Suspense>
                                  <product-table/>
                                  <template #fallback>
                                      Загрузка...
                                  </template>
                              </Suspense>
                          </n-space>
                      </div>
                  </div>
              </div>
          </div>

      </div>
  </section>
</template>

<style scoped>

</style>