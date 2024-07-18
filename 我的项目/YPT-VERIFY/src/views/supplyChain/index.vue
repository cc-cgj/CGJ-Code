<template>
  <div>
    <!-- 主要原材料供应商 -->
    <div v-if="state.PrimaryMaterials.list.length" class="page-main">
      <a-card title="主要原材料供应商">
        <form-composite
          :list="state.PrimaryMaterials.list"
          :forms="state.PrimaryMaterials.forms"
          :custom-name="
              (prop:string,dataIndex:number) => ['companySupplierList',dataIndex, prop]
            "
          @add="handleAdd(state.PrimaryMaterials.supplierType)"
          @del="(dataIndex:number)=>handleDel(dataIndex)"
          :head-label-maxlength="18"
          head-label="企业统一社会信用代码"
          head-value-key="supplierCreditCode"
          add-title="新增供应商"
          head-label-show-count
        />
      </a-card>
    </div>
    <!-- 主要零配件供应商 -->
    <div v-if="state.PrimaryPart.list.length" class="page-main">
      <a-card title="主要零配件供应商">
        <form-composite
          :list="state.PrimaryPart.list"
          :forms="state.PrimaryPart.forms"
          :custom-name="
              (prop:string,dataIndex:number) => ['companySupplierList',dataIndex, prop]
            "
          @add="handleAdd(state.PrimaryPart.supplierType)"
          @del="(dataIndex:number)=>handleDel(dataIndex)"
          :head-label-maxlength="18"
          head-label="企业统一社会信用代码"
          head-value-key="supplierCreditCode"
          add-title="新增供应商"
          :head-required="false"
          head-label-show-count
        />
      </a-card>
    </div>
  </div>
</template>

<script name="SupplyChain" lang="ts" setup>
import { Cascader } from "ant-design-vue";
import type { CascaderProps } from "ant-design-vue";
import type { ShowSearchType } from "ant-design-vue/es/cascader";
import mockOptions from "@/mock/产品质量监督抽查产品分类与代码表.json";
import type { Form } from "../type";

const props = defineProps<{
  formState: Form["companySupplierList"];
}>();

const emits = defineEmits(["add", "del"]);

function useState() {
  const categoryConfig: {
    options: CascaderProps["options"];
    showSearch: ShowSearchType;
  } = {
    options: mockOptions,
    showSearch: {
      filter(inputValue, path, fieldNames) {
        return path.some(
          (option) =>
            option[fieldNames.label as string]
              .toLowerCase()
              .indexOf(inputValue.toLowerCase()) > -1
        );
      },
    },
  };

  const PrimaryMaterialsForm = [
    {
      type: "input",
      label: "企业名称",
      value: "companyName",
      rules: { required: true, message: "请输入企业名称" },
    },
    {
      type: "input",
      label: "产品名称",
      value: "productName",
    },
    {
      type: "cascader",
      label: "产品类别",
      value: "categoryConfig",
      options: categoryConfig.options,
      showSearch: categoryConfig.showSearch,
      multiple: true,
      span: 24,
      showCheckedStrategy: Cascader.SHOW_CHILD,
      fieldNames: {
        label: "name",
        value: "id",
        children: "children",
      },
    },
  ];

  const PrimaryPartForm = [
    {
      type: "input",
      label: "企业名称",
      value: "companyName",
    },
    {
      type: "input",
      label: "产品名称",
      value: "productName",
    },
    {
      type: "cascader",
      label: "产品类别",
      value: "categoryConfig",
      options: categoryConfig.options,
      showSearch: categoryConfig.showSearch,
      multiple: true,
      span: 24,
      showCheckedStrategy: Cascader.SHOW_CHILD,
      fieldNames: {
        label: "name",
        value: "id",
        children: "children",
      },
    },
  ];

  const state: {
    [key in string]: any;
  } = {
    PrimaryMaterials: {
      supplierType: "PrimaryMaterials",
      list: [],
      forms: PrimaryMaterialsForm,
    },
    PrimaryPart: {
      supplierType: "PrimaryPart",
      list: [],
      forms: PrimaryPartForm,
    },
  };
  return state;
}

const state = ref(useState());

// 直接监听数组会出现新旧数组值相同。无法区分新增，删除
// 改为监听数组的length
watch(
  () => props.formState.length,
  () => {
    const newCompanySupplierList = props.formState;
    state.value = useState();
    newCompanySupplierList.forEach((item, index) => {
      state.value[item.supplierType].list.push({
        dataIndex: index,
        key: item.uuid,
        data: item,
      });
    });

    // 初始化
    // if (!oldLength) {
    //   newCompanySupplierList.forEach((item, index) => {
    //     // let key = item.id;
    //     // if (!key) {
    //     let key = Math.floor(Math.random() * Date.now());
    //     // }
    //     state.value[item.supplierType].list.push({
    //       dataIndex: index,
    //       key: key,
    //       data: item,
    //     });
    //   });
    // } else if (newLength > oldLength) {
    //   // 新增
    //   newCompanySupplierList.forEach((item, index) => {
    //     // 查找新增的那条数据
    //     if (item.flag === "add") {
    //       // 删除临时标记
    //       delete item.flag;
    //       // let key = item.id;
    //       // if (!key) {
    //       let key = Math.floor(Math.random() * Date.now());
    //       // }
    //       state.value[item.supplierType].list.push({
    //         dataIndex: index,
    //         key: key,
    //         data: item,
    //       });
    //       return true;
    //     }
    //   });
    // } else if (newLength < oldLength) {
    //   newCompanySupplierList.forEach((item, index) => {
    //     // 查找被删除的上一条数据
    //     if (item.flag === "del") {
    //       // 删除临时标记
    //       delete item.flag;
    //       const list = state.value[item.flagType as string].list;
    //       // 删除类型标记
    //       delete item.flagType;

    //       let listIndex = list.findIndex(
    //         ({ dataIndex }: { dataIndex: number }) => dataIndex == index
    //       );
    //       let delTotal = 1;
    //       listIndex = item.flagTop ? listIndex : listIndex + 1;
    //       // 删除第一条标记
    //       delete item.flagTop;
    //       list.splice(listIndex, delTotal);
    //       const remainList = list.slice(listIndex);
    //       // 更新dataIndex
    //       remainList.forEach((c: { dataIndex: number }) => {
    //         c.dataIndex -= delTotal;
    //       });
    //       return true;
    //     }
    //   });
    // }
  },
  {
    immediate: true,
    // deep: true,
  }
);

/**
 * @params supplierType
 * @description: 证书类型
 * @value ProductionLicense(工业产品生产许可证);PrimaryMaterials(强制性产品认证);PrimaryPart(涉及人身健康和生命财产安全并有强制性国家标准要求的产品);NonMandatory(非强制性产品认证)
 */
function handleAdd(supplierType: string) {
  emits("add", supplierType);
}

function handleDel(dataIndex: number) {
  emits("del", dataIndex);
}
</script>

<style lang="less" scoped>
:deep(.ant-card-head) {
  padding: 0 50px;
}
:deep(.ant-card-body) {
  padding: 30px 50px;
}
</style>
