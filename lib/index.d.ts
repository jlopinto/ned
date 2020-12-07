interface DelegatedEvent {
    eventName: string;
    delegatedTarget: Element;
    handler?: Function;
    target?: string;
    once?: boolean;
}
declare class EventDelegation {
    private eventsMap;
    extractEventName: (eventName: any) => any;
    on: ({ eventName, target, handler, delegatedTarget, once }: DelegatedEvent) => Element;
    once: ({ eventName, target, handler, delegatedTarget }: DelegatedEvent) => Element;
    off: ({ delegatedTarget, eventName }: DelegatedEvent) => boolean;
    fire: ({ delegatedTarget, eventName }: DelegatedEvent) => boolean;
}
declare const EventDelegationSingleton: EventDelegation;
export default EventDelegationSingleton;
