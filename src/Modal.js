import EventSky from 'event-sky'
import './Modal.css'

export default class Modal {
	constructor () {
		EventSky.on('modal::show', this.showModal)
		EventSky.on('modal::close', this.closeModal)
	}

	showModal = ({ $content, styleOverride = {} }) => {
		// create a $div el and give it the modal class
		this.$modal = $('<div />').addClass('modal')
		this.$modalContent = $('<div />').addClass('modal-content').css(styleOverride).append($content)
		this.$modalCloseBtn = $('<div />').addClass('close').text('X').click(this.closeModal)
		this.$modal.append(this.$modalContent.append(this.$modalCloseBtn))

		$('body').append(this.$modal)
	}

	closeModal = () => {
		// remove the modal from the DOM
		this.$modal.remove()
		this.$modalContent.remove()
		this.$modalCloseBtn.remove()
	}
}