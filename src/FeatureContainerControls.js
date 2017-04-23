// This function will add the controls container above the $table input

import EventSky from 'event-sky'
import Util from './Util'
import './Controls.css'

const $createButton = () => $('<input />').attr('type','submit')

export default function () {
	const $container = $('<div class="controlsContainer" />')

	// add container before table
	$container.insertBefore('table')

	// create buttons
	addButtonsToContainer($container)

	// todo: create a Clear Filters btn

	EventSky.on('controls::reload', () => {
		$container.empty()

		addButtonsToContainer($container)
	})

}

function addButtonsToContainer ($container) {
	const $saveButton = $createButton()
	$saveButton.attr('value','Save Filters')
	$container.append($saveButton)
	$saveButton.click(function (e) {
		e.stopPropagation()
		e.preventDefault()

		// get all filter input values from local storage
		const currentTags = Util.getLocalStorage('tags')
		let saved = Util.getLocalStorage('saved')

		if (!saved) {
			saved = []
			Util.setLocalStorage('saved', saved)
		}

		// create a modal content container
		const $modalContent = $('<div style="display:flex;align-items: center;justify-content: center;flex-direction:column;"/>')
		// show input name for label
		const $inputLabel = $('<input placeholder="Name..."/>')
		// save btn stores the current tags into a label named
		const $saveBtn = $('<input type="submit" maxlength="140"/>').attr('value','Save')

		// adding elements to container
		$modalContent
			.append('<h3>Filter Name</h3>')
			.append($inputLabel)
			.append('<br/>')
			.append($saveBtn)
			.append('<br/>')

		$saveBtn.click(function (e) {
			e.stopPropagation()
			e.preventDefault()

			if (!$inputLabel.val() || !$inputLabel.val().length) return

			saved.push({ name: $inputLabel.val(), tags: currentTags })
			Util.setLocalStorage('saved', saved)

			EventSky.trigger('modal::close')
			EventSky.trigger('controls::reload')
		})

		// open modal
		EventSky.trigger('modal::show', { $content: $modalContent, styleOverride: { width: '300px' }})
	})

	// add all saved filters to controlsContainer
	const savedFilters = Util.getLocalStorage('saved') || []

	savedFilters.forEach(filter => {
		// make the delete button
		const $del = $('<button />').addClass('delete').text('X').css('color', 'red').addClass('hidden')

		$del.click(() => {
			// delete this filter
			const newLocalStorage = Util.getLocalStorage('saved')
				.filter(savedTags => savedTags.name !== filter.name)

			Util.setLocalStorage('saved', newLocalStorage)

			EventSky.trigger('controls::reload')
		})

		$container.append(
			$('<div />')
				.css({ display: 'inline-block' })
				.append(
					$createButton()
						.css('color', 'grey')
						.attr('value', filter.name)
						.attr('data-tags', JSON.stringify(filter.tags))
				)
				.append($del)
				.mouseover(function () {
					console.log(`hover`)

					$(this).find('button').removeClass('hidden')
				})
				.mouseleave(function () {
					$(this).find('button').addClass('hidden')
				})
		)
	})

	// turn on listeners for each saved tag filter input-button
	$('input[data-tags]').click(function (e) {
		e.stopPropagation()
		e.preventDefault()

		const tags = JSON.parse($(this).attr('data-tags'))

		Util.setLocalStorage('tags', tags)

		EventSky.trigger('taginput::reload')
	})

}