import './FilterInput.css'

export default class FilterInput {
	constructor (params) {
		// { $inputContainer, $filterElements, filterCallback }
		this.params = params

		// create an element
		this.$el = this.createElement()

		// append element
		params.$inputContainer.append($('<div class="filterInput" />').append(this.$el))

		// turn on filter for input
		this.$el.on('keyup', this.filter)
	}

	filter = () => {
		const values = this.$el.val()

		const matches = (val1, val2) => val1

		this.params.$filterElements.each((i, el) => {
			const $el = $(el)

			// if this input isn't filtering anything remove all classes
			if (!values || !values.length) {
				$el.removeClass('tagify-hide')
			}
			else if ($el.text().trim().indexOf(values) > 0) {
				$el.removeClass('tagify-hide')
			} else {
				$el.addClass('tagify-hide')
			}
		})

		this.params.filterCallback()
	}

	createTagName () {
		return `filters-${this.params.name}`
	}

	createElement (inputValues = '') {
		const $el = $(`
						<input 
							name="${this.createTagName()}" 
							type="input" 
							placeholder="filter..." 
							value='${inputValues}'
						/>
				`)

		return $el
	}
}