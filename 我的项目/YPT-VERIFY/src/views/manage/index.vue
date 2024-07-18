<template>
  <div v-bind="$attrs" class="page-main">
    <a-card>
      <form-render
        :forms="forms"
        :form-state="formState"
        :custom-name="(prop:string) => ['companyBasicInfo', prop]"
      >
        <!-- 产品类别 -->
        <template #categoryConfig>
          <select-product
            v-model="formState['categoryConfig']"
            :options="options"
          />
        </template>
        <!-- 企业的产品情况 -->
        <template #label-productCondition>
          <div class="label-container">
            <div class="label">请勾选适用于本企业的情况</div>
            <div class="label-position">
              <div style="margin-bottom: 22px">（可多选）</div>
              <div class="label-tip">
                  <svg-icon width="14px" height="14px" name="问号" />
                  <span>点击查看“帮助说明”</span>
                </div>
              <!-- <a-popover>
                <template #content>
                  <div style="width: 300px">
                    <p>
                      该字段决定【主任责任部分】模块是否显示,主要判断该企业是否是75、76号令范围企业。
                    </p>
                    <p>选择任意一个：显示【主体责任部分】模块，需进行填写。</p>
                    <p>如未选择：【主体责任部分】模块，不显示。</p>
                  </div>
                </template>
              </a-popover> -->
            </div>
          </div>
        </template>
        <template #productCondition="{ item: { options } }">
          <a-checkbox-group
            v-model:value="formState['productCondition']"
            name="productCondition"
            class="content"
          >
            <a-flex
              v-for="item of options"
              :key="item.value"
              align="center"
              gap="3"
              style="margin-bottom: 16px"
            >
              <a-checkbox :value="item.value" style="line-height: inherit"
                >{{ item.label }}
              </a-checkbox>
              <svg-icon
                v-if="item.tip"
                width="16px"
                height="16px"
                name="问号"
                style="flex-shrink: 0"
                @click="showModal(item)"
              />
            </a-flex>
          </a-checkbox-group>
        </template>
      </form-render>
      <a-modal v-model:open="open" footer="" width="70%">
        <template #title>
          <h4 style="padding-right: 10px">{{ `"${tipData.label}" 说明` }}</h4>
        </template>
        <div class="popover" v-html="tipData.tip" @click="downloadDdf"></div>
      </a-modal>
    </a-card>
  </div>
</template>

<script name="Manage" lang="ts" setup>
import mockOptions from "@/mock/产品质量监督抽查产品分类与代码表.json";
import pdf from "@/assets/pdf/市场监管总局质量监督司关于印发《市场监管总局令第75、76号适用产品目录（2023年版）》的通知.pdf";
import mockRegion from "@/mock/region.json";
import { explains } from "@/mock/index";
import type { CascaderProps } from "ant-design-vue";
import type { ShowSearchType } from "ant-design-vue/es/cascader";

const props = defineProps<{
  formState: {
    [key in (typeof forms)[number]["value"]]: any;
  };
}>();

const emits = defineEmits(["casualty-value"]);

const region: {
  options: CascaderProps["options"];
  showSearch: ShowSearchType;
  change: CascaderProps["onChange"];
} = {
  options: mockRegion as [],
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
  change(_value, selectedOptions) {
    emits("casualty-value", "region", selectedOptions);
  },
};

