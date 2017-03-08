var Utils = {
	uuid: function() {
		var i,
			random;
		var uuid = '';

		for (i = 0; i < 32; i++) {
			random = Math.random() * 16 | 0;
			if (i === 8 || i === 12 || i === 16 || i === 20) {
				uuid += '-';
			}
			uuid += (i === 12
				? 4
				: (i === 16
					? (random & 3 | 8)
					: random)).toString(16);
		}
		return uuid;
	},

	store: function(namespace, data) {
    console.log('changed data', data);
		// If data is being changed
		if (data) {
			return localStorage.setItem(namespace, JSON.stringify(data));
		} else {
			var store = localStorage.getItem(namespace);
			return (store && JSON.parse(store)) || [];
		}

	},

	extend: function() {
		var newObj = {};
		for (var i = 0; i < arguments.length; i++) {
			var obj = arguments[i];
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					newObj[key] = obj[key];
				}
			}
		}
		return newObj;
	}
};

module.exports = Utils;
