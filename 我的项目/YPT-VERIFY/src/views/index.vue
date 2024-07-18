<template>
  <div
    class="page"
    :class="{
      'fix-step': isFix,
    }"
  >
    <a-row class="step-box" justify="center" style="margin-bottom: 30px">
      <a-col :xs="20" :sm="15">
        <a-steps
          ref="stepRef"
          :current="current"
          :items="hideSteps"
          label-placement="vertical"
          :responsive="false"
          style="overflow-x: auto"
          @change="handleStepChange"
        ></a-steps>
      </a-col>
    </a-row>
    <div class="steps-content">
      <a-form
        ref="formRef"
        :model="form"
        autocomplete="off"
        :colon="false"
        label-wrap
        scrollToFirstError
      >
        <KeepAlive :include="includeComponents">
          <component
            :is="hideSteps[current].content"
            :form-state="formState"
            v-on="getCompnentEvent()"
          ></component>
        </KeepAlive>
      </a-form>
    </div>
    <div class="page-footer">
      <a-space :size="24" wrap>
        <a-button v-if="current > 0 && !loading" size="large" @click="preStep"
          >上一步</a-button
        >
        <a-button
          v-if="current < hideSteps.length - 1"
          @click="nextStep"
          type="primary"
          size="large"
          >下一步</a-button
        >
        <a-button
          v-else
          @click="submit"
          type="primary"
          size="large"
          :loading="loading"
          >提交</a-button
        >
      </a-space>
    </div>
  </div>
</template>

<script name="Index" setup lang="ts">
import Manage from "./manage/index.vue";
import Quality from "./quality/index.vue";
import Responsibility from "./responsibility/index.vue";
import SupplyChain from "./supplyChain/index.vue";
import { loading, saveCompanyInfo } from "@/apis/index";
import { getUUID } from "./type";
import type {
  Form,
  CompanyBasicInfo,
  CompanyCertificate,
  CompanyEmployee,
  CompanySupplier,
} from "./type";

const current = ref<number>(0);
const stepRef = ref();

const onEvent: {
  [key in string]: (...arg: any[]) => void;
} = {
  "casualty-value": handleCasualtyValue,
  add: handleAdd,
  del: handleDel,
};

function getCompnentEvent() {
  const _component = hideSteps.value[current.value].content;
  const event: {
    [key in string]: (...arg: any[]) => void;
  } = {};
  if (Array.isArray(_component.emits)) {
    _component.emits.forEach((eventName) => {
      event[eventName] = onEvent[eventName];
    });
    return event;
  }
  return event;
}
const steps = ref([
  {
    title: "经营基本情况",
    content: markRaw(Manage),
    formKey: "companyBasicInfo",
  },
  {
    title: "质量标准情况",
    content: markRaw(Quality),
    formKey: "companyCertificateList",
  },
  {
    title: "主体责任部分",
    hide: true,
    content: markRaw(Responsibility),
    formKey: "companyEmployeeList",
  },
  {
    title: "供应链质量控制",
    content: markRaw(SupplyChain),
    formKey: "companySupplierList",
  },
]);

const hideSteps = computed(() => {
  return steps.value.filter((item) => !item.hide);
});

function handleStepChange(step: number) {
  if (step > current.value) return;
  current.value = step;
}

const isFix = ref(false);

function bodyScroll() {
  const y = window.scrollY;
  if (y > 84) {
    isFix.value = true;
  } else {
    isFix.value = false;
  }
}

window.addEventListener("scroll", bodyScroll);

onBeforeUnmount(() => {
  window.removeEventListener("scroll", bodyScroll);
});