const forms = [
  {
    type: "input",
    label: "企业名称",
    value: "companyName",
    rules: { required: true, message: "请输入企业名称" },
  },
  {
    type: "input",
    label: "企业信用代码",
    value: "creditCode",
    maxlength: 18,
    showCount: true,
    rules: { required: true, message: "请输入企业信用代码" },
  },
  {
    type: "cascader",
    label: "所属地区",
    value: "regionCode",
    options: region.options,
    showSearch: region.showSearch,
    fieldNames: {
      label: "name",
      value: "code",
      children: "children",
    },
    change: region.change,
    rules: { required: true, message: "请选择所属地区" },
  },
  {
    type: "radioGroup",
    label: "经营类型",
    value: "managementType",
    rules: { required: true, message: "请选择经营类型" },
    options: [
      { label: "实际生产", value: 1 },
      { label: "实际销售", value: 2 },
      { label: "生产及销售", value: 3 },
    ],
  },
  {
    type: "inputNumber",
    label: "年营业额",
    value: "turnover",
    min: 0,
    after: "万元",
    placeholder: "请输入”上一年度“的营业额",
    rules: { required: true, message: "请输入年营业额" },
    formatter:(value: number) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    parser:(value: number) => `${value}`.replace(/\$\s?|(,*)/g, ''),
    precision:2,
  },
  {
    type: "inputNumber",
    label: "从业人员",
    value: "employeeCount",
    min: 0,
    after: "人",
    placeholder: "请输入本企业目前的总人数",
    formatter:null,
    parser:null,
    precision:0
  },

  {
    label: "产品类别",
    value: "categoryConfig",
    span: 24,
    rules: { required: true, message: "请选择产品类别" },
  },
  {
    value: "productCondition",
    rules: { required: true, message: "请选择企业产品情况" },
    span: 24,
    options: [
      {
        label: "实施/销售工业产品生产许可的产品",
        value: 1,
        tip: /*html*/ `
        <div>
          <p>
          请根据附件中的《市场监管总局令第75、76号适用产品目录（2023年版）的通知.pdf》查看本企业是否符合“一、工业产品生产许可证管理目录”。
          </p>
          <p>
            如果您的企业生产/销售的产品在该目录中有明确的规定，并且已经获得了相应的工业产品生产许可证，请勾选该选项。
          </p>
          <p>
            如果您的企业生产/销售的产品不在该目录中，或者尚未获得相应的工业产品生产许可证，请不要勾选该选项。
          </p>
          <p>
            如果您需要进一步了解工业产品生产许可证的相关信息，请联系市场监管部门或相关权威机构。
          </p>
        </div>
        <div style="margin-top: 40px;">
          <p>
            附件:<span style="color:#108DE9;cursor: pointer;">市场监管总局质量监督司关于印发《市场监管总局令第75、76号适用产品目录(2023年版)》的通知.pdf</span>
          </p>
          <p>
            《工业产品销售单位落实质量安全主体责任监督管理规定》：<span style="color:#108DE9;cursor: pointer;">国家市场监督管理总局第75号令（https://www.gov.cn/gongbao/2023/issue_10566/202307/content_6890787.html）</span>
          </p>
          <p>
            《工业产品生产单位落实质量安全主体责任监督管理规定》：<span style="color:#108DE9;cursor: pointer;">国家市场监督管理总局第76号令（https://www.gov.cn/gongbao/2023/issue_10566/202307/content_6890786.html）</span>
          </p>
        </div>
      `,
      },
      {
        label: "实施/销售强制性产品认证管理的产品",
        value: 2,
        tip: /*html*/ `
        <div>
          <p>
            请根据附件中的《市场监管总局令第75、76号适用产品目录（2023年版）的通知.pdf》查看本企业是否符合“二、强制性产品认证目录”。
          </p>
          <p>
            如果您的企业生产/销售的产品在该目录中有明确的规定，并且已经获得了相应的强制性产品认证（3C认证），请勾选该选项。
          </p>
          <p>
            如果您的企业生产/销售的产品不在该目录中，或者尚未获得相应的强制性产品认证（3C认证），请不要勾选该选项。
          </p>
          <p>
            如果您需要进一步了解强制性产品认证（3C认证）的相关信息，请联系市场监管部门或相关权威机构。
          </p>
        </div>
        <div style="margin-top: 40px;">
          <p>
            附件:<span style="color:#108DE9;cursor: pointer;">市场监管总局质量监督司关于印发《市场监管总局令第75、76号适用产品目录（2023年版）》的通知.pdf</span>
          </p>
          <p>
            《工业产品销售单位落实质量安全主体责任监督管理规定》：<span style="color:#108DE9;cursor: pointer;">国家市场监督管理总局第75号令（https://www.gov.cn/gongbao/2023/issue_10566/202307/content_6890787.html）</span>
          </p>
          <p>
            《工业产品生产单位落实质量安全主体责任监督管理规定》：<span style="color:#108DE9;cursor: pointer;">国家市场监督管理总局第76号令（https://www.gov.cn/gongbao/2023/issue_10566/202307/content_6890786.html）</span>
          </p>
        </div>
      `,
      },
      {
        label:
          "涉及人身健康和生命财产安全并有强制性国家标准要求的产品（只适用于大中型生产/销售单位）",
        value: 3,
        tip: /*html*/ `
        <div>
          <p>
            请根据附件中的《市场监管总局令第75、76号适用产品目录（2023年版）的通知.pdf》查看本企业是否符合“三、涉及人身健康和生命财产安全且实施强制性国家标准产品目录”。
          </p>
          <p>
            如果您的企业生产/销售的产品在该目录中有明确的规定，并且已经获得了相应的认证，请勾选该选项。
          </p>
          <p>
            如果您的企业生产/销售的产品不在该目录中，或者尚未获得相应的认证，请不要勾选该选项。
          </p>
          <p>
            如果您需要进一步了解该认证的相关信息，请联系市场监管部门或相关权威机构。
          </p>
        </div>
        <div style="margin-top: 20px; border-bottom: 1px solid #ccc;">
          <p>
            附件:<span style="color:#108DE9;cursor: pointer;">市场监管总局质量监督司关于印发《市场监管总局令第75、76号适用产品目录（2023年版）》的通知.pdf</span>
          </p>
          <p>
            《工业产品销售单位落实质量安全主体责任监督管理规定》：<span style="color:#108DE9;cursor: pointer;">国家市场监督管理总局第75号令（https://www.gov.cn/gongbao/2023/issue_10566/202307/content_6890787.html）</span>
          </p>
          <p>
            《工业产品生产单位落实质量安全主体责任监督管理规定》：<span style="color:#108DE9;cursor: pointer;">国家市场监督管理总局第76号令（https://www.gov.cn/gongbao/2023/issue_10566/202307/content_6890786.html）</span>
          </p>
        </div>
        <div style="margin-top: 20px;">
          <h4 style="font-weight: 700;">
            工业产品中销售单位的划分标准：
          </h4>
          <p>
            工业产品大型销售单位是指：从业人员二百人以上或者营业收入四亿元以上的批发单位，以及从业人员三百人以上或者营业收入二亿元以上的零售单位；
          </p>
          <p>
            工业产品中型销售单位是指：从业人员二十人以上二百人以下或者营业收入五千万元以上四亿元以下的批发单位，以及从业人员五十人以上三百人以下或者营业收入五百万元以上二亿元以下的零售单位。
          </p>
          <h4 style="font-weight: 700;">
            工业产品中生产单位的划分标准：
          </h4>
          <p>
            工业产品大型生产单位是指：从业人员一千人以上或者营业收入四亿元以上的单位；
          </p>
          <p>
            工业产品中型生产单位是指：从业人员三百人以上一千人以下或者营业收入二千万元以上四亿元以下的单位。
          </p>
        </div>
      `,
      },
      { label: "以上三种情况均不符合", value: 4 },
    ],
  },
];

