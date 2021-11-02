<template>
<div :class="classObj" class="app-wrapper" >
  <div v-if="isLayout">
    <div
        v-if="classObj.mobile && sidebar.opened"
        class="drawer-bg"
        @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <NavBar></NavBar>
        <tags-view v-if="isTagsView"/>
      </div>
      <AppMain />
    </div>
  </div>
  <div v-else>
    <div
        v-if="classObj.mobile && sidebar.opened"
        class="drawer-bg"
        @click="handleClickOutside"
    />
    <el-header style="height: 50px;padding: 0">
      <div :class="{'fixed-header-layout':fixedHeader||!isLayout}">
        <NavBar></NavBar>
      </div>
    </el-header>
    <div>
      <Sidebar class="sidebar-container" style="margin-top: 50px" />
      <div class="main-container">
        <div :class="{'fixed-header-tags':fixedHeader||!isLayout}">
          <tags-view v-if="isTagsView" />
        </div>
        <AppMain :class="{'fixed-header-tags-main': (classObj.mobile ? false:((fixedHeader && isTagsView ) || !isLayout))}"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Sidebar, NavBar, AppMain, TagsView } from './components'
import { useStore } from 'vuex'
import FixiOSBug from './components/sidebar/FixiOSBug'
import { DeviceType } from '@/store/modules/app'

import {
  defineComponent,
  computed,
  onMounted,
  onBeforeMount,
  onBeforeUnmount,
  toRefs,
  reactive
} from 'vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Sidebar,
    NavBar,
    AppMain,
    TagsView
  },
  setup() {
    const store = useStore()
    const {
      device,
      resizeMounted,
      watchRouter,
      addEventListenerOnResize,
      removeEventListenerResize
    } = FixiOSBug()
    const classObj = computed(() => {
      return {
        hideSidebar: !store.state.app.sidebar.opened,
        openSidebar: store.state.app.sidebar.opened,
        withoutAnimation: store.state.app.sidebar.withoutAnimation,
        mobile: device.value === DeviceType.Mobile
      }
    })
    const fixedHeader = computed(() => {
      return store.state.settings.fixedHeader
    })
    const isLayout = computed(() => {
      return store.state.settings.Layout
    })
    const isTagsView = computed(() => {
      return store.state.settings.tagsView && device.value !== DeviceType.Mobile
    })
    const sidebar = computed(() => {
      return store.state.app.sidebar
    })
    const state = reactive({
      handleClickOutside: () => {
        store.dispatch('app/CloseSideBar', false)
      }
    })
    watchRouter()
    onBeforeMount(() => {
      addEventListenerOnResize()
    })

    onMounted(() => {
      resizeMounted()
    })

    onBeforeUnmount(() => {
      removeEventListenerResize()
    })
    return {
      classObj,
      fixedHeader,
      isLayout,
      isTagsView,
      sidebar,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

@import "~@/styles/variables.scss";

.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: left;
  overflow: auto;

  @include clearfix;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: .3;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width .28s;
}
.fixed-header-layout {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width .28s;
}
.fixed-header-tags-main{
  margin-top: 35px;
}
.fixed-header-tags {
  position: fixed;
  top: 50px;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width .28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.hideSidebar .fixed-header-tags {
  width: calc(100% - 54px)
}
.mobile .fixed-header {
  width: 100%;
}

.hasTagsView {

  .app-main {
    min-height: calc(100vh - 100px);
  }

  .fixed-header+.app-main {
    padding-top: 100px;
  }
}
</style>
