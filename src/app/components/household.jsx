var React = require('react');
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

var Household = React.createClass({
  render: function() {
    return (
      <Table bsClass="usa-table-borderless">
        <thead>
          <tr>
            <th scope="col">Full Name</th>
            <th scope="col">Description</th>
            <th scope="col">Favorite Fruit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Alexander Hamilton</th>
            <td>Household Contact</td>
            <td>Apple</td>
          </tr>
          <tr>
            <th scope="row">Rachel Cantor</th>
            <td>Dependent</td>
            <td>Banana</td>
          </tr>
        </tbody>
      </Table>
    );
  }
});

module.exports = Household;
