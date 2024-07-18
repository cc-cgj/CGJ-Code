<template>
  <div>
    <!-- 请勾选适用于本企业的情况 -->
    <div class="page-main">
      <a-card title="请勾选适用于本企业的情况(可多选)">
        <form-render
          :forms="state.systemCondition.forms"
          :form-state="formState"
          :auto-span="false"
          label-width="0"
          :custom-name="(prop:string) => ['companyBasicInfo', prop]"
        >
        </form-render>
      </a-card>
    </div>
    <!-- 主要负责人信息 -->
    <div v-if="state.LeadPerson.list.length" class="page-main">
      <a-card title="主要负责人信息">
        <template v-for="item of state.LeadPerson.list" :key="item.key">
          <form-render
            :forms="state.LeadPerson.forms"
            :form-state="item.data"
            :auto-span="false"
            label-width="120px"
            :custom-name="
              (prop:string) => ['companyEmployeeList', 'companyEmployeeList',item.dataIndex, prop]
            "
          >
          </form-render>
        </template>
      </a-card>
    </div>
    <!-- 质量安全总监 -->
    <div v-if="state.QualitySafetyDirector.list.length" class="page-main">
      <a-card title="质量安全总监信息">
        <form-composite
          head-label="质量安全总监"
          :list="state.QualitySafetyDirector.list"
          :forms="state.QualitySafetyDirector.forms"
          add-title="新增安全总监"
          label-width="180px"
          head-value-key="employeeName"
          :custom-name="
              (prop:string,dataIndex:number) => ['companyEmployeeList','companyEmployeeList', dataIndex, prop]
            "
          @add="handleAdd(state.QualitySafetyDirector.employeeType)"
          @del="handleDel"
        />
      </a-card>
    </div>
    <!-- 质量安全员信息 -->
    <div v-if="state.QualitySafetyOfficer.list.length" class="page-main">
      <a-card title="质量安全员信息">
        <form-composite
          head-label="质量安全员"
          :list="state.QualitySafetyOfficer.list"
          :forms="state.QualitySafetyOfficer.forms"
          add-title="新增安全员"
          label-width="180px"
          head-value-key="employeeName"
          :custom-name="
              (prop:string,dataIndex:number) => ['companyEmployeeList','companyEmployeeList', dataIndex, prop]
            "
          @add="handleAdd(state.QualitySafetyOfficer.employeeType)"
          @del="handleDel"
        />
      </a-card>
    </div>
    <!-- 工业产品质量安全风险管控清单 -->
    <div v-if="formState.systemCondition.includes(4)" class="page-main">
      <a-card title="工业产品质量安全风险管控清单">
        <upload-file v-model="formState.riskManagementFileId" />
      </a-card>
    </div>
  </div>
</template>

<script name="Responsibility" lang="ts" setup>
import { IdentityCard, Telephone } from "@/utils/pattern";
import type { Form } from "../type";
const props = defineProps<{
  formState: Form["companyEmployeeList"];
}>();
const emits = defineEmits(["add", "del"]);

