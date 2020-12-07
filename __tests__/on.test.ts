import eventDelegation from '../src/index';

const clickEvent = document.createEvent('HTMLEvents');
clickEvent.initEvent('click', true, true);
const handler = jest.fn();

describe('Attaching events', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button class="btn btn--delegated"><span>delegated</span></button>
      <button class="btn btn--direct"><span>direct</span></button>
    `;
    handler.mockReset();
  });

  test('triggering delegated event', () => {
    const target = '.btn--delegated';
    const insideTarget = document.querySelector(`${target} span`);

    eventDelegation.on({
      handler,
      target,
      eventName: 'click.btn--delegated',
      delegatedTarget: document.body
    });
    insideTarget.dispatchEvent(clickEvent);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('triggering direct event', () => {
    const target = '.btn--direct';
    const insideTarget = document.querySelector(`${target} span`);

    eventDelegation.on({
      handler,
      target,
      eventName: 'click.btn--direct',
      delegatedTarget: document.body
    });
    insideTarget.dispatchEvent(clickEvent);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
