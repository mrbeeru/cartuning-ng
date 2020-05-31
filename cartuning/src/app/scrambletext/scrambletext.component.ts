import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-scrambletext',
  templateUrl: './scrambletext.component.html',
  styleUrls: ['./scrambletext.component.css']
})
export class ScrambletextComponent implements OnInit {

  //#region private_fields
  chars = '!<>-_\\/[]{}—=+*^?#________';
  frameRequest : any;
  frame: any;
  queue: any;
  resolve : any;
  counter: number;
  //#endregion

  scrambledText: string;

  @Input() phrases: string[];
  @Input() scrambleTime: number = 60;
  @Input() phraseTime: number = 5000;

  constructor() { 
  }

  ngOnInit(): void {
    this.counter = 0;
    this.scrambledText = this.phrases[0];
    this.update.bind(this);
    this.next.bind(this);

    this.next();
  }

  next(){
    this.setText(this.phrases[this.counter]);
  }

  setText(newText) {
    const oldText = this.scrambledText;
    const length = Math.max(oldText.length, newText.length)
    this.queue = []

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * this.scrambleTime)
      const end = start + Math.floor(Math.random() * this.scrambleTime)
      this.queue.push({ from, to, start, end })
    }

    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update();
    this.counter = (this.counter + 1) % this.phrases.length
    setTimeout(this.next.bind(this), this.phraseTime)
  }

  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.50) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += char
      } else {
        output += from
      }
    }

    this.scrambledText = output
    if (complete === this.queue.length) {
      return;
    } else {
      this.frameRequest = requestAnimationFrame(this.update.bind(this))
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }

}
