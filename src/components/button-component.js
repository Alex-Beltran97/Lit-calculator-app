import { LitElement, html, css } from 'lit';

export class ButtonComponent extends LitElement {
  static get properties() {
    return {
      label: { type: String },
      reseter: { type: Boolean }
    };
  }
  static styles = [
    css`
      :host {
        display: inline-block;
        background-color: var(--primary-color);
        width: 48px;
        height: 48px;
        margin: 1rem;
        align-items: center;
        text-align: center;
        color: #fff;
        cursor: pointer;
        margin-bottom: 0;
        border-radius: var(--border-r);
      }
    `
  ];
  render() {
    this.style.height = this.reseter ? '100%' : '48px';
    this.style.display = this.reseter && 'flex';
    this.style.alignItems = this.reseter && 'center';
    this.style.justifyContent = this.reseter && 'center';
    return html `
      <p>${ this.label }</p>
    `;
  }
}
customElements.define('button-component', ButtonComponent);
