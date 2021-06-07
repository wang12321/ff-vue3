<template>
<div :class="classObj" class="app-wrapper" >
  <div>
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <NavBar></NavBar>
    </div>
  </div>
</div>
</template>

<script>
import { Sidebar, NavBar } from './components'
// import { useStore } from '@/store'
import { useStore } from 'vuex'
// import { globalStoreKey } from '../store';

import {
  defineComponent,
  computed
} from 'vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Sidebar,
    NavBar
  },
  setup() {
    const store = useStore()
    console.log(store)

    const classObj = computed(() => {
      return {
        hideSidebar: store.state.app.sidebar.opened,
        openSidebar: store.state.app.sidebar.opened,
        withoutAnimation: store.state.app.sidebar.withoutAnimation,
        mobile: false
      }
    })
    return {
      classObj
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

.hideSidebar .fixed-header {
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
