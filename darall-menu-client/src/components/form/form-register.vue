<script setup lang="ts">
import { ref } from 'vue'
import { FormInst, useMessage, NFormItem, NInput, NForm, NButton, NSpace } from 'naive-ui'
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
    email: '',
    password: ''
})
const isLoading = ref(false)

const rules = {
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
function handleSubmit(e: MouseEvent) {
    e.preventDefault()
    isLoading.value = true
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            try {
                const response = await axiosInstance.post(`user`, formData.value)
                const { accessToken, refreshToken } = response?.data as { accessToken: string, refreshToken: string }
                user.value = {
                    accessToken,
                    refreshToken,
                    email: formData.value.email
                }
                updateLS()

                message.success('Форма успешно отправлена')
                await router.push('/menu-edit')
            } catch (e: any) {
                console.log(e)

                message.error(e.message)
            }
        } else {
            console.log(errors)
            message.error('Неверно заполнено')
        }

        isLoading.value = false
    })
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
                     placeholder="test@gmail.com"
            />
        </n-form-item>
        <n-form-item label="Пароль" path="password">
            <n-input v-model:value="formData.password"
                     placeholder=""
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
                    Регистрация
                </n-button>

                <n-button @click="router.push('/login')">
                    Уже есть аккаунт
                </n-button>
            </n-space>
        </n-form-item>
    </n-form>
</template>

<style scoped>

</style>