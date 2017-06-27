var tools = require('yobert-tools');
var tag = require('yobert-tag');
var append = require('yobert-append');

var stacked_modals = 0;

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

	var div = tag('div', {'class':'dialog_modal', 'style':'position: fixed; top: 0; left: 0; bottom: 0; right: 0; display: flex; align-items: center; justify-content: center;'}, outer);
	this.dom = div;

	this.onclose = options.onclose;
	var that = this;

	document.body.appendChild(div);
	if(stacked_modals == 0) {
		document.body.style.overflow = 'hidden';
	}
	stacked_modals++;

	this.keydown_cb = tools.listen_key(document, 27, function() {
		that.close();
	})

	this.modal_onclick = function(evt) {
		tools.event_stop_prop(evt);
		that.close();
	}

	tools.listen(document, 'click', this.modal_onclick);

	return;
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
		tools.unlisten(document, 'keydown', this.keydown_cb);
		delete this.keydown_cb;
	}
	if(this.modal_onclick) {
		tools.unlisten(document, 'click', this.modal_onclick);
		delete this.modal_onclick;
	}

	stacked_modals--;
	if(stacked_modals == 0) {
		document.body.style.overflow = 'auto';
	}

	if(!this.dom)
		return;

	if(!this.dom.parentNode)
		return;

	this.dom.parentNode.removeChild(this.dom);
	return;
}

module.exports = Dialog;
