// Arduino Sample - Sereal Receive
// シリアルから 文字 a を受けるたびに ボード上のLランプが光る
char ASCII = 'a';
int PIN_DEBUG = 13;

void setup() {
  Serial.begin(9600);
  pinMode(PIN_DEBUG, OUTPUT);
}

void loop() { 
  if (Serial.available() > 0) {
    
    blink(5);
    
    char c = Serial.read();
    if (c == ASCII) {
      nodd();
    }
  }
}

// 光って消える
void lightOnce(){
    digitalWrite(PIN_DEBUG, HIGH);
    delay(1300);
    digitalWrite(PIN_DEBUG, LOW);
    delay(1300);
}

void blink(int count){ // ...
    for (int i=0; i<count; i++){
      digitalWrite(PIN_DEBUG, HIGH);
      delay(130);
      digitalWrite(PIN_DEBUG, LOW);
      delay(130);
    }
    delay(300); // space for next.
}

void nodd(){// -...
      digitalWrite(PIN_DEBUG, HIGH);
      delay(540);
      digitalWrite(PIN_DEBUG, LOW);
      delay(140);

      blink(3);
}

