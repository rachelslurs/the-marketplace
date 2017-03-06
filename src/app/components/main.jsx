var React = require('react');
// var Bootstrap = require('react-bootstrap');

// var Navigation = require('./navigation.jsx');
// usage example:
//<Navigation projectName="the-marketplace" />

var Household = require('./household.jsx');
// usage example:
//<Navigation projectName="the-marketplace" />

var Main = React.createClass({

  render: function() {
    return (
      <div>
        <div className="container">
          <h2>My Current Household</h2>
          <Household projectName="the-marketplace"/>
        </div>
      </div>
    );
  }

});

module.exports = Main;
