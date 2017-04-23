/* features
	- shortcut keys and filters for saved/predefined filters

	@todo: sidescripts
	- move this user's rows to top (prompt for local storage to set this user)
  - user colors for tr types ie: HOTFIX make background red
  - click on edit task link to show a modal/iframe instead of opening task
*/

import Modal from './Modal'
import FeatureColumnInputs from './FeatureColumnInputs'
import FeatureContainerControls from './FeatureContainerControls'
import './styleOverRide.css'
import EventSky from 'event-sky'

(function iife () {
	if (!/chrome/gi.test(navigator.userAgent)) {
		return console.info(`
			***********************************************************************
			* Life is better when you use Chrome as your primary browser.... :-/  *
			*	                                                                    *
			* Switch to Chrome to use awesome features on the task board!         *
			***********************************************************************
		`)
	}

	// instantiate modal
	new Modal()

	// make EventSky available globally
	window.EventSky = EventSky

	// column filter inputs
	FeatureColumnInputs()

	// container controls
	FeatureContainerControls()
})()