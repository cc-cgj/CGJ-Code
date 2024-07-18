<template>
  <div class="composite">
    <div v-for="(item, index) of list" :key="item.key" class="composite-item">
      <a-row class="composite-head" :gutter="5">
        <a-col>
          <div class="composite-index">{{ index + 1 }}</div>
        </a-col>
        <a-col flex="1" style="display: flex">
          <a-row
            class="composite-head__content"
            justify="space-between"
            align="middle"
            :gutter="10"
          >
            <a-col flex="1">
              <a-form-item
                :label="headLabel"
                :name="customName(headValueKey, item.dataIndex)"
                :rules="{
                  required: headRequired,
                  message: `请输入${headLabel}`,
                }"
              >
                <a-input
                  v-model:value="item.data[headValueKey]"
                  :placeholder="`请输入${headLabel}`"
                  :maxlength="headLabelMaxlength"
                  :show-count="headLabelShowCount"
                />
              </a-form-item>
            </a-col>
            <a-col>
              <div
                v-if="list.length > 1"
                class="composite-del"
                @click="handleDel(item.dataIndex)"
              >
                <svg-icon width="20px" height="20px" name="删除" />
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <form-render
        :forms="forms"
        :form-state="item.data"
        :auto-span="false"
        :label-width="labelWidth"
        :customName="(prop:string)=> customName(prop,item.dataIndex)"
        style="max-width: 1008px"
      ></form-render>
    </div>
    <div class="composite-add" @click="handleAdd">
      <svg-icon width="14px" height="14px" name="新增" />
      <span>{{ addTitle }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import { INPUT_MAX_NUMBER } from "@/constants/input.ts";

type TypeProps = {
  list: {
    dataIndex: number;
    data: { [key in string]: any };
    key: number;
  }[];
  forms: any[];
  addTitle?: string;
  headLabel?: string;
  headRequired?: boolean;
  headLabelMaxlength?: number;
  labelWidth?: string;
  headValueKey?: string;
  headLabelShowCount?: boolean;
  customName: (prop: string, index?: number) => string[];
};

const props = withDefaults(defineProps<TypeProps>(), {
  addTitle: "新增证书",
  headRequired: () => true,
  headLabel: "证书编号",
  labelWidth: "154px",
  headValueKey: "certificateCode",
  headLabelMaxlength: INPUT_MAX_NUMBER,
});

const emits = defineEmits(["add", "del"]);

function handleAdd() {
  emits("add");
}

function handleDel(dataIndex: number) {
  emits("del", dataIndex);
}
</script>

<style lang="less" scoped>
.composite {
  &-index {
    flex-shrink: 0;
  }
  &-head {
    margin-bottom: 30px;

    &__content {
      flex: 1;
      background: #f2f5f8;
      min-height: 50px;
      padding: 5px 16px;
    }
    .ant-form-item {
      margin-bottom: 0;
    }
  }
  &-index {
    width: 50px;
    height: 100%;
    min-height: 50px;
    padding: 10px 0;
    margin-right: 4px;
    background: #f2f5f8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: bold;
  }
  &-del {
    cursor: pointer;
  }
  &-add {
    display: flex;
    align-items: center;
    background: #f2f5f8;
    height: 50px;
    justify-content: center;
    cursor: pointer;
    gap: 8px;
    color: #355dee;
  }
  &-item {
    margin-bottom: 30px;
  }
}
</style>