function useState() {
  const state: {
    [key in string]: any;
  } = {
    systemCondition: {
      forms: [
        {
          type: "checkboxGroup",
          value: "systemCondition",
          span: 24,
          options: props.formState.systemConditionOptions,
        },
      ],
    },
    LeadPerson: {
      employeeType: "LeadPerson",
      list: [],
      forms: [
        {
          type: "input",
          label: "主要负责人",
          value: "employeeName",
          rules: { required: true, message: "请输入主要负责人" },
        },
        {
          type: "input",
          label: "身份证号",
          value: "identityNumber",
          rules: [
            {
              required: true,
              message: "请输入身份证号",
            },
            {
              pattern: IdentityCard,
              message: "请输入18位的身份证号",
            },
          ],
        },
        {
          type: "input",
          label: "联系方式",
          value: "contactInfo",
          rules: [
            { required: true, message: "请输入联系方式" },
            {
              pattern: Telephone,
              message: "请输入准确的固定电话号码或手机号",
            },
          ],
        },
        {
          type: "radioGroup",
          label: "是否落实月调度",
          value: "monthScheduleStatus",
          rules: { required: true, message: "请选择是否落实月调度" },
          options: [
            {
              label: "已落实",
              value: 1,
            },
            {
              label: "未落实",
              value: 0,
            },
          ],
        },
      ],
    },
    QualitySafetyDirector: {
      employeeType: "QualitySafetyDirector",
      list: [],
      forms: [
        {
          type: "input",
          label: "身份证号",
          value: "identityNumber",
          rules: [
            {
              required: true,
              message: "请输入身份证号",
            },
            {
              pattern: IdentityCard,
              message: "请输入18位的身份证号",
            },
          ],
        },
        {
          type: "input",
          label: "联系方式",
          value: "contactInfo",
          rules: [
            { required: true, message: "请输入联系方式" },
            {
              pattern: Telephone,
              message: "请输入准确的固定电话号码或手机号",
            },
          ],
        },
        {
          type: "radioGroup",
          label: "是否落实周排查",
          value: "weekScheduleStatus",
          rules: { required: true, message: "请选择是否落实周排查" },
          options: [
            {
              label: "已落实",
              value: 1,
            },
            {
              label: "未落实",
              value: 0,
            },
          ],
        },
        {
          type: "radioGroup",
          label: "工作状态",
          value: "workStatus",
          rules: { required: true, message: "请选择工作状态" },
          options: [
            {
              label: "全职",
              value: 1,
            },
            {
              label: "兼职",
              value: 0,
            },
          ],
        },
        {
          type: "radioGroup",
          label: "是否完成培训并通过考核",
          value: "assessmentStatus",
          rules: { required: true, message: "请选择是否完成培训并通过考核" },
          options: [
            {
              label: "已完成",
              value: 1,
            },
            {
              label: "未完成",
              value: 0,
            },
          ],
        },
      ],
    },
    QualitySafetyOfficer: {
      employeeType: "QualitySafetyOfficer",
      list: [],
      forms: [
        {
          type: "input",
          label: "身份证号",
          value: "identityNumber",
          rules: [
            {
              required: true,
              message: "请输入身份证号",
            },
            {
              pattern: IdentityCard,
              message: "请输入18位的身份证号",
            },
          ],
        },
        {
          type: "input",
          label: "联系方式",
          value: "contactInfo",
          rules: [
            { required: true, message: "请输入联系方式" },
            {
              pattern: Telephone,
              message: "请输入准确的固定电话号码或手机号",
            },
          ],
        },
        {
          type: "radioGroup",
          label: "是否落实日管控",
          value: "dayScheduleStatus",
          rules: { required: true, message: "请选择是否落实日管控" },
          options: [
            {
              label: "已落实",
              value: 1,
            },
            {
              label: "未落实",
              value: 0,
            },
          ],
        },
        {
          type: "radioGroup",
          label: "工作状态",
          value: "workStatus",
          rules: { required: true, message: "请选择工作状态" },
          options: [
            {
              label: "全职",
              value: 1,
            },
            {
              label: "兼职",
              value: 0,
            },
          ],
        },
        {
          type: "radioGroup",
          label: "是否完成培训并通过考核",
          value: "assessmentStatus",
          rules: { required: true, message: "请选择是否完成培训并通过考核" },
          options: [
            {
              label: "已完成",
              value: 1,
            },
            {
              label: "未完成",
              value: 0,
            },
          ],
        },
      ],
    },
  };
  return state;
}

const state = ref(useState());

// 直接监听数组会出现新旧数组值相同。无法区分新增，删除
// 改为监听数组的length
watch(
  () => props.formState.companyEmployeeList.length,
  () => {
    state.value = useState();
    const newCompanyEmployeeList = props.formState.companyEmployeeList;
    newCompanyEmployeeList.forEach((item, index) => {
      state.value[item.employeeType].list.push({
        dataIndex: index,
        key: item.uuid,
        data: item,
      });
    });

    // const newCompanyEmployeeList = props.formState.companyEmployeeList;

    // const isFlag = newCompanyEmployeeList.find((item) => item.flag);

    // if (oldLength && !isFlag) {
    //   state.value = useState();
    //   oldLength = undefined;
    // }

    // // 初始化
    // if (!oldLength) {
    //   newCompanyEmployeeList.forEach((item, index) => {
    //     // let key = item.id;
    //     // if (!key) {
    //     const key = Math.floor(Math.random() * Date.now());
    //     // }
    //     state.value[item.employeeType].list.push({
    //       dataIndex: index,
    //       key: key,
    //       data: item,
    //     });
    //   });
    // } else if (newLength > oldLength) {
    //   // 新增
    //   newCompanyEmployeeList.forEach((item, index) => {
    //     // 查找新增的那条数据
    //     if (item.flag === "add") {
    //       // 删除临时标记
    //       delete item.flag;
    //       // let key = item.id;
    //       // if (!key) {
    //       let key = Math.floor(Math.random() * Date.now());
    //       // }
    //       state.value[item.employeeType].list.push({
    //         dataIndex: index,
    //         key: key,
    //         data: item,
    //       });
    //       return true;
    //     }
    //   });
    // } else if (newLength < oldLength) {
    //   newCompanyEmployeeList.forEach((item, index) => {
    //     // 查找被删除的上一条数据
    //     if (item.flag === "del") {
    //       // 删除临时标记
    //       delete item.flag;
    //       const list = state.value[item.flagType as string].list;
    //       // 删除类型标记
    //       delete item.flagType;
    //       const listIndex = list.findIndex(
    //         ({ dataIndex }: { dataIndex: number }) => dataIndex == index
    //       );
    //       let delTotal = 1;
    //       list.splice(listIndex + 1, delTotal);
    //       const remainList = list.slice(listIndex + 1);
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

function handleAdd(employeeType: string) {
  emits("add", employeeType);
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
