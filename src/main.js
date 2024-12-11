(()=>{
    
})();

var controllerCommand = require('config_globalMem');
var creep_proto = require('creep_proto');

module.exports.loop = function () {
    controllerCommand.test()
    // console.log("Hello World!")

    function myPrintRawTerain(raw) {
        const visual = new RoomVisual();
        for(let y = 0; y < 50; y++) {
            for(let x = 0; x < 50; x++) {
                const code = raw[y * 50 + x];
                const color =
                    (code & TERRAIN_MASK_WALL ) ? "gray"  :
                    (code & TERRAIN_MASK_SWAMP) ? "green" : "white" ;
                visual.circle(x, y, {fill: color, radius: 0.5});
            }
        }
    }

    function myPrintRaw(raw){
        var ArrayObj = new Array();
        for(let y = 0; y < 50; y++) {
            ArrayObj[y] = raw.slice(y * 50, (y + 1) * 50);
            // for(let x = 0; x < 50; x++) {
            //     console.log(raw[y * 50 + x]);
            // }
            // console.log("\n");
            // console.log(raw.slice(y * 50, (y + 1) * 50).join(""));
        }
        return ArrayObj;
    }
    
    const raw = (new Room.Terrain("E53S46")).getRawBuffer();
    ArrayObj = myPrintRaw(raw);
    // console.log(ArrayObj[49][42]);
    var count = 1;
    while(count > 0){
        creep_proto.find_path(48,19,35,42,ArrayObj);
        count -= 1;
        // console.log(count);
    }
    // myPrintRawTerain(raw);
    
}