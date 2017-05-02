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
    // k.uartWrite('cccaa');
    // k.uartWrite(0x2e);

}

function send(){
    console.log('functinon send');

    var ascii = 'a';
    k.uartWrite(ascii.charCodeAt(0)); // uartWrite の引数は数値
}

// 1文字ずつ受け付ける
// 'A' とか '9' とか 'F'  を渡す
function convertAscii2ColorInt(char){
//    if (char.length !== 1){ console.log("invalid arg"); return}
    var result, hex;

    var num = char.charCodeAt(0);
    // var num = char; // とりあえず

    if (num >= 48 && num <= 57) {
        hex = (num - 48);
    } // 0 -> 9
    else if (num >= 65 && num <= 70 ) { // 大文字
        hex = (num - 55);
    } else {
        return 0;
    }
    result = hex * 16;
    console.log('char[' + char +']:' + result);
    return result;
}

function sendAscii(str) {
    if (str.length == 4) {
        // debug1 -------------------------------------------------------->>
        // k.uartWrite('b'.charCodeAt(0));// 単発で投げるのはうまくいく
        // debug --------------------------------------------------------<<

        // debug2 -------------------------------------------------------->>
        //k.uartWrite(0);
        //k.uartWrite(128);
        //k.uartWrite(64);
        //k.uartWrite(64);
        // debug --------------------------------------------------------<<

        // debug3 ------------------------------------------------------->>
        // k.uartWriteString('a');
        k.uartWriteString('bc'); // 赤. 黄. 黄. 黄. と光る...
            // 'abca' -> 後ろのループに入れる
            // 'abc' -> 後ろのループに入れる
            // 'ab' -> 後ろのループに入れず、赤. 緑と光る.
        // debug --------------------------------------------------------<<

        console.log('function sendAscii 4chars ' + str.split(''));
        // 固定長 4Byte想定
        var arr = str.split('').map(function(v,i){
            // console.log(i + ':' + v);
            return convertAscii2ColorInt(v); // char 文字 を渡す
        });
        console.log(arr); // --> [0, 208, 64, 224] など
        arr.forEach(function(v,i) {
            // console.log('forEach:' + i + ':' + v);
            // k.uartWrite(v);
        });
        // 改行コードを送った方がいいのかも
        //k.uartWrite(convertAscii2ColorInt(str.charCodeAt(0))); // uartWrite の引数は数値 '#' -> 数値0
        //k.uartWrite(convertAscii2ColorInt(str.charCodeAt(1))); // uartWrite の引数は数値 R
        //k.uartWrite(convertAscii2ColorInt(str.charCodeAt(2))); // uartWrite の引数は数値 G
        //k.uartWrite(convertAscii2ColorInt(str.charCodeAt(3))); // uartWrite の引数は数値 B
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
        $info.empty().text('sendAscii ' + ascii);

        sendAscii(ascii);
    });
    $(".tap-to-send-char").on('click', ledOff);

    // イベント発生を通知するメッセージ
    $(".tap").on('click', function(){
        console.log('tapped!');

        var $info = $(".info");
        $info.empty().text('tapped!');
        setTimeout(function(){
            $info.empty()
        }, 1888);
    });
});
