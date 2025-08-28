// src/app/models/carousel.ts

// This is the reusable Carousel class reconstructed from your friend's code.
// It handles all the logic for a sliding carousel.
export class Carousel {
  currentIndex = 0;
  cardsPerView = 4; // Default value
  cardWidth: number;
  cardMargin: number;
  items: any[];

  constructor(items: any[], cardWidth: number, cardMargin: number) {
    this.items = items;
    this.cardWidth = cardWidth; // e.g., 17 for 17rem
    this.cardMargin = cardMargin; // e.g., 1 for 1rem
    this.updateCardsPerView(); // Set initial value based on screen size
  }

  // Dynamically adjusts the number of visible cards based on screen width.
  updateCardsPerView() {
    const width = window.innerWidth;
    if (width >= 1200) {
      this.cardsPerView = 4; // xl screens
    } else if (width >= 992) {
      this.cardsPerView = 3; // lg screens
    } else if (width >= 768) {
      this.cardsPerView = 2; // md screens
    } else {
      this.cardsPerView = 1; // sm and xs screens
    }
  }

  // Checks if it's possible to slide to the next set of cards.
  get canGoNext(): boolean {
    return this.currentIndex + this.cardsPerView < this.items.length;
  }

  // Checks if it's possible to slide to the previous set of cards.
  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  // Moves to the next slide.
  nextSlide() {
    if (this.canGoNext) {
      this.currentIndex++;
    }
  }

  // Moves to the previous slide.
  previousSlide() {
    if (this.canGoPrevious) {
      this.currentIndex--;
    }
  }

  // Calculates the CSS transform value to slide the track.
  get translateX(): number {
    // The total width of a card plus its margin
    const totalCardWidth = this.cardWidth + this.cardMargin;
    return -(this.currentIndex * totalCardWidth);
  }

  // Resets the carousel to the beginning.
  reset() {
    this.currentIndex = 0;
  }
}
