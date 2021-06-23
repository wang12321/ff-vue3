<template>
  <div>
    <el-button @click="editSome" type="primary" style="margin:20px">新增一列</el-button>
    <el-dialog
        title="新增"
        v-model="visible"
        width="50%">
      <dialog-form
          :form-list="formList"
          :form-data="formData"
          :rules="rules"
          @submit="submit"
          @CANCEL="CANCEL"
      ></dialog-form>
    </el-dialog>
  </div>

</template>

<script>
import { defineComponent, reactive, resolveComponent, toRefs } from 'vue'
export default defineComponent({
  name: 'DialogFormView',
  setup() {
    const state = reactive({
      visible: false,
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      formData: {
        number: 50,
        sex: '男',
        region: ['中国'],
        value: 'zonst'
      },
      formList: [
        { title: '昵称', key: 'name', type: 'input', clearable: true },
        { title: '用户', key: 'user', type: 'input', clearable: true, disabled: true },
        { clearable: true, title: '是否', key: 'yes', type: 'select', options: [{ value: '1', label: '是' }, { value: '2', label: '否' }], label: 'label', value: 'value' },
        { clearable: true, title: '年份', key: 'year', type: 'year' },
        { clearable: true, title: '日期', key: 'date', type: 'date' },
        { clearable: true, title: '时间', key: 'time', type: 'time' },
        { title: '名称', key: '12', type: 'slot', placeholder: '请输入内容',
          render: (h, parms) => {
            const elInput = resolveComponent('el-input')
            return h(elInput, {
              type: 'text', placeholder: parms.item.placeholder, modelValue: state.modelValue,
              onInput: (value) => {
                state.modelValue = value
              }
            }
            )
          }
        },
        // { title: '所属地区', key: 'city_name', type: 'cascader', options: provinceCity, props: { value: 'value', label: 'label', children: 'children' }},
        { clearable: true, title: '性别', key: 'sex', type: 'radio', options: [{ value: '1', label: '男' }, { value: '2', label: '女' }], label: 'label', value: 'value' },
        { clearable: true, title: '地区', key: 'region', type: 'checkbox', options: [{ value: '1', label: '中国' }, { value: '2', label: '德国' }], label: 'label', value: 'value' },
        { clearable: true, title: '数量', key: 'number', type: 'inputNumber', min: 0, max: 100 },
        { clearable: true, title: '开关', key: 'switch', type: 'switch', inactiveText: '未选中', activeText: '选中' },
        { limit: 2, clearable: true, title: '图片', key: 'uploadImg', type: 'uploadImg', change: (file, files) => {
          console.log(file, files)
        }, remove: (file) => {
          console.log(1111, file)
        }
        }
      ],
      submit() {
        state.visible = false
        console.log(state.formData)
        alert('提交表单')
      },
      CANCEL() {
        state.visible = false
      },
      editSome() {
        state.visible = true
      }
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped>

</style>
