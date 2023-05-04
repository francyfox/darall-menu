<script setup lang="ts">
import { ref } from 'vue'
import { FormInst, useMessage, NFormItem, NInput, NForm, NButton, NSpace } from 'naive-ui'
import { router } from "../../routes";

const formRef = ref<FormInst | null>(null)
const message = useMessage()
const formData = ref({
  email: '',
  password: ''
})

const rules = {
    email: {
        required: true,
        trigger: ['input']
    },
    password: {
        required: true,
        trigger: ['input']
    }
}

function handleSubmit(e: MouseEvent) {
    e.preventDefault()
    formRef.value?.validate((errors) => {
        if (!errors) {
            message.success('Valid')
        } else {
            console.log(errors)
            message.error('Invalid')
        }
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
            <n-input v-model:value="formData.email" placeholder="Email" />
        </n-form-item>
        <n-form-item label="Password" path="password">
            <n-input v-model:value="formData.password" placeholder="Password" />
        </n-form-item>
        <n-form-item>
            <n-space>
                <n-button @click="handleSubmit" type="primary">
                    Login
                </n-button>

                <n-button @click="router.push('/register')">
                    Register
                </n-button>
            </n-space>
        </n-form-item>
    </n-form>
</template>

<style scoped>

</style>