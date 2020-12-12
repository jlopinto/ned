import EventManager from './event-manager';
interface EventLabels {
    events: string;
    elements: string;
}
interface DelegatedEvent extends EventLabels {
    handler: Function;
    targets?: string;
    once?: boolean;
}
export default class NamespacedEventDelegation extends EventManager {
    on: ({ events, elements, targets, handler, once }: DelegatedEvent) => void;
    once: ({ events, elements, targets, handler }: DelegatedEvent) => void;
    off: ({ elements, events }: EventLabels) => boolean[];
    fire: ({ elements, events }: EventLabels) => boolean[];
    private candidates;
    private extractEventName;
}
export {};
