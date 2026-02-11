/**
 * UI Module - Handles UI creation and updates
 */

/**
 * Utility to create message bubbles
 */
export function createBubble({ type, text, side }) {
  const row = document.createElement("div");
  row.className = `message-row ${side === "right" ? "right" : "left"}`;

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.dataset.type = type;

  if (type === "question") {
    bubble.classList.add("question");
    bubble.dataset.fullText = text;
    bubble.textContent = "";
    
    // Add "Read" indicator
    const readIndicator = document.createElement("div");
    readIndicator.className = "read-indicator";
    readIndicator.textContent = "Read";
    bubble.appendChild(readIndicator);
  } else if (type === "answer") {
    bubble.classList.add("answer");
    bubble.dataset.fullText = text;
    bubble.textContent = "";
  } else if (type === "read") {
    bubble.classList.add("meta");
    const label = document.createElement("span");
    label.className = "meta-label";
    label.textContent = "Thinking";
    bubble.appendChild(label);

    const typing = document.createElement("div");
    typing.className = "typing";
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("span");
      dot.className = "typing-dot";
      typing.appendChild(dot);
    }
    bubble.appendChild(typing);
  } else if (type === "thought-time") {
    bubble.classList.add("thought-time");
    bubble.textContent = text;
  }

  row.appendChild(bubble);
  return row;
}

/**
 * Typewriter effect for text animation
 */
export function typewriterEffect(element, text, speed = 20) {
  let index = 0;
  const chatWindow = element.closest('[data-role="chat-window"]');
  
  function type() {
    if (index < text.length) {
      const char = text.charAt(index);
      const readIndicator = element.querySelector('.read-indicator');
      if (readIndicator) {
        // Insert text before the read indicator
        const textNode = document.createTextNode(char);
        element.insertBefore(textNode, readIndicator);
      } else {
        element.textContent += char;
      }
      index++;
      scrollChatToBottom(chatWindow);
      
      if (index < text.length) {
        setTimeout(type, speed);
      }
    }
  }
  
  type();
  return text.length * speed;
}

/**
 * Scroll chat window to bottom
 */
export function scrollChatToBottom(chatWindow) {
  // Double rAF to ensure DOM is fully rendered before scrolling
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    });
  });
}

/**
 * Update time display
 */
export function updateTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
  
  document.querySelectorAll('.status-right span:first-child').forEach(timeElement => {
    timeElement.textContent = formattedTime;
  });
}

/**
 * Update status indicator
 */
export function updateStatus(message, duration = 2000) {
  const indicator = document.getElementById('statusIndicator');
  indicator.textContent = message;
  indicator.classList.add('show');
  
  if (duration > 0) {
    setTimeout(() => {
      indicator.classList.remove('show');
    }, duration);
  }
}

/**
 * Reset chat windows
 */
export function resetChatWindows() {
  document.querySelectorAll('[data-role="chat-window"]').forEach(chatWindow => {
    chatWindow.innerHTML = '';
  });
  document.getElementById("phone-1").classList.remove("is-orange");
}

/* ──────────────────────────────────────────
   Progress Bar helpers
   ────────────────────────────────────────── */

let progressInterval = null;
let progressStartTime = 0;
let phone1TotalDuration = 0;
let phone2TotalDuration = 0;
let phone1Done = false;
let phone2Done = false;

/**
 * Initialise and show the progress panel.
 * @param {number} dur1 – total duration for phone-1 (LLaVA) in ms
 * @param {number} dur2 – total duration for phone-2 (CoPE) in ms
 */
export function initProgressBars(dur1, dur2) {
  phone1TotalDuration = dur1;
  phone2TotalDuration = dur2;
  phone1Done = false;
  phone2Done = false;

  // Reset DOM
  document.getElementById('progressFill1').style.width = '0%';
  document.getElementById('progressFill2').style.width = '0%';
  document.getElementById('progressFill1').classList.remove('complete');
  document.getElementById('progressFill2').classList.remove('complete');
  document.getElementById('progressTime1').textContent = '0.00s';
  document.getElementById('progressTime2').textContent = '0.00s';
  document.getElementById('progressBadge1').textContent = '';
  document.getElementById('progressBadge2').textContent = '';
  document.getElementById('progressBadge1').className = 'progress-badge';
  document.getElementById('progressBadge2').className = 'progress-badge';
  const speedup = document.getElementById('progressSpeedup');
  speedup.textContent = '';
  speedup.classList.remove('visible');

  // Show panel (remove then re-add to restart animation)
  const panel = document.getElementById('progressPanel');
  panel.classList.remove('visible');
  // Force reflow so the animation restarts if already visible
  void panel.offsetWidth;
  panel.classList.add('visible');
}

