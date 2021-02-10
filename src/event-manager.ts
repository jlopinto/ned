interface EventsItem {
  element;
  eventName: string;
  handler;
}

interface EventsItems extends Array<EventsItem> {}

export default class EventManagerSingleton {
  private eventsMap: EventsItems = [];

  static instance: EventManagerSingleton;

  constructor() {
    if (EventManagerSingleton.instance) {
      return EventManagerSingleton.instance;
    }

    EventManagerSingleton.instance = this;
    return this;
  }

  addEvent = (element, eventName, handler) => {
    this.eventsMap.push({ element, eventName, handler });
    return handler;
  };

  removeEvents = (element, eventName): boolean => {
    const eventsRemoved = 0;
    this.eventsMap = this.eventsMap.filter(
      (event, index) =>
        event.element === element && event.eventName === eventName && delete this.eventsMap[index] && eventsRemoved + 1
    );
    return !!eventsRemoved;
  };

  getEvents = (eventName = undefined): EventsItems =>
    eventName ? this.eventsMap.filter((event) => event.eventName === eventName) : this.eventsMap;

  clearEvents = () => {
    this.eventsMap = [];
  };
}
