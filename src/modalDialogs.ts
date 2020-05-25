// @ts-ignore
import showModalDialog from 'sharepointplus/es5/modals/showModalDialog';
// @ts-ignore
import waitModalDialog from 'sharepointplus/es5/modals/waitModalDialog';
// @ts-ignore
import closeModalDialog from 'sharepointplus/es5/modals/closeModalDialog';

import { ICurrentItem, ConsetType, ApproveType, ICurrentUser, FamiliarizeType } from './interfaces';
import { updateItemsById, isAllPersonsConset, notifyApprovePersons, notifyAuthorAboutReject, notifyAuthorAboutApprove } from './helpers';

// Отклонение
export const rejectItem = (targetElement: HTMLButtonElement, person: ConsetType | ApproveType, currentUser: ICurrentUser, logId: number, statusId: number, currentItem: ICurrentItem) => {
  showModalDialog({
    id: 'modal_reject',
    closePrevious: true,
    title: 'Причина отклонения',
    html: `<h2>Описание<span title="Это поле является обязательным." class="ms-accentText"> *</span></h2>
            <p><textarea id="modal_reject_text" rows="10" cols="45" name="text"></textarea></p>
            <p><button id="modal_reject_btn" type="button">Отклонить</button></p>`
  });
  const rejectBtn = <HTMLButtonElement> document.getElementById('modal_reject_btn');
  rejectBtn.addEventListener('click', async (event) => {
    try {
      event.preventDefault();
      const rejectText = (<HTMLTextAreaElement> document.getElementById('modal_reject_text')).value;
      closeModalDialog();
      waitModalDialog("Обработка...");
      await updateItemsById(logId, statusId, {
        [person + '_Date']: new Date(),
        [person + '_Status']: 'Отклонен',
        [person + '_Name']: currentUser.DisplayName,
        [person + '_Title']: currentUser.Title,
        [person + '_Email']: currentUser.Email,
        [person + '_Reject']: rejectText,
      });
      await notifyAuthorAboutReject(currentItem, rejectText, currentUser.Title, currentUser.DisplayName);
      showModalDialog({
        closePrevious: true,
        title: 'Ок',
        html: `<p>Акт отклонен</p>`
      });
      targetElement.disabled = true;
    } catch (error) {
      showModalDialog({
        closePrevious: true,
        title: 'Ошибка!',
        html: `<p>${error.message}</p>`
      });
    }
  })
}

// Согласование
export const consetItem = async (targetElement: HTMLButtonElement, person: ConsetType, currentUser: ICurrentUser, logId: number, statusId: number, consetPersons: ConsetType[], approvePersons: ApproveType[], currentItem: ICurrentItem) => {
  try {
    waitModalDialog("Обработка...");
    await updateItemsById(logId, statusId, {
      [person + '_Date']: new Date(),
      [person + '_Status']: 'Согласован',
      [person + '_Name']: currentUser.DisplayName,
      [person + '_Title']: currentUser.Title,
      [person + '_Email']: currentUser.Email,
      [person + '_Reject']: '',
    });
    // После каждого согласования проводится проверка - все ли лица согласовали, если да - отсылается уведомление для утверждающего
    const isAllConseted = await isAllPersonsConset(logId, consetPersons);
    if (isAllConseted) {
      await notifyApprovePersons(approvePersons, currentItem);
    }
    showModalDialog({
      closePrevious: true,
      title: 'Ок',
      html: `<p>Акт согласован</p>`
    });
    targetElement.disabled = true;
  } catch (error) {
    showModalDialog({
      closePrevious: true,
      title: 'Ошибка!',
      html: `<p>${error.message}</p>`
    });
  }
}

// Утверждение
export const approveItem = async (targetElement: HTMLButtonElement, person: ApproveType, currentUser: ICurrentUser, logId: number, statusId: number, currentItem: ICurrentItem) => {
  try {
    waitModalDialog("Обработка...");
    await updateItemsById(logId, statusId, {
      [person + '_Date']: new Date(),
      [person + '_Status']: 'Утвержден',
      [person + '_Name']: currentUser.DisplayName,
      [person + '_Title']: currentUser.Title,
      [person + '_Email']: currentUser.Email,
      [person + '_Reject']: '',
    });
    await notifyAuthorAboutApprove(currentItem, currentUser.Title, currentUser.DisplayName);
    showModalDialog({
      closePrevious: true,
      title: 'Ок',
      html: `<p>Акт утвержден</p>`
    });
    targetElement.disabled = true;
  } catch (error) {
    showModalDialog({
      closePrevious: true,
      title: 'Ошибка!',
      html: `<p>${error.message}</p>`
    });
  }
}

// Ознакомление
export const familiarizeItem = async (targetElement: HTMLButtonElement, person: FamiliarizeType, currentUser: ICurrentUser, logId: number, statusId: number) => {
  try {
    waitModalDialog("Обработка...");
    await updateItemsById(logId, statusId, {
      [person + '_Date']: new Date(),
      [person + '_Status']: 'Ознакомлен',
      [person + '_Name']: currentUser.DisplayName,
      [person + '_Title']: currentUser.Title,
      [person + '_Email']: currentUser.Email,
    });
    showModalDialog({
      closePrevious: true,
      title: 'Ок',
      html: `<p>Вы ознакомились с актом отбраковки</p>`
    });
    targetElement.disabled = true;
  } catch (error) {
    showModalDialog({
      closePrevious: true,
      title: 'Ошибка!',
      html: `<p>${error.message}</p>`
    });
  }
}

export const showWarningModal = () => {
  showModalDialog({
    closePrevious: true,
    title: 'Рабочий процесс еще не отработал или не был запущен!',
    html: '<p>Для того, чтобы согласовать/утвердить/отклонить акт отбраковки необходимо дождаться завершения (немного подождать и обновить страницу) или запустить рабочий процесс в текущем элементе списка.</p>'
  })
}
