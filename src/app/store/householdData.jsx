var Utils = require('../utils/utils.jsx');

var HouseholdData = function(key) {
	this.key = key;
	this.householdPersons = Utils.store(key);
	this.onChanges = [];
};

HouseholdData.prototype.subscribe = function(onChange) {
	this.onChanges.push(onChange);
};

HouseholdData.prototype.inform = function() {
	Utils.store(this.key, this.householdPersons);
	this.onChanges.forEach(function(cb) {
		cb();
	});
};

HouseholdData.prototype.addPerson = function(info) {
	this.householdPersons = this.householdPersons.concat({id: Utils.uuid(), name: info.name, description: info.description, fruit: info.fruit});
	this.inform();
};

HouseholdData.prototype.destroy = function(person) {
	this.householdPersons = this.householdPersons.filter(function(candidate) {
		return candidate !== person;
	});

	this.inform();
};

HouseholdData.prototype.save = function(personToSave, text) {
	this.householdPersons = this.householdPersons.map(function(person) {
		return person !== personToSave
			? person
			: Utils.extend({}, person, {text});
	});
	this.inform();
};

module.exports = HouseholdData;
