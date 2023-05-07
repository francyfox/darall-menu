import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import SecureLS from 'secure-ls'

type StoreUser = {
  accessToken: string,
  refreshToken: string,
  email: string
}
const ls = new SecureLS({ encodingType: 'rc4', encryptionSecret: import.meta.env.VITE_STORAGE_SECRET })
export const useUserStore = defineStore('user', () => {
  const lsUser = ls.get('user')
  const user: Ref<StoreUser> = ref({
    accessToken: '',
    refreshToken: '',
    email: ''
  })

  if (lsUser) {
    user.value.refreshToken = lsUser.refreshToken
    user.value.email = lsUser.email
  }
  function updateLS () {
    const lsData = {
      refreshToken: user.value.refreshToken,
      email: user.value.email
    }
    ls.set('user', lsData)
  }

  function logOut () {
    ls.clear()
    user.value = {
      refreshToken: '',
      accessToken: '',
      email: ''
    }
  }

  return {
    user,
    updateLS,
    logOut
  }
})