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
    
    $(".tap").on('click', function(){
        console.log('tapped!');
        
        var $info = $(".info");
        $info.empty().text('tapped!');
        setTimeout(function(){
            $info.empty()
        }, 1888);
    });
});
