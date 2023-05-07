import { useUserStore } from "../store/store.user.ts";
import { storeToRefs } from "pinia";
import { axiosInstance } from "../main.ts";

export async function validateUserTokens() {
  const store = useUserStore()
  const { updateLS } = store
  const { user } = storeToRefs(store)

  if (!user.value.accessToken && !user.value.refreshToken) {
    return '/login'
  } else {
    try {
      const response = await axiosInstance
          .post(`/user/token`, { refreshToken: user.value.refreshToken })

      user.value.accessToken = response.data?.accessToken
      user.value.refreshToken = response.data?.refreshToken
      updateLS()
    } catch (e) {
      return '/login'
    }
  }
}