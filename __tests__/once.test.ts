import EventDelegation from '../src/index';

const eventDelegation = new EventDelegation();
const clickEvent = document.createEvent('HTMLEvents');
clickEvent.initEvent('click', true, true);
const handler = jest.fn();

describe('Attaching events once', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button class="btn btn--delegated"><span>delegated</span></button>
      <button class="btn btn--direct"><span>direct</span></button>
    `;
    handler.mockReset();
  });

  test('triggering delegated event once', () => {
    const targetSelector = '.btn--delegated';
    const insideTarget = document.querySelector(`${targetSelector} span`);

    eventDelegation.once({
      handler,
      targetSelector,
      eventName: 'click.btn--delegated',
      delegatedTarget: document.body,
      once: true
    });
    insideTarget.dispatchEvent(clickEvent);
    insideTarget.dispatchEvent(clickEvent);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('triggering direct event once', () => {
    const targetSelector = '.btn--direct';
    const insideTarget = document.querySelector(`${targetSelector} span`);

    eventDelegation.once({
      handler,
      targetSelector,
      eventName: 'click.btn--direct',
      delegatedTarget: document.body,
      once: true
    });
    insideTarget.dispatchEvent(clickEvent);
    insideTarget.dispatchEvent(clickEvent);

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
