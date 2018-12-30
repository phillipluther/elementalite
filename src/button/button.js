import './button.css';

window.customElements.define('lite-button', class extends HTMLButtonElement {
    connectedCallback() {
        let classNames = ['liteButton'];

        // size variants
        if (this.hasAttribute('large')) {
            classNames.push('liteButton--large');
        } else if (this.hasAttribute('small')) {
            classNames.push('liteButton--small');
        } else {
            classNames.push('liteButton--medium');
        }

        // color/display variants
        if (this.hasAttribute('primary')) {
            classNames.push('liteButton--primary');
        } else {
            classNames.push('liteButton--basic');
        }

        this.classList.add(...classNames);
    }

}, { extends: 'button' });
