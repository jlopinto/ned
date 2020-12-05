declare global {
  interface Element {
    msMatchesSelector(selectors: string): boolean;
  }
  interface HTMLElement {
    [key: string]: Function;
  }
  interface Window {
    [index: string]: any;
  }
}

const enableEventDelegation = (
  eventsPrefix = "",
  eventsMapPrefix = "_"
): void => {
  window[`${eventsMapPrefix}eventsMap`] = [];

  /* polyfill IE */
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
  }

  HTMLElement.prototype[`${eventsPrefix}on`] = function (
    eventNamespace: string,
    targetSelector: string,
    handler: Function,
    options: { once: boolean }
  ): HTMLElement {
    const [eventName] = eventNamespace.split(".");
    const eventsMap = window[`${eventsMapPrefix}eventsMap`];
    const createCustomEvent = function (
      this: HTMLElement,
      event: Event,
      eventNamespace: string,
      handler: Function,
      options: { once: boolean }
    ) {
      const customEvent = {
        eventNamespace,
        options,
        delegatedTarget: this,
        originalEvent: event,
      };
      handler.call(this, customEvent);
    };

    if (typeof targetSelector === "function" && handler === undefined) {
      const newHandler = targetSelector;

      eventsMap[eventNamespace] = function (event: any) {
        createCustomEvent.call(
          this,
          event,
          eventNamespace,
          newHandler,
          options
        );
      };
    } else {
      eventsMap[eventNamespace] = function (event: any) {
        for (
          let { target } = event;
          target && target !== this;
          target = target.parentNode
        ) {
          if (target.matches !== undefined && target.matches(targetSelector)) {
            createCustomEvent.call(
              target,
              event,
              eventNamespace,
              handler,
              options
            );
            break;
          }
        }
      };
    }

    this.addEventListener(eventName, eventsMap[eventNamespace], options);
    return this;
  };

  HTMLElement.prototype[`${eventsPrefix}off`] = function (
    eventNamespace: string
  ): HTMLElement {
    const [eventName] = eventNamespace.split(".");
    const targetedEvent = window[`${eventsMapPrefix}eventsMap`];
    this.removeEventListener(eventName, targetedEvent[eventNamespace]);
    delete targetedEvent[eventNamespace];
    return this;
  };

  HTMLElement.prototype[`${eventsPrefix}once`] = function (
    eventNamespace: string,
    targetSelector: string,
    handler: Function
  ): HTMLElement {
    this.on(eventNamespace, targetSelector, handler, { once: true });
    return this;
  };
};

export default enableEventDelegation;
