var app = app || {};
(function() {
	require('uswds');
	var React = require('react');
	var ReactDOM = require('react-dom');

	var HouseholdApp = require('./components/householdApp.jsx');
	var HouseholdData = require('./components/householdData.jsx');
	// Main = require('./components/main.jsx');;

	// Needed for React Developer Tools ?
	// window.React = React;

	// Render the main app react component into the document body.
	// https://facebook.github.io/react/blog/2015/10/01/react-render-and-top-level-api.html

	var model = new HouseholdData("currentHousehold");
	function render() {
		ReactDOM.render(
			<HouseholdApp model={model}/>, document.getElementById("react-target"));
	}

	model.subscribe(render);
	render();

})();
