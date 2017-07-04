// color code utilities 
function randomInt (min, max) {  //The maximum is exclusive and the minimum is inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}
function d (o) {    // dump
    return JSON.stringify(o);
}
function m (str) {
// $('.p').append(str); // for Test
}
// test data.
var Pallete = function(num){
    this.primal = [
        '#f00',  '#0f0',   '#0f0',  '#fff',
        '#880',  '#808',   '#088',  '#ff0'
    ];
    this.len = num;
    this.colors = [];
    this.generate();
}
Pallete.prototype.generate = function() {
    function _pbr (arr) { // pick by random
        return arr[randomInt(0, arr.length)];
    }
    this.colors = [];
    var prev = '', index = this.len;
    while (index > 0) {
        console.log(this.primal);
    		console.log(this.len);
        var col = _pbr(this.primal);
        if (col === prev) { continue; } // 連続して同じ色は採用しない
        this.colors.push(col);
        prev = col;
        index--;
    }
    //m('gen color done' + d(this.colors) + "<br>");
}

function m(str){
      //console.log(str);
      //$(".p").append(str + "<br>");
}

////////////////////////////////////////////////////////////////////////////////////
var pallete;

// Draw Primitive
var MyRect = function(w){
    this.layer = true,
    this.x = w/2,
    this.y = w/2,
    this.width =  0.8*w,
    this.height = 0.8*w,
    this.fillStyle = '#8f8',
    this.rotate = 0,
    this.scale = 1
};
MyRect.prototype.click = function(){
    $(this).animateLayer(this.layer, {
        rotate: '+= 144'
    });
};
MyRect.prototype.touchstart = function(){
    $(this).animateLayer(0, {
        fillStyle: '#c33',
        scale: 1.5,
        rotate: '+=144'
    }, 250);
};
MyRect.prototype.touchend = function(){
    $(this).animateLayer(0, {
        fillStyle: '#36c',
        scale: 1,
        rotate: '-=144'
    }, 250);
};
    
/////////////// main /////////////// 
$(function(){
    
    var _w = $('.wrapper').width(),
           _h = $('.wrapper').height();
     
    $("canvas").attr({ 'width': _w, 'height': _h });
        $("canvas.c2").drawRect({
            layer: true,
            fillStyle: '#000',
            x: 100, 
            y: 100, 
            width: 100,
            height: 100
        })
    $.jCanvas.defaults.fromCenter = true;
    
    // パレットの作成
    pallete = new Pallete(8);
    
    // シーケンスに基づき描画
    var mycolor = '#3c3';
    var r_w = 0.8; // rate for width    

    // 色と回転角がランダム
    var objs = pallete.colors.map(function(v, i){
        var myrect = new MyRect(_w);
        myrect.fillStyle= v,
        myrect.rotate = randomInt(0,15) * 12;
        console.log(myrect);
        return myrect;
    })
    console.log(objs[0]);
    // $("canvas.c1").drawRect(objs[0]);

    var movement = {
        click: function(layer) {
            $(this).animateLayer(layer, {
                rotate: '+=144'
            });
        },
        touchstart: function(layer) {
            // Animate layer when touched
            $(this).animateLayer(0, {
                fillStyle: '#c33',
                scale: 1.5,
                rotate: '+=144'
            }, 250);
        },
        touchend: function(layer) {
            // Revert layer when touch ends
            $(this).animateLayer(0, {
                fillStyle: '#36c',
                scale: 1,
                rotate: '-=144'
            }, 250);
         }
    }
    var mix = $.extend(objs[0], movement);
    $("canvas.c1").drawRect(mix);
    
    /*
    $("canvas.c1").drawRect({
        layer: true,
        fillStyle: '#3c3',
        x:  150, y: 150,
        width: 100, 
        height: 100,
        click: function(layer) {
            $(this).animateLayer(layer, {
                rotate: '+=144'
            });
        },
        touchstart: function(layer) {
            // Animate layer when touched
            $(this).animateLayer(0, {
                fillStyle: '#c33',
                scale: 1.5,
                rotate: '+=144'
            }, 250);
        },
        touchend: function(layer) {
            // Revert layer when touch ends
            $(this).animateLayer(0, {
                fillStyle: '#36c',
                scale: 1,
                rotate: '-=144'
            }, 250);
         }
     });  
     */
});


