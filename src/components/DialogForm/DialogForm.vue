<template>
  <div>
    <el-form ref="ruleForm" :model="formData" :rules="rules" @submit.enter.prevent>
      <el-row>
        <el-col v-for="item in formList" :key="item.key" :span="item.span?item.span:span">
          <el-form-item
              :label="item.title+':'"
              :label-width="LabelWidth"
              :prop="rules && rules[item.key]!==undefined?item.key:''"
          >
            <el-input
                v-if="item.type === 'input'"
                v-model="formData[item.key]"
                :clearable="item.clearable"
                :disabled="item.disabled"
                :readonly="item.readonly"
                :placeholder="item.placeholder?item.placeholder:'请填写'+item.title"
                @change="item.change ? item.change() : null"
            />
            <el-input
                v-if="item.type === 'number'"
                type="number"
                v-model="formData[item.key]"
                :clearable="item.clearable"
                :disabled="item.disabled"
                :readonly="item.readonly"
                :placeholder="item.placeholder?item.placeholder:'请填写'+item.title"
                @change="item.change ? item.change() : null"
            />
            <el-input
                v-else-if="item.type==='password'"
                v-model="formData[item.key]"
                type="password"
                :placeholder="item.placeholder?item.placeholder:'请填写'+item.title"
                :clearable="item.clearable"
                :disabled="item.disabled"
                :readonly="item.readonly"
            />
            <el-input
                v-else-if="item.type === 'textarea'"
                v-model="formData[item.key]"
                type="textarea"
                :rows="item.rows"
                autocomplete="off"
                :placeholder="item.placeholder?item.placeholder:'请填写'+item.title"
                :clearable="item.clearable"
                :disabled="item.disabled"
                :readonly="item.readonly"
            />
            <el-select
                v-else-if="item.type==='select'"
                v-model="formData[item.key]"
                :multiple="item.multiple"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                :filterable="item.filterable"
                :clearable="item.clearable"
                :disabled="item.disabled"
                style="width: 100%;"
                @change="item.change ? item.change() : null"
            >
              <el-option
                  v-for="option in item.options"
                  :key="option[item.label]"
                  :label="option[item.label]"
                  :value="item.merge?`${option[item.value]}@${option[item.label]}`:option[item.value]"
                  :disabled="option.disabled"
              />
            </el-select>
            <el-time-picker
                v-else-if="item.type==='time'"
                v-model="formData[item.key]"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                value-format="HH:mm:ss"
                style="width: 100%;"
            />
            <el-date-picker
                v-else-if="item.type==='datetime'"
                v-model="formData[item.key]"
                type="datetime"
                :clearable="item.clearable"
                :disabled="item.disabled"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                value-format="YYYY-MM-dd HH:mm:ss"
                style="width: 100%;"
            />
            <el-date-picker
                v-else-if="item.type==='datetimeNO'"
                v-model="formData[item.key]"
                type="datetime"
                :clearable="item.clearable"
                :disabled="item.disabled"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                value-format="YYYYMMddHHmmss"
                style="width: 100%;"
            />
            <el-date-picker
                v-else-if="item.type==='date'"
                v-model="formData[item.key]"
                type="date"
                :clearable="item.clearable"
                :disabled="item.disabled"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                value-format="YYYY-MM-dd"
                style="width: 100%;"
            />
            <el-date-picker
                v-else-if="item.type==='year'"
                v-model="formData[item.key]"
                type="year"
                :clearable="item.clearable"
                :disabled="item.disabled"
                value-format="YYYY"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                style="width: 100%;"
            />
            <el-date-picker
                v-else-if="item.type==='month'"
                v-model="formData[item.key]"
                type="month"
                value-format="YYYY-MM"
                placeholder="请选择月份"
                style="width: 100%"
            />
            <el-date-picker
                v-else-if="item.type==='dateH'"
                v-model="formData[item.key]"
                type="date"
                :clearable="item.clearable"
                :disabled="item.disabled"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                value-format="YYYY-MM-dd HH:mm:ss"
                style="width: 100%;"
            />
            <el-date-picker
                v-else-if="item.type==='datetimerange'"
                v-model="formData[item.key]"
                type="datetimerange"
                :clearable="item.clearable"
                :disabled="item.disabled"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="YYYY-MM-dd HH:mm:ss"
                style="width: 100%;"
            />
            <el-date-picker
                v-else-if="item.type==='daterange'"
                v-model="formData[item.key]"
                type="daterange"
                :clearable="item.clearable"
                :disabled="item.disabled"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-dd"
                style="width: 100%;"
            />
            <el-cascader
                v-else-if="item.type==='cascader'"
                v-model="formData[item.key]"
                :options="item.options"
                :clearable="item.clearable"
                :props="item.props"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                :collapse-tags="item.collapseTags"
                :show-all-levels="item.showAllLevels"
                style="width:100%;"
            />
            <div v-else-if="item.type==='radio'" style="text-align: left">
              <el-radio-group v-model="formData[item.key]" size="small">
                <el-radio-button
                    v-for="option in item.options"
                    :key="option[item.label]"
                    :label="option[item.label]">
                </el-radio-button>
              </el-radio-group>
            </div>
            <div v-else-if="item.type==='checkbox'" style="text-align: left">
              <el-checkbox-group v-model="formData[item.key]" size="small">
                <el-checkbox
                    v-for="option in item.options"
                    :key="option[item.label]"
                    :label="option[item.label]"
                    :border="item.border"
                    :disabled="item.disabled"
                >
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-else-if="item.type==='inputNumber'" style="text-align: left">
              <el-input-number
                  v-model="formData[item.key]"
                  controls-position="right"
                  @change="item.change ? item.change() : null"
                  :min="item.min"
                  :max="item.max"
              >
              </el-input-number>
            </div>
            <div v-else-if="item.type==='switch'" style="text-align: left">
              <el-switch
                  v-model="formData[item.key]"
                  :active-text="item.activeText"
                  :inactive-text="item.inactiveText">
              </el-switch>
            </div>
            <div v-else-if="item.type==='uploadImg'" style="text-align: left">
              <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  :file-list="formData[item.key]"
                  :on-preview="handlePictureCardPreview"
                  :on-change="item.change ? item.change : null"
                  :on-remove="item.change ? item.change : null"
                  :limit="item.limit"
                  accept="image/*">
                  <i class="el-icon-plus"></i>
              </el-upload>
            </div>
            <div v-else-if="item.type==='slot'" style="text-align: left">
              <expand-dom :item="item" :render="item.render"/>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <div class="dialog-footer">
    <el-button @click="close">关 闭</el-button>
    <el-button type="primary" @click="save('ruleForm')">确 定</el-button>
  </div>
  <el-dialog v-model="dialogVisible">
    <img style="width: 100%" :src="dialogImageUrl" alt="">
  </el-dialog>

</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, h, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'DialogForm',
  components: {
    expandDom: {
      props: {
        render: Function,
        item: {
          type: Object,
          default: {}
        }
      },
      render: (ctx:any) => {
        return ctx.render(h, ctx)
      }
    }
  },
  props: {
    rules: {
      type: Object,
      required: false
    },
    formList: {
      type: Array,
      required: true
    },
    formData: {},
    LabelWidth: {
      type: String,
      required: false,
      default: '140px'
    },
    span: {
      type: Number,
      required: false,
      default: 24
    }
  },
  emits: ['CANCEL', 'submit'],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance() as any
    const state = reactive({
      dialogVisible: false,
      disabled: false,
      dialogImageUrl: '',
      close() {
        emit('CANCEL')
      },
      save(formName:string) {
        // eslint-disable-next-line consistent-return
        proxy.$refs[formName].validate((valid:boolean) => {
          if (valid) { // 校验通过
            emit('submit')
          } else {
            return false
          }
        })
      },
      handlePictureCardPreview(file:any) {
        state.dialogImageUrl = file.url
        state.dialogVisible = true
      }
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped>
.dialog-footer{
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
</style>
