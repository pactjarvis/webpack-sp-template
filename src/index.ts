import "core-js/features/promise";
import 'whatwg-fetch';
import "regenerator-runtime/runtime";

import { utils } from './utils';

let qwe: number | null | string = 12345;
qwe = null;

function component() {
  const element = document.createElement('div');
  setInterval(() => {
    element.innerHTML = `Hello webpack ${new Date()}`;
  }, 1000)
  return element;
}

document.body.appendChild(component());
document.body.appendChild(component());
document.body.appendChild(component());

const p1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(utils.now());
    }, 3000)
  })
}

(async() => {
  const val = await p1();
  console.log(val);
})();