import eventDelegation from '../src/index';

const clickEvent = document.createEvent('HTMLEvents');
clickEvent.initEvent('click', true, true);
const mockFn = jest.fn();
let eventParams, target;

describe('removing events', () => {
  beforeEach(() => {
    document.body.innerHTML = '<button class="btn"></button>';

    eventParams = {
      target: '.btn',
      delegatedTarget: document.body,
      eventName: 'click.allBtn',
      handler: mockFn
    }

    target = document.querySelector('.btn');
    mockFn.mockReset();
  });
  test('removing delegated event', () => {
    const { target: selectorTarget, handler, ...offParams } = eventParams;

    eventDelegation.on(eventParams);
    target.dispatchEvent(clickEvent);
    eventDelegation.off(offParams);
    target.dispatchEvent(clickEvent);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  test('removing delegated event once', () => {
    const onceParams = { ...eventParams, once: true };
    const { handler, ...offParams } = onceParams;

    eventDelegation.once(onceParams);
    eventDelegation.off(offParams);
    target.dispatchEvent(clickEvent);
    expect(mockFn).toHaveBeenCalledTimes(0);
  });

  test('removing direct event', () => {
    const { target: selectorTarget, handler, ...offParams } = eventParams;

    eventDelegation.on(eventParams);
    target.dispatchEvent(clickEvent);
    eventDelegation.off(offParams);
    target.dispatchEvent(clickEvent);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('removing direct event once', () => {
    const onceParams = { ...eventParams, once: true };
    const { target: selectorTarget, handler, ...offParams } = eventParams;

    eventDelegation.once(onceParams);
    eventDelegation.off(offParams);
    target.dispatchEvent(clickEvent);
    expect(mockFn).toHaveBeenCalledTimes(0);
  });
});
