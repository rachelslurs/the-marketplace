var app = app || {};
(function() {
	require('uswds');
	var React = require('react');
	var ReactDOM = require('react-dom');
	const Table = require('react-bootstrap').Table;
	const Button = require('react-bootstrap').Button;
	const FormGroup = require('react-bootstrap').FormGroup;
	const Input = require('react-bootstrap').Input;
	const Modal = require('react-bootstrap').Modal;
	const OverlayTrigger = require('react-bootstrap').OverlayTrigger;
	var HouseholdData = require('./components/householdData.jsx');
	var Person = require('./components/person.jsx');
	// Main = require('./components/main.jsx');;

	// Needed for React Developer Tools ?
	// window.React = React;

	var HouseholdApp = React.createClass({
		getInitialState: function() {
			return {showModal: false};
		},
		close: function() {
			this.setState({showModal: false});
		},
		open: function() {
			this.setState({showModal: true});
			if (document.getElementById("name") && document.getElementById("description") && document.getElementById("fruit")) {
				$("#name").val("");
				$("#description").val("");
				$("#fruit").val("Apple");
			} else {
				requestAnimationFrame(this.open);
			}
		},
		add: function() {
			let newPerson = {
				name: document.getElementById("name").value,
				description: document.getElementById("description").value,
				fruit: document.getElementById("fruit").value
			};
			console.log('add it', newPerson);
			this.props.model.addPerson(newPerson);
			this.close();
		},

		destroy: function(person) {
			this.props.model.destroy(person);
		},

		render: function() {
			var main;
			var householdPersons = this.props.model.householdPersons;

			var persons = householdPersons.map(function(person) {
				return (<Person key={person.id} person={person} onDestroy={this.destroy.bind(this, person)}/>);
			}, this);

			return (
				<div>
					<Table bsClass="usa-table-borderless">
						<thead>
							<tr>
								<th scope="col">Full Name</th>
								<th scope="col">Description</th>
								<th scope="col">Favorite Fruit</th>
								<th scope="col">Del</th>
							</tr>
						</thead>
						<tbody>
							{persons}
						</tbody>
					</Table>
					<div>
						<Button bsClass="usa-button" onClick={this.open} id="show">
							Add Person
						</Button>

						<Modal show={this.state.showModal} onHide={this.close} aria-labelledby="modalTitle">
							<Modal.Header closeButton>
								<Modal.Title id="modalTitle">Add a Person</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<form className="usa-form">
									<input id="name" type="text" label="Name" placeholder="Enter name"/>
									<input id="description" type="text" label="Description" placeholder="Enter description"/>
									<input id="fruit" type="text" label="Favorite Fruit" placeholder="Enter favorite fruit"/>
								</form>
							</Modal.Body>
							<Modal.Footer>
								<Button onClick={this.add} bsClass="usa-button" id="add">Add Person to Household</Button>
								<Button onClick={this.close} bsClass="usa-button usa-button-gray">Close</Button>
							</Modal.Footer>
						</Modal>
					</div>
				</div>
			);
		}
	});

	var model = new HouseholdData("currentHousehold");
	function render() {
		ReactDOM.render(
			<HouseholdApp model={model}/>, document.getElementById("react-target"));
	}

	model.subscribe(render);
	render();

})();
