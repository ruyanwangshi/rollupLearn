interface Options {}

export default function persistencePiniaPlugin(options?: Options) {
  return function piniaPlugin(app: any) {
    const store = app.store
    const piniaId = 'pinia'
    const piniaIdList: Array<string> = JSON.parse(localStorage.getItem(piniaId) || '[]')
    const storeList = new Set(piniaIdList)
    storeList.forEach((item) => {
      if (item === store.$id) {
        const storeLacalData = JSON.parse(localStorage.getItem(store.$id) || '{}')
        const storeProxy = new Proxy(storeLacalData, {})
        store.$state = storeProxy
      }
    })
    store.$subscribe((mutation: any, state: any) => {
      localStorage.setItem(mutation.storeId, JSON.stringify(state))
      if (!storeList.has(mutation.storeId)) {
        storeList.add(mutation.storeId)
        localStorage.setItem(piniaId, JSON.stringify([...storeList]))
      }
    })
  }
}