const form = ref<Form>({
  // 企业基本信息
  companyBasicInfo: {
    companyName: "", //企业名称
    creditCode: "", //企业信用代码
    managementType: "", //经营类型
    turnover: "", //年营业额
    employeeCount: "", //从业人员
    categoryConfig: [], //产品类别
    productCondition: [1, 2], //企业的产品情况(多选逗号分割)
    systemCondition: [], //企业的制度情况(多选逗号分割)
    region: [], //区划名称(多级间用-分割)
    regionCode: [], //区划编码(多级间用-分割)
    riskManagementFileId: "", // 风险管控文件Id列表(多个文件用用&隔开)
  },
  // 企业证书列表
  companyCertificateList: [],
  // 企业人员信息列表
  companyEmployeeList: {
    riskManagementFileId: [], // 风险管控文件Id列表(多个文件用用&隔开)
    systemCondition: [1, 2, 3, 4, 5, 6], //企业的制度情况(多选逗号分割)
    companyEmployeeList: [],
    systemConditionOptions: [],
  },
  // 企业供应商列表
  companySupplierList: [
    usecompanySupplierData("PrimaryMaterials"),
    usecompanySupplierData("PrimaryPart"),
  ],
});

watch(
  () => form.value.companyBasicInfo.managementType,
  (managementType) => {
    const systemConditionOptions = [
      {
        label: "已建立产品质量安全管理制度",
        value: 1,
      },
      {
        label: "已配置质量安全总监",
        value: 2,
      },
      {
        label: "已配置质量安全员",
        value: 3,
      },
      {
        label: "已制定《工业产品质量安全风险管控清单》",
        value: 4,
      },
      {
        label: "已制定《质量安全总监职责》",
        value: 5,
      },
      {
        label: "已制定《质量安全员守则》",
        value: 6,
      },
    ];

    if (managementType == 1) {
      systemConditionOptions.push(
        ...[
          {
            label:
              "已建立健全原材料检查验收制度、产品出厂检验制度、生产全过程控制体系（食品相关产品）制度",
            value: 8,
          },
        ]
      );
    } else if (managementType == 2) {
      systemConditionOptions.push({
        label: "已建立健全进货检查验收制度",
        value: 7,
      });
    } else if (managementType == 3) {
      systemConditionOptions.push(
        ...[
          {
            label: "已建立健全进货检查验收制度",
            value: 7,
          },
          {
            label:
              "已建立健全原材料检查验收制度、产品出厂检验制度、生产全过程控制体系（食品相关产品）制度",
            value: 8,
          },
        ]
      );
    }
    form.value.companyEmployeeList.systemConditionOptions =
      systemConditionOptions;
  },
  {
    immediate: true,
  }
);

watch(
  () => form.value.companyEmployeeList.riskManagementFileId,
  (riskManagementFileId) => {
    form.value.companyBasicInfo.riskManagementFileId = riskManagementFileId
      .map((item) => item.attachId)
      .join("&");
  },
  {
    deep: true,
  }
);

/**
 * @param supplierType
 * 供应商类型:PrimaryMaterials(主要原材料);PrimaryPart(主要零配件)
 */

function usecompanySupplierData(supplierType: string) {
  return {
    uuid: getUUID(),
    supplierType: supplierType, //供应商类型:PrimaryMaterials(主要原材料);PrimaryPart(主要零配件)
    supplierCreditCode: "", //供应商企业统一信用代码
    companyName: "", //公司名称
    productName: "", //产品名称
    categoryConfig: [], //产品类别
  };
}

/**
 *
 * @param type
 * 1.已建立产品质量安全管理制度;
 * 2.已配置质量安全总监;
 * 3.已配置质量安全员;
 * 4.已制定《工业产品质量安全风险管控清单》;
 * 5.已制定《质量安全总监职责》;
 * 6.已制定《质量安全员守则》;
 * 7.已建立健全进货检查验收制度;
 * 8.已建立健全原材料检查验收制度、产品出厂检验制度、生产全过程控制体系（食品相关产品）制度
 * @param initEmployeeType
 * 员工类型:LeadPerson(主要负责人);QualitySafetyDirector(质量安全总监);QualitySafetyOfficer(质量安全员)
 */

