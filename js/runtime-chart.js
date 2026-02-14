(function() {
  var runtimeData = {
    labels: [
      'LLaVA-Video-7B\n(64 keyframes)',
      'Ours: 4 Keyframes / GOP\n(32 Keyframes + 32 P-frames)',
      'Ours: 2 Keyframes / GOP\n(16 Keyframes + 48 P-frames)',
      'Ours: 1 Keyframe / GOP\n(8 Keyframes + 56 P-frames)'
    ],
    ttft: [2.39, 0.90, 0.51, 0.33],
    e2el: [3.78, 2.28, 1.71, 1.66]
  };

  var oursColor = '#6567C9';
  var oursColorLight = '#b8b9e8';
  var baseColor = '#E5E7EB';
  var baseColorDark = '#D1D5DB';
  var labelColor = '#3A7BC8';

  var ctx = document.getElementById('runtimeChart');
  if (!ctx) return;

  var runtimeChart = null;

  /* Plugin: custom y-axis labels */
  var runtimeYLabelsPlugin = {
    id: 'runtimeYLabels',
    afterDraw: function(chartInst) {
      var yAxis = chartInst.scales.y;
      var c = chartInst.ctx;
      yAxis.ticks.forEach(function(tick, index) {
        var rawLabel = chartInst.data.labels[index];
        if (!rawLabel) return;
        var lines = rawLabel.split('\n');
        var y = yAxis.getPixelForTick(index);
        var x = yAxis.right - 10;
        var isOurs = rawLabel.indexOf('Ours') !== -1;
        c.save();
        c.textAlign = 'right';
        c.textBaseline = 'middle';
        if (lines.length > 1) {
          var lineHeight = 15;
          var startY = y - ((lines.length - 1) * lineHeight) / 2;
          lines.forEach(function(line, li) {
            if (li === 0) {
              c.font = (isOurs ? '600 ' : '') + '13px "Avenir", "Avenir Next Cyr", "Avenir", "Avenir Next Cyr", "Inter", sans-serif';
              c.fillStyle = isOurs ? oursColor : labelColor;
            } else {
              c.font = '11px "Avenir", "Avenir Next Cyr", "Avenir", "Avenir Next Cyr", "Inter", sans-serif';
              c.fillStyle = '#9CA3AF';
            }
            c.fillText(line, x, startY + li * lineHeight);
          });
        } else {
          c.font = (isOurs ? '600 ' : '') + '13px "Avenir", "Avenir Next Cyr", "Avenir", "Avenir Next Cyr", "Inter", sans-serif';
          c.fillStyle = isOurs ? oursColor : labelColor;
          c.fillText(lines[0], x, y);
        }
        c.restore();
      });
    }
  };

  /* Plugin: value labels at end of bars */
  var runtimeValuePlugin = {
    id: 'runtimeValueLabels',
    afterDatasetsDraw: function(chartInst) {
      var c = chartInst.ctx;
      chartInst.data.datasets.forEach(function(dataset, i) {
        var meta = chartInst.getDatasetMeta(i);
        meta.data.forEach(function(bar, index) {
          var value = dataset.data[index];
          if (value === null || value === undefined) return;
          var label = chartInst.data.labels[index];
          var isOurs = typeof label === 'string' && label.indexOf('Ours') !== -1;
          c.save();
          c.fillStyle = isOurs ? oursColor : labelColor;
          c.font = (isOurs ? '600 ' : '') + '13px "Avenir", "Avenir Next Cyr", "Avenir", "Avenir Next Cyr", "Inter", sans-serif';
          c.textAlign = 'left';
          c.textBaseline = 'middle';
          c.fillText(value.toFixed(2) + 's', bar.x + 6, bar.y);
          c.restore();
        });
      });
    }
  };

  function buildChart(mode) {
    var container = ctx.parentElement;
    if (runtimeChart) runtimeChart.destroy();

    var labels = runtimeData.labels;
    var datasets = [];

    if (mode === 'ttft') {
      container.style.height = '320px';
      datasets.push({
        label: 'TTFT',
        data: runtimeData.ttft,
        backgroundColor: runtimeData.labels.map(function(l) { return l.indexOf('Ours') !== -1 ? oursColor : baseColor; }),
        borderColor: runtimeData.labels.map(function(l) { return l.indexOf('Ours') !== -1 ? oursColor : baseColor; }),
        borderWidth: 0,
        borderRadius: 20,
        barThickness: 28
      });
    } else if (mode === 'e2el') {
      container.style.height = '320px';
      datasets.push({
        label: 'E2EL',
        data: runtimeData.e2el,
        backgroundColor: runtimeData.labels.map(function(l) { return l.indexOf('Ours') !== -1 ? oursColor : baseColor; }),
        borderColor: runtimeData.labels.map(function(l) { return l.indexOf('Ours') !== -1 ? oursColor : baseColor; }),
        borderWidth: 0,
        borderRadius: 20,
        barThickness: 28
      });
    } else {
      /* both */
      container.style.height = '360px';
      datasets.push({
        label: 'TTFT',
        data: runtimeData.ttft,
        backgroundColor: runtimeData.labels.map(function(l) { return l.indexOf('Ours') !== -1 ? oursColorLight : baseColor; }),
        borderColor: runtimeData.labels.map(function(l) { return l.indexOf('Ours') !== -1 ? oursColorLight : baseColor; }),
        borderWidth: 0,
        borderRadius: 20,
        barPercentage: 0.75,
        categoryPercentage: 0.75
      });
      datasets.push({
        label: 'E2EL',
        data: runtimeData.e2el,
        backgroundColor: runtimeData.labels.map(function(l) { return l.indexOf('Ours') !== -1 ? oursColor : baseColorDark; }),
        borderColor: runtimeData.labels.map(function(l) { return l.indexOf('Ours') !== -1 ? oursColor : baseColorDark; }),
        borderWidth: 0,
        borderRadius: 20,
        barPercentage: 0.75,
        categoryPercentage: 0.75
      });
    }

    var allVals = [];
    datasets.forEach(function(ds) { allVals = allVals.concat(ds.data); });
    var maxVal = Math.ceil(Math.max.apply(null, allVals)) + 1;

    var titleText = mode === 'ttft' ? 'Time-to-First-Token (TTFT)' :
                    mode === 'e2el' ? 'End-to-End Latency (E2EL)' :
                    "";

    runtimeChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 600, easing: 'easeOutQuart' },
        layout: { padding: { left: 10, right: 60 } },
        plugins: {
          legend: {
            display: mode === 'both',
            position: 'top',
            labels: {
              font: { size: 13, family: '"Avenir", "Avenir Next Cyr", "Avenir", "Avenir Next Cyr", "Inter", sans-serif', weight: '500' },
              color: labelColor,
              usePointStyle: true,
              pointStyle: 'rectRounded',
              padding: 16
            }
          },
          title: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.75)',
            titleFont: { size: 13, family: '"Avenir", "Avenir Next Cyr", "Inter", sans-serif' },
            bodyFont: { size: 13, family: '"Avenir", "Avenir Next Cyr", "Inter", sans-serif' },
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              title: function(items) {
                return items[0].label.replace('\n', ' ');
              },
              label: function(context) {
                return context.dataset.label + ': ' + context.raw.toFixed(2) + 's';
              }
            }
          },
          datalabels: false
        },
        scales: {
          x: {
            min: 0,
            max: maxVal,
            grid: { display: false },
            ticks: {
              font: { size: 12, family: '"Avenir", "Avenir Next Cyr", "Inter", sans-serif' },
              color: '#9CA3AF',
              stepSize: 1,
              callback: function(value) { return value.toFixed(0) + 's'; }
            },
            title: { display: false }
          },
          y: {
            grid: { display: false },
            ticks: { color: 'transparent', font: { size: 13 } },
            afterFit: function(axis) { axis.width = Math.max(axis.width, 180); }
          }
        }
      },
      plugins: [runtimeYLabelsPlugin, runtimeValuePlugin]
    });
  }

  /* Initialize with TTFT */
  buildChart('ttft');

  /* Expose globally for the inline onclick handlers */
  window.updateRuntimeChart = function(mode) {
    var btnTTFT = document.getElementById('runtimeBtnTTFT');
    var btnE2EL = document.getElementById('runtimeBtnE2EL');
    var btnBoth = document.getElementById('runtimeBtnBoth');
    [btnTTFT, btnE2EL, btnBoth].forEach(function(b) { b.classList.remove('is-active'); });
    if (mode === 'ttft') btnTTFT.classList.add('is-active');
    else if (mode === 'e2el') btnE2EL.classList.add('is-active');
    else btnBoth.classList.add('is-active');
    buildChart(mode);
  };
})();
