export interface IResultGetItem {
  Attachments?: boolean;  
  AuthorId?: number;      
  Author?: {
    Id?: number;
    Name?: string;        /* "i:0#.w|sibur\username" */
    EMail?: string;
  };
  ContentType?: object;   
  ContentTypeId?: string; /* "0x0100EC37BC75ABC4D543899A88C9CAFED7E0" */
  Created?: string;       /* "2018-04-18T05:55:11Z" */
  EditorId?: number;      
  Editor?: {
    Id?: number;
    Name?: string;        /* "i:0#.w|sibur\username" */
    EMail?: string;
  };
  FieldValuesAsHtml?: object;    
  FieldValuesAsText?: object;    
  FieldValuesForEdit?: object;    
  File?: object;    
  FileSystemObjectType?: number;    
  FirstUniqueAncestorSecurableObject?: object;    
  Folder?: object;    
  GUID?: string;          /* "d9ea09a8-96c0-4dc0-a8b9-873bb4631e6a" */    
  ID?: number;
  Id?: number;
  Modified?: string;      /* "2018-12-28T10:22:09Z" */
  ParentList?: object;
  RoleAssignments?: object;
  Title?: string;
}

export interface ICurrentUser {
  AccountName: string,
  DisplayName: string,
  Email: string,
  PictureUrl: string,
  Title: string,
  UserProfileProperties: {
    results: any[]
  },
}

export interface IWPQ2FormCtx {
  ListData: {
    Production: string,
    Plant: string,
    EnjinerASTP: string,
    Repiarman: string,
    Electrician: string,
    ChiefPlaceCRP: string,
    HeadLaboratory: string,
    ProductionManager: string,
    Conclusion: string,
    TipeInstrument: string,
    TechnicalPosition: string,
    Place: string,
    Product: string,
    SerialNumber: string,
    Scale: string,
    VoltagPawer: string,
    Input: string,
    SuffixCode: string,
    JoiningTechnicalPlace: string,
    Resalt: string,
    Discovered: string,
    Necessery: string,
    Recommendation: string,
    Familiarized: string,
    Title: string,
    Created: string,
    Author: string,
    Modified: string,
    Editor: string
  },
  ItemAttributes: {
    Id: number
  }
}

export interface IPersonInfo {
  email: string,
  fullName: string,
  title: string,
}

export interface ICurrentItem {
  Id: number,
  URI: string,
  Production: string,
  Plant: string,
  VoltagPawer: string,
  Resalt: string,
  Input: string,
  Conclusion: string,
  Discovered: string,
  Place: string,
  Necessery: string,
  JoiningTechnicalPlace: string,
  Product: string,
  Recommendation: string,
  SerialNumber: string,
  SuffixCode: string,
  TechnicalPosition: string,
  TipeInstrument: string,
  Scale: string,
  Author: {
    email: string,
    fullName: string,
  },
  EnjinerASTP: IPersonInfo,
  ChiefPlaceCRP: IPersonInfo,
  Electrician: IPersonInfo,
  Repiarman: IPersonInfo,
  HeadLaboratory: IPersonInfo,
  ProductionManager: IPersonInfo,
  Familiarized: IPersonInfo,
}

export interface IspPageContextInfo {
  webServerRelativeUrl: string,
  webAbsoluteUrl: string,
  siteAbsoluteUrl: string,
  serverRequestPath: string,
  layoutsUrl: string,
  webTitle: string,
  webTemplate: string,
  tenantAppVersion: string,
  isAppWeb: boolean,
  Has2019Era: boolean,
  webLogoUrl: string,
  webLanguage: number,
  currentLanguage: number,
  currentUICultureName: string,
  currentCultureName: string,
  clientServerTimeDelta: number,
  siteClientTag: string,
  crossDomainPhotosEnabled: boolean,
  webUIVersion: number,
  webPermMasks: {
    High: number,
    Low: number
  },
  pageListId: string,
  pagePersonalizationScope: number,
  userId: number,
  systemUserKey: string,
  alertsEnabled: boolean,
  siteServerRelativeUrl: string,
  allowSilverlightPrompt: string,
  themedCssFolderUrl: string
}

export interface IResultGetItemAct extends IItemAct {
  Id: number,
  ID: number,
  Modified: string,
  Created: string,
  AuthorId: number,
  EditorId: number,
}

export interface IItemAct {
  Title?: string,
  ActID?: number,
  ActVersion?: string,
  EnjinerASTP_Date?: string,
  EnjinerASTP_Status?: 'Согласован' | 'Отклонен',
  EnjinerASTP_Name?: string,
  EnjinerASTP_Title?: string,
  EnjinerASTP_Email?: string,
  EnjinerASTP_Reject?: string,
  Repiarman_Date?: string,
  Repiarman_Status?: 'Согласован' | 'Отклонен',
  Repiarman_Name?: string,
  Repiarman_Title?: string,
  Repiarman_Email?: string,
  Repiarman_Reject?: string,
  Electrician_Date?: string,
  Electrician_Status?: 'Согласован' | 'Отклонен',
  Electrician_Name?: string,
  Electrician_Title?: string,
  Electrician_Email?: string,
  Electrician_Reject?: string,
  ChiefPlaceCRP_Date?: string,
  ChiefPlaceCRP_Status?: 'Согласован' | 'Отклонен',
  ChiefPlaceCRP_Name?: string,
  ChiefPlaceCRP_Title?: string,
  ChiefPlaceCRP_Email?: string,
  ChiefPlaceCRP_Reject?: string,
  HeadLaboratory_Date?: string,
  HeadLaboratory_Status?: 'Согласован' | 'Отклонен',
  HeadLaboratory_Name?: string,
  HeadLaboratory_Title?: string,
  HeadLaboratory_Email?: string,
  HeadLaboratory_Reject?: string,
  ProductionManager_Date?: string,
  ProductionManager_Status?: 'Утвержден' | 'Отклонен',
  ProductionManager_Name?: string,
  ProductionManager_Title?: string,
  ProductionManager_Email?: string,
  ProductionManager_Reject?: string,
  Familiarized_Date?: string,
  Familiarized_Status?: 'Ознакомлен',
  Familiarized_Name?: string,
  Familiarized_Title?: string,
  Familiarized_Email?: string,
}

export type ConsetType = 'EnjinerASTP' | 'ChiefPlaceCRP' | 'Electrician' | 'Repiarman' | 'HeadLaboratory';
export type ApproveType = 'ProductionManager';
export type FamiliarizeType = 'Familiarized';