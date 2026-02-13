(function() {
  var ctx = document.getElementById('scalingChart');
  if (!ctx) return;

  var labelColor = '#7a6e62';
  var oursColor = '#6567C9';
  var baselineColor = '#C00000';

  /*
   * Data computed from paper formulas:
   * VLM: token_budget // 210 // 60  (minutes)
   * Ours (4I+4P): 8*tb // (210*4 + 9*4) // 60
   * Ours (2I+6P): 8*tb // (210*2 + 9*6) // 60
   * Ours (1I+7P): 8*tb // (210 + 9*7) // 60
   */
  var tokenBudgets = [32768, 65536, 131072, 262144, 524288, 1048576];
  var tokenLabels = ['32K', '64K', '128K', '256K', '512K', '1M'];

  var vlmMinutes     = [2, 5, 10, 20, 41, 83];
  var ours4I4P       = [4, 9, 19, 39, 79, 159];
  var ours2I6P       = [9, 18, 36, 73, 147, 294];
  var ours1I7P       = [16, 32, 64, 128, 256, 512];

  /* Convert to {x, y} points for scatter chart */
  function toPoints(budgets, minutes) {
    return budgets.map(function(b, i) {
      return { x: b, y: minutes[i] };
    });
  }

  /* Format minutes to readable string */
  function formatMinutes(m) {
    if (m < 60) return m + 'min';
    var h = m / 60;
    if (h === Math.floor(h)) return Math.floor(h) + 'h';
    return h.toFixed(1) + 'h';
  }

  var chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'VideoLM (1FPS)',
          data: toPoints(tokenBudgets, vlmMinutes),
          borderColor: baselineColor,
          backgroundColor: baselineColor,
          pointBackgroundColor: baselineColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointStyle: 'circle',
          borderWidth: 2,
          borderDash: [6, 4],
          showLine: true,
          tension: 0.3,
          fill: false
        },
        {
          label: 'Ours (4 KF per GOP)',
          data: toPoints(tokenBudgets, ours4I4P),
          borderColor: oursColor,
          backgroundColor: oursColor,
          pointBackgroundColor: oursColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointStyle: 'rect',
          borderWidth: 1.5,
          borderDash: [6, 4],
          showLine: true,
          tension: 0.3,
          fill: false,
          opacity: 0.9
        },
        {
          label: 'Ours (2 KF per GOP)',
          data: toPoints(tokenBudgets, ours2I6P),
          borderColor: oursColor,
          backgroundColor: oursColor,
          pointBackgroundColor: oursColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 7,
          pointHoverRadius: 9,
          pointStyle: 'triangle',
          borderWidth: 2,
          borderDash: [8, 4],
          showLine: true,
          tension: 0.3,
          fill: false
        },
        {
          label: 'Ours (1 KF per GOP)',
          data: toPoints(tokenBudgets, ours1I7P),
          borderColor: oursColor,
          backgroundColor: oursColor,
          pointBackgroundColor: oursColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 7,
          pointHoverRadius: 9,
          pointStyle: 'rectRot',
          borderWidth: 2.5,
          showLine: true,
          tension: 0.3,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 800, easing: 'easeOutQuart' },
      layout: { padding: { top: 16, right: 20, bottom: 10, left: 10 } },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: { size: 13, family: '"Inter", "Avenir Next Cyr", sans-serif', weight: '500' },
            color: labelColor,
            usePointStyle: true,
            padding: 16
          }
        },
        title: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleFont: { size: 13, family: '"Inter", sans-serif' },
          bodyFont: { size: 13, family: '"Inter", sans-serif' },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            title: function(items) {
              return items[0].dataset.label;
            },
            label: function(context) {
              var pt = context.raw;
              var budgetIdx = tokenBudgets.indexOf(pt.x);
              var budgetStr = budgetIdx !== -1 ? tokenLabels[budgetIdx] : pt.x;
              return [
                'Token Budget: ' + budgetStr,
                'Video Length: ' + formatMinutes(pt.y)
              ];
            }
          }
        },
        datalabels: false
      },
      scales: {
        x: {
          type: 'logarithmic',
          min: 24000,
          max: 1400000,
          grid: {
            color: 'rgba(154, 140, 126, 0.12)',
            drawBorder: false
          },
          ticks: {
            font: { size: 12, weight: '600', family: '"Inter", sans-serif' },
            color: '#7a6e62',
            callback: function(value) {
              var idx = tokenBudgets.indexOf(value);
              if (idx !== -1) return tokenLabels[idx];
              return '';
            },
            autoSkip: false,
            maxRotation: 0
          },
          afterBuildTicks: function(axis) {
            axis.ticks = tokenBudgets.map(function(v) { return { value: v }; });
          },
          title: {
            display: true,
            text: 'Token Budget',
            font: { size: 14, weight: '600', family: '"Inter", "Avenir Next Cyr", sans-serif' },
            color: labelColor,
            padding: { top: 8 }
          }
        },
        y: {
          type: 'linear',
          min: 0,
          max: 560,
          grid: {
            color: 'rgba(154, 140, 126, 0.12)',
            drawBorder: false
          },
          ticks: {
            font: { size: 12, weight: '600', family: '"Inter", sans-serif' },
            color: '#7a6e62',
            stepSize: 60,
            callback: function(value) {
              if (value === 0) return '0';
              if (value < 60) return value + 'min';
              var h = value / 60;
              if (h === Math.floor(h)) return Math.floor(h) + 'h';
              return h.toFixed(1) + 'h';
            }
          },
          title: {
            display: true,
            text: 'Video Length',
            font: { size: 14, weight: '600', family: '"Inter", "Avenir Next Cyr", sans-serif' },
            color: labelColor,
            padding: { bottom: 8 }
          }
        }
      }
    },
    plugins: [{
      id: 'scalingAnnotations',
      afterDraw: function(chartInst) {
        var c = chartInst.ctx;
        var xScale = chartInst.scales.x;
        var yScale = chartInst.scales.y;

        /* Draw model capacity labels */
        var annotations = [
          { x: 32768, label: 'LLaVA-Video-7B', color: baselineColor },
          { x: 1048576, label: 'Gemini 2.5 Pro', color: baselineColor }
        ];

        annotations.forEach(function(ann) {
          var px = xScale.getPixelForValue(ann.x);
          var midY = (yScale.top + yScale.bottom) / 2;

          c.save();
          c.font = '600 11px "Inter", "Avenir Next Cyr", sans-serif';
          var textWidth = c.measureText(ann.label).width;

          /* Draw vertical dashed line */
          c.beginPath();
          c.setLineDash([4, 4]);
          c.strokeStyle = 'rgba(189, 195, 199, 0.5)';
          c.lineWidth = 1;
          c.moveTo(px, yScale.top);
          c.lineTo(px, yScale.bottom);
          c.stroke();

          /* Draw label with background */
          c.translate(px, midY);
          c.rotate(-Math.PI / 2);
          var padX = 6;
          var padY = 3;
          c.fillStyle = 'rgba(255, 255, 255, 0.85)';
          c.strokeStyle = ann.color;
          c.lineWidth = 1;
          c.setLineDash([]);
          var boxW = textWidth + padX * 2;
          var boxH = 16 + padY * 2;
          c.beginPath();
          c.roundRect(-boxW / 2, -boxH / 2, boxW, boxH, 4);
          c.fill();
          c.stroke();
          c.fillStyle = '#34495e';
          c.textAlign = 'center';
          c.textBaseline = 'middle';
          c.fillText(ann.label, 0, 0);
          c.restore();
        });
      }
    }]
  });
})();
