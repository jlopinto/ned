interface EventsItem {
  delegatedTargetElement;
  eventNamespace: string;
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

  addEvent = (delegatedTargetElement, eventNamespace: string, event) => {
    this.eventsMap.push({ delegatedTargetElement, eventNamespace, handler: event });
    return event;
  };

  removeEvents = (delegatedTargetElement, eventNamespace: string): boolean => {
    const eventsRemoved = this.eventsMap.some((event) => event.eventNamespace === eventNamespace);
    this.eventsMap.forEach((event, index) => {
      if (event.delegatedTargetElement === delegatedTargetElement && event.eventNamespace === eventNamespace) {
        delete this.eventsMap[index];
      }
    });

    return eventsRemoved;
  };

  getEvents = (eventNamespace: string = undefined): EventsItems =>
    eventNamespace ? this.eventsMap.filter((event) => event.eventNamespace === eventNamespace) : this.eventsMap;
}
