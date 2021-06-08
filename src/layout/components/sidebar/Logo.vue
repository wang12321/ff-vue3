<!-- 侧边栏logo(需要跟随侧边栏折叠) -->
<template>
  <div class="sidebar-logo-container" :class="{collapse: !collapse}">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="!collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <svg-icon
            class="sidebar-logo"
            v-if="showLogo"
            name="component"
            font-size="17px"
            style="color: #f4f4f5"
        />
        <h1 class="sidebar-title" :style="{'color':'#ffffff' }">{{ title }} </h1>

      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <svg-icon
            v-if="showLogo"
            name="component"
            font-size="22px"
            style="color: #f4f4f5"
        />
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const store = useStore()
    const showLogo = computed(() => {
      return store.state.settings.sidebarLogo
    })
    const title = computed(() => {
      return store.state.settings.title
    })
    return {
      showLogo,
      title
    }
  }
})
</script>

<style lang="scss" scoped>

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #0c202b;
  text-align: center;
  overflow: hidden;

  .sidebar-logo {
    display: none;
  }

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    padding-top: 10px;

    & .sidebar-logo-text {
      width: 205px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      padding-left: 10px;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 20px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
     .sidebar-logo-link{
       text-align: left;
       padding-left: 30px;
       padding-top: 0px;
     }
    .sidebar-logo {
      width: 22px;
      height: 22px;
      vertical-align: middle;
      margin-right: 0;
      display: inline-block;
    }
    .sidebar-logo-text {
      display: none;
    }
  }
}
</style>
