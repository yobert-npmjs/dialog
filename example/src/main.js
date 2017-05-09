var React = require('react');
var ReactDOM = require('react-dom');
var dialog = require('yobert-dialog');

window.main = function() {
	var body = document.createElement('div');

	ReactDOM.render(<div>
		dude! things! crap! blah blah blah blah!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>dude!<br/>
		dude!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		dude!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>dude!<br/>
		stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>dude!<br/>
	</div>, body);

	var d = new dialog('Test Dialog', body, ['Thing', 'Stuff'], {modal: true});

	window.onresize = function() {
		d.topLeft();
		d.fitToWindow();
		d.center();
	};
}

