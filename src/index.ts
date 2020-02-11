import '@pnp/polyfill-ie11'
import 'regenerator-runtime/runtime'

(async () => {

  const sleep = (ms: number) => new Promise((resolve) => { setTimeout(() => { resolve() }, ms) })
  
  await sleep(2000)

  console.log(Date.now())

})()