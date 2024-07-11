import { assert, createFixture } from '@aurelia/testing';
import { Calculator } from '../src/components/calculator';
import { bootstrapTestEnvironment } from './setup';
import { CustomElement } from 'aurelia';

describe('Calculator component', () => {
  beforeAll(() => {
    bootstrapTestEnvironment();
  });

  it('initializes with display value of 0', async () => {
    const { startPromise, assertText } = await createFixture(
      `<calculator></calculator>`,
      class App {},
      [Calculator]
    );

    await startPromise;

    assertText('.text-4xl', '0');
  });

  it('inputs digits correctly', async () => {
    const { appHost, startPromise, assertText, ctx } = await createFixture(
      `<calculator></calculator>`,
      class App {},
      [Calculator]
    );

    await startPromise;

    const calculator = appHost.querySelector('calculator');
    const component = CustomElement.for(calculator).viewModel as Calculator;

    component.inputDigit(1);
    component.inputDigit(2);
    component.inputDigit(3);

    ctx.platform.domQueue.flush();

    assertText('.text-4xl', '123');
  });

  it('performs addition correctly', async () => {
    const { appHost, startPromise, ctx } = await createFixture(
      `<calculator></calculator>`,
      class App {},
      [Calculator]
    );

    await startPromise;

    const display = appHost.querySelector('.text-4xl') as HTMLElement;

    const calculator = appHost.querySelector('calculator');
    const component = CustomElement.for(calculator).viewModel as Calculator;

    component.inputDigit(5);
    component.performOperation('+');
    component.inputDigit(3);
    component.handleEquals();

    ctx.platform.domQueue.flush();

    assert.strictEqual(display.textContent, '8');
  });

  it('performs subtraction correctly', async () => {
    const { appHost, startPromise, ctx } = await createFixture(
      `<calculator></calculator>`,
      class App {},
      [Calculator]
    );

    await startPromise;

    const display = appHost.querySelector('.text-4xl') as HTMLElement;

    const calculator = appHost.querySelector('calculator');
    const component = CustomElement.for(calculator).viewModel as Calculator;

    component.inputDigit(1);
    component.inputDigit(0);
    component.performOperation('-');
    component.inputDigit(4);
    component.handleEquals();

    ctx.platform.domQueue.flush();

    assert.strictEqual(display.textContent, '6');
  });

  it('performs multiplication correctly', async () => {
    const { appHost, startPromise, ctx } = await createFixture(
      `<calculator></calculator>`,
      class App {},
      [Calculator]
    );

    await startPromise;

    const display = appHost.querySelector('.text-4xl') as HTMLElement;

    const calculator = appHost.querySelector('calculator');
    const component = CustomElement.for(calculator).viewModel as Calculator;

    component.inputDigit(6);
    component.performOperation('*');
    component.inputDigit(7);
    component.handleEquals();

    ctx.platform.domQueue.flush();

    assert.strictEqual(display.textContent, '42');
  });

  it('performs division correctly', async () => {
    const { appHost, startPromise, ctx } = await createFixture(
      `<calculator></calculator>`,
      class App {},
      [Calculator]
    );

    await startPromise;

    const display = appHost.querySelector('.text-4xl') as HTMLElement;

    const calculator = appHost.querySelector('calculator');
    const component = CustomElement.for(calculator).viewModel as Calculator;

    component.inputDigit(1);
    component.inputDigit(5);
    component.performOperation('/');
    component.inputDigit(3);
    component.handleEquals();

    ctx.platform.domQueue.flush();

    assert.strictEqual(display.textContent, '5');
  });

  it('clears the display', async () => {
    const { appHost, startPromise, ctx } = await createFixture(
      `<calculator></calculator>`,
      class App {},
      [Calculator]
    );

    await startPromise;

    const display = appHost.querySelector('.text-4xl') as HTMLElement;

    const calculator = appHost.querySelector('calculator');
    const component = CustomElement.for(calculator).viewModel as Calculator;

    component.inputDigit(1);
    component.inputDigit(2);
    component.inputDigit(3);

    ctx.platform.domQueue.flush();

    assert.strictEqual(display.textContent, '123');

    component.clear();

    ctx.platform.domQueue.flush();

    assert.strictEqual(display.textContent, '0');
  });

  it('handles decimal input correctly', async () => {
    const { appHost, startPromise, ctx } = await createFixture(
      `<calculator></calculator>`,
      class App {},
      [Calculator]
    );

    await startPromise;

    const display = appHost.querySelector('.text-4xl') as HTMLElement;

    const calculator = appHost.querySelector('calculator');
    const component = CustomElement.for(calculator).viewModel as Calculator;

    component.inputDigit(3);
    component.inputDecimal();
    component.inputDigit(1);
    component.inputDigit(4);

    ctx.platform.domQueue.flush();

    assert.strictEqual(display.textContent, '3.14');
  });
});
