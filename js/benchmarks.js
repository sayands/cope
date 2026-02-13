document.addEventListener('DOMContentLoaded', function() {
  var benchmarkData = {
    perceptiontest: {
      label: 'PerceptionTest',
      models: {
        'Video-LaViT': 47.9,
        'VILA-40B': 54.0,
        'IXC-2.5-7B': 34.4,
        'LLaVA-OV-7B': 57.1,
        'Apollo-7B': 57.3,
        'Oryx-7B': 68.6,
        'LLaVA-Video-7B': 67.9,
        'CoPE-VideoLM-7B (Ours)': 70.5
      }
    },
    nextqa: {
      label: 'NExT-QA',
      models: {
        'VILA-40B': 67.9,
        'LongVA-7B': 68.3,
        'IXC-2.5-7B': 71.0,
        'LLaVA-OV-7B': 79.4,
        'Oryx-7B': 81.9,
        'LLaVA-Video-7B': 83.2,
        'CoPE-VideoLM-7B (Ours)': 81.8
      }
    },
    actnetqa: {
      label: 'ActNet-QA',
      minX: 40,
      models: {
        'Video-LaViT': 50.1,
        'EMA-7B': 52.1,
        'LongVA-7B': 50.0,
        'IXC-2.5-7B': 52.8,
        'LLaVA-OV-7B': 56.6,
        'LLaVA-Video-7B': 56.5,
        'VILA-40B': 58.0,
        'CoPE-VideoLM-7B (Ours)': 58.8
      }
    },
    videomme: {
      label: 'VideoMME',
      grouped: true,
      models: {
        'LongVA-7B': { wo: 52.6, w: 54.3 },
        'EMA-7B': { wo: 53.4, w: 58.4 },
        'IXC-2.5-7B': { wo: 55.8, w: 58.8 },
        'LLaVA-OV-7B': { wo: 58.2, w: 61.5 },
        'Oryx-7B': { wo: 58.3, w: 62.6 },
        'VILA-40B': { wo: 60.1, w: 61.1 },
        'Apollo-7B': { wo: 61.3, w: 63.3 },
        'CoPE-VideoLM-7B (Ours)': { wo: 61.7, w: 67.8 },
        'LLaVA-Video-7B': { wo: 63.3, w: 69.7 }
      }
    },
    tempcompass: {
      label: 'TempCompass',
      models: {
        'VideoChat2-7B': 45.5,
        'LongVA-7B': 56.9,
        'LLaVA-OV-7B': 64.8,
        'Apollo-7B': 64.9,
        'InternVL2-8B': 65.3,
        'LLaVA-Video-7B': 66.6,
        'IXC-2.5-7B': 67.1,
        'CoPE-VideoLM-7B (Ours)': 68.4
      }
    },
    tomato: {
      label: 'Tomato',
      models: {
        'VideoLLaMA2-7B': 18.5,
        'InternVL2-8B': 21.7,
        'LLaVA-Video-7B': 24.9,
        'LLaVA-OV-7B': 25.5,
        'VideoCCAM-9B': 27.0,
        'InternVideo2-8B': 26.4,
        'LLaVA-Video-7B-Video-Only': 23.9,
        'CoPE-VideoLM-7B (Ours)': 28.3
      }
    },
    cvrres: { 
      label: 'CVRR-ES',
      models: {
        'VideoLLaMA2-7B': 21.6,
        'VideoChatGPT': 25.0,
        'VideoChat': 25.8,
        'TimeChat': 35.9,
        'LLaVA-OV-7B': 42.6,
        'LLaVA-Video-7B': 43.6,
        'CoPE-VideoLM-7B (Ours)': 49.1
      }
    },
    mvbench: {
      label: 'MVBench',
      models: {
        'VideoChat2-7B': 51.1,
        'VideoLLaMA2-7B': 54.6,
        'LLaVA-OV-7B': 56.7,
        'LLaVA-Video-7B': 58.6,
        'CoPE-VideoLM-7B (Ours)': 61.6,
        'VideoCCAM-9B': 64.6,
        'InternVL2-8B': 65.8,
        'IXC-2.5-7B': 69.1
      }
    },
    videott: {
      label: 'Video-TT',
      models: {
        'Qwen2.5-VL-7B': 39.9,
        'LLaVA-Video-7B': 41.8,
        'LLaVA-OV-7B': 44.0,
        'CoPE-VideoLM-7B (Ours)': 44.3,
        'Ola-7B': 45.5,
        'InternVL-2.5-8B': 44.7,
        'Oryx-1.5-7B': 44.8
      }
    },
    videommmu: {
      label: 'Video-MMMU',
      models: {
        'LongVA-7B': 23.9,
        'Llama-3.2-11B': 30.00,
        'LLaVA-OV-7B': 33.9,
        'VILA1.5-40B': 34.0,
        'LLaVA-Video-7B': 36.1,
        'InternVL2-8B': 37.4,
        'CoPE-VideoLM-7B (Ours)': 37.9
      }
    },
    lvbench: {
      label: 'LVBench',
      models: {
        'PLLaVA-34B': 26.1,
        'Kangaroo-8B': 39.4,
        'LLaVA-OV-7B': 38.4,
        'TimeMarker-7B': 41.3,
        'mPLUG-Owl3-7B': 43.5,
        'LLaVA-Video-7B': 44.2,
        'CoPE-VideoLM-7B (Ours)': 46.4
      }
    },
    longvideobench: {
      label: 'LongVideoBench',
      models: {
        'EMA-7B': 47.0,
        'mPLUG-Owl3-7B': 52.1,
        'PLLaVA-34B': 53.2,
        'InternVL2-8B': 54.6,
        'Kangaroo-8B': 54.8,
        'TimeMarker-7B': 56.3,
        'LLaVA-OV-7B': 56.5,
        'CoPE-VideoLM-7B (Ours)': 56.9,
        'LLaVA-Video-7B': 58.2
      }
    }
  };

  function getBarColor(modelName) {
    if (modelName.includes('(Ours)')) return '#6567C9';
    return '#E5E7EB';
  }

  function getBorderColor(modelName) {
    if (modelName.includes('(Ours)')) return '#6567C9';
    return '#E5E7EB';
  }

  var ctx = document.getElementById('benchmarkChart');
  if (!ctx) return;

  var chart = null;

  /* Plugin: custom y-axis labels with italic "(Ours)" */
  var customYLabelsPlugin = {
    id: 'customYLabels',
    afterDraw: function(chartInst) {
      var yAxis = chartInst.scales.y;
      var c = chartInst.ctx;
      var mobile = window.innerWidth <= 600;
      var fontSize = mobile ? '11px' : '13px';
      yAxis.ticks.forEach(function(tick, index) {
        var label = typeof tick.label === 'string' ? tick.label : String(tick.label);
        var y = yAxis.getPixelForTick(index);
        var x = yAxis.right - (mobile ? 6 : 10);
        c.save();
        c.textAlign = 'right';
        c.textBaseline = 'middle';
        if (label.indexOf('(Ours)') !== -1) {
          c.font = 'italic 600 ' + fontSize + ' "Inter", "Avenir Next Cyr", sans-serif';
          c.fillStyle = '#6567C9';
          c.fillText(label, x, y);
        } else {
          c.font = fontSize + ' "Inter", "Avenir Next Cyr", sans-serif';
          c.fillStyle = '#7a6e62';
          c.fillText(label, x, y);
        }
        c.restore();
      });
    }
  };

  /* Plugin: value labels at end of bars */
  var valueLabelPlugin = {
    id: 'valueLabels',
    afterDatasetsDraw: function(chartInst) {
      var c = chartInst.ctx;
      var mobile = window.innerWidth <= 600;
      var isGrouped = chartInst.data.datasets.length > 1;
      chartInst.data.datasets.forEach(function(dataset, i) {
        var meta = chartInst.getDatasetMeta(i);
        meta.data.forEach(function(bar, index) {
          var value = dataset.data[index];
          if (value === null || value === undefined) return;
          var label = chartInst.data.labels[index];
          var isOurs = typeof label === 'string' && label.indexOf('(Ours)') !== -1;
          c.save();
          var fontSize = mobile ? '10px' : '13px';
          var groupedFontSize = mobile ? '9px' : '12px';
          if (isGrouped) {
            c.fillStyle = '#7a6e62';
            c.font = groupedFontSize + ' "Inter", "Avenir Next Cyr", sans-serif';
          } else {
            c.fillStyle = isOurs ? '#6567C9' : '#7a6e62';
            c.font = (isOurs ? '600 ' : '') + fontSize + ' "Inter", "Avenir Next Cyr", sans-serif';
          }
          c.textAlign = 'left';
          c.textBaseline = 'middle';
          c.fillText(value.toFixed(1), bar.x + (mobile ? 4 : 6), bar.y);
          c.restore();
        });
      });
    }
  };

  function updateChart(benchmarkKey) {
    var data = benchmarkData[benchmarkKey];
    var chartContainer = ctx.parentElement;
    var greenBenchmarks = ['perceptiontest', 'nextqa', 'actnetqa', 'videomme'];
    var orangeBenchmarks = ['tempcompass', 'tomato', 'cvrres', 'mvbench'];
    var purpleBenchmarks = ['videott', 'videommmu', 'lvbench', 'longvideobench'];
    if (greenBenchmarks.indexOf(benchmarkKey) !== -1) {
      chartContainer.style.backgroundColor = 'transparent';
    } else if (orangeBenchmarks.indexOf(benchmarkKey) !== -1) {
      chartContainer.style.backgroundColor = 'transparent';
    } else if (purpleBenchmarks.indexOf(benchmarkKey) !== -1) {
      chartContainer.style.backgroundColor = 'transparent';
    } else {
      chartContainer.style.backgroundColor = 'transparent';
    }
    chartContainer.style.borderRadius = '12px';

    if (chart) chart.destroy();

    /* Dynamically size chart height based on number of models */
    var isMobile = window.innerWidth <= 600;
    var barHeight = isMobile ? 40 : 50;

    if (data.grouped) {
      /* ---- Grouped bar chart (VideoMME) ---- */
      var numModels = Object.keys(data.models).length;
      chartContainer.style.height = Math.max(350, numModels * barHeight * 1.5) + 'px';
      var entries = Object.entries(data.models).sort(function(a, b) {
        return (a[1].wo || 0) - (b[1].wo || 0);
      });
      var labels = entries.map(function(e) { return e[0]; });
      var woValues = entries.map(function(e) { return e[1].wo; });
      var wValues  = entries.map(function(e) { return e[1].w; });
      var woColors = entries.map(function(e) { return e[0].indexOf('(Ours)') !== -1 ? '#b8b9e8' : '#E5E7EB'; });
      var wColors  = entries.map(function(e) { return e[0].indexOf('(Ours)') !== -1 ? '#6567C9' : '#D1D5DB'; });
      var woBorders = entries.map(function(e) { return e[0].indexOf('(Ours)') !== -1 ? '#b8b9e8' : '#E5E7EB'; });
      var wBorders  = entries.map(function(e) { return e[0].indexOf('(Ours)') !== -1 ? '#6567C9' : '#D1D5DB'; });
      var allVals = woValues.concat(wValues).filter(function(v) { return v !== null; });
      var minVal = Math.floor(Math.min.apply(null, allVals) / 5) * 5;
      var maxVal = Math.ceil(Math.max.apply(null, allVals) / 5) * 5 + 5;

      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'w/o subtitles',
              data: woValues,
              backgroundColor: woColors,
              borderColor: woBorders,
            borderWidth: 0,
            borderRadius: 20,
            barPercentage: 0.75,
            categoryPercentage: 0.75
            },
            {
              label: 'w/ subtitles',
              data: wValues,
              backgroundColor: wColors,
              borderColor: wBorders,
              borderWidth: 0,
              borderRadius: 20,
              barPercentage: 0.75,
              categoryPercentage: 0.75
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 600, easing: 'easeOutQuart' },
          layout: { padding: { left: 10, right: 50 } },
          plugins: {
            legend: { display: false },
            title: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(0,0,0,0.75)',
              titleFont: { size: 13, family: '"Inter", sans-serif' },
              bodyFont: { size: 13, family: '"Inter", sans-serif' },
              padding: 10,
              cornerRadius: 8,
              callbacks: {
                label: function(context) {
                  if (context.raw === null) return '';
                  return context.dataset.label + ': ' + context.raw.toFixed(1);
                }
              }
            },
            datalabels: false
          },
          scales: {
            x: {
              min: minVal,
              max: maxVal,
              grid: { display: false },
              ticks: {
                font: { size: 12, family: '"Inter", sans-serif' },
                color: '#9CA3AF',
                stepSize: 5,
                callback: function(value) { return value.toFixed(0); }
              },
              title: { display: false }
            },
            y: {
              grid: { display: false },
              ticks: { color: 'transparent', font: { size: 13 } },
              afterFit: function(axis) { axis.width = Math.max(axis.width, isMobile ? 130 : 200); }
            }
          }
        },
        plugins: [customYLabelsPlugin, valueLabelPlugin]
      });
    } else {
      /* ---- Standard single-bar chart ---- */
      var numModels = Object.keys(data.models).length;
      chartContainer.style.height = Math.max(300, numModels * barHeight) + 'px';
      var entries = Object.entries(data.models).sort(function(a, b) { return a[1] - b[1]; });
      var labels = entries.map(function(e) { return e[0]; });
      var values = entries.map(function(e) { return e[1]; });
      var bgColors = entries.map(function(e) { return getBarColor(e[0]); });
      var bdColors = entries.map(function(e) { return getBorderColor(e[0]); });
      var minVal = data.minX !== undefined ? data.minX : Math.floor(Math.min.apply(null, values) / 5) * 5;
      var maxVal = Math.ceil(Math.max.apply(null, values) / 5) * 5 + 5;

      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: bgColors,
            borderColor: bdColors,
            borderWidth: 0,
            borderRadius: isMobile ? 12 : 20,
            barThickness: isMobile ? 22 : 32
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 600, easing: 'easeOutQuart' },
          layout: { padding: { left: isMobile ? 4 : 10, right: isMobile ? 36 : 50 } },
          plugins: {
            legend: { display: false },
            title: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(0,0,0,0.75)',
              titleFont: { size: 13, family: '"Inter", sans-serif' },
              bodyFont: { size: 13, family: '"Inter", sans-serif' },
              padding: 10,
              cornerRadius: 8,
              callbacks: {
                label: function(context) {
                  return 'Score: ' + context.raw.toFixed(1);
                }
              }
            },
            datalabels: false
          },
          scales: {
            x: {
              min: minVal,
              max: maxVal,
              grid: { display: false },
              ticks: {
                font: { size: 12, family: '"Inter", sans-serif' },
                color: '#9CA3AF',
                stepSize: 5,
                callback: function(value) { return value.toFixed(0); }
              },
              title: { display: false }
            },
            y: {
              grid: { display: false },
              ticks: { color: 'transparent', font: { size: 13 } },
              afterFit: function(axis) { axis.width = Math.max(axis.width, isMobile ? 130 : 200); }
            }
          }
        },
        plugins: [customYLabelsPlugin, valueLabelPlugin]
      });
    }
  }

  // Initialize with first benchmark
  updateChart('perceptiontest');

  // Button click handlers — scoped to benchmark selector only
  var benchmarkSelector = document.querySelector('.benchmark-selector');
  if (benchmarkSelector) {
    benchmarkSelector.querySelectorAll('.benchmark-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        benchmarkSelector.querySelectorAll('.benchmark-btn').forEach(function(b) {
          b.classList.remove('is-active');
        });
        this.classList.add('is-active');
        updateChart(this.getAttribute('data-benchmark'));
      });
    });
  }
});
