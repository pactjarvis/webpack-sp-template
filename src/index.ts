import '@pnp/polyfill-ie11'
import 'regenerator-runtime/runtime'

(async () => {

  // const sleep = (ms: number) => new Promise((resolve) => { setTimeout(() => { resolve() }, ms) })
  
  // await sleep(2000)

  // console.log(Date.now())

  function Logger(someText: string) {
    return function(constructor: Function) {
      console.log(someText)
    }
  }

  function Log(target: any, propertyName: string) {
    console.log('LOG')
    console.log(target, propertyName)
  }

  @Logger('PERSON LOGGER')
  class Person {

    @Log
    name: string

    @Log
    private _role: string

    constructor(name: string, role: string) {
      this.name = name
      this._role = role
    }

    set role(value: string) {
      this._role = value
    }

    get role() {
      return this._role
    }
  }

  // const person1 = new Person('Max', 'Admin')

})()