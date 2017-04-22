export default class Table {
	constructor (options) {

	}

	/**
	 * This method will get all text variations from a given selector.
	 * ie: pass in a selector `td.assignedTo` and it will return a dup free
	 * array of text in each DOM element the selector matched
	 * @param selector {string} the selector to use to find text
	 * @param ignorePattern {regex} pattern to ignore when creating list
	 * @return {[string]}
	 */
	getOptionsList ({ selector, ignorePattern }) {
		// select all on page
		// make a duplicate free array of texts
		// remove any ignorePatterns from list

		return []
	}
}