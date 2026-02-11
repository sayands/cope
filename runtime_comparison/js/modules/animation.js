/**
 * Animation Module - Handles chat animation sequences
 */

import { createBubble, typewriterEffect, typingDuration, scrollChatToBottom } from './ui.js';
import { phoneDelays, msPerToken } from '../../data/config.js';

/**
 * Animation control state
 */
export const animationState = {
  isPlaying: false,
  isPaused: false,
  timeouts: [],
  intervals: []
};

/**
 * Store setTimeout with tracking
 */
function trackedSetTimeout(callback, delay) {
  const id = setTimeout(callback, delay);
  animationState.timeouts.push(id);
  return id;
}

/**
 * Clear all timeouts and intervals
 */
export function clearAllTimers() {
  animationState.timeouts.forEach(id => clearTimeout(id));
  animationState.intervals.forEach(id => clearInterval(id));
  animationState.timeouts = [];
  animationState.intervals = [];
}

/**
 * Play first question sequence
 */
export function playFirstQuestionSequence(phoneId, delaySeconds, scriptEntry) {
  const shell = document.getElementById(phoneId);
  const chatWindow = shell.querySelector('[data-role="chat-window"]');

  const isPhone1 = phoneId === "phone-1";
  const content = isPhone1 ? scriptEntry.phone1 : scriptEntry.phone2;

  const qBubble = createBubble({
    type: "question",
    text: content.question,
    side: "right",
  });
  chatWindow.appendChild(qBubble);
  scrollChatToBottom(chatWindow);
  
  // Use requestAnimationFrame to let the bubble appear with transition
  requestAnimationFrame(() => {
    const questionElement = qBubble.querySelector(".bubble");
    questionElement.classList.add("visible");
    
    // Show question text instantly (no typewriter)
    const readIndicator = questionElement.querySelector(".read-indicator");
    if (readIndicator) {
      questionElement.insertBefore(document.createTextNode(content.question), readIndicator);
    } else {
      questionElement.textContent = content.question;
    }
    
    // Show read indicator after a short delay
    setTimeout(() => {
      if (readIndicator) {
        readIndicator.classList.add("visible");
      }
    }, 450);
  });

  const readDelayMs = 650;
  
  trackedSetTimeout(() => {
    const rBubble = createBubble({
      type: "read",
      text: "",
      side: "left",
    });
    chatWindow.appendChild(rBubble);
    scrollChatToBottom(chatWindow);
    
    requestAnimationFrame(() => {
      rBubble.querySelector(".bubble").classList.add("visible");
      const typing = rBubble.querySelector(".typing");
      if (typing) typing.classList.add("active");
    });

    trackedSetTimeout(() => {
      rBubble.remove();

      const thoughtBubble = createBubble({
        type: "thought-time",
        text: `Thought for ${delaySeconds.toFixed(2)}s`,
        side: "left",
      });
      chatWindow.appendChild(thoughtBubble);
      scrollChatToBottom(chatWindow);
      
      requestAnimationFrame(() => {
        thoughtBubble.querySelector(".bubble").classList.add("visible");
      });

      const aBubble = createBubble({
        type: "answer",
        text: content.answer,
        side: "left",
      });
      chatWindow.appendChild(aBubble);
      scrollChatToBottom(chatWindow);
      
      requestAnimationFrame(() => {
        const answerElement = aBubble.querySelector(".bubble");
        answerElement.classList.add("visible");
        
        const phoneKey = isPhone1 ? 'phone1' : 'phone2';
        typewriterEffect(answerElement, content.answer, msPerToken[phoneKey]);
      });
    }, delaySeconds * 1000);
  }, readDelayMs);

  const phoneKey = isPhone1 ? 'phone1' : 'phone2';
  const typingDur = content.answer.split(/( +)/).length * msPerToken[phoneKey];
  return readDelayMs + delaySeconds * 1000 + typingDur + 300;
}

/**
 * Play subsequent question
 */
export function playSubsequentQuestion(phoneId, scriptEntry, startDelay = 0) {
  const shell = document.getElementById(phoneId);
  const chatWindow = shell.querySelector('[data-role="chat-window"]');

  const isPhone1 = phoneId === "phone-1";
  const content = isPhone1 ? scriptEntry.phone1 : scriptEntry.phone2;

  const subsequentDelay = isPhone1 ? phoneDelays.phone1 : phoneDelays.phone2;

  trackedSetTimeout(() => {
    const qBubble = createBubble({
      type: "question",
      text: content.question,
      side: "right",
    });
    chatWindow.appendChild(qBubble);
    scrollChatToBottom(chatWindow);
    
    // Use requestAnimationFrame to let the bubble appear with transition
    requestAnimationFrame(() => {
      const questionElement = qBubble.querySelector(".bubble");
      questionElement.classList.add("visible");
      
      // Show question text instantly (no typewriter)
      const readIndicator = questionElement.querySelector(".read-indicator");
      if (readIndicator) {
        questionElement.insertBefore(document.createTextNode(content.question), readIndicator);
      } else {
        questionElement.textContent = content.question;
      }
      
      // Show read indicator after a short delay
      setTimeout(() => {
        if (readIndicator) {
          readIndicator.classList.add("visible");
        }
      }, 450);
    });

    trackedSetTimeout(() => {
      const rBubble = createBubble({
        type: "read",
        text: "",
        side: "left",
      });
      chatWindow.appendChild(rBubble);
      scrollChatToBottom(chatWindow);
      
      requestAnimationFrame(() => {
        rBubble.querySelector(".bubble").classList.add("visible");
        const typing = rBubble.querySelector(".typing");
        if (typing) typing.classList.add("active");
      });

      trackedSetTimeout(() => {
        rBubble.remove();

        const thoughtBubble = createBubble({
          type: "thought-time",
          text: `Thought for ${subsequentDelay.toFixed(2)}s`,
          side: "left",
        });
        chatWindow.appendChild(thoughtBubble);
        scrollChatToBottom(chatWindow);
        
        requestAnimationFrame(() => {
          thoughtBubble.querySelector(".bubble").classList.add("visible");
        });

        const aBubble = createBubble({
          type: "answer",
          text: content.answer,
          side: "left",
        });
        chatWindow.appendChild(aBubble);
        scrollChatToBottom(chatWindow);
        
        requestAnimationFrame(() => {
          const answerElement = aBubble.querySelector(".bubble");
          answerElement.classList.add("visible");
          
          const phoneKey = isPhone1 ? 'phone1' : 'phone2';
          typewriterEffect(answerElement, content.answer, msPerToken[phoneKey]);
        });
      }, subsequentDelay * 1000);
    }, 650);
  }, startDelay);

  const phoneKey = isPhone1 ? 'phone1' : 'phone2';
  const typingDur = content.answer.split(/( +)/).length * msPerToken[phoneKey];
  return 650 + subsequentDelay * 1000 + typingDuration + 300;
}
