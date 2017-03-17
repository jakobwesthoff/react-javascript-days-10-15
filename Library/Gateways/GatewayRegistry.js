class GatewayRegistryImpl {
  _gateways = new Map();
  
  constructor() {
    
  }
  
  get(name) {
    return this._gateways.get(name);
  }
  
  set(name, gateway) {
    this._gateways.set(name, gateway);
  }
}

export const GatewayRegistry = new GatewayRegistryImpl();