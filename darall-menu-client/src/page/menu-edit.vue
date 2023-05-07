<script setup lang="ts">
import ProductTable from "../components/product-table.vue";
import CategoryList from "../components/category-list.vue";
import { NButton, NSpace } from 'naive-ui'
</script>

<template>
  <section class="menu-edit">

      <div class="container">
          <div class="col">
              <div class="row _h-gap-md _h-ai-c _h-jc-sb _h-mb-2">
                  <h1>Редактировать продукты</h1>
              </div>
              <div class="row _h-gap-md">
                  <div class="col">
                      <div class="card">
                          <n-space vertical :size="12">
                              <n-button>
                                  Добавить категорию
                              </n-button>
                              <category-list/>
                          </n-space>
                      </div>
                  </div>
                  <div class="col">
                      <div class="card">
                          <product-table/>
                      </div>
                  </div>
              </div>
          </div>

      </div>
  </section>
</template>

<style scoped>

</style>