interface EventsItem {
    element: any;
    eventName: string;
    handler: any;
}
interface EventsItems extends Array<EventsItem> {
}
export default class EventManagerSingleton {
    private eventsMap;
    static instance: EventManagerSingleton;
    constructor();
    addEvent: (element: any, eventName: any, handler: any) => any;
    removeEvents: (element: any, eventName: any) => boolean;
    getEvents: (eventName?: any) => EventsItems;
    clearEvents: () => void;
}
export {};
