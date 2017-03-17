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

export const Dispatcher = new DispatcherImpl();
