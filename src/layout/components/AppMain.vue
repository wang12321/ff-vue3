<template>
  <section :class="appMain">
    <router-view v-slot="{Component}" :key="key">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'AppMain',
  setup() {
    const route = useRoute()
    const store = useStore()

    const key = computed(() => {
      return route.path
    })
    const appMain = computed(() => {
      return store.state.settings.tagsView ? 'app-main-tag' : 'app-main'
    })

    return {
      key,
      appMain
    }
  }
})
</script>

<style lang="scss" scoped>
.app-main {
  /* 50 = navbar height  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}

.app-main-tag {
  /* 50 = navbar height  */
  min-height: calc(100vh - 85px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main-tag {
  padding-top: 85px;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main-tag {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main-tag {
    padding-top: 84px;
  }
}
</style>
