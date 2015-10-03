class DispatcherImpl {
  storeCallbacks = []

  register(callback) {
    this.storeCallbacks.push(callback);
  }

  dispatch(action) {
    this.storeCallbacks.forEach(
      callback => callback(action)
    );
  }
}
const Dispatcher = new DispatcherImpl();

class Store {
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

/**
 * Example Action definitions:
 *
 *  const ADD_NAME = "ADD_NAME";
 *  const REMOVE_NAME = "REMOVE_NAME";
 *  const NameActions = {
 *    add(name) {
 *      Dispatcher.dispatch({
 *        actionType: ADD_NAME,
 *          name: name
 *      });
 *    },
 *    remove(name) {
 *      Dispatcher.dispatch({
 *        actionType: REMOVE_NAME,
 *          name: name
 *      });
 *    }
 *  }
 */

/**
 * Example Store Implementation
 *
 *  class NamesStoreImpl extends Store {
 *    names = []

 *    constructor() {
 *      super();
 *      Dispatcher.register(action => {
 *        switch(action.actionType) {
 *          case ADD_NAME:
 *            this.names.push(action.name);
 *            this.emitChange();
 *          break;
 *          case REMOVE_NAME:
 *            this.names = this.names.filter(
 *              name => name !== action.name
 *            );
 *            this.emitChange();
 *          break;
 *        }
 *      });
 *    }
 *
 *    getNames() {
 *      return this.names;
 *    }
 *  }
 *  const NameStore = new NamesStoreImpl();
 */