type mockOptionItemType = {
  name: string;
  id: string;
  children: { name: string; id: string; parentId: string }[];
};

type OptionItemType = {
  name: string;
  explain?: string;
  icon: string;
  value: string;
  children: { name: string; parentId: string; value: string }[];
};

type FormItem = {
  type?: string;
  label?: string;
  value?: string;
  rules?: {
    required: boolean;
    message: string;
  };
  options?: { label: string; value: number | string }[];
  span?: number;
  after?: string;
  placeholder?: string;
  tip?: string;
};

const options: OptionItemType[] = mockOptions.map(
  (item: mockOptionItemType) => ({
    name: item.name,
    icon: item.name,
    explain: explains[item.name],
    value: item.id,
    children: item.children.map((child) => ({
      name: child.name,
      parentId: child.parentId,
      value: child.id,
    })),
  })
);

const open = ref<Boolean>(false);

const tipData = ref<FormItem>({
  tip: "",
  label: "",
});

const showModal = (item: FormItem) => {
  open.value = true;
  console.log(item);
  tipData.value = item;
};
const downloadDdf = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.nodeName === "SPAN") {
    const content = target.innerHTML;
    const httpsLinkRegex = /(?<=（)[^（）]+(?=）)/g;
    const match = content.match(httpsLinkRegex);
    console.log(match);
    if (match && match[0].includes("https://")) {
      window.open(match[0], "_blank");
    } else {
      const filename =
        "市场监管总局质量监督司关于印发《市场监管总局令第75、76号适用产品目录（2023年版）》的通知";
      // 创建 a 标签
      const a = document.createElement("a");
      a.href = pdf;
      a.download = filename;
      a.click();
    }
  }
};
</script>

<style lang="less" scoped>
.label {
  &-container {
    position: relative;
    text-align: center;
  }
  &-tip {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #9c9c9c;
    line-height: 17px;
    cursor: pointer;
  }
}
.content {
  width: 100%;
  display: block;
  line-height: 32px;
  white-space: normal;
}
.popover {
  border-top: 1px solid #ccc;
  padding: 10px;
}
</style>
