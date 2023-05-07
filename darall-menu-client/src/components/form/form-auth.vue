<script setup lang="ts">
import { ref } from 'vue'
import { FormInst, useMessage, NFormItem, NInput, NForm, NButton, NSpace, FormRules } from 'naive-ui'
import { router } from "../../routes";
import { axiosInstance } from "../../main.ts";
import { useUserStore } from "../../store/store.user.ts";
import { storeToRefs } from "pinia";

const store = useUserStore()
const { updateLS } = store
const { user } = storeToRefs(store)

const formRef = ref<FormInst | null>(null)
const message = useMessage()
const formData = ref({
  email: 'test@mail.ru',
  password: '123456'
})
const isLoading = ref(false)

const rules: FormRules = {
    email: {
        required: true,
        pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
        message: 'Неверно указан email',
        trigger: ['input']
    },
    password: {
        required: true,
        trigger: ['input'],
        min: 6,
        message: 'Минимум 6 символов'
    }
}

const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault()
    isLoading.value = true

    try {
        await formRef.value?.validate()
        const response = await axiosInstance
            .post(`/user/auth`, formData.value)

        const { accessToken, refreshToken } = response?.data as { accessToken: string, refreshToken: string }
        user.value = {
            accessToken,
            refreshToken,
            email: formData.value.email
        }
        updateLS()

        message.success('Заполнено верно. Перенаправление')
        await router.push('/menu-edit')
    } catch (e) {
        console.log(e)
        message.error('Форма заполнена неверно')
    }

    isLoading.value = false
}
</script>

<template>
    <n-form ref="formRef"
            :model="formData"
            :rules="rules"
            size="large"

    >
        <n-form-item label="Email" path="email">
            <n-input v-model:value="formData.email"
                     placeholder="test@gmail.com" />
        </n-form-item>
        <n-form-item label="Пароль" path="password">
            <n-input v-model:value="formData.password"
                     placeholder="Password"
                     show-password-on="click"
                     type="password"
            />
        </n-form-item>
        <n-form-item>
            <n-space>
                <n-button @click="handleSubmit"
                          type="primary"
                          :loading="isLoading"
                >
                    Войти
                </n-button>

                <n-button @click="router.push('/register')">
                    Создать аккаунт
                </n-button>
            </n-space>
        </n-form-item>
    </n-form>
</template>

<style scoped>

</style>