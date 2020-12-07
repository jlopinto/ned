import eventDelegation from '../src/index';

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
    const target = '.btn--delegated';
    const insideTarget = document.querySelector(`${target} span`);

    eventDelegation.on({
      handler,
      target,
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
    const target = '.btn--delegated';
    const insideTarget = document.querySelector(`${target} span`);

    eventDelegation.once({
      handler,
      target,
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
    const target = '.btn--direct';
    const insideTarget = document.querySelector(`${target} span`);

    eventDelegation.on({
      handler,
      target,
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
    const target = '.btn--direct';
    const insideTarget = document.querySelector(`${target} span`);

    eventDelegation.once({
      handler,
      target,
      eventName: 'click.btn--direct',
      delegatedTarget: document.body,
      once: true
    });

    eventDelegation.off({
      handler,
      target,
      eventName: 'click.btn--direct',
      delegatedTarget: document.body,
      once: true
    });
    insideTarget.dispatchEvent(clickEvent);

    expect(handler).toHaveBeenCalledTimes(0);
  });
});
