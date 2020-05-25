/*
<script src="https://sharepoint/orgunits/vsk/FCT/SiteAssets/ACT/build.js"></script>
*/
// import '@pnp/polyfill-ie11';
// import 'regenerator-runtime/runtime';

import { config } from './config';
import { DOMContentLoaded, getCurrentUser, spSetup, getItemsById, itemCurrentState, getStatusHTML, addOpenReportButton } from './helpers';
import { IResultGetItemAct, IWPQ2FormCtx, ICurrentItem, ConsetType, ApproveType, FamiliarizeType } from './interfaces';
import { rejectItem, showWarningModal, consetItem, approveItem, familiarizeItem } from './modalDialogs';

declare function GetUrlKeyValue(key: string): string;
declare const WPQ2FormCtx: IWPQ2FormCtx;

(async () => {
  try {
    spSetup(config.BASE_URL);
    const currentItemId = +GetUrlKeyValue("ID");
    const context = await Promise.all([
      getCurrentUser(),
      getItemsById(currentItemId, config.listURN.ACT_APPROVE_LOG) as Promise<IResultGetItemAct[]>,
      getItemsById(currentItemId, config.listURN.ACT_APPROVE_STATUS) as Promise<IResultGetItemAct[]>,
      DOMContentLoaded()
    ]);
    const currentUser = context[0];
    const logState = itemCurrentState(context[1]);
    const statusState = itemCurrentState(context[2]);
    const currentItem: ICurrentItem = {
      Id: currentItemId,
      URI: `${window.location.href.split('?')[0]}?ID=${currentItemId}`,
      Production: WPQ2FormCtx.ListData.Production.split(';#')[1],
      Plant: WPQ2FormCtx.ListData.Plant.split(';#')[1],
      VoltagPawer: WPQ2FormCtx.ListData.VoltagPawer,
      Resalt: WPQ2FormCtx.ListData.Resalt,
      Input: WPQ2FormCtx.ListData.Input,
      Conclusion: WPQ2FormCtx.ListData.Conclusion,
      Discovered: WPQ2FormCtx.ListData.Discovered,
      Place: WPQ2FormCtx.ListData.Place,
      Necessery: WPQ2FormCtx.ListData.Necessery,
      JoiningTechnicalPlace: WPQ2FormCtx.ListData.JoiningTechnicalPlace,
      Product: WPQ2FormCtx.ListData.Product,
      Recommendation: WPQ2FormCtx.ListData.Recommendation,
      SerialNumber: WPQ2FormCtx.ListData.SerialNumber,
      SuffixCode: WPQ2FormCtx.ListData.SuffixCode,
      TechnicalPosition: WPQ2FormCtx.ListData.TechnicalPosition,
      TipeInstrument: WPQ2FormCtx.ListData.TipeInstrument,
      Scale: WPQ2FormCtx.ListData.Scale,
      Author: {
        email: WPQ2FormCtx.ListData.Author.split(',#')[3],
        fullName: WPQ2FormCtx.ListData.Author.split(',#')[4],
      },
      EnjinerASTP: {
        email: WPQ2FormCtx.ListData.EnjinerASTP.split(',#')[3],
        fullName: WPQ2FormCtx.ListData.EnjinerASTP.split(',#')[4],
        title: WPQ2FormCtx.ListData.EnjinerASTP.split(',#')[7],
      },
      ChiefPlaceCRP: {
        email: WPQ2FormCtx.ListData.ChiefPlaceCRP.split(',#')[3],
        fullName: WPQ2FormCtx.ListData.ChiefPlaceCRP.split(',#')[4],
        title: WPQ2FormCtx.ListData.ChiefPlaceCRP.split(',#')[7],
      },
      Electrician: {
        email: WPQ2FormCtx.ListData.Electrician.split(',#')[3],
        fullName: WPQ2FormCtx.ListData.Electrician.split(',#')[4],
        title: WPQ2FormCtx.ListData.Electrician.split(',#')[7],
      },
      Repiarman: {
        email: WPQ2FormCtx.ListData.Repiarman.split(',#')[3],
        fullName: WPQ2FormCtx.ListData.Repiarman.split(',#')[4],
        title: WPQ2FormCtx.ListData.Repiarman.split(',#')[7],
      },
      HeadLaboratory: {
        email: WPQ2FormCtx.ListData.HeadLaboratory.split(',#')[3],
        fullName: WPQ2FormCtx.ListData.HeadLaboratory.split(',#')[4],
        title: WPQ2FormCtx.ListData.HeadLaboratory.split(',#')[7],
      },
      ProductionManager: {
        email: WPQ2FormCtx.ListData.ProductionManager.split(',#')[3],
        fullName: WPQ2FormCtx.ListData.ProductionManager.split(',#')[4],
        title: WPQ2FormCtx.ListData.ProductionManager.split(',#')[7],
      },
      Familiarized: {
        email: WPQ2FormCtx.ListData.Familiarized.split(',#')[3],
        fullName: WPQ2FormCtx.ListData.Familiarized.split(',#')[4],
        title: WPQ2FormCtx.ListData.Familiarized.split(',#')[7],
      },
    };
    // Согласующие лица
    const consetPersons: ConsetType[] = ['EnjinerASTP', 'ChiefPlaceCRP', 'Electrician', 'Repiarman', 'HeadLaboratory'];
    // Утверждающе лицо
    const approvePersons: ApproveType[] = ['ProductionManager'];
    // Ознакамливающееся лицо
    const familiarizePersons: FamiliarizeType[] = ['Familiarized'];

    // Добавление в DOM элемента для статусов
    (<HTMLElement> document.getElementById('MSOZoneCell_WebPartWPQ2')).insertAdjacentHTML('afterbegin', '<div><table><tbody id="status-body"></tbody></table></div>');
    const statusBody = <HTMLTableElement> document.getElementById('status-body');
    
    // Добавление в DOM кнопки открытия отчета в репортинге
    addOpenReportButton(currentItemId);

    consetPersons.forEach(person => {

      // Добавление строки статуса
      statusBody.insertAdjacentHTML('beforeend', getStatusHTML('Согласующий', logState, person, currentItem));

      // Показываем кнопки только если, текущий пользователь является согласующим лицом
      if (currentUser.Email === currentItem[person].email) {
        const consetHTML = `
        <div style="margin-bottom: 4px;">
          <button id="${person}_approve_btn" >Согласовать</button>
          <button id="${person}_reject_btn" >Отклонить</button>
        </div>`;
        (<HTMLElement> document.getElementById('MSOZoneCell_WebPartWPQ2')).insertAdjacentHTML('beforeend', consetHTML);
        const approveBtn = <HTMLButtonElement> document.getElementById(`${person}_approve_btn`);  
        // @ts-ignore
        if (logState && logState[person + '_Status'] === 'Согласован') {
          approveBtn.disabled = true;
        }
        approveBtn.addEventListener('click', (event) => {
          event.preventDefault();
          if (logState && statusState) {
            consetItem(<HTMLButtonElement>event.target, person, currentUser, logState.Id, statusState.Id, consetPersons, approvePersons, currentItem);
          } else {
            showWarningModal();
          }
        });
        const rejectBtn = <HTMLButtonElement> document.getElementById(`${person}_reject_btn`);
        // @ts-ignore
        if (logState && logState[person + '_Status'] === 'Отклонен') {
          rejectBtn.disabled = true;
        }
        rejectBtn.addEventListener('click', (event) => {
          event.preventDefault();
          if (logState && statusState) {
            rejectItem(<HTMLButtonElement>event.target, person, currentUser, logState.Id, statusState.Id, currentItem);
          } else {
            showWarningModal();
          }
        });
      }
    });

    approvePersons.forEach(person => {

      // Добавление строки статуса
      statusBody.insertAdjacentHTML('afterbegin', getStatusHTML('Утверждающий', logState, person, currentItem));

      // Показываем кнопки только если, текущий пользователь является утверждающим лицом
      if (currentUser.Email === currentItem[person].email) {
        const approveHTML = `
        <div style="margin-bottom: 4px;">
          <button id="${person}_approve_btn" >Утвердить</button>
          <button id="${person}_reject_btn" >Отклонить</button>
        </div>`;
        (<HTMLElement> document.getElementById('MSOZoneCell_WebPartWPQ2')).insertAdjacentHTML('beforeend', approveHTML);
        const approveBtn = <HTMLButtonElement> document.getElementById(`${person}_approve_btn`);
        // @ts-ignore
        if (logState && logState[person + '_Status'] === 'Утвержден') {
          approveBtn.disabled = true;
        }
        approveBtn.addEventListener('click', (event) => {
          event.preventDefault();
          if (logState && statusState) {
            approveItem(<HTMLButtonElement>event.target, person, currentUser, logState.Id, statusState.Id, currentItem);
          } else {
            showWarningModal();
          }
        });
        const rejectBtn = <HTMLButtonElement>document.getElementById(`${person}_reject_btn`);
        // @ts-ignore
        if (logState && logState[person + '_Status'] === 'Отклонен') {
          rejectBtn.disabled = true;
        }
        rejectBtn.addEventListener('click', (event) => {
          event.preventDefault();
          if (logState && statusState) {
            rejectItem(<HTMLButtonElement>event.target, person, currentUser, logState.Id, statusState.Id, currentItem);
          } else {
            showWarningModal();
          }
        });
      }
    });

    familiarizePersons.forEach(person => {

      // Добавление строки статуса
      statusBody.insertAdjacentHTML('beforeend', getStatusHTML('Ознакамливающийся', logState, person, currentItem));

      // Показываем кнопки только если, текущий пользователь является ознакамливающимся лицом
      if (currentUser.Email === currentItem[person].email) {
        const familiarizeHTML = `
        <div style="margin-bottom: 4px;">
          <button id="${person}_familiarize_btn" >Ознакомиться</button>
        </div>`;
        (<HTMLElement> document.getElementById('MSOZoneCell_WebPartWPQ2')).insertAdjacentHTML('beforeend', familiarizeHTML);
        const familiarizeBtn = <HTMLButtonElement> document.getElementById(`${person}_familiarize_btn`);
        // @ts-ignore
        if (logState && logState[person + '_Status'] === 'Ознакомлен') {
          familiarizeBtn.disabled = true;
        }
        familiarizeBtn.addEventListener('click', (event) => {
          event.preventDefault();
          if (logState && statusState) {
            familiarizeItem(<HTMLButtonElement>event.target, person, currentUser, logState.Id, statusState.Id);
          } else {
            showWarningModal();
          }
        });
      }
    });

  } catch (err) {
    console.error(err);
  }
})()