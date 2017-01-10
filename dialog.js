var tools = require('yobert-tools');
var tag = require('yobert-tag');
var append = require('yobert-append');

function window_size() {
	var wx, wy;
	if (window.innerWidth) {
		wx = window.innerWidth;
		wy = window.innerHeight;
	}
	if (!wx && document.documentElement) {
		wx = document.documentElement.clientWidth;
		wy = document.documentElement.clientHeight;
	}
	if (!wx) {
		var body = document.body || document.getElementsByTagName('body')[0];
		if (body) {
			if (body.clientWidth) {
				wx = body.clientWidth;
				wy = body.clientHeight;
			} else if (body.offsetWidth) {
				wx = body.offsetWidth;
				wy = body.offsetHeight;
			}
		}
	}

	return [wx, wy];
}

function element_size(e) {
	var rect = e.getBoundingClientRect();
	return [rect.width, rect.height];
}

function Dialog(title, body, buttons, options) {
	if(!options)
		options = {};

	var inner = tag('div', {'class':'dialog_inner'});

	if(title) {
		this.dom_title = tag('div', {'class':'dialog_title'}, title);
		append(inner, this.dom_title);

		// disable weird text selecty-ness
		this.dom_title.onmousedown = function() { return false; };
	}

	if(body) {
		this.dom_body = tag('div', {'class':'dialog_body'}, body);
		append(inner, this.dom_body);
	}

	if(buttons && buttons.length) {
		this.dom_buttons = this.buildButtons(buttons);
		append(inner, this.dom_buttons);
	}

	var div = tag('div', {'class':'dialog dialog_active'}, inner);
	div.style.position = 'fixed';

	this.dom = div;
	this.onclose = options.onclose;
	var that = this;

	if(options.modal) {
		this.dom_modal = _modal();
		this.modal_click_cb = function() {
			that.close();
		};
		tools.listen(this.dom_modal, 'click', this.modal_click_cb);
		document.body.appendChild(this.dom_modal);
	}

	document.body.appendChild(div);

	this.keydown_cb = tools.listen_key(window, 27, function() {
		that.close();
	})

	this.topLeft();
	this.fitToWindow();
	this.center();

	return;
}

function _modal() {

	var body = document.body,
		html = document.documentElement;

	var height = Math.max(
		body.scrollHeight, body.offsetHeight,
		html.clientHeight, html.scrollHeight,
		html.offsetHeight);

	var div = tag('div', {'class':'dialog_modal'});

	div.style.position = 'absolute';
	div.style.top = 0;
	div.style.left = 0;
	div.style.right = 0;
	div.style.height = height + 'px';

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

	var div = tag('div', {'class':'dialog_buttons'});
	var t = this;

	var close = function() {
		t.close();
	};

	for(var i = 0; i < buttons.length; i++) {
		function(b){
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
		}(buttons[i]);
	}

	return div;
}

Dialog.prototype.fitToWindow = function() {
	if(!this.dom_body)
		return;

	this.dom.style.left = '0px';
	this.dom.style.top = '0px';

	var window_xy = window_size();

	var ds, bs, spare;

	ds = element_size(this.dom);
	bs = element_size(this.dom_body);
	spare = [
		ds[0] - bs[0],
		ds[1] - bs[1]
	];

	if(ds[0] > window_xy[0]) {
		this.dom_body.style.width = (window_xy[0] - spare[0])+'px';
		this.dom_body.style.overflowX = 'scroll';
	}

	if(ds[1] > window_xy[1]) {
		this.dom_body.style.height = (window_xy[1] - spare[1])+'px';
		this.dom_body.style.overflowY = 'scroll';
	}

	return;
}

Dialog.prototype.topLeft = function() {
	this.dom.style.left = '0px';
	this.dom.style.top = '0px';
}

Dialog.prototype.center = function() {
	var div = this.dom;
	var window_xy = window_size();

	var l = Math.floor(window_xy[0]*0.5 - div.clientWidth*0.5);
	var t = Math.floor(window_xy[1]*0.5 - div.clientHeight*0.5);

	if(l < 0)
		l = 0;

	if(t < 0)
		t = 0;

	div.style.left = l+'px';
	div.style.top = t+'px';
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
			tools.unlisten(this.dom_modal, 'click', this.modal_click_cb)
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
