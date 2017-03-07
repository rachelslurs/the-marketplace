// var app = app || {};

var Utils = {
	uuid: function() {
		/*jshint bitwise:false */
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

	pluralize: function(count, word) {
		return count === 1
			? word
			: word + 's';
	},

	store: function(namespace, data) {
		if (data) {
			return localStorage.setItem(namespace, JSON.stringify(data));
		}

		var store = localStorage.getItem(namespace);
		return (store && JSON.parse(store)) || [];
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

var HouseholdData = function(key) {
	this.key = key;
	console.log(key);
	this.householdPersons = Utils.store(key);
	this.onChanges = [];
};

HouseholdData.prototype.subscribe = function(onChange) {
	console.log('HouseholdData', 'subscribe');
	this.onChanges.push(onChange);
};

HouseholdData.prototype.inform = function() {
	console.log('HouseholdData', 'inform');
	Utils.store(this.key, this.householdPersons);
	this.onChanges.forEach(function(cb) {
		cb();
	});
};

HouseholdData.prototype.addPerson = function(title) {
	console.log('HouseholdData', 'addPerson');
	this.householdPersons = this.householdPersons.concat({id: Utils.uuid(), title: title, completed: false});

	this.inform();
};

HouseholdData.prototype.destroy = function(person) {
	console.log('HouseholdData', 'destroy');
	this.householdPersons = this.householdPersons.filter(function(candidate) {
		return candidate !== person;
	});

	this.inform();
};

HouseholdData.prototype.save = function(personToSave, text) {
	console.log('HouseholdData', 'save');
	this.householdPersons = this.householdPersons.map(function(person) {
		return person !== personToSave
			? person
			: Utils.extend({}, person, {title: text});
	});

	this.inform();
};

module.exports = HouseholdData;
