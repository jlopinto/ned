const enableEventDelegation = (
  eventsPrefix = '',
  eventsMapPrefix = '_'
): void => {
  window[`${eventsMapPrefix}eventsMap`] = [];

  HTMLElement.prototype[`${eventsPrefix}on`] = function (
    eventNamespace: string,
    ...rest: any
  ) {
    const [targetSelector, handler, once = { once: false }] = rest;
    const [eventName] = eventNamespace.split('.');
    const eventsMap = window[`${eventsMapPrefix}eventsMap`];

    if (typeof targetSelector === 'function' && handler === undefined) {
      const newHandler: Function = targetSelector;

      eventsMap[eventNamespace] = function (event: any) {
        newHandler.call(this, {
          eventNamespace,
          target: this,
          delegatedTarget: this,
          originalEvent: event
        });
      };
    } else {
      eventsMap[eventNamespace] = function (event: any) {
        for (
          let { target } = event;
          target && target !== this;
          target = target.parentNode
        ) {
          if (target.matches !== undefined && target.matches(targetSelector)) {
            handler.call(this, {
              target,
              eventNamespace,
              delegatedTarget: this,
              originalEvent: event
            });
            break;
          }
        }
      };
    }
    this.addEventListener(eventName, eventsMap[eventNamespace], once);
    return this;
  };

  HTMLElement.prototype[`${eventsPrefix}off`] = function (
    eventNamespace: string
  ) {
    const [eventName] = eventNamespace.split('.');
    const targetedEvent = window[`${eventsMapPrefix}eventsMap`];
    this.removeEventListener(eventName, targetedEvent[eventNamespace]);
    delete targetedEvent[eventNamespace];
    return this;
  };

  HTMLElement.prototype[`${eventsPrefix}once`] = function (
    eventNamespace: string,
    targetSelector: string,
    handler: Function
  ) {
    this[`${eventsPrefix}on`](eventNamespace, targetSelector, handler, {
      once: true
    });
    return this;
  };
};

export default enableEventDelegation;
