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
  if (Serial.available() > 0) {
    
    // blink(5);
    char c = Serial.read();
    
    if (c == ASC_A) {

      // switch pattern
      colorWipe(strip.Color(255, 0, 0), 50);
      // nodd();
     
    } else if (c == ASC_B) {

      // switch pattern
      colorWipe(strip.Color(0, 255, 0), 50);
      //nodd();
      
    } else if (c == ASC_C) {

      // switch pattern
      colorWipe(strip.Color(0, 0, 255), 50);
      //nodd();
      
    } else if (c == ASC_Z) {
      
      // switch pattern
      colorWipe(strip.Color(1, 1, 1), 50);
      //nodd();
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

