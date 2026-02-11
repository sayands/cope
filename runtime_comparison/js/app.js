/**
 * Main Application Entry Point
 */

import { videoCarousel, phoneDelays, answerTypingSpeeds } from '../data/config.js';
import { 
  updateTime, 
  updateStatus, 
  resetChatWindows, 
  updateControlButtons,
  initProgressBars,
  startProgressTicking,
  resetProgressBars
} from './modules/ui.js';
import {
  initCarousel,
  getCurrentConversation,
  initCarouselDots,
  updateCarouselUI,
  navigateCarousel
} from './modules/carousel.js';
import {
  animationState,
  clearAllTimers,
  playFirstQuestionSequence,
  playSubsequentQuestion
} from './modules/animation.js';

/**
 * Main animation function
 */
function startAnimation() {
  const conversationScript = getCurrentConversation();
  
  if (!conversationScript.length) return;

  animationState.isPlaying = true;
  animationState.isPaused = false;
  updateControlButtons(animationState);
  // updateStatus('Animation started', 2000);

  const first = conversationScript[0];

  const phone1Duration = playFirstQuestionSequence("phone-1", phoneDelays.phone1, first);
  const phone2Duration = playFirstQuestionSequence("phone-2", phoneDelays.phone2, first);

  // Accumulate total wall-clock durations for each phone
  let phone1Total = phone1Duration;
  let phone2Total = phone2Duration;

  if (conversationScript.length > 1) {
    let phone1Delay = phone1Duration + 1000;
    let phone2Delay = phone2Duration + 1000;

    for (let i = 1; i < conversationScript.length; i++) {
      const entry = conversationScript[i];
      
      const phone1TurnDuration = playSubsequentQuestion("phone-1", entry, phone1Delay);
      const phone2TurnDuration = playSubsequentQuestion("phone-2", entry, phone2Delay);
      
      phone1Delay += phone1TurnDuration + 1000;
      phone2Delay += phone2TurnDuration + 1000;
    }
    phone1Total = phone1Delay - 1000; // remove trailing gap
    phone2Total = phone2Delay - 1000;
  }

  // Initialise and start the progress bars
  initProgressBars(phone1Total, phone2Total);
  startProgressTicking(animationState);

  setTimeout(() => {
    document.getElementById("phone-1").classList.add("is-orange");
  }, phoneDelays.phone1 * 1000 + 400);

  // Calculate total duration
  const firstQuestionDuration = Math.max(phone1Duration, phone2Duration);
  let totalDuration = firstQuestionDuration;
  
  if (conversationScript.length > 1) {
    for (let i = 1; i < conversationScript.length; i++) {
      const entry = conversationScript[i];
      const q1Time = entry.phone1.question.length * 30;
      const q2Time = entry.phone2.question.length * 30;
      const maxQuestionTime = Math.max(q1Time, q2Time);
      const maxDelay = Math.max(phoneDelays.phone1, phoneDelays.phone2);
      const maxAnswerTime = Math.max(answerTypingSpeeds.phone1, answerTypingSpeeds.phone2);
      
      totalDuration += maxQuestionTime + 400 + maxDelay * 1000 + maxAnswerTime + 1500;
    }
  }

  setTimeout(() => {
    animationState.isPlaying = false;
    updateControlButtons(animationState);
    // updateStatus('Animation complete', 3000);
  }, totalDuration + 2000);
}

/**
 * Initialize application
 */
function initApp() {
  // Initialize carousel
  initCarousel(videoCarousel);
  initCarouselDots(animationState);
  updateCarouselUI();

  // Update time immediately and then every second
  updateTime();
  const timeInterval = setInterval(updateTime, 1000);
  animationState.intervals.push(timeInterval);

  // Carousel navigation event listeners
  document.getElementById('prevBtn').addEventListener('click', () => 
    navigateCarousel(-1, animationState)
  );
  document.getElementById('nextBtn').addEventListener('click', () => 
    navigateCarousel(1, animationState)
  );

  // Control button event listeners
  document.getElementById('startBtn').addEventListener('click', () => {
    if (!animationState.isPlaying) {
      resetChatWindows();
      startAnimation();
    }
  });

  document.getElementById('pauseBtn').addEventListener('click', () => {
    if (animationState.isPlaying) {
      clearAllTimers();
      animationState.isPlaying = false;
      animationState.isPaused = true;
      updateControlButtons(animationState);
      // updateStatus('Animation paused', 2000);
    }
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    clearAllTimers();
    resetChatWindows();
    resetProgressBars();
    animationState.isPlaying = false;
    animationState.isPaused = false;
    updateControlButtons(animationState);
    // updateStatus('Animation reset', 2000);
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      if (!animationState.isPlaying) {
        document.getElementById('startBtn').click();
      } else {
        document.getElementById('pauseBtn').click();
      }
    } else if (e.code === 'KeyR' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      document.getElementById('resetBtn').click();
    } else if (e.code === 'KeyH') {
      const panel = document.getElementById('controlPanel');
      const indicator = document.getElementById('statusIndicator');
      panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
      indicator.style.display = indicator.style.display === 'none' ? 'block' : 'none';
    } else if (e.code === 'ArrowLeft' && !animationState.isPlaying) {
      navigateCarousel(-1, animationState);
    } else if (e.code === 'ArrowRight' && !animationState.isPlaying) {
      navigateCarousel(1, animationState);
    }
  });
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initApp);
