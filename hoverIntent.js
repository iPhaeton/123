function HoverIntent(options) {
	if (options.elem) this.elem = options.elem;
	else return;
	if (options.over) this.overFunction = options.over;
	if (options.out) this.outFunction = options.out;
	
	this.timer = undefined;
	
	this.elem.addEventListener ("mouseover", this.over(this));
	this.elem.addEventListener ("mouseout", this.out(this));
};

HoverIntent.prototype.over = function (self) {
	return function (event) {
		var target = event.relatedTarget;
		while (target) {
			if (target === self.elem) return;
			target = target.parentElement;
		};

		self.timer = setTimeout(self.overFunction, 500);
	};
};

HoverIntent.prototype.out = function (self) {
	return function (event) {
		var target = event.relatedTarget;
		while (target) {
			if (target === self.elem) return;
			target = target.parentElement;
		};

		clearTimeout(self.timer);
		self.outFunction ();
	};
};
//---------------------------------------------------------------------------------------

//Hint
function Hint (elem, text) {
	this.createHint (elem, text);
};
	
Hint.prototype.show = function () {
	this._hint.hidden = "";
};
	
Hint.prototype.hide = function () {
	this._hint.hidden = "true";
};
	
Hint.prototype.createHint = function (elem, text) {
	if (this._hint) return;
		
	this._parent = elem;
	
	this._hint = document.createElement("div");
	this._hint.style.cssText = "\
		position: absolute;\
		background-color: #eeff00;\
		border: 1px solid #bbb";
	this._hint.innerHTML = text;
	
	this._parent.appendChild (this._hint);
	this._hint.style.top = this._parent.offsetTop - this._hint.offsetHeight	+ "px";
	this._hint.style.left = this._parent.offsetLeft + "px";
};
	
Hint.prototype.delete = function () {
	this._parent.removeChild (this._hint);
	this._hint = undefined;
};
//---------------------------------------------------------------------------------------