(function() {
  'use strict';

  /* ──── Config Data ──── */
  var videoCarousel = [
    {
      videoSrc: "assets/videos/video_example2.mp4",
      caption: "Input Video",
      conversations: [
        { key:"q1", label:"Question 1",
          phone1:{ question:"What is the person preparing?", answer:"The person is preparing a sandwich." },
          phone2:{ question:"What is the person preparing?", answer:"The person is preparing a sandwich." }
        },
        { key:"q2", label:"Question 2",
          phone1:{ question:"What are the ingredients being used?", answer:"The ingredients being used are slices of bread, butter, ham, and tomato." },
          phone2:{ question:"What are the ingredients being used?", answer:"The ingredients are slices of white bread, butter, slices of ham and tomato." }
        },
        { key:"q3", label:"Question 3",
          phone1:{ question:"What is inside the cup?", answer:"The cup contains a tea bag." },
          phone2:{ question:"What is inside the cup?", answer:"The cup contains a tea bag with dried herbs." }
        }
      ],
      metrics: {
        phone1: { /* LLaVA-Video-7B */
          questions: [
            { ttft: 1.1775, e2el: 2.8606 },
            { ttft: 0.0004, e2el: 0.4340 },
            { ttft: 0.0004, e2el: 0.2078 }
          ],
          avgTtft: 0.3927,
          avgE2el: 1.1675,
          visionTokens: 7350
        },
        phone2: { /* CoPE-VideoLM-7B */
          questions: [
            { ttft: 0.3845, e2el: 0.8259 },
            { ttft: 0.0004, e2el: 0.4309 },
            { ttft: 0.0004, e2el: 0.2742 }
          ],
          avgTtft: 0.1284,
          avgE2el: 0.5103,
          visionTokens: 1320
        }
      }
    },
    {
      videoSrc: "assets/videos/video_example1.mp4",
      caption: "Input Video",
      conversations: [
        { key:"q1", label:"Question 1",
          phone1:{ question:"What is the score & time remaining in the first period of the hockey game?", answer:"The score is 0-0 with 13:38 remaining in the first period." },
          phone2:{ question:"What is the score & time remaining in the first period of the hockey game?", answer:"The score is tied at 0-0 with 13:38 remaining in the first period." }
        },
        { key:"q2", label:"Question 2",
          phone1:{ question:"What happens to the player, number 52, during the game?", answer:"The player, number 52, is seen lying on the ice near the boards, appearing to be in pain." },
          phone2:{ question:"What happens to the player, number 52, during the game?", answer:"The player, number 52, is seen lying on the ice, appearing to be injured." }
        },
        { key:"q3", label:"Question 3",
          phone1:{ question:"Who attends to the injured Toronto player, number 52?", answer:"A medical staff member in a blue uniform attends to the injured player." },
          phone2:{ question:"Who attends to the injured Toronto player, number 52?", answer:"A medical staff member in a blue jacket attends to the injured player." }
        },
        { key:"q4", label:"Question 4",
          phone1:{ question:"Which player pushed player number 52?", answer:"Player number 46 from the Boston team pushed player number 52." },
          phone2:{ question:"Which player pushed player number 52?", answer:"Player number 46 from the Boston Bruins pushed player number 52." }
        },
        { key:"q5", label:"Question 5",
          phone1:{ question:"Which player is fighting with player number 51?", answer:"Player number 46 from the Boston team is fighting with player number 51 from the Toronto team." },
          phone2:{ question:"Which player is fighting with player number 51?", answer:"Player number 46 from the Boston Bruins is fighting with player number 51." }
        },
        { key:"q6", label:"Question 6",
          phone1:{ question:"Which country broadcasts this program?", answer:"The program is broadcasted in Canada." },
          phone2:{ question:"Which country broadcasts this program?", answer:"The program is broadcast in Canada." }
        }
      ],
      metrics: {
        phone1: { /* LLaVA-Video-7B */
          questions: [
            { ttft: 2.7863, e2el: 11.2522 },
            { ttft: 0.0004, e2el: 0.7350 },
            { ttft: 0.0004, e2el: 0.4326 },
            { ttft: 0.0003, e2el: 0.4737 },
            { ttft: 0.0003, e2el: 0.6329 },
            { ttft: 0.0004, e2el: 0.2776 }
          ],
          avgTtft: 0.4647,
          avgE2el: 2.3006,
          visionTokens: 13440
        },
        phone2: { /* CoPE-VideoLM-7B */
          questions: [
            { ttft: 1.0465, e2el: 2.0410 },
            { ttft: 0.0004, e2el: 0.5563 },
            { ttft: 0.0004, e2el: 0.7387 },
            { ttft: 0.0003, e2el: 0.3981 },
            { ttft: 0.0004, e2el: 0.4457 },
            { ttft: 0.0004, e2el: 0.2128 }
          ],
          avgTtft: 0.1747,
          avgE2el: 0.7321,
          visionTokens: 2439
        }
      }
    },
    {
      videoSrc: "assets/videos/video_example3.mp4",
      caption: "Input Video",
      conversations: [
        { key:"q1", label:"Question 1",
          phone1:{ question:"How many people are wearing ties in the video?", answer:"Two people are wearing ties in the video." },
          phone2:{ question:"How many people are wearing ties in the video?", answer:"Two people are wearing ties in the video." }
        },
        { key:"q2", label:"Question 2",
          phone1:{ question:"According to the video, who becomes the best man?", answer:"The person in the green t-shirt becomes the best man." },
          phone2:{ question:"According to the video, who becomes the best man?", answer:"Joey becomes the best man." }
        },
        { key:"q3", label:"Question 3",
          phone1:{ question:"What are the people in the video arguing about?", answer:"The people in the video are arguing about who will be the best man." },
          phone2:{ question:"What are the people in the video arguing about?", answer:"They are arguing about who will be the best man at their wedding." }
        }
      ],
      metrics: {
        phone1: { /* LLaVA-Video-7B */
          questions: [
            { ttft: 1.0052, e2el: 8.9993 },
            { ttft: 0.0005, e2el: 0.3766 },
            { ttft: 0.0004, e2el: 0.4571 }
          ],
          avgTtft: 0.3354,
          avgE2el: 3.2777,
          visionTokens: 13440
        },
        phone2: { /* CoPE-VideoLM-7B */
          questions: [
            { ttft: 0.4357, e2el: 1.0813 },
            { ttft: 0.0004, e2el: 0.2237 },
            { ttft: 0.0006, e2el: 0.4016 }
          ],
          avgTtft: 0.1456,
          avgE2el: 0.5689,
          visionTokens: 3213
        }
      }
    },
    {
      videoSrc: "assets/videos/video_example4.mp4",
      caption: "Input Video",
      conversations: [
        { key:"q1", label:"Question 1",
          phone1:{ question:"What is the person in blue clothes doing?", answer:"The person in blue clothes is chopping wood with an axe." },
          phone2:{ question:"What is the person in blue clothes doing?", answer:"The person in blue clothes is chopping wood." }
        },
        { key:"q2", label:"Question 2",
          phone1:{ question:"Where is the person in blue chopping wood?", answer:"The person in blue is chopping wood in a backyard setting." },
          phone2:{ question:"Where is the person in blue chopping wood?", answer:"In a backyard setting." }
        },
        { key:"q3", label:"Question 3",
          phone1:{ question:"Is the person the cufflinks on his left wrist?", answer:"Yes." },
          phone2:{ question:"Is the person the cufflinks on his left wrist?", answer:"Yes." }
        }
      ],
      metrics: {
        phone1: { /* LLaVA-Video-7B */
          questions: [
            { ttft: 0.9255, e2el: 2.1919 },
            { ttft: 0.0005, e2el: 0.4177 },
            { ttft: 0.0004, e2el: 0.0833 }
          ],
          avgTtft: 0.3088,
          avgE2el: 0.8976,
          visionTokens: 7350
        },
        phone2: { /* CoPE-VideoLM-7B */
          questions: [
            { ttft: 0.3379, e2el: 0.7848 },
            { ttft: 0.0005, e2el: 0.1656 },
            { ttft: 0.0004, e2el: 0.0753 }
          ],
          avgTtft: 0.1129,
          avgE2el: 0.3419,
          visionTokens: 1320
        }
      }
    },
    {
      videoSrc: "assets/videos/video_example5.mp4",
      caption: "Input Video",
      conversations: [
        { key:"q1", label:"Question 1",
          phone1:{ question:"What is happening in the video? Describe in one sentence.", answer:"The video shows a race between two athletes, one in a blue uniform and the other in a white and red uniform." },
          phone2:{ question:"What is happening in the video? Describe in one sentence.", answer:"The video shows a race between two athletes, one in blue and the other in white and red, with the blue athlete winning impressively." }
        },
        { key:"q2", label:"Question 2",
          phone1:{ question:"Which runner performed the leg-slapping motion before running?", answer:"The athlete in the blue uniform performed the leg-slapping motion before running." },
          phone2:{ question:"Which runner performed the leg-slapping motion before running?", answer:"The white and red runner performed the leg-slapping motion before running." }
        },
        { key:"q3", label:"Question 3",
          phone1:{ question:"Who won the race?", answer:"The athlete in the blue uniform won the race." },
          phone2:{ question:"Who won the race?", answer:"The blue athlete won the race." }
        }
      ],
      metrics: {
        phone1: { /* LLaVA-Video-7B */
          questions: [
            { ttft: 1.2972, e2el: 6.5145 },
            { ttft: 0.0004, e2el: 0.4334 },
            { ttft: 0.0004, e2el: 0.2989 }
          ],
          avgTtft: 0.4327,
          avgE2el: 2.4156,
          visionTokens: 9870
        },
        phone2: { /* CoPE-VideoLM-7B */
          questions: [
            { ttft: 0.7096, e2el: 1.7034 },
            { ttft: 0.0004, e2el: 0.3955 },
            { ttft: 0.0004, e2el: 0.2033 }
          ],
          avgTtft: 0.2368,
          avgE2el: 0.7674,
          visionTokens: 1629
        }
      }
    }
  ];

  /* Fallback timing for videos without per-question metrics */
  var defaultDelays = { phone1: 2.39, phone2: 0.33 };
  var defaultMsPerToken = { phone1: 1390 / 64, phone2: 1330 / 64 };

  /* ──── State ──── */
  var rcState = { isPlaying: false, timeouts: [], intervals: [] };
  var currentVideoIndex = 0;
  var conversationScript = videoCarousel[0].conversations;

  /* ──── Metrics helpers ──── */
  function getMetrics() { return videoCarousel[currentVideoIndex].metrics; }

  function getQuestionMetrics(phoneKey, qIndex) {
    var m = getMetrics();
    if (m && m[phoneKey] && m[phoneKey].questions && m[phoneKey].questions[qIndex]) {
      return m[phoneKey].questions[qIndex];
    }
    return null;
  }

  function getTtftDelay(phoneKey, qIndex) {
    var qm = getQuestionMetrics(phoneKey, qIndex);
    if (qm) return qm.ttft;
    return defaultDelays[phoneKey] || 1;
  }

  function getTypingDuration(text, phoneKey, qIndex) {
    var qm = getQuestionMetrics(phoneKey, qIndex);
    if (qm) {
      /* Use actual E2EL - TTFT as total typing time */
      return Math.max((qm.e2el - qm.ttft) * 1000, 100);
    }
    /* Fallback: per-word based on default ms-per-token */
    var words = text.split(/( +)/);
    return words.length * (defaultMsPerToken[phoneKey] || 21);
  }

  function getTimingLabel(phoneKey, qIndex) {
    var m = getMetrics();
    if (!m) {
      var delay = defaultDelays[phoneKey] || 1;
      return 'Thought for ' + delay.toFixed(2) + 's';
    }
    var qm = getQuestionMetrics(phoneKey, qIndex);
    if (!qm) return '';
    if (qIndex === 0) {
      return 'TTFT: ' + qm.ttft.toFixed(2) + 's · E2EL: ' + qm.e2el.toFixed(2) + 's';
    }
    return 'E2EL: ' + qm.e2el.toFixed(2) + 's';
  }

  /* ──── Utility: tracked setTimeout ──── */
  function rcTrackedTimeout(cb, delay) {
    var id = setTimeout(cb, delay);
    rcState.timeouts.push(id);
    return id;
  }

  function rcClearAllTimers() {
    rcState.timeouts.forEach(function(id) { clearTimeout(id); });
    rcState.intervals.forEach(function(id) { clearInterval(id); });
    rcState.timeouts = [];
    rcState.intervals = [];
  }

  /* ──── UI helpers ──── */
  function rcCreateBubble(opts) {
    var type = opts.type, text = opts.text, side = opts.side;
    var row = document.createElement('div');
    row.className = 'rc-message-row ' + (side === 'right' ? 'right' : 'left');
    var bubble = document.createElement('div');
    bubble.classList.add('rc-bubble');
    bubble.dataset.type = type;

    if (type === 'question') {
      bubble.classList.add('rc-question');
      bubble.dataset.fullText = text;
      bubble.textContent = '';
      var readInd = document.createElement('div');
      readInd.className = 'rc-read-indicator';
      readInd.textContent = 'Read';
      bubble.appendChild(readInd);
    } else if (type === 'answer') {
      bubble.classList.add('rc-answer');
      bubble.dataset.fullText = text;
      bubble.textContent = '';
    } else if (type === 'read') {
      bubble.classList.add('rc-meta');
      var label = document.createElement('span');
      label.className = 'rc-meta-label';
      label.textContent = 'Thinking';
      bubble.appendChild(label);
      var typing = document.createElement('div');
      typing.className = 'rc-typing';
      for (var i = 0; i < 3; i++) {
        var dot = document.createElement('span');
        dot.className = 'rc-typing-dot';
        typing.appendChild(dot);
      }
      bubble.appendChild(typing);
    } else if (type === 'thought-time') {
      bubble.classList.add('rc-thought-time');
      bubble.textContent = text;
    }
    row.appendChild(bubble);
    return row;
  }

  function rcScrollToBottom(chatWindow) {
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      });
    });
  }

  /* Typewriter effect — types word-by-word over totalDurationMs */
  function rcTypewriterEffect(element, text, chatWindow, totalDurationMs) {
    var words = text.split(/( +)/);
    var wordIndex = 0;
    var perWordDelay = Math.max(totalDurationMs / words.length, 10);
    element.textContent = '';
    var intervalId = setInterval(function() {
      if (wordIndex < words.length) {
        element.textContent += words[wordIndex];
        wordIndex++;
        rcScrollToBottom(chatWindow);
      } else {
        clearInterval(intervalId);
      }
    }, perWordDelay);
    rcState.intervals.push(intervalId);
    return words.length * perWordDelay;
  }

  function rcResetChatWindows() {
    document.querySelectorAll('[data-role="rc-chat-window"]').forEach(function(cw) { cw.innerHTML = ''; });
    document.getElementById('rc-phone-1').classList.remove('is-orange');
  }

  function rcUpdateTime() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var formatted = h + ':' + (m < 10 ? '0' : '') + m;
    document.querySelectorAll('#runtime-comparison .rc-status-right span:first-child').forEach(function(el) {
      el.textContent = formatted;
    });
  }

  function rcUpdateArrowButtons() {
    var prevBtn = document.getElementById('rcPrevBtn');
    var nextBtn = document.getElementById('rcNextBtn');
    prevBtn.disabled = currentVideoIndex === 0;
    nextBtn.disabled = currentVideoIndex === videoCarousel.length - 1;
  }

  /* ──── Results summary ──── */
  function rcShowResultsSummary() {
    var m = getMetrics();
    if (!m) return;

    var panel = document.getElementById('rcProgressPanel');
    var summary = document.getElementById('rcProgressSummary');

    var ttft1 = m.phone1.questions[0].ttft;
    var ttft2 = m.phone2.questions[0].ttft;
    var e2el1 = m.phone1.avgE2el;
    var e2el2 = m.phone2.avgE2el;
    var ttftSpeedup = (ttft1 / ttft2).toFixed(1);
    var e2elSpeedup = (e2el1 / e2el2).toFixed(1);

    var html = '<div class="rc-summary-grid">';
    html += '<span></span>';
    html += '<span class="rc-summary-header rc-llava">LLaVA-Video</span>';
    html += '<span class="rc-summary-header rc-cope">CoPE-VideoLM</span>';
    html += '<span class="rc-summary-header" style="color:#6567C9;font-size:0.56rem">⚡Speedup</span>';
    html += '<span class="rc-summary-label">TTFT</span>';
    html += '<span class="rc-summary-value rc-llava">' + ttft1.toFixed(2) + 's</span>';
    html += '<span class="rc-summary-value rc-cope">' + ttft2.toFixed(2) + 's</span>';
    html += '<span class="rc-summary-value rc-cope" style="font-size:0.6rem">' + ttftSpeedup + '\u00D7</span>';
    html += '<span class="rc-summary-label">Avg E2EL</span>';
    html += '<span class="rc-summary-value rc-llava">' + e2el1.toFixed(2) + 's</span>';
    html += '<span class="rc-summary-value rc-cope">' + e2el2.toFixed(2) + 's</span>';
    html += '<span class="rc-summary-value rc-cope" style="font-size:0.6rem">' + e2elSpeedup + '\u00D7</span>';

    if (m.phone1.visionTokens || m.phone2.visionTokens) {
      var t1 = m.phone1.visionTokens || 0;
      var t2 = m.phone2.visionTokens || 0;
      var maxT = Math.max(t1, t2);
      var pct1 = maxT ? (t1 / maxT * 100).toFixed(1) : 0;
      var pct2 = maxT ? (t2 / maxT * 100).toFixed(1) : 0;
      html += '<div class="rc-token-section">';
      html += '<div class="rc-token-header-row">';
      html += '<span class="rc-token-title">Number of Tokens</span>';
      if (t1 > 0 && t2 > 0) {
        var reduction = ((1 - t2 / t1) * 100).toFixed(2);
        html += '<span class="rc-token-ratio">🚀 ' + reduction + '% fewer</span>';
      }
      html += '</div>';
      html += '<div class="rc-token-bar-row">';
      html += '<span class="rc-token-bar-label rc-llava">LLaVA-Video</span>';
      html += '<div class="rc-token-bar-track"><div class="rc-token-bar-fill rc-llava" style="width:0%" data-target="' + pct1 + '"></div></div>';
      html += '</div>';
      html += '<div class="rc-token-bar-row">';
      html += '<span class="rc-token-bar-label rc-cope">CoPE-VideoLM</span>';
      html += '<div class="rc-token-bar-track"><div class="rc-token-bar-fill rc-cope" style="width:0%" data-target="' + pct2 + '"></div></div>';
      html += '</div>';
      html += '</div>';
    }
    html += '</div>';
    summary.innerHTML = html;

    panel.classList.remove('visible');
    void panel.offsetWidth;
    panel.classList.add('visible');

    requestAnimationFrame(function() {
      summary.classList.add('visible');
      summary.querySelectorAll('.rc-token-bar-fill').forEach(function(bar) {
        bar.style.width = bar.dataset.target + '%';
      });
    });
  }

  function rcResetResultsPanel() {
    var panel = document.getElementById('rcProgressPanel');
    panel.classList.remove('visible');
    var summary = document.getElementById('rcProgressSummary');
    summary.innerHTML = '';
    summary.classList.remove('visible');
  }

  /* ──── Chat progress bars ──── */
  function rcShowChatProgress(phone1Duration, phone2Duration) {
    var container = document.getElementById('rcChatProgress');
    var fill1 = document.getElementById('rcProgressFill1');
    var fill2 = document.getElementById('rcProgressFill2');
    var check1 = document.getElementById('rcProgressCheck1');
    var check2 = document.getElementById('rcProgressCheck2');

    fill1.style.transition = 'none';
    fill2.style.transition = 'none';
    fill1.style.width = '0%';
    fill2.style.width = '0%';
    check1.textContent = '';
    check2.textContent = '';
    check1.classList.remove('done');
    check2.classList.remove('done');
    container.classList.remove('fade-out');
    container.classList.add('visible');

    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        fill1.style.transition = 'width ' + phone1Duration + 'ms linear';
        fill2.style.transition = 'width ' + phone2Duration + 'ms linear';
        fill1.style.width = '100%';
        fill2.style.width = '100%';
      });
    });

    rcTrackedTimeout(function() {
      check2.textContent = '\u2714';
      check2.classList.add('done');
    }, phone2Duration);
  }

  function rcHideChatProgress() {
    var container = document.getElementById('rcChatProgress');
    container.classList.add('fade-out');
    rcTrackedTimeout(function() {
      container.classList.remove('visible', 'fade-out');
    }, 350);
  }

  function rcResetChatProgress() {
    var container = document.getElementById('rcChatProgress');
    container.classList.remove('visible', 'fade-out');
    var fill1 = document.getElementById('rcProgressFill1');
    var fill2 = document.getElementById('rcProgressFill2');
    fill1.style.width = '0%';
    fill2.style.width = '0%';
    document.getElementById('rcProgressCheck1').classList.remove('done');
    document.getElementById('rcProgressCheck2').classList.remove('done');
  }

  /* ──── Animation ──── */
  function rcPlayQuestion(phoneId, qIndex, scriptEntry, startDelay) {
    var shell = document.getElementById(phoneId);
    var chatWindow = shell.querySelector('[data-role="rc-chat-window"]');
    var isPhone1 = phoneId === 'rc-phone-1';
    var phoneKey = isPhone1 ? 'phone1' : 'phone2';
    var content = isPhone1 ? scriptEntry.phone1 : scriptEntry.phone2;
    var ttft = getTtftDelay(phoneKey, qIndex);
    var typingMs = getTypingDuration(content.answer, phoneKey, qIndex);
    var timingLabel = getTimingLabel(phoneKey, qIndex);
    var thinkingDuration = Math.max(ttft * 1000, 200); /* min 200ms so dots are briefly visible */

    var doWork = function() {
      /* Show question bubble */
      var qBubble = rcCreateBubble({ type:'question', text:content.question, side:'right' });
      chatWindow.appendChild(qBubble);
      rcScrollToBottom(chatWindow);

      requestAnimationFrame(function() {
        var qEl = qBubble.querySelector('.rc-bubble');
        qEl.classList.add('visible');
        var ri = qEl.querySelector('.rc-read-indicator');
        if (ri) { qEl.insertBefore(document.createTextNode(content.question), ri); }
        else { qEl.textContent = content.question; }
        setTimeout(function() { if (ri) ri.classList.add('visible'); }, 450);
      });

      var readDelayMs = 650;

      rcTrackedTimeout(function() {
        /* Show thinking dots */
        var rBubble = rcCreateBubble({ type:'read', text:'', side:'left' });
        chatWindow.appendChild(rBubble);
        rcScrollToBottom(chatWindow);
        requestAnimationFrame(function() {
          rBubble.querySelector('.rc-bubble').classList.add('visible');
          var t = rBubble.querySelector('.rc-typing');
          if (t) t.classList.add('active');
        });

        rcTrackedTimeout(function() {
          rBubble.remove();

          /* Show timing label (TTFT for Q1, E2EL for Q2+, or "Thought for" if no metrics) */
          var tBubble = rcCreateBubble({ type:'thought-time', text: timingLabel, side:'left' });
          chatWindow.appendChild(tBubble);
          rcScrollToBottom(chatWindow);
          requestAnimationFrame(function() { tBubble.querySelector('.rc-bubble').classList.add('visible'); });

          /* Show answer with typewriter */
          var aBubble = rcCreateBubble({ type:'answer', text:content.answer, side:'left' });
          chatWindow.appendChild(aBubble);
          rcScrollToBottom(chatWindow);
          requestAnimationFrame(function() {
            var aEl = aBubble.querySelector('.rc-bubble');
            aEl.classList.add('visible');
            rcTypewriterEffect(aEl, content.answer, chatWindow, typingMs);
          });
        }, thinkingDuration);
      }, readDelayMs);
    };

    var totalTurnTime = 650 + thinkingDuration + typingMs + 300;

    if (startDelay > 0) {
      rcTrackedTimeout(doWork, startDelay);
    } else {
      doWork();
    }

    return totalTurnTime;
  }

  /* ──── Main animation ──── */
  function rcStartAnimation() {
    if (!conversationScript.length) return;
    rcClearAllTimers();
    rcResetChatWindows();
    rcResetResultsPanel();
    rcResetChatProgress();
    rcState.isPlaying = true;

    var vid = document.getElementById('rcHeroVideo');
    vid.currentTime = 0;
    vid.play();

    var p1Delay = 0;
    var p2Delay = 0;

    for (var i = 0; i < conversationScript.length; i++) {
      var entry = conversationScript[i];
      var p1Turn = rcPlayQuestion('rc-phone-1', i, entry, p1Delay);
      var p2Turn = rcPlayQuestion('rc-phone-2', i, entry, p2Delay);
      p1Delay += p1Turn + 1000;
      p2Delay += p2Turn + 1000;
    }

    var phone1Total = p1Delay - 1000;
    var phone2Total = p2Delay - 1000;

    /* Show chat progress bars */
    rcShowChatProgress(phone1Total, phone2Total);

    /* Mark phone1 orange after first question's TTFT */
    var firstTtft = getTtftDelay('phone1', 0);
    rcTrackedTimeout(function() {
      document.getElementById('rc-phone-1').classList.add('is-orange');
    }, firstTtft * 1000 + 400);

    var totalDuration = Math.max(phone1Total, phone2Total);

    /* Hide progress bars after both chats finish, then show results */
    rcTrackedTimeout(function() {
      rcHideChatProgress();
    }, totalDuration + 300);

    rcTrackedTimeout(function() {
      rcShowResultsSummary();
    }, totalDuration + 700);

    /* Loop: after showing results, wait 20s then restart */
    rcTrackedTimeout(function() {
      rcState.isPlaying = false;
      rcStartAnimation();
    }, totalDuration + 20700);
  }

  /* ──── Carousel ──── */
  function rcInitCarouselDots() {
    var dotsContainer = document.getElementById('rcCarouselDots');
    dotsContainer.innerHTML = '';
    videoCarousel.forEach(function(_, idx) {
      var dot = document.createElement('div');
      dot.className = 'rc-carousel-dot';
      if (idx === currentVideoIndex) dot.classList.add('active');
      dot.addEventListener('click', function() {
        rcClearAllTimers();
        rcState.isPlaying = false;
        currentVideoIndex = idx;
        conversationScript = videoCarousel[currentVideoIndex].conversations;
        rcUpdateCarouselUI();
        rcStartAnimation();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function rcUpdateCarouselUI() {
    var videoSource = document.getElementById('rcVideoSource');
    var heroVideo = document.getElementById('rcHeroVideo');
    var videoCaption = document.getElementById('rcVideoCaption');
    rcUpdateArrowButtons();
    videoSource.src = videoCarousel[currentVideoIndex].videoSrc;
    heroVideo.load();
    heroVideo.play();
    videoCaption.textContent = videoCarousel[currentVideoIndex].caption;
    var dots = document.querySelectorAll('.rc-carousel-dot');
    dots.forEach(function(dot, idx) { dot.classList.toggle('active', idx === currentVideoIndex); });
  }

  function rcNavigateCarousel(direction) {
    var newIdx = currentVideoIndex + direction;
    if (newIdx >= 0 && newIdx < videoCarousel.length) {
      rcClearAllTimers();
      rcState.isPlaying = false;
      currentVideoIndex = newIdx;
      conversationScript = videoCarousel[currentVideoIndex].conversations;
      rcUpdateCarouselUI();
      rcStartAnimation();
    }
  }

  /* ──── Init ──── */
  function rcInit() {
    rcInitCarouselDots();
    rcUpdateCarouselUI();
    rcUpdateTime();
    var timeInterval = setInterval(rcUpdateTime, 1000);
    rcState.intervals.push(timeInterval);

    document.getElementById('rcPrevBtn').addEventListener('click', function() { rcNavigateCarousel(-1); });
    document.getElementById('rcNextBtn').addEventListener('click', function() { rcNavigateCarousel(1); });

    /* Autoplay on load */
    rcStartAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rcInit);
  } else {
    rcInit();
  }
})();