/**
 * Start the real-time ticking interval.
 * Should be called right after the first question bubbles appear.
 */
export function startProgressTicking(animationState) {
  progressStartTime = performance.now();

  progressInterval = setInterval(() => {
    const elapsed = performance.now() - progressStartTime;

    // Phone 1 (LLaVA)
    if (!phone1Done) {
      const pct1 = Math.min(elapsed / phone1TotalDuration * 100, 100);
      document.getElementById('progressFill1').style.width = pct1 + '%';
      document.getElementById('progressTime1').textContent = (elapsed / 1000).toFixed(2) + 's';
      if (pct1 >= 100) {
        phone1Done = true;
        document.getElementById('progressTime1').textContent = (phone1TotalDuration / 1000).toFixed(2) + 's';
        document.getElementById('progressFill1').classList.add('complete');
      }
    }

    // Phone 2 (CoPE)
    if (!phone2Done) {
      const pct2 = Math.min(elapsed / phone2TotalDuration * 100, 100);
      document.getElementById('progressFill2').style.width = pct2 + '%';
      document.getElementById('progressTime2').textContent = (elapsed / 1000).toFixed(2) + 's';
      if (pct2 >= 100) {
        phone2Done = true;
        document.getElementById('progressTime2').textContent = (phone2TotalDuration / 1000).toFixed(2) + 's';
        document.getElementById('progressFill2').classList.add('complete');
      }
    }

    // Both done → show badges & speedup
    if (phone1Done && phone2Done) {
      clearInterval(progressInterval);
      progressInterval = null;
      showSpeedupBadges();
    }
  }, 50);

  animationState.intervals.push(progressInterval);
}

function showSpeedupBadges() {
  const badge1 = document.getElementById('progressBadge1');
  const badge2 = document.getElementById('progressBadge2');
  const speedup = document.getElementById('progressSpeedup');

  if (phone2TotalDuration < phone1TotalDuration) {
    badge2.textContent = 'Faster';
    badge2.className = 'progress-badge winner';
    badge1.textContent = 'Slower';
    badge1.className = 'progress-badge slower';
    const ratio = (phone1TotalDuration / phone2TotalDuration).toFixed(1);
    speedup.textContent = `⚡ CoPE-VideoLM finished ${ratio}× faster`;
  } else if (phone1TotalDuration < phone2TotalDuration) {
    badge1.textContent = 'Faster';
    badge1.className = 'progress-badge winner';
    badge2.textContent = 'Slower';
    badge2.className = 'progress-badge slower';
    const ratio = (phone2TotalDuration / phone1TotalDuration).toFixed(1);
    speedup.textContent = `⚡ LLaVA-Video finished ${ratio}× faster`;
  } else {
    badge1.textContent = 'Tied';
    badge1.className = 'progress-badge winner';
    badge2.textContent = 'Tied';
    badge2.className = 'progress-badge winner';
    speedup.textContent = 'Both models finished at the same time';
  }
  speedup.classList.add('visible');
}

/**
 * Reset / hide progress bars.
 */
export function resetProgressBars() {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
  phone1Done = false;
  phone2Done = false;
  const panel = document.getElementById('progressPanel');
  panel.classList.remove('visible');
}

/**
 * Update control buttons based on animation state
 */
export function updateControlButtons(animationState) {
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  
  if (animationState.isPlaying) {
    startBtn.textContent = '▶ Playing...';
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
  } else if (animationState.isPaused) {
    startBtn.textContent = '▶ Resume';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = false;
  } else {
    startBtn.textContent = '▶ Start';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = false;
  }
}
