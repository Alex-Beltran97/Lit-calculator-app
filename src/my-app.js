import { LitElement, html, css } from 'lit';

//  Components
import './components/calculator-component';

export class MyApp extends LitElement {
  static styles = [
    css`
      :host {
        width: 100%;
        height: 100vh;
        display: grid;
        align-items: center;
        margin: 1em;
        padding: 1em;
      }
    `
  ];
  render() {
    return html `
      <calculator-component></calculator-component>
    `;
  }
}
customElements.define('my-app', MyApp);
