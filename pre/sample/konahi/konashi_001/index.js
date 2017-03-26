// konashiと接続できたら実行される
k.ready(function(){
    // I/Oの設定
    k.pinMode(k.LED2, k.OUTPUT);
    
    // LED2をON
    k.digitalWrite(k.LED2, k.HIGH);
});

// まわりにあるkonashiを探す
k.find();