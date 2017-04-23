import Tagify from './Tagify'
import Util from './Util'
import EventSky from 'event-sky'

export default class TagInput {
	constructor (params) {
		// { $inputContainer, $autocompleteElements, ignorePattern, filterCallback }
		this.params = params

		this.tagify()

		EventSky.on('taginput::reload', this.reload)
	}

	tagify = () => {
		const savedValues = this.getLocalStorage().join(', ')

		// create an element
		this.$el = this.createElement(savedValues)

		// append element
		this.params.$inputContainer.append(this.$el)

		// instantiate Tagify on input element
		this.tagifiedEl = new Tagify(
			document.querySelector(`[name="${this.createTagName()}"]`),
			{
				whitelist: this.makeOptionsList(this.params.$autocompleteElements),
				enforeWhitelist: true,
				suggestionsMinChars: 1,
				enforeWhitelist: true, // don't allow tags not in whitelist
			})

		// turn on filter for input
		this.tagifiedEl.on('add', this.inputAdd)
		this.tagifiedEl.on('remove', this.inputRemove)

		// invoke filter to apply any saved values
		this.filter()
	}

	reload = () => {
		this.tagifiedEl.destroy()

		this.$el.remove() // remove old $el

		this.tagify() // re-init tagify
	}

	inputAdd = (e) => {
		this.updateInput({ action: 'add', value: e.detail.value })
	}

	inputRemove = (e) => {
		this.updateInput({ action: 'remove', value: e.detail.value })
	}

	updateInput = ({ action, value }) => {
		// update localStorage
		let inputStorage = this.getLocalStorage()

		if (action === 'add') {
			if (!inputStorage.includes(value)) {
				inputStorage.push(value)
			}
		} else {
			inputStorage = inputStorage.filter((val, i) => val !== value)
		}

		this.setLocalStorage(inputStorage)

		this.filter()
	}

	setLocalStorage = (val = []) => {
		const lsTags = Util.getLocalStorage('tags')
		val = val.filter(s => s && s.length)
		lsTags[this.createTagName()] = val
		Util.setLocalStorage('tags', lsTags)
	}

	getLocalStorage = () => {
		let lsTags = Util.getLocalStorage('tags')

		if (!lsTags) {
			lsTags = {}
		}
		if (!lsTags[this.createTagName()]) {
			lsTags[this.createTagName()] = []
		}

		return lsTags[this.createTagName()]
	}

	filter = () => {
		const values = this.tagifiedEl.value

		this.params.$autocompleteElements.each((i, el) => {
			const $el = $(el)

			// if this input isn't filtering anything remove all classes
			if (!values || !values.length) {
				$el.removeClass('tagify-hide')
			}
			else if (values.includes($el.text().trim())) {
				$el.removeClass('tagify-hide')
			} else {
				$el.addClass('tagify-hide')
			}
		})

		this.params.filterCallback()
	}

	createTagName () {
		return `tags-${this.params.name}`
	}

	createElement (inputValues = '') {
		const $el = $(`
						<input 
							name="${this.createTagName()}" 
							type="input" 
							placeholder="tags..." 
							value='${inputValues}'
						/>
				`)

		return $el
	}

	/**
	 * This method will get all text variations from a given $el list.
	 * ie: pass in a $el list `td.assignedTo` and it will return a dup free
	 * array of text in each DOM element the selector matched
	 * @param $elements {jQuery el} $ element
	 * @return {[string]}
	 */
	makeOptionsList ($elements) {
		if (!$elements) {
			return console.warn(`makeOptionsList $elements is undefined`)
		}

		let options = $elements.map((i,el) => {
					return $(el).text().trim()
				}).toArray()

		options = options.filter(str => str && str.length)

		// make a duplicate free array of texts
		options = Util.uniq(options)

		return options
	}
}