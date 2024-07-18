import type {
  CascaderProps,
  RadioGroupProps,
  CheckboxGroupProps,
  InputProps,
  InputNumberProps,
} from "ant-design-vue";

import type {
  ShowSearchType,
  FilledFieldNamesType,
} from "ant-design-vue/es/cascader";

export type FormItemType = {
  value: string;
  label?: string;
  type?: string;
  placeholder?: string;
  contorlStyle?: any;
  after?: string;
  options?:
    | RadioGroupProps["options"]
    | CheckboxGroupProps["options"]
    | CascaderProps["options"]
    | any[];
  rules?: any;
  span?: number;
  flex?: any;
  fieldNames: FilledFieldNamesType;
  showSearch: ShowSearchType;
  change: CascaderProps["onChange"];
  multiple?: CascaderProps["multiple"];
  maxlength?: InputProps["maxlength"];
  showCount?: InputProps["showCount"];
  min?: InputNumberProps["min"];
  showCheckedStrategy: CascaderProps["showCheckedStrategy"];
  formatter: InputNumberProps["formatter"];
  parser: InputNumberProps["parser"];
  precision: InputNumberProps["precision"];
};

export type FormTypes = FormItemType[];

export type FormStateType = {
  [key in FormTypes[number]["value"]]: any;
};

export default {};
