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
export Dispatcher;