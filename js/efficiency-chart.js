(function() {
  var oursColor = '#6567C9';
  var baseColor = '#5B93D4';
  var labelColor = '#3A7BC8';

  /* Data from the table: { tokens%, accuracy } */
  var effData = {
    perceptiontest: {
      label: 'PerceptionTest',
      baseline: [
        { x: 5.3,  y: 60.4, tip: '1 KF/GOP' },
        { x: 9.7,  y: 62.1, tip: '2 KF/GOP' },
        { x: 18.6, y: 63.6, tip: '4 KF/GOP' },
        { x: 100,  y: 67.9, tip: '64 KF (default)' }
      ],
      ours: [
        { x: 6.8,  y: 64.7, tip: '1 KF + 7 P/GOP', delta: '+4.3' },
        { x: 11.0, y: 67.8, tip: '2 KF + 6 P/GOP', delta: '+5.7' },
        { x: 19.5, y: 70.5, tip: '4 KF + 4 P/GOP', delta: '+6.9' }
      ]
    },
    nextqa: {
      label: 'NExT-QA',
      baseline: [
        { x: 8.3,  y: 77.9, tip: '1 KF/GOP' },
        { x: 15.9, y: 79.2, tip: '2 KF/GOP' },
        { x: 31.0, y: 80.5, tip: '4 KF/GOP' },
        { x: 100,  y: 83.2, tip: '64 KF (default)' }
      ],
      ours: [
        { x: 10.8, y: 78.3, tip: '1 KF + 7 P/GOP', delta: '+0.4' },
        { x: 18.1, y: 80.3, tip: '2 KF + 6 P/GOP', delta: '+1.1' },
        { x: 32.6, y: 81.8, tip: '4 KF + 4 P/GOP', delta: '+1.3' }
      ]
    },
    actnetqa: {
      label: 'ActNet-QA',
      baseline: [
        { x: 21.6, y: 61.7, tip: '1 KF/GOP' },
        { x: 42.5, y: 62.9, tip: '2 KF/GOP' },
        { x: 84.3, y: 63.6, tip: '4 KF/GOP' },
        { x: 100,  y: 63.6, tip: '64 KF (default)' }
      ],
      ours: [
        { x: 28.8, y: 62.3, tip: '1 KF + 7 P/GOP', delta: '+0.6' },
        { x: 48.8, y: 63.3, tip: '2 KF + 6 P/GOP', delta: '+0.4' },
        { x: 88.7, y: 64.1, tip: '4 KF + 4 P/GOP', delta: '+0.5' }
      ]
    }
  };

  var ctx = document.getElementById('efficiencyChart');
  if (!ctx) return;

  var effChart = null;

  /* Annotation plugin: draw arrows from baseline to ours */
  var arrowPlugin = {
    id: 'effArrows',
    afterDatasetsDraw: function(chartInst) {
      var c = chartInst.ctx;
      var datasets = chartInst.data.datasets;
      /* Find paired baseline/ours datasets */
      for (var d = 0; d < datasets.length; d++) {
        if (!datasets[d]._isOurs) continue;
        var baseIdx = datasets[d]._baselineIdx;
        if (baseIdx === undefined) continue;
        var oursMeta = chartInst.getDatasetMeta(d);
        var baseMeta = chartInst.getDatasetMeta(baseIdx);
        for (var i = 0; i < oursMeta.data.length; i++) {
          if (i >= baseMeta.data.length) continue;
          var bx = baseMeta.data[i].x;
          var by = baseMeta.data[i].y;
          var ox = oursMeta.data[i].x;
          var oy = oursMeta.data[i].y;
          /* Draw dashed line from baseline to ours */
          c.save();
          c.beginPath();
          c.setLineDash([4, 3]);
          c.strokeStyle = 'rgba(101, 103, 201, 0.35)';
          c.lineWidth = 1.5;
          c.moveTo(bx, by);
          c.lineTo(ox, oy);
          c.stroke();
          c.restore();
          /* Draw delta label with background pill */
          var delta = datasets[d].data[i].delta;
          if (delta) {
            c.save();
            c.font = '600 10px "Avenir", "Avenir Next Cyr", "Avenir", "Avenir Next Cyr", "Inter", sans-serif';
            var labelX = ox + 12;
            var labelY = oy - 12;
            var textWidth = c.measureText(delta).width;
            var padX = 4;
            var padY = 2;
            /* Draw background pill */
            c.fillStyle = 'rgba(255, 255, 255, 0.88)';
            c.beginPath();
            var pillRadius = 4;
            var pillX = labelX - padX;
            var pillY = labelY - 10 - padY;
            var pillW = textWidth + padX * 2;
            var pillH = 12 + padY * 2;
            c.moveTo(pillX + pillRadius, pillY);
            c.arcTo(pillX + pillW, pillY, pillX + pillW, pillY + pillH, pillRadius);
            c.arcTo(pillX + pillW, pillY + pillH, pillX, pillY + pillH, pillRadius);
            c.arcTo(pillX, pillY + pillH, pillX, pillY, pillRadius);
            c.arcTo(pillX, pillY, pillX + pillW, pillY, pillRadius);
            c.closePath();
            c.fill();
            /* Draw border */
            c.strokeStyle = 'rgba(46, 125, 50, 0.25)';
            c.lineWidth = 1;
            c.stroke();
            /* Draw text */
            c.fillStyle = '#2e7d32';
            c.textAlign = 'left';
            c.textBaseline = 'bottom';
            c.fillText(delta, labelX, labelY);
            c.restore();
          }
        }
      }
    }
  };

  /* Single benchmark color schemes */
  var benchmarkColors = {
    perceptiontest: { base: '#5B93D4', ours: '#6567C9' },
    nextqa:         { base: '#7BAADE', ours: '#8486d9' },
    actnetqa:       { base: '#9BC2E8', ours: '#a5a6e3' }
  };

  function buildDatasets(mode) {
    var datasets = [];
    var keys = [mode];

    var dsIndex = 0;
    keys.forEach(function(key) {
      var d = effData[key];
      var colors = benchmarkColors[key];
      var suffix = '';

      /* Baseline dataset */
      var baseIdx = dsIndex;
      datasets.push({
        label: 'LLaVA-Video' + suffix,
        data: d.baseline,
        borderColor: colors.base,
        backgroundColor: colors.base,
        pointBackgroundColor: colors.base,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 2,
        showLine: true,
        tension: 0.3,
        borderDash: [6, 3],
        fill: false,
        _isOurs: false
      });
      dsIndex++;

      /* Ours dataset */
      datasets.push({
        label: 'CoPE-VideoLM (Ours)' + suffix,
        data: d.ours,
        borderColor: colors.ours,
        backgroundColor: colors.ours,
        pointBackgroundColor: colors.ours,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 7,
        pointHoverRadius: 9,
        pointStyle: 'rectRot',
        borderWidth: 2.5,
        showLine: true,
        tension: 0.3,
        fill: false,
        _isOurs: true,
        _baselineIdx: baseIdx
      });
      dsIndex++;
    });

    return datasets;
  }

  function getAxisBounds(mode) {
    var keys = [mode];

    var allY = [];
    keys.forEach(function(key) {
      effData[key].baseline.forEach(function(p) { allY.push(p.y); });
      effData[key].ours.forEach(function(p) { allY.push(p.y); });
    });
    var minY = Math.floor(Math.min.apply(null, allY) / 5) * 5 - 2;
    var maxY = Math.ceil(Math.max.apply(null, allY) / 5) * 5 + 2;
    return { minY: minY, maxY: maxY };
  }

  function buildChart(mode) {
    var container = ctx.parentElement;
    if (effChart) effChart.destroy();

    var datasets = buildDatasets(mode);
    var bounds = getAxisBounds(mode);

    effChart = new Chart(ctx, {
      type: 'scatter',
      data: { datasets: datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 600, easing: 'easeOutQuart' },
        layout: { padding: { top: 20, right: 20, bottom: 10, left: 10 } },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: { size: 13, family: '"Avenir", "Avenir Next Cyr", "Avenir", "Avenir Next Cyr", "Inter", sans-serif', weight: '500' },
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
            titleFont: { size: 13, family: '"Avenir", "Avenir Next Cyr", "Inter", sans-serif' },
            bodyFont: { size: 13, family: '"Avenir", "Avenir Next Cyr", "Inter", sans-serif' },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              title: function(items) {
                var item = items[0];
                return item.dataset.label;
              },
              label: function(context) {
                var pt = context.raw;
                var lines = [
                  'Sampling: ' + (pt.tip || ''),
                  'Tokens: ' + pt.x.toFixed(1) + '%',
                  'Accuracy: ' + pt.y.toFixed(1) + '%'
                ];
                if (pt.delta) lines.push('Gain: ' + pt.delta);
                return lines;
              }
            }
          },
          datalabels: false
        },
        scales: {
          x: {
            min: 0,
            max: 110,
            grid: {
              color: 'rgba(154, 140, 126, 0.1)',
              drawBorder: false
            },
            ticks: {
              font: { size: 12, family: '"Avenir", "Avenir Next Cyr", "Inter", sans-serif' },
              color: '#9CA3AF',
              stepSize: 20,
              callback: function(value) { return value; }
            },
            title: {
              display: true,
              text: 'Number of Tokens (% of 64-keyframe LLaVA-Video-7B)',
              font: { size: 14, weight: '500', family: '"Avenir", "Avenir Next Cyr", "Avenir", "Avenir Next Cyr", "Inter", sans-serif' },
              color: labelColor,
              padding: { top: 8 }
            }
          },
          y: {
            min: bounds.minY,
            max: bounds.maxY,
            grid: {
              color: 'rgba(154, 140, 126, 0.1)',
              drawBorder: false
            },
            ticks: {
              font: { size: 12, family: '"Avenir", "Avenir Next Cyr", "Inter", sans-serif' },
              color: '#9CA3AF',
              stepSize: 5,
              callback: function(value) { return value.toFixed(0); }
            },
            title: {
              display: true,
              text: 'Accuracy (%)',
              font: { size: 14, weight: '500', family: '"Avenir", "Avenir Next Cyr", "Avenir", "Avenir Next Cyr", "Inter", sans-serif' },
              color: labelColor,
              padding: { bottom: 8 }
            }
          }
        }
      },
      plugins: [arrowPlugin]
    });
  }

  /* Initialize with PerceptionTest */
  buildChart('perceptiontest');

  /* Expose globally for onclick handlers */
  window.updateEfficiencyChart = function(mode) {
    var btns = {
      perceptiontest: document.getElementById('effBtnPT'),
      nextqa: document.getElementById('effBtnNQ'),
      actnetqa: document.getElementById('effBtnAQ')
    };
    Object.keys(btns).forEach(function(k) { if (btns[k]) btns[k].classList.remove('is-active'); });
    btns[mode].classList.add('is-active');
    buildChart(mode);
  };
})();
