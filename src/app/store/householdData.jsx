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
  var uniqueId = Utils.uuid();
	this.householdPersons.push({id: uniqueId, name: info.name, description: info.description, fruit: info.fruit});
	this.inform();
};

HouseholdData.prototype.destroy = function(person) {
	this.householdPersons = this.householdPersons.filter(function(candidate) {
		return candidate !== person;
	});
	this.inform();
};

module.exports = HouseholdData;
