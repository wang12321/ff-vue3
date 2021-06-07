<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
          :collapse="isCollapse"
          :unique-opened="true"
          default-active="1"
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
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import SidebarItem from './sidebar-item.vue'
import router from '@/router'

export default defineComponent({
  name: 'Index',
  components: {
    SidebarItem
  },
  setup() {
    const store = useStore()
    // const route = useRoute()
    console.log(router.options.routes)
    const routes = computed(() => {
      return router.options.routes
    })

    const isCollapse = computed(() => {
      return store.state.app.sidebar.opened
    })
    return {
      variables,
      isCollapse,
      routes
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
    border-left: 4px solid #39cedd !important;
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
