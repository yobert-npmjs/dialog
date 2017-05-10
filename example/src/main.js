var React = require('react');
var ReactDOM = require('react-dom');
var dialog = require('yobert-dialog');
var tools = require('yobert-tools');

window.main = function() {

/*	var things = document.getElementById('things');
	setTimeout(function(){
		ReactDOM.render(<div>
			dude! things! crap! blah blah blah blah!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
			stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
			stuff!<br/>dude!<br/>dude!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
			dude! things! crap! blah blah blah blah!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
			stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
			stuff!<br/>dude!<br/>dude!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
			dude! things! crap! blah blah blah blah!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
			stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
			stuff!<br/>dude!<br/>dude!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		</div>, things);
	}, 1000);*/

	var body = document.createElement('div');

	setTimeout(function(){
	ReactDOM.render(<div>
		first content in body<br/>
		dude! things! crap! blah blah blah blah!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>dude!<br/>
		stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>dude!<br/>
		last content in body<br/>
	</div>, body);

	}, 100);

	var d = new dialog('Test Dialog', body, ['Thing', 'Stuff'], {modal: true});

	var resize = function() {
		d.topLeft();
		d.fitToWindow();
		d.center();
	};

	//resize();
	//tools.listen(window, 'resize', resize);
}

