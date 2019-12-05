import '@pnp/polyfill-ie11';
import { sp } from '@pnp/sp';
import { IResultGetItem } from "./helpers/interfaces";

sp.setup({
  sp: {
    headers: {
      'Accept': 'application/json; odata=verbose'
    },
    baseUrl: 'https://sharepoint/portalit/voronezh'
  }
});

// @ts-ignore
// const itemID = GetUrlKeyValue("ID");