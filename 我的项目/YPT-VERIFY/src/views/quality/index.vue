<template>
  <div>
    <!-- 工业产品生产许可证 -->
    <div v-if="state.ProductionLicense.list.length" class="page-main">
      <a-card title="工业产品生产许可证">
        <template v-for="item of state.ProductionLicense.list" :key="item.key">
          <form-render
            :forms="state.ProductionLicense.forms"
            :form-state="item.data"
            :auto-span="false"
            :custom-name="
              (prop:string) => ['companyCertificateList',item.dataIndex, prop]
            "
          >
          </form-render>
        </template>
      </a-card>
    </div>
    <!-- 强制性产品认证（3C认证） -->
    <div v-if="state.Mandatory.list.length" class="page-main">
      <a-card title="强制性产品认证（3C认证）">
        <form-composite
          :list="state.Mandatory.list"
          :forms="state.Mandatory.forms"
          :custom-name="
              (prop:string,dataIndex:number) => ['companyCertificateList',dataIndex, prop]
            "
          @add="handleAdd(state.Mandatory.certificateType)"
          @del="handleDel"
        />
      </a-card>
    </div>
    <!-- 涉及人身健康和生命财产安全并且实施强制性国家标准产品 -->
    <div v-if="state.HealthPropertySafety.list.length" class="page-main">
      <a-card title="涉及人身健康和生命财产安全并且实施强制性国家标准产品">
        <form-composite
          :list="state.HealthPropertySafety.list"
          :forms="state.HealthPropertySafety.forms"
          :custom-name="
              (prop:string,dataIndex:number) => ['companyCertificateList',dataIndex, prop]
            "
          @add="handleAdd(state.HealthPropertySafety.certificateType)"
          @del="handleDel"
        />
      </a-card>
    </div>
    <!-- 非强制性产品认证 -->
    <div v-if="state.NonMandatory.list.length" class="page-main">
      <a-card title="非强制性产品认证">
        <form-composite
          :list="state.NonMandatory.list"
          :forms="state.NonMandatory.forms"
          @add="handleAdd(state.NonMandatory.certificateType)"
          @del="handleDel"
          :custom-name="
              (prop:string,dataIndex:number) => ['companyCertificateList',dataIndex, prop]
            "
          :head-required="false"
        />
      </a-card>
    </div>
  </div>
</template>

<script name="Quality" lang="ts" setup>
const props = defineProps<{
  formState: any[];
}>();

const emits = defineEmits(["add", "del"]);

