(function() {
	require('uswds');
	const React = require('react');
	const ReactDOM = require('react-dom');
	const Col = require('react-bootstrap').Col;
	const Table = require('react-bootstrap').Table;
	const Button = require('react-bootstrap').Button;
	const Modal = require('react-bootstrap').Modal;
	const Overlay = require('react-bootstrap').Overlay;
	const Form = require('react-bootstrap').Form;
	const FormControl = require('react-bootstrap').FormControl;
	const FormGroup = require('react-bootstrap').FormGroup;
	const ControlLabel = require('react-bootstrap').ControlLabel;
	const Popover = require('react-bootstrap').Popover;
	const Fade = require('react-bootstrap').Fade;
	const HouseholdData = require('./store/householdData.jsx');
	const Person = require('./components/person.jsx');

	const HouseholdApp = React.createClass({
		getInitialState: function() {

			const householdPersons = this.props.model.householdPersons;
			const persons = (householdPersons.length < 1)
				? false
				: true;
			return {
				showModal: false,
				hasData: persons,
				showTip: !persons
			};
		},
		componentWillReceiveProps: function() {
			const householdPersons = this.props.model.householdPersons;
			if (householdPersons.length < 1) {
				this.setState({showTip: true});
			} else {
				this.setState({showTip: false});
			}
		},
		close: function() {
			if (this.state.hasData) {
				this.setState({showModal: false, showTip: false});
			} else {
				this.setState({showModal: false, showTip: true});
			}
		},
		open: function() {

			this.setState({showModal: true, showTip: false});
			if (document.getElementById("name") && document.getElementById("description") && document.getElementById("fruit")) {
				$("#name").val("");
				$("#description").val("");
				$("#fruit").val("Apple");
			} else {
				requestAnimationFrame(this.open);
			}
		},
		add: function() {
			const newPerson = {
				name: document.getElementById("name").value,
				description: document.getElementById("description").value,
				fruit: document.getElementById("fruit").value
			};
			this.props.model.addPerson(newPerson);
			this.setState({hasData: true});
			this.close();
		},

		destroy: function(person) {
			this.props.model.destroy(person);
			const householdPersons = this.props.model.householdPersons;
			if (householdPersons.length < 1) {
				this.setState({showTip: true, hasData: false});
			} else {
				this.setState({showTip: false});
			}
		},

		render: function() {
			const householdPersons = this.props.model.householdPersons;
			const persons = householdPersons.map(function(person) {
				return (<Person key={person.id} person={person} onDestroy={this.destroy.bind(this, person)}/>);
			}, this);
			const sharedProps = {
				show: this.state.showTip,
				target: () => ReactDOM.findDOMNode(this.refs.target)
			};
			return (
				<div>

					<Fade in={this.state.hasData}>
						<div>
							<Table responsive>
								<thead>
									<tr>
										<th scope="col">Full Name</th>
										<th scope="col">Description</th>
										<th scope="col">Favorite Fruit</th>
										<th scope="col">&nbsp;</th>
									</tr>
								</thead>
								<tbody>
									{persons}
								</tbody>
							</Table>
						</div>
					</Fade>
					<div>
						<div>
							<Button onClick={this.open} id="show" ref="target" bsSize="large">
								Add Person
							</Button>
							<Overlay {...sharedProps} placement="right">
								<Popover id="popover-positioned-top" title="Your household is empty">
									<p>Add a person to your household by clicking this button.</p>
								</Popover>
							</Overlay>
						</div>

						<Modal show={this.state.showModal} onHide={this.close} aria-labelledby="modalTitle">
							<Modal.Header closeButton>
								<Modal.Title id="modalTitle">Add a Person</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form horizontal>
									<FormGroup controlId="name">
										<Col componentClass={ControlLabel} sm={2}>
											Name
										</Col>
										<Col sm={10}>
											<FormControl type="text" placeholder="Name"/>
										</Col>
									</FormGroup>
									<FormGroup controlId="description">
										<Col componentClass={ControlLabel} sm={2}>
											Description
										</Col>
										<Col sm={10}>
											<FormControl type="text" placeholder="Description"/>
										</Col>
									</FormGroup>
									<FormGroup controlId="fruit">
										<Col componentClass={ControlLabel} sm={2}>
											Favorite Fruit
										</Col>
										<Col sm={10}>
											<FormControl type="text" placeholder="Favorite Fruit"/>
										</Col>
									</FormGroup>
								</Form>
							</Modal.Body>
							<Modal.Footer>
								<FormGroup>
									<Col smOffset={2} sm={10}>
										<Button onClick={this.add} id="add" type="submit" bsStyle="success">
											Add Person to Household
										</Button>
									</Col>
								</FormGroup>
								<FormGroup>
									<Col smOffset={2} sm={10}>
										<Button onClick={this.close} type="button">
											Close
										</Button>
									</Col>
								</FormGroup>
							</Modal.Footer>
						</Modal>
					</div>
				</div>
			);
		}
	});

	const model = new HouseholdData("currentHousehold");
	function render() {
		ReactDOM.render(
			<HouseholdApp model={model}/>, document.getElementById("react-target"));
	}

	model.subscribe(render);
	render();

})();
