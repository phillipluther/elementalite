// import tabStyles from './Tabs.css';

const template = document.createElement('template');
template.innerHTML = `
    <slot></slot>
`;

export default class Tabs extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
    }
}
