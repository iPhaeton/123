function HoverIntent(options) {
	if (options.elem) this.elem = options.elem;
	else return;
	if (options.over) this.overFunction = options.over;
	if (options.out) this.outFunction = options.out;
	
	this._timer = undefined;
	this._speed = undefined;
	this._prevCoord = {x: undefined, y: undefined};
	this._curCoord = {x: undefined, y: undefined};
    this._prevTime = undefined;
    this._curTime = undefined;
	
	this.elem.addEventListener ("mouseover", this.over(this));
	this.elem.addEventListener ("mouseout", this.out(this));
	this.elem.addEventListener ("mousemove", this._trackMouse(this));
};

HoverIntent.prototype.over = function (self) {
	return function (event) {
		if (!self._checkForLeaving(event)) return;
		
		self._prevCoord.x = event.clientX;
		self._prevCoord.y = event.clientY;
        self._prevTime = Date.now();
		
		self._timer = setInterval(self._execute(event), 100);
	};
};

HoverIntent.prototype.out = function (self) {
	return function (event) {
		if (!self._checkForLeaving(event)) return;

		clearInterval(self._timer);

		self.outFunction ();
	};
};

HoverIntent.prototype._checkForLeaving = function (event) {
	var target = event.relatedTarget;
	while (target) {
		if (target === this.elem) return false;
		target = target.parentElement;
	};
	return true;
};

HoverIntent.prototype._execute = function (event) {
	var self = this;
	
	return function () {
		self._measureSpeed(event);

		if (self._speed < .01) {
			self.overFunction();
			clearInterval(self._timer);
		};
	};
};

HoverIntent.prototype._measureSpeed = function (event) {
    this._curTime = Date.now();
	this._speed = Math.sqrt(Math.pow(this._curCoord.x - this._prevCoord.x, 2) + Math.pow(this._curCoord.y - this._prevCoord.y, 2)) / (this._curTime - this._prevTime);

	this._prevCoord.x = this._curCoord.x;
	this._prevCoord.y = this._curCoord.y;
};

HoverIntent.prototype._trackMouse = function (self) {
	return function (event) {
		self._curCoord.x = event.clientX;
		self._curCoord.y = event.clientY;
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