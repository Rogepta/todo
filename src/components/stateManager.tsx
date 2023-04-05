interface State {
  [key: string]: any; // объект может содержать произвольные свойства
}

type Listener = () => void; // функция обратного вызова при изменении состояния

export class StateManager {
  private state: State = {}; // объект состояния
  private listeners: Listener[] = []; // массив слушателей

  setState(newState: State) {
    this.state = { ...this.state, ...newState }; // обновляем состояние
    this.notify(); // уведомляем слушателей
  }

  getState(): State {
    return this.state; // возвращаем текущее состояние
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener); // добавляем слушателя
  }

  unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener); // удаляем слушателя
  }

  private notify() {
    this.listeners.forEach((listener) => listener()); // уведомляем всех слушателей
  }
}

export {};
