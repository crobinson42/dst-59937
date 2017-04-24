const Util = {
	// create a unique valued array
	uniq: (a = []) => {
		var seen = {};
		return a.filter(function(item) {
			return seen.hasOwnProperty(item) ? false : (seen[item] = true);
		});
	},

	setLocalStorage: (key, storageVal) => {
		let ls = Util.getLocalStorage()

		if (key) {
			ls[key] = storageVal
		} else {
			ls = storageVal
		}

		localStorage.setItem('dst-59937', JSON.stringify(ls))
	},

	getLocalStorage: (key) => {
		let ls = localStorage.getItem('dst-59937')

		if (!ls) {
			ls = JSON.stringify({})
		}

		try {
			ls = JSON.parse(ls)
		} catch (e) {}

		let returnVal = key ? ls[key] : ls

		return returnVal
	}
}

export default Util