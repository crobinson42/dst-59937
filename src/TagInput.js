import Tagify from './Tagify'
import Util from './Util'

export default class TagInput {
	constructor (params) {
		// { $inputContainer, $autocompleteElements, ignorePattern, filterCallback }
		this.params = params

		// create an element
		this.$el = this.createElement()

		// append element
		params.$inputContainer.append(this.$el)

		// instantiate Tagify on input element
		this.tagifiedEl = new Tagify(
			document.querySelector(`[name="${this.createTagName()}"]`),
			{
				whitelist: this.makeOptionsList(params.$autocompleteElements),
				enforeWhitelist: true,
				suggestionsMinChars: 1,
				enforeWhitelist: true, // don't allow tags not in whitelist
			})

		// turn on filter for input
		this.tagifiedEl .on('add', this.filter)
		this.tagifiedEl.on('remove', this.filter)
	}

	filter = e => {
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