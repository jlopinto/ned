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
  eventDelegation.clearEvents();
};
describe('delegated event on existing element', () => {
  beforeEach(testSetup);

  it('should remove delegated event', () => {
    eventDelegation.on({
      events: 'click.delegated',
      elements: '.section--with-ned',
      targets: '.btn--delegated',
      handler
    });
    const insideTarget = document.querySelectorAll(`.section--with-ned .btn--delegated span`)[0];
    insideTarget.dispatchEvent(clickEvent);

    eventDelegation.off({
      events: 'click.delegated',
      elements: '.section--with-ned'
    });
    insideTarget.dispatchEvent(clickEvent);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should removing delegated event once', () => {
    eventDelegation.once({
      events: 'click.delegated',
      elements: '.section--with-ned',
      targets: '.btn--delegated',
      handler
    });
    const insideTarget = document.querySelectorAll(`.section--with-ned .btn--delegated span`)[0];

    eventDelegation.off({
      events: 'click.delegated',
      elements: '.section--with-ned'
    });
    insideTarget.dispatchEvent(clickEvent);

    expect(handler).toHaveBeenCalledTimes(0);
  });
  it('should removing direct event', () => {
    eventDelegation.on({
      events: 'click.direct',
      elements: '.btn--direct',
      handler
    });
    const insideTarget = document.querySelectorAll(`.section--with-ned .btn--direct span`)[0];
    insideTarget.dispatchEvent(clickEvent);
    eventDelegation.off({
      events: 'click.direct',
      elements: '.btn--direct'
    });
    insideTarget.dispatchEvent(clickEvent);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should removing direct event once', () => {
    eventDelegation.once({
      events: 'click.direct',
      elements: '.btn--direct',
      handler
    });
    const insideTarget = document.querySelectorAll(`.section--with-ned .btn--direct span`)[0];

    eventDelegation.off({
      events: 'click.direct',
      elements: '.btn--direct'
    });
    insideTarget.dispatchEvent(clickEvent);

    expect(handler).toHaveBeenCalledTimes(0);
  });
});
