import {Component, OnDestroy, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    NgOptimizedImage,
    DecimalPipe
  ],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnDestroy{

  days = signal(0);
  hours = signal(0);
  minutes = signal(0);
  seconds = signal(0);
  // Countdown Timer
  targetDate = new Date("2025-11-07T23:59:59").getTime();

  updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.days.set(days);
    this.hours.set(hours);
    this.minutes.set(minutes);
    this.seconds.set(seconds);
  }
   intervalId!: ReturnType<typeof setInterval>;
  constructor() {
    // Start interval on init
    this.intervalId = setInterval(() => {
      this.updateCountdown()
    }, 1000);

  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // ✅ cleanup
  }
}
// our preference is cash but we are open to other gifts
