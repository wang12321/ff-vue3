<template>
  <div class="navbar">
    <Hamburger
        id="hamburger-container"
        :is-active="true"
        class="hamburger-container"
        @toggle-click="toggleSideBar"
    />
    <bread-crumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <Screenfull class="right-menu-item hover-effect" />
<!--        <LangSelect class="right-menu-item hover-effect" v-if="langSelect" />-->
      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <span>{{name}}</span>
          <i class="el-icon-arrow-down" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">
              <span style="display: block">
                退出登入
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

</template>

<script>
import { defineComponent, reactive, toRefs, computed } from 'vue'
// import Hamburger from '@/components/hamburger/index.vue'
// import breadCrumb from '@/components/bread-crumb/index.vue'

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'NavBar',
  components: {
    // Hamburger,
    // breadCrumb
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const device = computed(() => {
      return store.state.app.device.toString()
    })
    const name = computed(() => {
      return store.getters.name.toString()
    })
    const state = reactive({
      toggleSideBar: () => {
        store.commit('app/UPDATE_Sidebar_opened')
      },
      logout: async() => {
        await store.dispatch('user/logout')
        router.push('/login').catch((err) => {
          console.warn(err)
        })
      }
    })
    return {
      device,
      name,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      .avatar-wrapper {
        float: right;
        height: 45px;
        line-height: 45px;
        margin-top: 5px;
        margin-right: 16px;
        margin-left: 16px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
