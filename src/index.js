/* features
	- shortcut keys and filters for saved/predefined filters

	@todo: sidescripts
	- move this user's rows to top (prompt for local storage to set this user)
  - user colors for tr types ie: HOTFIX make background red
  - click on edit task link to show a modal/iframe instead of opening task
*/

import FilterInput from './FilterInput'
import TagInput from './TagInput'
import './styleOverRide.css'

(function iife () {
	// column filter inputs
	const $elements = {
		summary: $(`tbody td.summary`),
		project: $(`tbody td.project`),
		category: $(`tbody td.category`),
		priority: $(`tbody td.priority`),
		status: $(`tbody td.status`),
		release: $(`tbody td.release`),
		assignedTo: $(`tbody td.assignedTo`),
	}

	// listen for input filter events finishing
	const filterCallback = () => {
		$('tbody tr').each((i, tr) => {
			// if there is a .tagify-hide, then hide row
			if ($(tr).find('td.tagify-hide').length) {
				$(tr).addClass('hidden')
			}
			else {
				$(tr).removeClass('hidden')
			}
		})
	}

	new FilterInput({
		name: `summary`,
		$inputContainer: $(`th.summary`),
		$filterElements: $elements.summary,
		filterCallback,
	})

		new TagInput({
			name: `project`,
			$inputContainer: $(`th.project`),
			$autocompleteElements: $elements.project,
			ignorePattern: '',
			filterCallback,
		})

		new TagInput({
			name: `category`,
			$inputContainer: $(`th.category`),
			$autocompleteElements: $elements.category,
			ignorePattern: '',
			filterCallback,
		})

		new TagInput({
			name: `priority`,
			$inputContainer: $(`th.priority`),
			$autocompleteElements: $elements.priority,
			ignorePattern: '',
			filterCallback,
		})

		new TagInput({
			name: `status`,
			$inputContainer: $(`th.status`),
			$autocompleteElements: $elements.status,
			ignorePattern: '',
			filterCallback,
		})

		new TagInput({
			name: `release`,
			$inputContainer: $(`th.release`),
			$autocompleteElements: $elements.release,
			ignorePattern: '',
			filterCallback,
		})

		new TagInput({
			name: `assignedTo`,
			$inputContainer: $(`th.assignedTo`),
			$autocompleteElements: $elements.assignedTo,
			ignorePattern: '',
			filterCallback,
		})
})()