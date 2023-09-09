import { LitElement, html, css } from 'lit';

// Components
import './button-component';

export class CalculatorComponent extends LitElement {
  static get properties() {
    return {
      screen: { type: String },
      valuesBtns: { type: Array },
      operatorsBtns: { type: Array },
      resetBtns: { type: Array },
      isCalculating: {state: true, type: Boolean }
    };
  }
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        padding-bottom: 1rem;
        border: 1px solid var(--secondary-color);
        background-color: var(--secondary-color);
        border-radius: var(--border-r);
      }

      .screen {
        text-align: right;
        margin: 1rem;
        padding: 1rem;
        background-color: #fff;
        border-radius: var(--border-r);
      }

      .operators {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 0.2rem;
      }

      .main-btns {
        display: flex;
        justify-content: center;
      }

      .values {
        display: inline-block;
        width: 70%;
      }

      .reseters {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
      }
    `
  ];
  constructor() {
    super();
    this.valuesBtns = [1,2,3,4,5,6,7,8,9,',',0,'='];
    this.operatorsBtns = ['/','*','-','+'];
    this.resetBtns = ['AC','C'];
    this.screen = 0;
    this.isCalculating = false;
  }
  render() {

    const btn = (label, callback, options = {})=> html `
        <button-component
          id="${ label }"
          label="${ label }"
          @click="${ ()=>options.equal ? this.equal() : callback(label) }"
          ?reseter="${ options?.reseter }"
        ></button-component>
      `;

    return html`
      <p class="screen">${ this.screen }</p>
      <div class="operators">
        ${ this.operatorsBtns.map( value => btn(value, this.typeValue.bind(this)) )}
      </div>
      <div class="main-btns">
        <div class="values">
          ${ this.valuesBtns.map( value => {
            if(value === '=') {
              return btn(value, this.typeValue.bind(this), {equal:true})
            }
            return btn(value, this.typeValue.bind(this))
          })}
        </div>
        <div class="reseters">
          ${ this.resetBtns.map( value => {
            if (value === 'AC') {
              return btn(value, this.reset.bind(this), {reseter: true})
            };
            return btn(value, this.backward.bind(this), {reseter: true})
          })}
        </div>
      </div>
    `;
  }
  typeValue(value) {

    this.isCalculating = true;

    if (String(this.screen).length === 1 && String(this.screen) === '0') {
      this.screen = '';
    };

    this.screen = this.screen + value;

    const typedValues = [...this.screen.split("")];

    if(isNaN(+typedValues[0])) {
      this.screen = '0';
    };

    if (typedValues.filter( item => isNaN(+item)).length === 2) {
      this.equal();
      this.screen = this.screen + value;
    };
  };
  reset() {
    this.screen = '0';
  };
  backward() {
    const typedValues = [...this.screen.split("")];
    if (!this.isCalculating) {
      return this.screen = 0;
    };
    typedValues.pop();
    if (typedValues.length === 0) {
      return this.screen = '0';
    };
    this.screen = typedValues.join("");
  };
  equal() {
    const typedValues = [...this.screen.split("")];
    const operator  = typedValues.find( item => isNaN(+item));
    const values  = this.screen.split(operator);
    const selectedOperation = this.operation(operator);
    if (!selectedOperation) {
      return this.screen = this.screen;
    };
    if (isNaN(+values[1])) {
      return this.screen = values[0];
    };
    this.screen = String(selectedOperation(values[0],values[1]));
    this.isCalculating = false;
  };
  operation(operator) {
    switch(operator) {
      case '+':
        return (val1, val2) => +val1+(+val2);
      break;
      case '-':
        return (val1, val2) => +val1-(+val2);
      break;
      case '*':
        return (val1, val2) => +val1*(+val2);
      break;
      case '/':
        return (val1, val2) => +val1/(+val2);
      break;
      default:
        console.log('Operator is not valid');
    };
  };
}
customElements.define('calculator-component', CalculatorComponent);
