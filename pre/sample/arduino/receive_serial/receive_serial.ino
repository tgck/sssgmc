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
    char c = Serial.read();
    if (c == ASCII) {
      lightOnce();
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
