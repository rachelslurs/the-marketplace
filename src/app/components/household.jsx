var React = require('react');
var ReactDOM = require('react-dom');
var Bootstrap = require('react-bootstrap');

// const Grid = Bootstrap.Grid, Row = Bootstrap.Row, Col = Bootstrap.Col;
// const Panel = Bootstrap.Panel;
const Table = Bootstrap.Table;
const Button = Bootstrap.Button,
	Input = Bootstrap.Input;
const ButtonToolbar = Bootstrap.ButtonToolbar;
const ButtonGroup = Bootstrap.ButtonGroup;
const Modal = Bootstrap.Modal;
const OverlayTrigger = Bootstrap.OverlayTrigger;

let persons = [];

// Load household or set default household occupants
if (typeof localStorage["currentHousehold"] != "undefined") {
	let household = JSON.parse(localStorage["currentHousehold"]);
} else {
	let household = [
		{
			name: "Alexander Hamilton",
			description: "Household Contact",
			fruit: "Apple"
		}
	];
}

// Update function to display the household
function update() {
	console.log(JSON.stringify(household));
	localStorage.setItem("currentHousehold", JSON.stringify(household));
	var persons = [];
	for (var i = 0; i < household.length; i++) {
		persons.push(<Person key={i} name={household[i].name} description={household[i].description} fruit={household[i].fruit}/>);
	}
	ReactDOM.render(
		<Household data={persons}/>, document.getElementById("household"));
}

var Person = React.createClass({
	render: function() {
		return (
			<tr>
				<th scope="row">{this.props.name}</th>
				<td>{this.props.description}</td>
				<td>{this.props.fruit}</td>
			</tr>
		)
	}
});

var AddPerson = React.createClass({
	getInitialState: function() {
		return {showModal: false};
	},
	close: function() {
		defaultName = "";
		defaultDescription = "";
		defaultFruit = "";
		this.setState({showModal: false});
	},
	open: function() {
		this.setState({showModal: true});
		if (document.getElementById("name") && document.getElementById("description") && document.getElementById("fruit")) {
			$("#name").val(defaultName);
			$("#description").val(defaultDescription);
			$("#fruit").val(defaultFruit);
		} else {
			requestAnimationFrame(this.open);
		}
	},
	add: function() {
		let name = document.getElementById("name").value;
		let description = document.getElementById("description").value;
		let fruit = document.getElementById("fruit").value;
		if (name.length < 1)
			name = "Unknown";
		household.push({name: name, description: description, fruit: fruit});
		Household.update();
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
							<Input type="hidden" id="personId"/>
							<Input type="text" label="Person" placeholder="Person Name" id="name"/>
							<Input type="textarea" label="Description" placeholder="Enter description" id="description"/>
							<Input type="text" label="Favorite Fruit" placeholder="Enter favorite fruit" id="fruit"/>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.add} bsClass="usa-button" id="add">Add Person to Household</Button>
						<Button onClick={this.close} bsClass="usa-button usa-button-gray">Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
});

var Household = React.createClass({
	getInitialState: function() {
		if (typeof localStorage["currentHousehold"] != "undefined") {
			console.log('hi');
			return {
				data: JSON.parse(localStorage.getItem('currentHousehold'))
			};
		} else {
			console.log('bye');
			return {};
		}
	},
	componentDidMount: function() {
		if (typeof localStorage["currentHousehold"] != "undefined") {
			console.log(this.state);
			let currentHousehold = JSON.parse(localStorage["currentHousehold"]);
			this.setState({data: currentHousehold});
		} else {
			let defaultState = [
				{
					name: "Alexander Hamilton",
					description: "Household Contact",
					fruit: "Apple"
				}
			];
			console.log(this.state);
			localStorage.setItem("currentHousehold", JSON.stringify(defaultState));
		}
	},
	update: function() {
		let household = this.state;
		console.log(JSON.stringify(household));
		localStorage.setItem("currentHousehold", JSON.stringify(household));
		for (var i = 0; i < household.length; i++) {
			persons.push(<Person key={i} name={household[i].name} description={household[i].description} fruit={household[i].fruit}/>);
		}
	},
	render: function() {
		let household = this.state;
		console.log(JSON.stringify(household));
		for (var i = 0; i < household.length; i++) {
			persons.push(<Person key={i} name={household[i].name} description={household[i].description} fruit={household[i].fruit}/>);
		}
		return (
			<Table bsClass="usa-table-borderless" data={persons}>
				<thead>
					<tr>
						<th scope="col">{this.props.projectName}</th>
						<th scope="col">Full Name</th>
						<th scope="col">Description</th>
						<th scope="col">Favorite Fruit</th>
					</tr>
				</thead>
				<tbody>
					{persons}
				</tbody>
			</Table>
		);
	}
});

module.exports = Household;
