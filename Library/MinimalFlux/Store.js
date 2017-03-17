export class Store {
  constructor() {
    this._listeners = [];
    this._hydrated = false;
    this._initializePromise = Promise.resolve();
  }

  addChangeListener(callback) {
    this._listeners.push(callback);
  }
  
  removeChangeListener(callback) {
    this._listeners = this._listeners.filter(
      listener => listener !== callback
    );
  }
  
  emitChange() {
    this._listeners.forEach(listener => listener());
  }
  
  hydrate() {
    if (this.constructor.HYDRATION_KEY === undefined) {
      return;
    }
    
    if (window.__store_hydration__ === undefined) {
      return;
    }
    
    const data = window.__store_hydration__[this.constructor.HYDRATION_KEY];
    
    if (data === undefined) {
      return;
    }
    
    Object.assign(this, data);
    this._hydrated = true;
  }
  
  initialize() {
    if (this._hydrated) {
      return;
    }
    
    this._initializePromise = Promise.resolve().then(() => this._initialize());
  }
  
  _initialize() {
    return Promise.resolve();
  }
  
  dehydrate() {
    return this._waitForDehydration()
      .then(() => {
        const properties = this._getDehydrationProperties();
        
        const hydration = {};
        properties.forEach(property => hydration[property] = this[property]);
        
        return `
          if (window.__store_hydration__ === undefined) {
            window.__store_hydration__ = {};
          }
          window.__store_hydration__['${this.constructor.HYDRATION_KEY}'] = ${JSON.stringify(hydration)};
        `;
      });
  }
  
  _getDehydrationProperties() {
    return [];
  }
  
  _waitForDehydration() {
    return this._initializePromise;
  }
}