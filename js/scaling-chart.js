(function() {
  var ctx = document.getElementById('scalingChart');
  if (!ctx) return;

  var labelColor = '#3A7BC8';
  var oursColor = '#4E95D9';
  var baselineColor = '#C00000';
  var FONT = '"Avenir Next", "Avenir Next Cyr", "Avenir", "Inter", sans-serif';

  /*
   * Data computed from paper formulas:
   * VLM: token_budget // 210 // 60  (minutes)
   * Ours (4I+4P): 8*tb // (210*4 + 10*4) // 60
   * Ours (2I+6P): 8*tb // (210*2 + 10*6) // 60
   * Ours (1I+7P): 8*tb // (210 + 10*7) // 60
   */
  var tokenBudgets = [32768, 65536, 131072, 262144, 524288, 1048576];
  var tokenLabels = ['32K', '64K', '128K', '256K', '512K', '1M'];

  function floorDiv(a, b) { return Math.floor(a / b); }

  function computeVlmMinutes(tb) {
    var val = floorDiv(tb, 210);
    return floorDiv(val, 60);
  }

  function computeOursMinutes(tb, iCount, pCount) {
    var denom = 210 * iCount + 10 * pCount;
    var val = floorDiv(8 * tb, denom);
    return floorDiv(val, 60);
  }

  var vlmMinutes = tokenBudgets.map(computeVlmMinutes);
  var ours4I4P   = tokenBudgets.map(function(tb) { return computeOursMinutes(tb, 4, 4); });
  var ours2I6P   = tokenBudgets.map(function(tb) { return computeOursMinutes(tb, 2, 6); });
  var ours1I7P   = tokenBudgets.map(function(tb) { return computeOursMinutes(tb, 1, 7); });

  function sqrt(n) { return Math.sqrt(Math.max(0, n)); }

  /* Convert to {x, y} points; y uses sqrt(minutes) to match reference */
  function toPoints(budgets, minutes) {
    return budgets.map(function(b, i) {
      return { x: b, y: sqrt(minutes[i]) };
    });
  }

  /* Format sqrt(minutes) back to readable minutes/hours */
  function formatFromSqrtMinutes(y) {
    var m = Math.round(y * y);
    if (m <= 0) return '0';
    if (m < 60) return m + 'min';
    var h = m / 60;
    if (h === Math.floor(h)) return Math.floor(h) + 'h';
    return h.toFixed(1) + 'h';
  }

  /* Store empty data initially; populate on scroll */
  var fullDatasets = null;

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
          borderWidth: 1,
          borderDash: [2, 3],
          showLine: true,
          tension: 0.3,
          fill: false
        },
        {
          label: 'Ours (4I+4P)',
          data: toPoints(tokenBudgets, ours4I4P),
          borderColor: oursColor,
          backgroundColor: oursColor,
          pointBackgroundColor: oursColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointStyle: 'rect',
          borderWidth: 1,
          borderDash: [2, 3],
          showLine: true,
          tension: 0.3,
          fill: false,
          opacity: 0.9
        },
        {
          label: 'Ours (2I+6P)',
          data: toPoints(tokenBudgets, ours2I6P),
          borderColor: oursColor,
          backgroundColor: oursColor,
          pointBackgroundColor: oursColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 7,
          pointHoverRadius: 9,
          pointStyle: 'triangle',
          borderWidth: 1.5,
          borderDash: [8, 4],
          showLine: true,
          tension: 0.3,
          fill: false
        },
        {
          label: 'Ours (1I+7P)',
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
      animation: false,
      layout: { padding: { top: 16, right: 20, bottom: 10, left: 10 } },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: { size: 13, family: FONT, weight: '500' },
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
          titleFont: { size: 13, family: FONT },
          bodyFont: { size: 13, family: FONT },
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
                'Video Length: ' + formatFromSqrtMinutes(pt.y)
              ];
            }
          }
        },
        datalabels: false
      },
      scales: {
        x: {
          type: 'logarithmic',
          base: 2,
          min: Math.pow(2, 14.4),
          max: Math.pow(2, 20.6),
          grid: {
            color: 'rgba(189, 195, 199, 0.40)',
            borderDash: [4, 4],
            lineWidth: 0.8,
            drawBorder: false
          },
          ticks: {
            font: { size: 12, weight: '600', family: FONT },
            color: '#3A7BC8',
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
            font: { size: 14, weight: '600', family: FONT },
            color: labelColor,
            padding: { top: 8 }
          }
        },
        y: {
          type: 'linear',
          min: 0,
          max: sqrt(600),
          grid: {
            color: 'rgba(189, 195, 199, 0.40)',
            borderDash: [4, 4],
            lineWidth: 0.8,
            drawBorder: false
          },
          ticks: {
            font: { size: 12, weight: '600', family: FONT },
            color: '#3A7BC8',
            callback: function(value) { return formatFromSqrtMinutes(value); }
          },
          afterBuildTicks: function(axis) {
            var vidLensMin = [2, 10, 30, 60, 120, 300, 480, 600];
            axis.ticks = [{ value: 0 }].concat(vidLensMin.map(function(m) { return { value: sqrt(m) }; }));
          },
          title: {
            display: true,
            text: 'Video Length',
            font: { size: 14, weight: '600', family: FONT },
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
          var midY = yScale.getPixelForValue(sqrt(50));

          c.save();
          c.font = '600 11px ' + FONT;
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