function useCompanyEmployeeData(
  type?: number | null,
  initEmployeeType?: string
) {
  let employeeType = initEmployeeType;
  if (!initEmployeeType) {
    switch (type) {
      case 2:
        employeeType = "QualitySafetyDirector";
        break;
      case 3:
        employeeType = "QualitySafetyOfficer";
        break;
      default:
        employeeType = "LeadPerson";
    }
  }

  return {
    uuid: getUUID(),
    employeeType: employeeType as string, //员工类型
    employeeName: "", //员工名称（主要负责人/质量安全总监/质量员）
    identityNumber: "", //身份证号(加密存储)
    contactInfo: "", //联系方式(加密存储)
    workStatus: "", //工作状态 1.全职;0.兼职
    monthScheduleStatus: "", //是否落实月排期 1.已落实;0.未落实
    weekScheduleStatus: "", //是否落实周排期 1.已落实;0.未落实
    dayScheduleStatus: "", //是否落实日排期 1.已落实;0.未落实
    assessmentStatus: "", //是否完成培训并通过考核 1.已完成;0.未完成
  };
}

// 同步到企业基本信息
watch(
  () => form.value.companyEmployeeList.systemCondition,
  (systemCondition: number[]) => {
    form.value.companyBasicInfo.systemCondition = systemCondition;
    const companyEmployeeList: CompanyEmployee[] = [useCompanyEmployeeData()];
    systemCondition.forEach((type) => {
      const data = useCompanyEmployeeData(type);
      if (data.employeeType && data.employeeType !== "LeadPerson") {
        companyEmployeeList.push(data);
      }
    });
    if (
      form.value.companyEmployeeList.companyEmployeeList.length !==
      companyEmployeeList.length
    ) {
      form.value.companyEmployeeList.companyEmployeeList = companyEmployeeList;
    }
    // 清空 - 工业产品质量安全风险管控清单 - 文件列表
    form.value.companyEmployeeList.riskManagementFileId = [];
  },
  {
    deep: true,
    immediate: true,
  }
);

/**
 *
 * @param type
 * 1.实施/销售工业产品生产许可的产品;
 * 2.实施/销售强制性产品认证管理的产品;
 * 3.涉及人身健康和生命财产安全并有强制性国家标准要求的产品（只适用于大中型生产/销售单位）;
 * 4.以上三种情况均不符合
 * @param initCertificateType
 * ProductionLicense(工业产品生产许可证);Mandatory(强制性产品认证);HealthPropertySafety(涉及人身健康和生命财产安全并有强制性国家标准要求的产品);NonMandatory(非强制性产品认证)
 *
 */

function useCompanyCertificateData(
  type?: number | null,
  initCertificateType?: string
): CompanyCertificate {
  let certificateType = initCertificateType;
  if (!initCertificateType) {
    switch (type) {
      case 1:
        certificateType = "ProductionLicense";
        break;
      case 2:
        certificateType = "Mandatory";
        break;
      case 3:
        certificateType = "HealthPropertySafety";
        break;
      default:
        certificateType = "NonMandatory";
        break;
    }
  }

  return {
    uuid: getUUID(),
    certificateType: certificateType as string, //证书类型
    certificateCode: "", //证书编号
    productName: "", //产品名称/产品名称和系列
    issueDate: "", //发证日期
    validDate: "", //有效日期
    principalName: "", //认证委托人名称
    principalAddress: "", //认证委托人地址
    manufacturerName: "", //产品制造商
    manufacturerAddress: "", //制造商地址
    productionCompanyName: "", //生产企业名称
    productionCompanyAddress: "", //生产企业注册地址
    issueOrganization: "", //发证机构
    spec: "", //型号、规格
    standardSkillRequire: "", //产品标准和技术要求
    standardCode: "", //标准号
    certificateRange: "", //认证范围
  };
}

watch(
  () => form.value.companyBasicInfo.productCondition,
  (productCondition) => {
    if (productCondition.includes(4) && productCondition.length > 1) {
      if (productCondition.at(-1) == 4) {
        form.value["companyBasicInfo"].productCondition = [4];
      } else if (productCondition[0] == 4) {
        form.value["companyBasicInfo"].productCondition =
          productCondition.slice(1);
      }
      return;
    }

    form.value["companyCertificateList"] = productCondition
      .sort()
      .map((type) => useCompanyCertificateData(type));

    if (productCondition.at(-1) !== 4) {
      form.value["companyCertificateList"].push(useCompanyCertificateData());
    }
  },
  {
    immediate: true,
  }
);

type FormStateType =
  | CompanyBasicInfo
  | CompanyCertificate[]
  | {
      systemCondition: number[];
      companyEmployeeList: CompanyEmployee[];
    }
  | CompanySupplier[];

