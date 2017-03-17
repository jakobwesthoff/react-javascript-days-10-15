class StoreRegistryImpl {
  _stores = new Map();
  
  constructor() {
    
  }
  
  get(name) {
    return this._stores.get(name);
  }
  
  set(name, store) {
    this._stores.set(name, store);
  }
  
  initializeAll() {
    const initializations = [];
    for(const [name, store] of this._stores.entries()) {
      initializations.push(store.initialize());
    }
    
    return Promise.all(initializations);
  }
  
  dehydrateAll() {
    const dehydrations = [];
    for(const [name, store] of this._stores.entries()) {
      dehydrations.push(store.dehydrate());
    }
    
    return Promise.all(dehydrations);
  }
  
  hydrateAll() {
    for(const [name, store] of this._stores.entries()) {
      store.hydrate();
    }
  }
}

export const StoreRegistry = new StoreRegistryImpl();