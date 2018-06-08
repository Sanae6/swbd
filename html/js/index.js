module.exports = function(){
    require("./time.js")();
    var {TileManager} =require("./tiles.js");
    window.tm = new TileManager();
    window.testTile = tm.registerTile({
        id: "testing",
        x: 120,
        title: "Testing Tile",
        content: `<div>Node version: ${process.versions.node}`+
        `<br>Chrome version: ${process.versions.chrome}<br>`+
        `Electron version: ${process.versions.electron}</div>`
    });
    testTile.show();
};
window.reload = function(){
    require("electron").remote.getCurrentWindow().reload();
};