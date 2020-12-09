import EventDelegation from '../src/index';

const eventDelegation = new EventDelegation();
const clickEvent = document.createEvent('HTMLEvents');
clickEvent.initEvent('click', true, true);
const handler = jest.fn();

describe('removing events', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <button class="btn btn--delegated"><span>delegated</span></button>
    <button class="btn btn--direct"><span>direct</span></button>
  `;
    handler.mockReset();
  });

  test('removing delegated event', () => {
    const targetSelector = '.btn--delegated';
    const insideTarget = document.querySelector(`${targetSelector} span`);

    eventDelegation.on({
      handler,
      targetSelector,
      eventName: 'click.btn--delegated',
      delegatedTarget: document.body
    });
    insideTarget.dispatchEvent(clickEvent);

    eventDelegation.off({
      eventName: 'click.btn--delegated',
      delegatedTarget: document.body
    });
    insideTarget.dispatchEvent(clickEvent);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('removing delegated event once', () => {
    const targetSelector = '.btn--delegated';
    const insideTarget = document.querySelector(`${targetSelector} span`);

    eventDelegation.once({
      handler,
      targetSelector,
      eventName: 'click.btn--delegated',
      delegatedTarget: document.body,
      once: true
    });

    eventDelegation.off({
      eventName: 'click.btn--delegated',
      delegatedTarget: document.body
    });

    insideTarget.dispatchEvent(clickEvent);
    expect(handler).toHaveBeenCalledTimes(0);
  });

  test('removing direct event', () => {
    const targetSelector = '.btn--direct';
    const insideTarget = document.querySelector(`${targetSelector} span`);

    eventDelegation.on({
      handler,
      targetSelector,
      eventName: 'click.btn--direct',
      delegatedTarget: document.body
    });
    insideTarget.dispatchEvent(clickEvent);

    eventDelegation.off({
      eventName: 'click.btn--direct',
      delegatedTarget: document.body
    });
    insideTarget.dispatchEvent(clickEvent);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('removing direct event once', () => {
    const targetSelector = '.btn--direct';
    const insideTarget = document.querySelector(`${targetSelector} span`);

    eventDelegation.once({
      handler,
      targetSelector,
      eventName: 'click.btn--direct',
      delegatedTarget: document.body,
      once: true
    });

    eventDelegation.off({
      handler,
      targetSelector,
      eventName: 'click.btn--direct',
      delegatedTarget: document.body,
      once: true
    });
    insideTarget.dispatchEvent(clickEvent);

    expect(handler).toHaveBeenCalledTimes(0);
  });
});
