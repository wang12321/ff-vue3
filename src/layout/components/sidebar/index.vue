<template>
  <div :class="{'has-logo': showLogo}">
    <SidebarLogo v-if="showLogo && isLayout" :collapse="!isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
          :collapse="!isCollapse"
          :unique-opened="true"
          :default-active="activeMenu"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :active-text-color="variables.menuActiveText"
          mode="vertical"
      >

        <SidebarItem
            v-for="route in routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
            :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>

</template>

<script>
import variables from '@/styles/variables.scss'
import SidebarLogo from './Logo.vue'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import SidebarItem from './Item.vue'

export default defineComponent({
  name: 'Index',
  components: {
    SidebarItem,
    SidebarLogo
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const routes = computed(() => {
      return store.getters.permission_routes
    })
    const showLogo = computed(() => {
      return store.state.settings.sidebarLogo
    })
    const isCollapse = computed(() => {
      return store.state.app.sidebar.opened
    })
    const isLayout = computed(() => {
      return store.state.settings.Layout
    })
    const activeMenu = computed(() => {
      const { meta, name } = route
      if (meta !== null || meta !== undefined) {
        if (meta.activeMenu) {
          return meta.activeMenu
        }
      }
      return name
    })
    return {
      variables,
      isCollapse,
      routes,
      showLogo,
      activeMenu,
      isLayout
    }
  }
})
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
    0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}

::v-deep(.el-menu-item) {
  font-size: 13px !important;
  height: 65px !important;
  line-height: 65px !important;
  &:hover {
    background-color: rgba(52, 78, 104, 0.5) !important;
  }
  &.is-active {
    //border-left: 4px solid #39cedd !important;
  }
}

::v-deep(.el-submenu__title) {
  height: 65px !important;
  line-height: 65px !important;
  &:hover {
    background-color: rgba(52, 78, 104, 0.5) !important;
  }
}

::v-deep(.el-submenu .el-menu-item) {
  height: 60px !important;
  line-height: 60px !important;
}
</style>
