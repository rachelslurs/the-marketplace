var React = require('react');
var ReactDOM = require('react-dom');
var Bootstrap = require('react-bootstrap');

const Button = Bootstrap.Button,
	Input = Bootstrap.Input;
const Modal = Bootstrap.Modal;
const OverlayTrigger = Bootstrap.OverlayTrigger;

var Person = React.createClass({
	handleSubmit: function(event) {
		console.log('person', 'handleSubmit');
		var val = this.state.editText.trim();
		if (val) {
			this.props.onSave(val);
			this.setState({editText: val});
		} else {
			this.props.onDestroy();
		}
	},

	handleEdit: function() {
		this.props.onEdit();
		this.setState({editText: this.props.person.title});
	},

	handleKeyDown: function(event) {
		console.log('person', 'handleKeyDown');
		if (event.which === ESCAPE_KEY) {
			this.setState({editText: this.props.person.title});
			this.props.onCancel(event);
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}
	},

	handleChange: function(event) {
		console.log('person', 'handleChange');
		if (this.props.editing) {
			this.setState({editText: event.target.value});
		}
	},

	getInitialState: function() {
		console.log('person', 'getInitialState');
		return {editText: this.props.person.title};
	},

	/**
		 * This is a completely optional performance enhancement that you can
		 * implement on any React component. If you were to delete this method
		 * the app would still work correctly (and still be very performant!), we
		 * just use it as an example of how little code it takes to get an order
		 * of magnitude performance improvement.
		 */
	shouldComponentUpdate: function(nextProps, nextState) {
		return (nextProps.person !== this.props.person || nextProps.editing !== this.props.editing || nextState.editText !== this.state.editText);
	},

	/**
		 * Safely manipulate the DOM after updating the state when invoking
		 * `this.props.onEdit()` in the `handleEdit` method above.
		 * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
		 * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
		 */
	componentDidUpdate: function(prevProps) {
		if (!prevProps.editing && this.props.editing) {
			var node = React.findDOMNode(this.refs.editField);
			node.focus();
			node.setSelectionRange(node.value.length, node.value.length);
		}
	},

	render: function() {
		return (
			<tr>
				<th scope="row">{this.props.person.title} {this.props.person.name}</th>
				<td>{this.props.description}</td>
				<td>{this.props.fruit}</td>
				<td>
					<Button className="destroy" onClick={this.props.onDestroy}>Delete</Button>
				</td>
			</tr>
		);
	}
});
module.exports = Person;
