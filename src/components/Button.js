// import buttonStyles from './Button.css';

const template = document.createElement('template');
template.innerHTML = `
    <button><slot></slot></button>
`;


export default class Button extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

    }
}

window.customElements.define('lite-button', Button);
