// import { sp } from '@pnp/sp/presets/all';
import { sp } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/profiles';
import '@pnp/sp/sputilities';
import { IEmailProperties } from "@pnp/sp/sputilities";

import { ICurrentUser, IResultGetItemAct, IItemAct, ConsetType, ICurrentItem, ApproveType, FamiliarizeType } from './interfaces';

export const spSetup = (baseUrl: string): void => {
  sp.setup({
    sp: {
      headers: { 'Accept': 'application/json;odata=verbose' },
      baseUrl: baseUrl
    }
  });
}

export const sleep = (ms: number) => new Promise((resolve) => {
  setTimeout(() => {
    resolve() 
  }, ms) 
})

export const DOMContentLoaded = () => new Promise((resolve) => document.addEventListener('DOMContentLoaded', resolve))

export const getCurrentUser = () => new Promise<ICurrentUser>((resolve) => {
  sp.profiles.myProperties.get<ICurrentUser>().then(function (data) {
    resolve(data)
  })
})

export const getItemsById = (id: number, listUrn: string) => new Promise((resolve) => {
  sp.web.getList(listUrn).items.filter(`ActID eq '${id}'`).get<IResultGetItemAct[]>().then(function (data) {
    resolve(data)
  })
})

export const itemCurrentState = (items: IResultGetItemAct[]) => {
  if (items.length > 0) {
    return items.reduce((prev, current) => (prev.Id > current.Id) ? prev : current)
  }
  return null;
}

export const updateItemsById = async (logId: number, statusId: number, data: IItemAct) => {
  try {
    await Promise.all([
      sp.web.getList('/orgunits/vsk/FCT/Lists/ACT_APPROVE_LOG').items.getById(logId).update(data),
      sp.web.getList('/orgunits/vsk/FCT/Lists/ACT_APPROVE_STATUS').items.getById(statusId).update(data)
    ]);
  } catch (error) {
    console.error(error);
  }
}

export const isAllPersonsConset = async (logId: number, consetPersons: ConsetType[]) => {
  try {
    const returnedData = await sp.web.getList('/orgunits/vsk/FCT/Lists/ACT_APPROVE_LOG').items.getById(logId).get<IResultGetItemAct>();
    // @ts-ignore
    return consetPersons.every(person => returnedData[person + '_Status'] === 'Согласован');
  } catch (error) {
    console.error(error);
  }
}

export const notifyApprovePersons = async (approvePersons: ApproveType[], currentItem: ICurrentItem) => {
  try {
    const emails = approvePersons.map(person => currentItem[person].email);
    const emailProps: IEmailProperties = {
      To: [...emails],
      Subject: `Акт отбраковки № ${currentItem.Id}`,
      Body: `<p><span>Добрый день!</span><br>
      <span>Вам поступила задача на утверждение акта отбраковки № ${currentItem.Id}</span><br>
      <span>Для утверждения перейдите по <a href="${currentItem.URI}">ссылке</a></span><br>
      </p>
      <p>
      <span><b>Производство/служба: </b>${currentItem.Production}</span><br>
      <span><b>Установка/отдел: </b>${currentItem.Plant}</span><br>
      <span><b>Наименование прибора: </b>${currentItem.Conclusion}</span><br>
      <span><b>Тип прибора: </b>${currentItem.TipeInstrument}</span><br>
      <span><b>Техническая позиция: </b>${currentItem.TechnicalPosition}</span><br>
      <span><b>Место установки: </b>${currentItem.Place}</span><br>
      <span><b>Продукт: </b>${currentItem.Product}</span><br>
      <span><b>Серийный номер: </b>${currentItem.SerialNumber}</span><br>
      <span><b>Шкала: </b>${currentItem.Scale}</span><br>
      <span><b>U-питания: </b>${currentItem.VoltagPawer}</span><br>
      <span><b>Выходной сигнал: </b>${currentItem.Input}</span><br>
      <span><b>Суффикс код: </b>${currentItem.SuffixCode}</span><br>
      <span><b>Присоединение к тех месту: </b>${currentItem.JoiningTechnicalPlace}</span><br>
      <span><b>В результате: </b>${currentItem.Resalt}</span><br>
      <span><b>Выявлено: </b>${currentItem.Discovered}</span><br>
      <span><b>Необходимо: </b>${currentItem.Necessery}</span><br>
      <span><b>Рекомендации: </b>${currentItem.Recommendation}</span><br>
      </p>
      <p>
      <span>С уважением,</span><br>
      <span>АО "Воронежсинтезкаучук"</span><br>
      </p>`,
      AdditionalHeaders: {
        'content-type': 'text/html'
      }
    };
    await sp.utility.sendEmail(emailProps);
  } catch (error) {
    console.error(error);
  }
}

