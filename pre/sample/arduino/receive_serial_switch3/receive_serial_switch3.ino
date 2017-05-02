#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif
#define PIN 6
#define PIN_DEBUG 13

// Arduino Sample - Sereal Receive
// シリアルから 文字 a を受けるたびに ボード上のLランプが光る
char ASC_A = 'a';
char ASC_B = 'b';
char ASC_C = 'c';
char ASC_Z = 'z';
Adafruit_NeoPixel strip = Adafruit_NeoPixel(10, PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  // リセット後にアップロードを許容するような マージンを持っておく
  delay(1000);
  
  Serial.begin(9600);
  pinMode(PIN_DEBUG, OUTPUT);

  strip.begin();
  strip.show();
}

void loop() { 
  // if (Serial.available() == 2) {
  if (Serial.available() > 0) {

    // if (Serial.available() == 2) { 
      // これはうまくいかない. 2回目のタップで一個目のタップに
      // 該当する値が来る
    if (Serial.available() == 1) { // これは 'a' とか 'b' とか来てるときにうまく動く      
      char c = Serial.read();
      
      if (c == ASC_A) {
        colorWipe(strip.Color(255, 0, 0), 25);
      } else if (c == ASC_B) {
        colorWipe(strip.Color(0, 255, 0), 25);
      } else if (c == ASC_C) {
        colorWipe(strip.Color(0, 0, 255), 25);
      } else if (c == ASC_Z) {
        colorWipe(strip.Color(1, 1, 1), 50);
      }
    // } else if (Serial.available() == 4) { //'#A11' などを期待
    } else { //'#A11' などを期待
      // sendString() などで 'aa' を送るとここにくる
      
      blink(2);
      char c;
      while (Serial.available()){
         c = Serial.read();
      }
      // char c = Serial.read();// Serial.read() を投げないと、バッファの刈り取りがされない、ということらしい。
        // Serial.read が 1文字ずつしか読まない？
      //int dummy = Serial.parseInt();
      //int col_r = Serial.parseInt();
      //int col_g = Serial.parseInt();
      //int col_b = Serial.parseInt();   
      colorWipe(strip.Color(128, 128, 0), 50);
      delay(333);
      colorWipe(strip.Color(0, 0, 0), 10);
    }
  }
}

// patterns 
// from adafruit
void colorWipe(uint32_t c, uint8_t wait) {
  for(uint16_t i=0; i<strip.numPixels(); i++) {
    strip.setPixelColor(i, c);
    strip.show();
    delay(wait);
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

