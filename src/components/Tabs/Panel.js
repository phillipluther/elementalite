
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <div role="tabpanel" slot="panel"><slot></slot></div>
`;

export default class Panel extends HTMLElement {

}

window.customElements.define('lite-tabpanel', Panel);
