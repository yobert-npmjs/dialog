var tools = require('yobert-tools');
var tag = require('yobert-tag');
var append = require('yobert-append');

function Dialog(title, body, buttons, options) {
	if(!options)
		options = {};

	var inner = tag('div', {'class':'dialog_inner dialog_active', 'style':'display: flex; max-height: 100%; flex-direction: column;'});

	if(title) {
		this.dom_title = tag('div', {'class':'dialog_title', 'style':'flex-shrink: 0;'}, title);
		append(inner, this.dom_title);

		// disable weird text selecty-ness
		this.dom_title.onmousedown = function() { return false; };
	}

	if(body) {
		this.dom_body = tag('div', {'class':'dialog_body', 'style':'overflow: auto;'}, body);
		append(inner, this.dom_body);
	}

	if(buttons && buttons.length) {
		this.dom_buttons = this.buildButtons(buttons);
		append(inner, this.dom_buttons);
	}

	var outer = inner;

	tools.listen(outer, 'click', function(evt) {
		tools.event_stop_prop(evt);
	});

	var div = tag('div', {'style':'position: fixed; top: 0; left: 0; bottom: 0; right: 0; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center;'}, outer);
	this.dom = div;

	this.onclose = options.onclose;
	var that = this;

	if(options.modal) {
		this.dom_modal = _modal();
		this.modal_click_cb = function() {
			that.close();
		};
		tools.listen(this.dom, 'click', this.modal_click_cb);
		document.body.appendChild(this.dom_modal);
	}

	document.body.appendChild(div);

	this.keydown_cb = tools.listen_key(window, 27, function() {
		that.close();
	})

//	this.topLeft();
//	this.fitToWindow();
//	this.center();

	return;
}

function _modal() {

	var body = document.body,
		html = document.documentElement;

	var div = tag('div', {'class':'dialog_modal'});

	div.style.position = 'fixed';
	div.style.top = 0;
	div.style.left = 0;
	div.style.right = 0;
	div.style.bottom = 0;

	document.body.style.overflow = 'hidden';

	return div;
}
function _modal_close(div) {
	div.parentNode.removeChild(div);

	document.body.style.overflow = 'auto';
}

Dialog.prototype.buildButtons = function(buttons) {
	if(!buttons || !buttons.length)
		return;

	var div = tag('div', {'class':'dialog_buttons', 'style':'flex-shrink: 0;'});
	var t = this;

	var close = function() {
		t.close();
	};

	for(var i = 0; i < buttons.length; i++) {
		(function(b){
			if(!b)
				return

			if(typeof b === "string")
				b = {'value': b};

			var i = tag('input', {'type':'button', 'value':b.value});
			var oc = b.onclick;
			if(oc) {
				tools.listen(i, 'click', function() {
					if(!oc.call(t))
						t.close();
				});
			} else {
				tools.listen(i, 'click', close);
			}

			append(div, i);
			append(div, ' ');
		})(buttons[i]);
	}

	return div;
}

Dialog.prototype.close = function() {
	if(this.onclose && !this.onclose())
		return;

	if(this.keydown_cb) {
		tools.unlisten(window, 'keydown', this.keydown_cb);
		delete this.keydown_cb;
	}

	if(this.dom_modal) {
		if(this.modal_click_cb) {
			tools.unlisten(this.dom, 'click', this.modal_click_cb)
			delete this.modal_click_cb;
		}
		_modal_close(this.dom_modal);
		delete this.dom_modal;
	}

	if(!this.dom)
		return;

	if(!this.dom.parentNode)
		return;

	this.dom.parentNode.removeChild(this.dom);
	return;
}

module.exports = Dialog;
