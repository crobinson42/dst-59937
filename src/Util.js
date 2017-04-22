export default {
	// create a unique valued array
	uniq: (a = []) => {
		var seen = {};
		return a.filter(function(item) {
			return seen.hasOwnProperty(item) ? false : (seen[item] = true);
		});
	}
}
