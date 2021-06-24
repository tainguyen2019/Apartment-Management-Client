// TODO to be removed

import { EventEmitter } from 'events';

export type Listener = (key: string, data?: string) => void;

export type KeyValuePair = {
  key: string;
  value: string;
};

export enum EventType {
  setItem = 'set-item',
  removeItem = 'remove-item',
}

class MyLocalStorage {
  private eventEmitter: EventEmitter;
  private listersMapping: Record<EventType, Listener[]>;

  constructor() {
    this.listersMapping = {
      [EventType.setItem]: [],
      [EventType.removeItem]: [],
    };
    this.eventEmitter = new EventEmitter();

    this.eventEmitter.on(EventType.setItem, ({ key, value }: KeyValuePair) => {
      this.listersMapping[EventType.setItem].forEach((listener) => {
        listener(key, value);
      });
    });

    this.eventEmitter.on(EventType.removeItem, (key: string) => {
      this.listersMapping[EventType.removeItem].forEach((listener) => {
        listener(key);
      });
    });
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);

    this.eventEmitter.emit(EventType.removeItem, key);
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);

    this.eventEmitter.emit(EventType.setItem, {
      key,
      value,
    });
  }

  subscribe(eventType: EventType, listener: Listener) {
    this.listersMapping[eventType].push(listener);

    const unsubscribe = () => {
      const idx = this.listersMapping[eventType].indexOf(listener);
      if (idx > -1) {
        this.listersMapping[eventType].splice(idx, 1);
      }
    };

    return unsubscribe;
  }
}

export default new MyLocalStorage();
