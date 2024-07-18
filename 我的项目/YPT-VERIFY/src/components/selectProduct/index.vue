<template>
  <div class="product">
    <div
      v-for="(item, index) of options"
      :key="item.value"
      class="product-item"
    >
      <div class="product-header">
        <div>
          <a-button
            :type="titleActive(item) ? 'primary' : 'default'"
            class="product-title"
            block
            @click="handleActive(index)"
          >
            <span class="product-icon">
              <svg-icon width="24px" height="24px" :name="item.icon"></svg-icon>
            </span>
            <span>{{ item.name }}</span>
          </a-button>
        </div>
        <div class="product-explain">{{ item.explain }}</div>
      </div>
      <div v-show="current == index" class="product-content">
        <span class="product-content-arrow"></span>
        <div class="product-container">
          <a-form-item-rest>
            <a-checkbox-group
              :value="getCheckboxValue(item.value)"
              :name="item.value"
              @change="(e:string[]) => handleCheckboxChange(e,item)"
            >
              <a-row :gutter="[27, 20]">
                <a-col v-for="chlid of item.children">
                  <a-checkbox :value="chlid.value">{{ chlid.name }}</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item-rest>
        </div>
      </div>
    </div>
    <div v-if="toValue.length" class="product-select">
      <div
        v-for="(item, index) of toValue"
        :key="item.value"
        class="product-select-item"
      >
        <div class="product-select-label">{{ item.name }}:</div>
        <div class="product-select-list">
          <div
            v-for="(child, childIndex) of item.children"
            :key="child"
            class="product-select-list__item"
          >
            <a-tag @close.prevent="handleClose(index, childIndex)" closable>{{
              child
            }}</a-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Form } from "ant-design-vue";

const { id, onFieldChange, onFieldBlur } = Form.useInjectFormItemContext();

type ItemType = {
  name: string;
  explain: string;
  icon?: SVGAElement;
  value: string;
  children: { name: string; value: string; parentId: string }[];
};

type modelValueItemType = {
  name: string;
  value: string;
  children: string[];
};

const props = defineProps<{
  modelValue: modelValueItemType[];
  options: ItemType[];
}>();

const current = ref<number | null>(null);

const emits = defineEmits(["update:modelValue"]);

const toValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
    onFieldChange()
  },
});

function getCheckboxValue(parentValue: string) {
  const index = toValue.value.findIndex((item) => item.value == parentValue);
  return index > -1 ? toValue.value[index].children : [];
}

function titleActive(item: ItemType) {
  return toValue.value.some((data) => data.value == item.value);
}
function handleCheckboxChange(e: string[], item: Omit<ItemType, "children">) {
  const index = toValue.value.findIndex((data) => data.value == item.value);
  const newToValue = toValue.value;
  if (index > -1) {
    if (e.length == 0) {
      newToValue.splice(index, 1);
    } else {
      newToValue[index].children = e;
    }
  } else {
    newToValue.push({
      name: item.value,
      value: item.value,
      children: e,
    });
  }
  toValue.value = newToValue;
}

function handleClose(index: number, childIndex: number) {
  const newToValue = toValue.value;
  newToValue[index].children.splice(childIndex, 1);
  if (newToValue[index].children.length == 0) {
    newToValue.splice(index, 1);
  }
  toValue.value = newToValue;
}

function handleActive(index: number) {
  if (current.value == index) {
    current.value = null;
  } else {
    current.value = index;
  }
}
</script>

<style lang="less" scoped>
.product {
  &-item {
    margin-bottom: 24px;
  }
  &-header {
    display: flex;
    align-items: center;
    column-gap: 12px;
  }
  &-explain {
    font-size: 14px;
    color: #9d9d9d;
  }
  &.active {
    &-title {
      background: #eef2ff;
      border: 1px solid #355dee;
    }
  }
  &-title {
    min-width: 121px;
    height: 50px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
  }
  .ant-btn-primary {
    color: rgba(0, 0, 0, 0.88);
    background-color: #eef2ff;
    border-color: #355dee;
  }
  &-icon {
    display: flex;
    margin-right: 8px;
  }
  &-content {
    position: relative;
    &-arrow {
      position: absolute;
      width: 10px;
      height: 10px;
      z-index: 1;
      left: 25px;
      top: -5px;
      &::before {
        position: absolute;
        width: 10px;
        height: 10px;
        z-index: 1;
        content: " ";
        transform: rotate(45deg);
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background: #f2f5f8;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        box-sizing: border-box;
      }
    }
  }
  &-container {
    margin-top: 26px;
    padding: 25px;
    background-color: #f2f5f8;
    border-top: 1px solid rgba(0, 0, 0, 0.15);
  }

  &-select {
    background: #ffffff;
    border-radius: 6px;
    border: 1px solid #d9d9d9;
    padding: 17px;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    &-label {
      margin-right: 8px;
    }
    &-item {
      display: flex;
      align-items: center;
    }
    &-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      .ant-tag {
        line-height: 24px;
      }
    }
  }
}
</style>
