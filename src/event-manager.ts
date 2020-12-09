interface EmEventsItem {
  eventNamespace: string;
  handler;
}

interface EmEventsItems extends Array<EmEventsItem> {}

class EventManagerSingleton {
  private eventsMap: EmEventsItems = [];

  static instance: EventManagerSingleton;

  constructor() {
    if (EventManagerSingleton.instance) {
      return EventManagerSingleton.instance;
    }

    EventManagerSingleton.instance = this;
    return this;
  }

  addEvent = (eventNamespace: string, event) => {
    this.eventsMap.push({ eventNamespace, handler: event });
    return event;
  };

  removeEvents = (eventNamespace: string): boolean => {
    const eventsRemoved = this.eventsMap.some((event) => event.eventNamespace === eventNamespace);
    this.eventsMap.forEach((event, index) => {
      if (event.eventNamespace === eventNamespace) {
        delete this.eventsMap[index];
      }
    });

    return eventsRemoved;
  };

  getEvents = (eventNamespace: string = undefined): EmEventsItems =>
    eventNamespace ? this.eventsMap.filter((event) => event.eventNamespace === eventNamespace) : this.eventsMap;
}

export default EventManagerSingleton;