const formState = computed<FormStateType>(() => {
  let formKey = hideSteps.value[current.value].formKey;
  let formState = form.value[formKey] as FormStateType;
  return formState;
});

function handleCasualtyValue(prop: string, value: any) {
  switch (current.value) {
    case 0: {
      form.value["companyBasicInfo"][prop] = value;
    }
  }
}

type DataType = CompanyCertificate | CompanyEmployee | CompanySupplier;

function handleAdd(type: string) {
  let dataList: DataType[] = [];
  let typeKey: "certificateType" | "employeeType" | "supplierType";
  let data;

  const formKey = hideSteps.value[current.value].formKey;
  switch (formKey) {
    case "companyCertificateList": {
      typeKey = "certificateType";
      dataList = form.value["companyCertificateList"];
      data = useCompanyCertificateData(null, type);
      break;
    }
    case "companyEmployeeList": {
      typeKey = "employeeType";
      dataList = form.value["companyEmployeeList"].companyEmployeeList;
      data = useCompanyEmployeeData(null, type);
      break;
    }
    case "companySupplierList": {
      typeKey = "supplierType";
      dataList = form.value["companySupplierList"];
      data = usecompanySupplierData(type);
      break;
    }
  }

  dataList.push(data as DataType);

  // 不能重新排序，因为旧的数据已经绑定了index
  // const index = dataList.findLastIndex(
  //   (item: any) => item[typeKey as string] == type
  // );

  // if (index > -1) {
  //   const unshiftList = dataList.slice(index + 1);
  //   unshiftList.unshift({
  //     ...(data as DataType),
  //     flag: "add", // 临时标记
  //   });
  //   dataList.splice(index + 1, unshiftList.length, ...unshiftList);
  // }
}

function handleDel(dataIndex: number) {
  let dataList: DataType[] = [];
  let flagType: string = "";
  let typeKey: "certificateType" | "employeeType" | "supplierType";

  const formKey = hideSteps.value[current.value].formKey;

  switch (formKey) {
    case "companyCertificateList": {
      dataList = form.value["companyCertificateList"];
      typeKey = "certificateType";
      if (dataList) {
        flagType = (dataList[dataIndex] as CompanyCertificate)[
          "certificateType"
        ];
      }
      break;
    }
    case "companyEmployeeList": {
      dataList = form.value["companyEmployeeList"].companyEmployeeList;
      typeKey = "employeeType";
      flagType = (dataList[dataIndex] as CompanyEmployee)["employeeType"];
      break;
    }
    case "companySupplierList": {
      typeKey = "supplierType";
      dataList = form.value["companySupplierList"];
      flagType = (dataList[dataIndex] as CompanySupplier)["supplierType"];
      break;
    }
  }

  dataList.splice(dataIndex, 1);

  // 查找到当前类型的上一条

  // const flagDataIndex = dataIndex == 0 ? dataIndex + 1 : dataIndex - 1;

  // console.log(`dataList`, dataList);

  // console.log(`flagType`, flagType);

  // dataList.splice(dataIndex, 1);

  // let adjoinIndex = dataList.findLastIndex(
  //   (item: any) => item[typeKey] == type
  // );

  // adjoinIndex = adjoinIndex > -1 ? adjoinIndex : flagDataIndex;

  // console.log(`adjoinIndex`, adjoinIndex);

  // debugger;

  // // 给上一条添加标记
  // dataList[adjoinIndex]["flag"] = "del";
  // // 给上一条添加类型，防止删除第一条跳到别的类型
  // dataList[adjoinIndex]["flagType"] = flagType as string;

  // // 标记是否删除的是第一条
  // dataList[adjoinIndex]["flagTop"] = dataIndex == 0;
}

function preStep() {
  const { $el } = stepRef.value;
  const children = $el.children;
  const preIndex = --current.value;
  const target = children[preIndex];
  scollStepDOM(target);
}

const formRef = ref();

const includeComponents = computed(() => {
  const includes: string[] = [];
  for (let i = 0; i <= current.value; i++) {
    const component = hideSteps.value[i].content;
    includes.push(component.name);
  }
  return includes;
});

