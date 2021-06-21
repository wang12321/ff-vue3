<template>
  <Pagination :page-data="pageData" :backPosition="backPosition" v-on:update:page="pageData.page=$event" @reloadData="reloadData" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'PaginationViews',
  setup() {
    const backPosition = ref(100)
    const pageData = reactive({ total: 100, page: 1, rows: 20 })
    const reloadData = () => {
      console.log(pageData)
    }
    return {
      reloadData,
      backPosition,
      pageData
    }
  }
})
</script>

<style scoped>

</style>