export const notifyAuthorAboutReject = async (currentItem: ICurrentItem, rejectText: string, rejectPersonTitle: string, rejectPersonName: string) => {
  try {
    const emailProps: IEmailProperties = {
      To: [currentItem.Author.email],
      Subject: `Акт отбраковки № ${currentItem.Id} отклонен`,
      Body: `<p><span>Добрый день!</span><br>
      <span>Акт отбраковки № ${currentItem.Id} был <b>отклонен</b></span><br>
      <span>Для просмотра перейдите по <a href="${currentItem.URI}">ссылке</a></span><br>
      </p>
      <p>
      <span><b>Отклонил: </b>${rejectPersonTitle} ${rejectPersonName}</span><br><br>
      <span><b>Причина: </b>${rejectText}</span><br>
      </p>
      <p>
      <span>С уважением,</span><br>
      <span>АО "Воронежсинтезкаучук"</span><br>
      </p>`,
      AdditionalHeaders: {
        'content-type': 'text/html'
      }
    };
    await sp.utility.sendEmail(emailProps);
  } catch (error) {
    console.error(error);
  }
}

export const notifyAuthorAboutApprove = async (currentItem: ICurrentItem, approvePersonTitle: string, approvePersonName: string) => {
  try {
    const emailProps: IEmailProperties = {
      To: [currentItem.Author.email],
      Subject: `Акт отбраковки № ${currentItem.Id} утвержден`,
      Body: `<p><span>Добрый день!</span><br>
      <span>Акт отбраковки № ${currentItem.Id} был <b>утвержден</b></span><br>
      <span>Для просмотра перейдите по <a href="${currentItem.URI}">ссылке</a></span><br>
      </p>
      <p>
      <span><b>Утвердил: </b>${approvePersonTitle} ${approvePersonName}</span><br><br>
      </p>
      <p>
      <span>С уважением,</span><br>
      <span>АО "Воронежсинтезкаучук"</span><br>
      </p>`,
      AdditionalHeaders: {
        'content-type': 'text/html'
      }
    };
    await sp.utility.sendEmail(emailProps);
  } catch (error) {
    console.error(error);
  }
}

const getStatus = (logState: IResultGetItemAct, person: ConsetType | ApproveType | FamiliarizeType) => {
  const result = {
    text: {
      status: 'Рабочий процесс не начат',
      date: '',
      reject: '',
    },
    style: {
      background: '',
    },
  }
  if (logState) {
    // @ts-ignore
    const status: string = logState[person + '_Status'];
    // @ts-ignore
    let date = logState[person + '_Date'];
    if (date) {
      date = new Date(date);
      const month = date.getMonth() + 1;
      const minutes = date.getMinutes();
      date = `${date.getDate()}.${month < 10 ? '0' + month : month}.${date.getFullYear()} ${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`;
    }
    // @ts-ignore
    const reject: string = logState[person + '_Reject'];
    switch (status) {
      case 'Согласован':
      case 'Утвержден':
        result.style.background = 'Turquoise'
        break;
      case 'Отклонен':
        result.style.background = 'Tomato'
        break;
      case 'Ожидает согласования':
      case 'Ожидает утверждения':
        result.style.background = 'Khaki'
        break;
    }
    result.text.status = status;
    result.text.date = date;
    result.text.reject = reject;
  }
  return result
}

export const getStatusHTML = (personType: string, logState: IResultGetItemAct, person: ConsetType | ApproveType | FamiliarizeType, currentItem: ICurrentItem) => {
  const status = getStatus(logState, person);
  return `
    <tr>
      <td>${personType}: ${currentItem[person].fullName || ''}</td>
      <td>
        <div style="
        text-align: center;
        background: ${status.style.background};
        border-radius: 10px;
        border: 2px solid black;
        padding: 2px;">
          <span style="padding: 0 16px;">${status.text.status}</span>
        </div>
      </td>
      <td>${status.text.date || ''}</td>
      <td>${status.text.reject || ''}</td>
    </tr>`;
}

export const addOpenReportButton = (currentItemId: number) => {
  (<HTMLElement> document.getElementById('MSOZoneCell_WebPartWPQ2')).insertAdjacentHTML('beforeend', '<div style="margin-bottom: 4px;"><button id="open-report-button">Сформировать акт</button></div>');
  const openReportBtn = <HTMLButtonElement> document.getElementById('open-report-button');
  openReportBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.open(`https://sharepoint/orgunits/vsk/FCT/_layouts/15/ReportServer/RSViewerPage.aspx?rv:RelativeReportUrl=/orgunits/vsk/FCT/Reporting/AKT.rdl&rp:ID=${currentItemId}`);
  });
}