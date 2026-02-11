/**
 * Carousel Module - Handles video carousel navigation
 */

import { resetChatWindows, resetProgressBars, updateStatus } from './ui.js';

let currentVideoIndex = 0;
let videoCarouselData = [];
let conversationScript = [];

/**
 * Initialize carousel data
 */
export function initCarousel(videoData) {
  videoCarouselData = videoData;
  currentVideoIndex = 0;
  conversationScript = videoCarouselData[currentVideoIndex].conversations;
  return conversationScript;
}

/**
 * Get current conversation script
 */
export function getCurrentConversation() {
  return conversationScript;
}

/**
 * Get current video index
 */
export function getCurrentVideoIndex() {
  return currentVideoIndex;
}

/**
 * Initialize carousel dots
 */
export function initCarouselDots(animationState) {
  const dotsContainer = document.getElementById('carouselDots');
  dotsContainer.innerHTML = '';
  
  videoCarouselData.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'carousel-dot';
    if (index === currentVideoIndex) dot.classList.add('active');
    dot.addEventListener('click', () => {
      if (animationState.isPlaying) {
        // updateStatus('Stop current animation first', 2000);
        return;
      }
      currentVideoIndex = index;
      conversationScript = videoCarouselData[currentVideoIndex].conversations;
      updateCarouselUI();
      resetChatWindows();
      resetProgressBars();
    });
    dotsContainer.appendChild(dot);
  });
}

/**
 * Update carousel UI
 */
export function updateCarouselUI() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicator = document.getElementById('carouselIndicator');
  const videoSource = document.getElementById('videoSource');
  const heroVideo = document.getElementById('heroVideo');
  const videoCaption = document.getElementById('videoCaption');

  prevBtn.disabled = currentVideoIndex === 0;
  nextBtn.disabled = currentVideoIndex === videoCarouselData.length - 1;
  indicator.textContent = `${currentVideoIndex + 1} / ${videoCarouselData.length}`;
  
  videoSource.src = videoCarouselData[currentVideoIndex].videoSrc;
  heroVideo.load();
  videoCaption.textContent = videoCarouselData[currentVideoIndex].caption;

  // Update dots
  const dots = document.querySelectorAll('.carousel-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentVideoIndex);
  });
}

/**
 * Navigate carousel
 */
export function navigateCarousel(direction, animationState) {
  if (animationState.isPlaying) {
    return;
  }

  const newIndex = currentVideoIndex + direction;
  if (newIndex >= 0 && newIndex < videoCarouselData.length) {
    currentVideoIndex = newIndex;
    conversationScript = videoCarouselData[currentVideoIndex].conversations;
    updateCarouselUI();
    resetChatWindows();
    resetProgressBars();
    // updateStatus(`Switched to video ${currentVideoIndex + 1}`, 2000);
  }
}
