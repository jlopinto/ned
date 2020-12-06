const enableEventDelegation = require('../src/index.ts').default;

enableEventDelegation();
const clickEvent = document.createEvent('HTMLEvents');
clickEvent.initEvent('click', true, true);

describe('removing events', () => {
  beforeEach(() => {
    document.body.innerHTML = '<button class="btn"></button>';
  });
  test('removing delegated event', () => {
    const delegatedTarget = document.body;
    const target = document.querySelector('.btn');
    const mockFn = jest.fn();

    delegatedTarget.on('click.allBtn', '.btn', mockFn);
    target.dispatchEvent(clickEvent);
    delegatedTarget.off('click.allBtn');
    target.dispatchEvent(clickEvent);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  test('removing delegated event once', () => {
    const delegatedTarget = document.body;
    const target = document.querySelector('.btn');
    const mockFn = jest.fn();

    delegatedTarget.once('click.allBtn', '.btn', mockFn);
    delegatedTarget.off('click.allBtn');
    target.dispatchEvent(clickEvent);
    expect(mockFn).toHaveBeenCalledTimes(0);
  });

  test('removing direct event', () => {
    const delegatedTarget = document.body;
    const target = document.querySelector('.btn');
    const mockFn = jest.fn();

    delegatedTarget.on('click.allBtn', mockFn);
    target.dispatchEvent(clickEvent);
    delegatedTarget.off('click.allBtn');
    target.dispatchEvent(clickEvent);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('removing direct event once', () => {
    const delegatedTarget = document.body;
    const target = document.querySelector('.btn');
    const mockFn = jest.fn();

    delegatedTarget.once('click.allBtn', mockFn);
    delegatedTarget.off('click.allBtn');
    target.dispatchEvent(clickEvent);
    expect(mockFn).toHaveBeenCalledTimes(0);
  });
});
