export class Store {
  constructor() {
    this.listeners = [];
  }

  addChangeListener(callback) {
    this.listeners.push(callback);
  }
  
  removeChangeListener(callback) {
    this.listeners = this.listeners.filter(
      listener => listener !== callback
    );
  }
  
  emitChange() {
    this.listeners.forEach(listener => listener());
  }
}