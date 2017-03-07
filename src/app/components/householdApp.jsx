var React = require('react');
var ReactDOM = require('react-dom');
var Bootstrap = require('react-bootstrap');

// const Grid = Bootstrap.Grid, Row = Bootstrap.Row, Col = Bootstrap.Col;
// const Panel = Bootstrap.Panel;
const Table = require('react-bootstrap').Table;
const Button = require('react-bootstrap').Button;
const FormGroup = require('react-bootstrap').FormGroup;
const Input = require('react-bootstrap').Input;
const Modal = require('react-bootstrap').Modal;
const OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Person = require('./person.jsx');

let persons = [];
// app.ALL_PERSONS = 'all';
// var TodoFooter = app.TodoFooter;

var ENTER_KEY = 13;

var AddPersonModal = React.createClass({
	getInitialState: function() {
		console.log('AddPersonModal', 'getInitialState');
		console.log(this);
		return {showModal: false};
	},
	close: function() {
		console.log('close');
		this.setState({showModal: false});
	},
	open: function() {
		console.log('open');
		this.setState({showModal: true});
		if (document.getElementById("name") && document.getElementById("description") && document.getElementById("fruit")) {
			$("#name").val("");
			$("#description").val("");
			$("#fruit").val("");
		} else {
			requestAnimationFrame(this.open);
		}
	},
	add: function() {
		console.log('add');
		let name = document.getElementById("name").value;
		let description = document.getElementById("description").value;
		let fruit = document.getElementById("fruit").value;
		if (name.length < 1)
			name = "Unknown";
		console.log('add it');
		// household.push({name: name, description: description, fruit: fruit});
		// Household.update();
		this.close();
	},
	render: function() {
		return (
			<div>
				<Button bsClass="usa-button" onClick={this.open} id="show">
					Add Person
				</Button>
				<Modal bsSize="small" show={this.state.showModal} onHide={this.close} aria-labelledby="modalTitle">
					<Modal.Header closeButton>
						<Modal.Title id="modalTitle">Add a Person</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form>
							<Input id="title" type="text" label="Title" placeholder="Enter title"/>
							<Input id="name" type="text" label="Name" placeholder="Enter name"/>
							<Input id="description" type="text" label="Description" placeholder="Enter description"/>
							<Input id="fruit" type="text" label="Favorite Fruit" placeholder="Enter favorite fruit"/>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.add} bsClass="usa-button" id="add">Add Person to Household</Button>
						<Button onClick={this.close} bsClass="usa-button usa-button-gray">Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
});

var HouseholdApp = React.createClass({
	getInitialState: function() {
		console.log('HouseholdApp', 'getInitialState');
		return {nowShowing: 'app.ALL_PERSONS', editing: null, newPerson: ''};
	},

	componentDidMount: function() {
		console.log('HouseholdApp', 'componentDidMount');
		var setState = this.setState;
	},

	handleChange: function(event) {
		console.log('HouseholdApp', 'handleChange');
		this.setState({newPerson: event.target.value});
	},

	addNewPerson: function() {
		console.log('HouseholdApp', 'addNewPerson');

	},

	handleNewPersonKeyDown: function(event) {
		console.log('HouseholdApp', 'handleNewPersonKeyDown');
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		var val = this.state.newPerson.trim();

		if (val) {
			console.log('HouseholdApp', 'if val');
			this.props.model.addPerson(val);
			this.setState({newPerson: ''});
		}
	},

	destroy: function(person) {
		console.log('HouseholdApp', 'destroy');
		this.props.model.destroy(person);
	},

	edit: function(person) {
		console.log('HouseholdApp', 'edit');
		this.setState({editing: person.id});
	},

	save: function(personToSave, text) {
		console.log('HouseholdApp', 'save');
		this.props.model.save(personToSave, text);
		this.setState({editing: null});
	},

	cancel: function() {
		console.log('HouseholdApp', 'cancel');
		this.setState({editing: null});
	},

	render: function() {
		var main;
		var householdPersons = this.props.model.householdPersons;

		var persons = householdPersons.map(function(person) {
			return (<Person key={person.id} person={person} onDestroy={this.destroy.bind(this, person)} name={person.name} onSave={this.save.bind(this, person)} onCancel={this.cancel}/>);
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
					<input className="new-todo" placeholder="What needs to be done?" value={this.state.newPerson} onKeyDown={this.handleNewPersonKeyDown} onChange={this.handleChange} autoFocus={true}/>
				</div>
			</div>
		);
	}
});

module.exports = HouseholdApp;
