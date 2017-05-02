// forked from tvsk's "forked: konashi_004" http://jsdo.it/tvsk/gCAo
// forked from tvsk's "konashi_003" http://jsdo.it/tvsk/y3Lz
// forked from tvsk's "konashi_002" http://jsdo.it/tvsk/4BOu
// forked from tvsk's "konashi_001" http://jsdo.it/tvsk/qlG9
// UART Write

////////////////////////////////////////////////////////////
// Main
////////////////////////////////////////////////////////////
k.ready(function(){
    
    setupLed();
    setupUart();
    
    ledOn();
});

k.find();


////////////////////////////////////////////////////////////
// Using UART 
////////////////////////////////////////////////////////////
function setupUart(){
    console.log('setupUart');
    k.uartBaudrate(k.KONASHI_UART_RATE_9K6);
    k.uartMode(k.KONASHI_UART_ENABLE);    
}

function send(){
    console.log('functinon send');
    var ascii = 'a';
    k.uartWrite(ascii.charCodeAt(0)); // uartWrite の引数は数値
}

function sendAscii(str) {
    if (str.length > 1) {
        // console.log(str);
        k.uartWriteString(str);
    } else if (str.length == 1) {         
        console.log('function sendAscii 1char');
        k.uartWrite(str.charCodeAt(0)); // char を数値に変換して渡す
    }
}

////////////////////////////////////////////////////////////
// Simple notification on board for Debug!
////////////////////////////////////////////////////////////
function setupLed(){
    k.pinMode(k.LED2, k.OUTPUT);   
}
function ledOn(){
    k.digitalWrite(k.LED2, k.HIGH);    
}
function ledOff(){
    k.digitalWrite(k.LED2, k.LOW);
}


function code2rgb(code){
    // var code = "#8f5c44";
    var arr = [];
    function fn (str, head, tail) {
        return parseInt(str.substring(head, tail), 16);
    }
    arr.push(fn(code, 1,3));
    arr.push(fn(code, 3,5));
    arr.push(fn(code, 5,7));    
    return '#' + arr.join(',');
}

////////////////////////////////////////////////////////////
// Handlers
////////////////////////////////////////////////////////////
$(function(){

    $(".info").text("initialize..");
    
    $(".tap-to-send").on('click', send);
    $(".tap-to-send").on('click', ledOff);
    
    // serial send
    $(".tap-to-send-char").on('click', function(ev){
        var ascii = $(ev.target).data('key');
        var $info = $(".info");
        $info.empty().text('sendAscii[' + ascii + ']');

        sendAscii(ascii);
    });
    $(".tap-to-send-char").on('click', ledOff);
    
    // イベント発生を通知するメッセージ
    $(".tap").on('click', function(){
        console.log('tapped!');
        
        var $info = $(".info");
        $info.empty().text('tapped!');
        setTimeout(function(){
            $info.empty();
        }, 1888);
    });
    
    $("#colorpicker").on('click touchmove', function(){
        var col = $("#color").val(),
            rgb = code2rgb(col);
        $(".pick").data('key', rgb);
    });
    
    // Color Picker init
    $('#colorpicker').farbtastic('#color');
});


