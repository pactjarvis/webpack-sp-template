import { IspPageContextInfo } from './interfaces';

declare const _spPageContextInfo: IspPageContextInfo;

export const config = {
  BASE_URL: _spPageContextInfo.webAbsoluteUrl,
  listURN: {
    ACT: '/orgunits/vsk/FCT/Lists/ACT',
    ACT_APPROVE_LOG: '/orgunits/vsk/FCT/Lists/ACT_APPROVE_LOG',
    ACT_APPROVE_STATUS: '/orgunits/vsk/FCT/Lists/ACT_APPROVE_STATUS',
  }
};