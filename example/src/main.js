var React = require('react');
var ReactDOM = require('react-dom');
var dialog = require('yobert-dialog');
var tools = require('yobert-tools');

window.main = function() {

	var body = document.createElement('div');

//	setTimeout(function(){
	ReactDOM.render(<div>
		first content in body<br/>

		<input type="text"     onChange={function(){console.log("changed text")}} /> <br/>
		<input type="checkbox" onChange={function(){console.log("checked")}} />      <br/>

		dude! things! crap! blah blah blah blah!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>dude!<br/>
		stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>stuff!<br/>
		stuff!<br/>dude!<br/>
		last content in body<br/>
	</div>, body);
//	}, 100);

	var d = new dialog('Test Dialog', body, ['Thing', 'Stuff'], {modal: false})

	var resize = function() {
		d.topLeft()
		d.fitToWindow()
		d.center()
	}

	//resize();
	//tools.listen(window, 'resize', resize);
}

