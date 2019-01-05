
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <li slot="tab">
        <a href="#" role="tab"><slot></slot></a>
    </li>
`;

export default class Tab extends HTMLElement {
    constructor() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(TEMPLATE.contents.cloneNode());
    }
}

window.customElements.define('lite-tab', Tab);
