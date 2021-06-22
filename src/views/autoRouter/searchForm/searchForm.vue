<template>
  <el-container>
    <el-header style="height: auto">
      <search-form
          :form-options="formOptions"
          :form-data="formData"
          :isAdvanced="isAdvanced"
          @submit="submit"
          @reset="reset">
      </search-form>
    </el-header>
  </el-container>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, resolveComponent } from 'vue'

export default defineComponent({
  name: 'SearchFormViews',
  setup() {
    const change = () => {
      console.log('触发事件')
    }
    const state = reactive({
      modelValue: '',
      formData: {
        number: 50,
        sex: '男',
        region: ['中国']
      },
      isAdvanced: true,
      formOptions: [
        { title: '昵称', key: 'name', type: 'input', clearable: true, isAdvanced: true },
        { titleShow: true, clearable: true, title: '是否', key: 'yes', type: 'select', options: [{ value: '1', label: '是' }, { value: '2', label: '否' }], label: 'label', value: 'value', change: change },
        { titleShow: true, clearable: true, title: '年份', key: 'year', type: 'year' },
        { titleShow: true, clearable: true, title: '日期', key: 'date', type: 'date' },
        { titleShow: true, clearable: true, title: '时间', key: 'time', type: 'time' },
        { titleShow: true, clearable: true, title: '性别', key: 'sex', type: 'radio', options: [{ value: '1', label: '男' }, { value: '2', label: '女' }], label: 'label', value: 'value' },
        { border: true, titleShow: true, clearable: true, title: '地区', key: 'region', type: 'checkbox', options: [{ value: '1', label: '中国' }, { value: '2', label: '德国' }], label: 'label', value: 'value' },
        { titleShow: true, clearable: true, title: '数量', key: 'number', type: 'inputNumber', min: 0, max: 100 },
        { titleShow: true, clearable: true, title: '开关', key: 'switch', type: 'switch', inactiveText: '未选中', activeText: '选中' },
        { title: '名称', key: 'aas', type: 'slot', placeholder: '请输入内容', isAdvanced: true,
          render: (h:any, parms:any) => {
            const elInput = resolveComponent('el-input')
            return h(elInput, { type: 'text', placeholder: parms.item.placeholder, modelValue: state.modelValue,
              onInput: (value:string) => {
                state.modelValue = value
              }
            }
            )
          }
        }
      ],
      submit() {
        console.log(state.formData)
        alert('查询了')
      },
      reset() {
        state.formData = {
          number: 50,
          sex: '男',
          region: ['中国']
        }
      }
    })
    return {
      change,
      ...toRefs(state)
    }
  }
})
</script>

<style scoped>

</style>
