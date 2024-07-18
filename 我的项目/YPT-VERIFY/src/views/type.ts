export type CompanyBasicInfo = {
  companyName: string;
  creditCode: string;
  managementType: "" | number;
  turnover: string;
  employeeCount: string;
  categoryConfig: any[];
  productCondition: number[];
  systemCondition: number[]; //企业的制度情况(多选逗号分割)
  region: { name: string }[]; //区划名称(多级间用-分割)
  regionCode: number[]; //区划编码(多级间用-分割)
  riskManagementFileId: string; // 风险管控文件Id列表(多个文件用用&隔开)
  [key: string]: any;
};

export type ExtraData = {
  uuid: number | string;
};

export type CompanyCertificate = {
  certificateType: string; //证书类型
  certificateCode: string; //证书编号
  productName: string; //产品名称/产品名称和系列
  issueDate: Date | string; //发证日期
  validDate: Date | string; //有效日期
  principalName: string; //认证委托人名称
  principalAddress: string; //认证委托人地址
  manufacturerName: string; //产品制造商
  manufacturerAddress: string; //制造商地址
  productionCompanyName: string; //生产企业名称
  productionCompanyAddress: string; //生产企业注册地址
  issueOrganization: string; //发证机构
  spec: string; //型号、规格
  standardSkillRequire: string; //产品标准和技术要求
  standardCode: string; //标准号
  certificateRange: string; //认证范围
} & ExtraData;

export type CompanyEmployee = {
  employeeType: string;
  employeeName: string; //员工名称（主要负责人/质量安全总监/质量员）
  identityNumber: string; //身份证号(加密存储)
  contactInfo: string; //联系方式(加密存储)
  workStatus: string; //工作状态 1.全职;0.兼职
  monthScheduleStatus: string; //是否落实月排期 1.已落实;0.未落实
  weekScheduleStatus: string; //是否落实周排期 1.已落实;0.未落实
  dayScheduleStatus: string; //是否落实日排期 1.已落实;0.未落实
  assessmentStatus: string; //是否完成培训并通过考核 1.已完成;0.未完成
} & ExtraData;

export type CompanySupplier = {
  supplierType: string; //供应商类型:PrimaryMaterials(主要原材料);PrimaryPart(主要零配件)
  supplierCreditCode: string; //供应商企业统一信用代码
  companyName: string; //公司名称
  productName: string; //产品名称
  categoryConfig: string[];
} & ExtraData;

export type Form = {
  companyBasicInfo: CompanyBasicInfo;
  companyCertificateList: CompanyCertificate[];
  companyEmployeeList: {
    riskManagementFileId: { attachId: string }[];
    systemCondition: number[];
    companyEmployeeList: CompanyEmployee[];
    systemConditionOptions: {
      label: string;
      value: number;
    }[];
  };
  companySupplierList: CompanySupplier[];
  [key: string]: any;
};

export function getUUID() {
  return Math.floor(Math.random() * Date.now());
}

export default {};
