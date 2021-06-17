import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { DeviceType } from '@/store/modules/app'

export default function() {
  const store = useStore()
  const WIDTH = 992
  const device = computed(() => store.state.app.device)
  const isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const currentRoute = useRoute()
  const watchRouter = watch(() => currentRoute.name, () => {
    if (store.state.app.device === DeviceType.Mobile && store.state.app.sidebar.opened) {
      store.dispatch('app/CloseSideBar', false)
    }
  })

  const resizeMounted = () => {
    if (isMobile()) {
      store.dispatch('app/ToggleDevice', DeviceType.Mobile)
      store.dispatch('app/CloseSideBar', true)
    }
  }
  const resizeHandler = () => {
    if (!document.hidden) {
      store.dispatch('app/ToggleDevice', isMobile() ? DeviceType.Mobile : DeviceType.Desktop)
      if (isMobile()) {
        store.dispatch('app/CloseSideBar', true)
      }
    }
  }
  const addEventListenerOnResize = () => {
    window.addEventListener('resize', resizeHandler)
  }

  const removeEventListenerResize = () => {
    window.removeEventListener('resize', resizeHandler)
  }

  return {
    device,
    resizeMounted,
    watchRouter,
    addEventListenerOnResize,
    removeEventListenerResize
  }
}