function useState() {
  const forms2 = [
    {
      type: "input",
      label: "认证委托人名称",
      value: "principalName",
      placeholder: "请输入认证委托人（持证人）名称",
      rules: { required: true, message: "请输入认证委托人名称" },
    },
    {
      type: "input",
      label: "认证委托人地址",
      value: "principalAddress",
    },
    {
      type: "input",
      label: "产品制造商名称",
      value: "manufacturerName",
      rules: { required: true, message: "请输入产品制造商名称" },
    },
    {
      type: "input",
      label: "产品制造商地址",
      value: "manufacturerAddress",
    },
    {
      type: "input",
      label: "生产企业名称",
      value: "productionCompanyName",
      rules: { required: true, message: "请输入生产企业名称" },
    },
    {
      type: "input",
      label: "生产企业注册地址",
      value: "productionCompanyAddress",
    },
    {
      type: "input",
      label: "产品名称和系列",
      value: "productName",
      rules: { required: true, message: "请输入产品名称和系列" },
    },
    {
      type: "input",
      label: "发证机构",
      value: "issueOrganization",
    },
    {
      type: "input",
      label: "型号、规格",
      value: "spec",
      span: 24,
      contorlStyle: {
        maxWidth: "100%",
      },
      rules: { required: true, message: "请输入型号、规格" },
    },
    {
      type: "input",
      label: " 产品标准和技术要求",
      value: "standardSkillRequire",
      span: 24,
      contorlStyle: {
        maxWidth: "100%",
      },
      rules: { required: true, message: "请输入产品标准和技术要求" },
    },
    {
      type: "date",
      label: "发证日期",
      value: "issueDate",
    },
    {
      type: "date",
      label: "有效期至",
      value: "validDate",
    },
  ];
  const state: {
    [key in string]: any;
  } = {
    ProductionLicense: {
      certificateType: "ProductionLicense",
      list: [],
      forms: [
        {
          type: "input",
          label: "证书编号",
          value: "certificateCode",
          rules: { required: true, message: "请输入证书编号" },
        },
        {
          type: "input",
          label: "产品名称",
          value: "productName",
          rules: { required: true, message: "请输入产品名称" },
        },
        {
          type: "date",
          label: "发证日期",
          value: "issueDate",
        },
        {
          type: "date",
          label: "有效期至",
          value: "validDate",
        },
      ],
    },
    Mandatory: {
      certificateType: "Mandatory",
      list: [],
      forms: forms2,
    },
    HealthPropertySafety: {
      certificateType: "HealthPropertySafety",
      list: [],
      forms: forms2,
    },
    NonMandatory: {
      certificateType: "NonMandatory",
      list: [],
      forms: [
        {
          type: "input",
          label: "证书名称",
          value: "certificateName",
        },
        {
          type: "input",
          label: "标准号",
          value: "standardCode",
        },
        {
          type: "input",
          label: "认证范围",
          value: "certificateRange",
        },
        {
          type: "input",
          label: "发证机构",
          value: "issueOrganization",
        },
        {
          type: "date",
          label: "发证日期",
          value: "issueDate",
        },
        {
          type: "date",
          label: "有效期至",
          value: "validDate",
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
  () => props.formState.length,
  () => {
    state.value = useState();
    const newCompanyCertificateList = props.formState;
    newCompanyCertificateList.forEach((item, index) => {
      state.value[item.certificateType].list.push({
        dataIndex: index,
        key: item.uuid,
        data: item,
      });
    });

    // // 初始化
    // if (!oldLength) {
    //   newCompanyCertificateList.forEach((item, index) => {
    //     let key = item.id;
    //     if (!key) {
    //       key = Math.floor(Math.random() * Date.now());
    //     }
    //     state.value[item.certificateType].list.push({
    //       dataIndex: index,
    //       key: key,
    //       data: item,
    //     });
    //   });
    // } else if (newLength > oldLength) {
    //   // 新增
    //   newCompanyCertificateList.forEach((item, index) => {
    //     // 查找新增的那条数据
    //     if (item.flag === "add") {
    //       // 删除临时标记
    //       delete item.flag;
    //       let key = item.id;
    //       if (!key) {
    //         key = Math.floor(Math.random() * Date.now());
    //       }
    //       state.value[item.certificateType].list.push({
    //         dataIndex: index,
    //         key: key,
    //         data: item,
    //       });
    //       return true;
    //     }
    //   });
    // } else if (newLength < oldLength) {
    //   newCompanyCertificateList.forEach((item, index) => {
    //     // 查找被删除的上一条数据
    //     if (item.flag === "del") {
    //       // 删除标记
    //       delete item.flag;
    //       const list = state.value[item.flagType].list;
    //       // 删除标记的数据类型
    //       delete item.flagType;
    //       let delTotal = 1;
    //       const listIndex = list.findIndex(
    //         ({ dataIndex }: { dataIndex: number }) => dataIndex == index
    //       );
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

/**
 * @params certificateType
 * @description: 证书类型
 * @value ProductionLicense(工业产品生产许可证);Mandatory(强制性产品认证);HealthPropertySafety(涉及人身健康和生命财产安全并有强制性国家标准要求的产品);NonMandatory(非强制性产品认证)
 */
function handleAdd(certificateType: string) {
  emits("add", certificateType);
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
