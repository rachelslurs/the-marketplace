var React = require('react');
var ReactDOM = require('react-dom');
var Bootstrap = require('react-bootstrap');

const Button = Bootstrap.Button;

var Person = React.createClass({
	render: function() {
		return (
			<tr>
				<th scope="row">{this.props.person.name}</th>
				<td>{this.props.person.description}</td>
				<td>{this.props.person.fruit}</td>
				<td>
					<Button className="destroy" onClick={this.props.onDestroy}>Delete</Button>
				</td>
			</tr>
		);
	}
});
module.exports = Person;
