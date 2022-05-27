import { SunBase } from "../base/sun_base.js"

class Toggle extends SunBase {
	static get observedAttributes() { return ['toggled'] }

	constructor() {
		super('Sun-Toggle', 'v0.1.0')

		this.toggled = this.hasAttribute('toggled') ? this.getAttribute('toggled') : false
	
		this.attachShadow({ mode: 'open' })

		this.attachCSS()
		this.attachHTML()
		this.attachListeners()
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.debug(`Attribute Changed: ${ name }, ${ oldValue }, ${ newValue }`)
		if (name == 'toggled') {
			this.toggled = newValue
			
			this.setToggle(newValue)
		}
	}

	setToggle(isToggled) {
		const track = this.shadowRoot.querySelector('#track')
		const thumb = this.shadowRoot.querySelector('.tgl--thumb')

		if (isToggled == 'true') {
			track.classList.add('toggled')
			thumb.classList.add('toggled')

			return
		}

		track.classList.remove('toggled')
		thumb.classList.remove('toggled')
	}

	attachCSS() {
		this.linkStylesheet('http://localhost:8801/c/toggle/toggle.css')  // 'https://wc.sundstedt.us/c/toggle.css')
	}
	
	attachHTML() {
		const wrapper = document.createElement('div')
		wrapper.setAttribute('id', 'tgl')
		wrapper.setAttribute('class', 'tgl')

		const track = wrapper.appendChild(document.createElement('div'))
		track.setAttribute('id', 'track')
		track.setAttribute('class', `tgl--track ${ this.toggled ? 'toggled' : '' }`)

		const thumb = track.appendChild(document.createElement('span'))
		thumb.setAttribute('class', `tgl--thumb ${ this.toggled ? 'toggled' : '' }`)
	
		this.shadowRoot.append(wrapper)
	}

	attachListeners() {
		const tgl = this.shadowRoot.querySelector('#tgl')
		tgl.addEventListener('click', () => {
			this.log(`Toggle Clicked: ${ this.toggled }`)
			this.setAttribute('toggled', this.toggled == 'true' ? 'false' : 'true' )
		})
	}
}

customElements.define('sun-toggle', Toggle)