// 下一步
function nextStep() {
  formRef.value
    .validate()
    .then(() => {
      const { $el } = stepRef.value;
      const children = $el.children;
      const nextIndex = ++current.value;
      const target = children[nextIndex];
      scollStepDOM(target);

      steps.value[2].hide =
        form.value.companyBasicInfo.productCondition.at(-1) == 4;
    })
    .catch((error: any) => {
      console.log("error", error);
    });
}

// 滚动step
function scollStepDOM(target: HTMLElement) {
  nextTick(() => {
    target.scrollIntoView({
      behavior: "instant",
      inline: "center",
    });
    window.scroll({
      // top: document.body.scrollHeight,
      // behavior: "instant", // 可选，实现平滑滚动效果
      top: 0,
      behavior: "smooth",
    });
  });
}

// 提交
function submit() {
  formRef.value
    .validate()
    .then(() => {
      const {
        companyBasicInfo,
        companyCertificateList,
        companyEmployeeList: { companyEmployeeList },
        companySupplierList,
      } = form.value;

      const _companyBasicInfo = {
        ...companyBasicInfo,
        categoryConfig: {
          categoryList: companyBasicInfo.categoryConfig.map((item) => ({
            categoryName: item.name,
            childCategoryList: item.children.map((name: string) => ({
              categoryName: name,
            })),
          })),
        },
        region: companyBasicInfo.region.map((item) => item.name).join("-"),
        regionCode: companyBasicInfo.regionCode.join("-"),
      };

      const _companyCertificateList = companyCertificateList.map((item) => ({
        ...item,
        issueDate: item.issueDate?.valueOf(),
        validDate: item.validDate?.valueOf(),
      }));

      const _companyEmployeeList = companyEmployeeList;

      const _companySupplierList = companySupplierList.map((item) => {
        const categoryList = item.categoryConfig.reduce<
          {
            categoryName: string;
            childCategoryList: { categoryName: string }[];
          }[]
        >((t, v) => {
          const [categoryName, childCategoryName] = v;
          const lastCategory = t.at(-1);
          if (!lastCategory) {
            return [
              {
                categoryName: categoryName,
                childCategoryList: [
                  {
                    categoryName: childCategoryName,
                  },
                ],
              },
            ];
          }
          if (lastCategory.categoryName == categoryName) {
            lastCategory.childCategoryList.push({
              categoryName: childCategoryName,
            });
          } else {
            t.push({
              categoryName: categoryName,
              childCategoryList: [
                {
                  categoryName: childCategoryName,
                },
              ],
            });
          }
          return t;
        }, []);

        return {
          ...item,
          categoryConfig: {
            categoryList,
          },
        };
      });

      const formData = new FormData();
      formData.append("companyBasicInfo", JSON.stringify(_companyBasicInfo));
      formData.append(
        "companyCertificateList",
        JSON.stringify(_companyCertificateList)
      );
      formData.append(
        "companyEmployeeList",
        JSON.stringify(_companyEmployeeList)
      );
      formData.append(
        "companySupplierList",
        JSON.stringify(_companySupplierList)
      );

      saveCompanyInfo(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(() => {
        setTimeout(() => {
          // 重新载入
          location.reload();
        }, 10000);
      });
    })
    .catch((error: any) => {
      console.log("error", error);
    });
}
</script>

<style lang="less">
.page {
  // padding: 50px 0;
  &-main {
    & + & {
      margin-top: 16px;
    }
  }
}
.page-footer {
  padding: 30px;
  text-align: center;
  .ant-btn {
    min-width: 120px;
  }
}
</style>

<style lang="less" scoped>
.page {
  padding: 0 0 50px;
  &-main {
    & + & {
      margin-top: 16px;
    }
  }
}
.step-box {
  position: relative;
  padding-top: 50px;
  height: var(--header-height);
  box-sizing: content-box;
  display: flex;
  align-items: center;
}
.fix-step {
  padding-top: calc(50px + var(--header-height));
  .step-box {
    position: fixed;
    z-index: 77;
    top: 0;
    padding-top: 0;
    left: 0;
    width: 100%;
    background: #ffffff;
    transition: padding-top 0.3s;
    transform: translateY(0);
  }
}
</style>
