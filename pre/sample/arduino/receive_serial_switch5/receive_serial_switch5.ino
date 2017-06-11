#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif
#define PIN 6
#define PIN_DEBUG 13

// Works with "konashi_005/ColorPicker"

// Arduino Sample - Sereal Receive
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
  
  if (Serial.available() > 0) {
    delay(33); // 信号全体が届くのを待つ
   
    if (Serial.find("#")) { // "#255,255,0"
      int col_r, col_g, col_b;
      col_r = col_g = col_b = 0;
      while (Serial.available()){
        col_r = Serial.parseInt();
        col_g = Serial.parseInt();
        col_b = Serial.parseInt();   
      }
      colorWipe(strip.Color(col_r, col_g, col_b), 25);
      // delay(1333);
      // colorWipe(strip.Color(0, 0, 0), 10);
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

