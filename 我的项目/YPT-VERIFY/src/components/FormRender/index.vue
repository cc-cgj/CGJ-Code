<template>
  <a-row class="form-row" :gutter="34">
    <a-col
      class="form-col"
      v-for="(item, index) of forms"
      :key="item.value"
      :flex="item.flex"
      :xs="24"
      :sm="item.span || 12"
    >
      <a-form-item
        :label="item.label"
        :rules="item.rules"
        :name="getName(item.value, index)"
        :label-col="labelCol(index, item.span)"
        :wrapper-col="wrapperCol(index, item.span)"
        :class="{
          'custom-form-item-label': !!$slots[`label-${item.value}`],
        }"
      >
        <!-- label-slot -->
        <template #label>
          <slot :name="`label-${item.value}`"></slot>
        </template>
        <!-- 输入框 -->
        <a-input
          v-if="item.type == 'input'"
          :placeholder="inputPlaceholder(item.label, item.placeholder)"
          v-model:value="formState[item.value]"
          :name="item.value"
          :style="item.contorlStyle"
          :maxlength="item.maxlength || INPUT_MAX_NUMBER"
          :show-count="item.showCount"
        />
        <!-- 数字输入+后缀 -->
        <a-row
          v-else-if="item.type == 'inputNumber'"
          align="middle"
          :gutter="8"
        >
          <a-col flex="1">
            <a-input-number
              :name="item.value"
              v-model:value="formState[item.value]"
              :min="item.min"
              :formatter="item.formatter"
              :parser="item.parser"
              :precision="item.precision"
              :placeholder="inputPlaceholder(item.label, item.placeholder)"
              style="width: 100%"
            />
          </a-col>
          <a-col>
            <span>{{ item.after }}</span>
          </a-col>
        </a-row>
        <!-- 单选框组 -->
        <a-radio-group
          v-else-if="item.type == 'radioGroup'"
          v-model:value="formState[item.value]"
          name="radioGroup"
        >
          <a-radio v-for="radio of item.options" :value="radio.value">{{
            radio.label
          }}</a-radio>
        </a-radio-group>
        <!-- 多选框组 -->
        <a-checkbox-group
          v-else-if="item.type == 'checkboxGroup'"
          v-model:value="formState[item.value]"
          :name="item.value"
          style="width: 100%; white-space: normal"
        >
          <a-row :gutter="[25, 30]">
            <a-col v-for="checkbox of item.options">
              <a-checkbox :value="checkbox.value">{{
                checkbox.label
              }}</a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
        <!-- 日期选择 -->
        <a-date-picker
          v-else-if="item.type == 'date'"
          v-model:value="formState[item.value]"
          :placeholder="selectPlaceholder(item.label, item.placeholder)"
          style="width: 100%"
        />
        <!-- 级联选择 -->
        <a-cascader
          v-else-if="item.type == 'cascader'"
          v-model:value="formState[item.value]"
          :options="item.options"
          :field-names="item.fieldNames"
          :show-search="item.showSearch"
          :placeholder="selectPlaceholder(item.label, item.placeholder)"
          :multiple="item.multiple"
          :showCheckedStrategy="item.showCheckedStrategy"
          @change="item.change"
        />
        <slot v-else :name="item.value" :item="item"></slot>
      </a-form-item>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";
// import type { PropType, ExtractPropTypes } from "vue";
import type { FormTypes, FormStateType } from "./type.ts";
import { INPUT_MAX_NUMBER } from "@/constants/input.ts";

interface TypeProps {
  forms: FormTypes;
  formState: FormStateType;
  autoSpan?: boolean;
  labelWidth?: string | number;
  customName?: (prop: string, index?: number) => string[];
}

const props = withDefaults(defineProps<TypeProps>(), {
  forms: () => [],
  formState: () => ({}),
  autoSpan: () => true,
  labelWidth: "84px",
});

const emits = defineEmits(["update:formState"]);

function getName(prop: string, index: number) {
  if (props.customName) {
    const name = props.customName(prop, index);
    return name;
  }
  return prop;
}

function inputPlaceholder(label?: string, placeholder?: string): string {
  return placeholder || `请输入${label}`;
}

function selectPlaceholder(label?: string, placeholder?: string): string {
  return placeholder || `请选择${label}`;
}

function labelCol(index: number, span?: number) {
  if (!props.autoSpan) {
    return {
      style: {
        flex: `0 0 ${props.labelWidth}`,
        width: props.labelWidth,
      },
    };
  }
  if (span == 24) {
    return {
      span: 4,
    };
  }
  if (index % 2 == 0) {
    return {
      span: 8,
    };
  } else {
    return {
      span: 6,
    };
  }
}
function wrapperCol(index: number, span?: number) {
  if (!props.autoSpan) return;
  if (index % 2 == 0) {
    return {
      span: 16,
    };
  } else {
    return {
      span: span ? 16 : 14,
    };
  }
}
</script>

<style lang="less" scoped>
.form-col {
  &:last-of-type {
    .ant-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
@/constants/input.ts
