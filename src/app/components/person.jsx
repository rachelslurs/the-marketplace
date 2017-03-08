const React = require('react');
const Button = require('react-bootstrap').Button;

const Person = React.createClass({
	render: function() {
    console.log("this.props", this.props.person);
		return (
			<tr>
				<th scope="row" id={this.props.person.id}>{this.props.person.name}</th>
				<td>{this.props.person.description}</td>
				<td>{this.props.person.fruit}</td>
				<td className="button-column">
					<Button className="destroy" onClick={this.props.onDestroy} bsStyle="danger">
						<span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
						<span className="sr-only">Remove Person</span>
					</Button>
				</td>
			</tr>
		);
	}
});
module.exports = Person;
