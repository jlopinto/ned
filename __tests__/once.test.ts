import EventDelegation from '../src/index';

const clickEvent = document.createEvent('HTMLEvents');
clickEvent.initEvent('click', true, true);
const handler = jest.fn();
const eventDelegation = new EventDelegation();

const appendElement = (markup, where) => {
  where.insertAdjacentHTML('beforeend', markup);
};

const complexCtas = `
  <button class="btn btn--delegated"><span>delegated</span></button>
  <button class="btn btn--direct"><span>direct</span></button>
`;

const testSetup = () => {
  document.body.innerHTML = `
    <div class="section--with-ned">
      ${complexCtas}
    </div>
    <div class="section--without-ned">
      ${complexCtas}
    </div>
  `;
  handler.mockReset();
};

describe('Testing delegated event on existing element is called once only', () => {
  beforeEach(testSetup);

  it('should call delegated event', () => {
    eventDelegation.once({
      events: 'click.delegated',
      elements: '.section--with-ned',
      targets: '.btn--delegated',
      handler
    });
    const insideTarget = document.querySelectorAll(`.section--with-ned .btn--delegated span`)[0];

    insideTarget.dispatchEvent(clickEvent);
    insideTarget.dispatchEvent(clickEvent);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should call direct event', () => {
    eventDelegation.once({
      events: 'click.direct',
      elements: '.btn--direct',
      handler
    });
    const insideTarget = document.querySelectorAll(`.section--with-ned .btn--direct span`)[0];

    insideTarget.dispatchEvent(clickEvent);
    insideTarget.dispatchEvent(clickEvent);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

describe('Testing delegated event on inserted element is called once only', () => {
  beforeEach(testSetup);

  it('should call delegated event', () => {
    eventDelegation.once({
      events: 'click.delegated',
      elements: '.section--with-ned',
      targets: '.btn--delegated',
      handler
    });

    appendElement(complexCtas, document.querySelector('.section--with-ned'));

    const insideTarget = document.querySelectorAll('.section--with-ned .btn--delegated span')[1];
    insideTarget.dispatchEvent(clickEvent);
    insideTarget.dispatchEvent(clickEvent);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger direct event', () => {
    eventDelegation.once({
      events: 'click.direct',
      elements: '.btn--direct',
      handler
    });

    appendElement(complexCtas, document.querySelector('.section--with-ned'));

    const insideTarget = document.querySelectorAll(`.section--with-ned .btn--direct span`)[1];
    insideTarget.dispatchEvent(clickEvent);
    insideTarget.dispatchEvent(clickEvent);
    expect(handler).toHaveBeenCalledTimes(0);
  });
});
