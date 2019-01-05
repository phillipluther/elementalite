import createId from '../../utils/create-id';


const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <div id="tabs">
        <div id="tabsList" role="tablist">
            <slot name="tab"></slot>
        </div>

        <slot name="panel"></slot>
    </div>
`;

export default class Tabs extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(TEMPLATE.contents.cloneNode());

        this._tabSlot = this.shadowRoot.querySelector('[name="tab"]');
        this._panelSlot = this.shadowRoot.querySelector('[name="panel"]');

        this.render = this.render.bind(this);
    }

    connectedCallback() {
        // ensure our Tab and Panel elements are available/defined
        Promise.all(
            window.customElements.whenDefined('lite-tab'),
            window.customElements.whenDefined('lite-tabpanel')
        )
            .then(this.render);
    }

    render() {
        let tabs = Array.from(this.querySelectorAll('lite-tab'));
        let panels = Array.from(this.querySelectorAll('lite-tabpanel'));

        panels.forEach((panel, index) => {
            let tab = tabs[index];
            let isActive = index === this._activeTab;

            if (!panel.id) {
                panel.id = createId();
            }

            if (!tab.id) {
                tab.id = panel.id + '_tab';
            }

            panel.setAttribute('aria-labelledby', tab.id);
            panel.setAttribute('aria-hidden', isActive);

            tab.setAttribute('aria-controls', panel.id);
            tab.setAttribute('aria-selected', isActive);
        });
    }
}

window.customElements.define('lite-tabs', Tabs);
