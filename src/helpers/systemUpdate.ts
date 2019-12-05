import { Item, ListItemFormUpdateValue, PermissionKind } from '@pnp/sp';
import { format } from 'date-fns';

export const dateToFormString = (dateTime: Date | number): string => {
  return format(dateTime, 'dd.MM.yyyy H:mm'); // В зависимости от локализации формат разный
  // return formatISO(dateTime);
};

export const loginToFormString = (userName: string): string => {
  return JSON.stringify([{ Key: userName }]);
};

export const systemUpdate = async (item: Item, formUpdateValues: ListItemFormUpdateValue[]) => {

  const permissions = await item.getCurrentUserEffectivePermissions();
  if (!item.hasPermissions(permissions, PermissionKind.ManagePermissions)) {
    throw new Error('403 - Access denied. Full Control permissions level is required for performing this operation.');
    // При наличии прав на редактирование, но отсутствие прав управления, значение Editor и Modified будут проигнорированы API
    // и обновлены на актуальные, поэтому явно проверяет наличие прав на управление
  }

  const { Editor: { Name }, Modified } = await item.select('Modified,Editor/Name').expand('Editor').get();

  const sysUpdateData = [
    { FieldName: 'Editor', FieldValue: loginToFormString(Name) },
    { FieldName: 'Modified', FieldValue: dateToFormString(new Date(Modified)) }
  ];

  const result = await item.validateUpdateListItem(formUpdateValues.concat(sysUpdateData), true);

  // @ts-ignore
  const errors = result.ValidateUpdateListItem.results.filter(field => field.ErrorMessage !== null);
  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors));
  }

  return result;
};