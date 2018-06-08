var inherits = require("util").inherits;

var interact = require('interactjs');
var EventEmitter = require("events");

function dragMoveListener (event) {
    var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform ='translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}


var tileDiv = document.getElementById("tiles");
/**
* @typedef {object} TileOptions
* @property {string} id
* @property {string} title
* @property {number} x
* @property {number} y
* @property {number} height
* @property {number} width
* @property {string} content - will be used with urls soon - currently just a div surrounding your content
*/
/**
* @class Tile
* @extends EventEmitter
*/
class Tile{
	/**
	* @constructor
	* @param {TileOptions} o 
	*/
	constructor(o){
		inherits(Tile,EventEmitter);
		this.pos = {x:o.x,y:o.y};
		this.size = {height:o.height,width:o.width};
		this.id = o.id;
		if (window.tm.tileExists(this.id)){
			throw new Error("that tile already exists, please use a different id");
		}
		this.window = document.createElement("div");
		this.window.id = this.id;
		this.window.classList.add("hidden","system-tile");
		this.window.style.maxHeight = this.size.height+"px";
		this.window.style.maxWidth = this.size.width+"px";
		this.window.style.position = "absolute";
		this.window.style.left = this.pos.x + "px";
		this.window.style.top = this.pos.y + "px";
		tileDiv.appendChild(this.window);
		this.titleDiv = document.createElement("div");
		this.titleDiv.id = this.id + "-title";
		this.titleDiv.innerText = o.title;
		this.titleDiv.classList.add("system-tile-title");
		this.window.appendChild(this.titleDiv);
		this.content = document.createElement("div");
		if (o.content){
			this.content.innerHTML = o.content;
		}
		this.content.id = this.id + "-content";
		this.content.classList.add("system-tile-content");
		this.window.appendChild(this.content);
	}
	show(){
		if (this.window.classList.contains("hidden")) this.window.classList.remove("hidden");
	}
}
/**
* @class TileManager
* @extends EventEmitter
*/
class TileManager{
	constructor(){
		inherits(TileManager,EventEmitter);
		this.tiles = {};
		this.getTile = function(id){
			return this.tiles[id];
		};
	}
	/**
	* Register a tile, but don't display it
	* @param {TileOptions} options 
	* @fires TileManager#register
	*/
	registerTile(options){
		var opts = {
			x:32,
			y:32,
			height: 0
		};
		Object.assign(opts,options);
		if (opts.id === undefined || opts.title === undefined){
			throw new ReferenceError("your tile id or title is undefined");
		}
		try {
			var tile = new Tile(options);
			this.tiles[tile.id] = tile;
			/**
			* @event TileManager#register
			* @type {Tile}
			*/
			this.emit("register");
			interact(`#${tile.window.id}`).draggable({
				allowFrom:`#${tile.titleDiv.id}`,
				ignoreFrom: `#${tile.content.id}`,
				onmove:dragMoveListener
			}).resizable({
				restrict:{
					restriction: "parent"
				}
			});
			/*
			tile.titleDiv.addEventListener("mousedown",function(evt){
				tile.titleDiv.addEventListener("mousemove",drag,false);
				document.body.addEventListener("mouseup",()=>tile.titleDiv.removeEventListener("mousemove",drag,false),false);
				function drag(evt){
					var winpos = {
						x: parseFloat(tile.window.style.left),
						y: parseFloat(tile.window.style.top)
					};
					tile.window.style.top = (winpos.y + evt.movementY) + "px";
					tile.window.style.left = (winpos.x + evt.movementX) + "px";
				}
			},false);*/
			return tile;
		}catch (e){
			throw e;
		}
	}
	tileExists(id){
		if (this.getTile(id) == undefined)return false;
		else return true;
	}
}

module.exports = {
	Tile,
	TileManager
};