'use client'

import React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const mbtiColors: Record<string, string> = {
  'INTJ': '#867EBB', // purple
  'INTP': '#B399DF',
  'INFJ': '#D6B9FF',
  'INFP': '#DFD7FF',

  'ISTJ': '#FEB624', // yellow
  'ISTP': '#FDD343',
  'ISFJ': '#FDE64A',
  'ISFP': '#FCEB9D',

  'ENTJ': '#0A5FB2', // blue
  'ENTP': '#37A8E0',
  'ENFJ': '#61B0DB',
  'ENFP': '#A8DCE7',

  'ESTJ': '#6D8463', // green
  'ESTP': '#A2D97E',
  'ESFJ': '#B4D66B',
  'ESFP': '#D6F29B'
};


export const EChartsComponent = (table: Record<string, Record<string, number>>) => {
  const chartRef = useRef(null);
  const updateFrequency = 1500;
  const [clicks, setClicks] = useState(0);
  // @ts-ignore
  let myChart = null;

  const handleDivClick = () => {
    setClicks(clicks + 1);
  }

  useEffect(() => {
    myChart = echarts.init(chartRef.current);
    let startPhase = 1

//    var table = {
//      '1': {
//        ENFJ: 38.275540471076965,
//        ENFP: 35.11941194534302,
//        ENTJ: 49.97664034366608,
//        ENTP: 50.11435233056545,
//        ESFJ: 37.305262088775635,
//        ESFP: 32.91337728500366,
//        ESTJ: 38.388714864850044,
//        ESTP: 45.06731070578098,
//        INFJ: 43.11929702758789,
//        INFP: 32.648231983184814,
//        INTJ: 51.54323413968086,
//        INTP: 45.59692561626434,
//        ISFJ: 35.543546080589294,
//        ISFP: 27.89761871099472,
//        ISTJ: 48.30200046300888,
//        ISTP: 39.03625711798668
//      }
//    };

    let data = [
      ['MBTI type'].concat([`Phase ${startPhase}`]),
    ]
    for (const [key, _] of Object.entries(mbtiColors)) {
      data.push([key, table[startPhase.toString()][key].toString()])
    };

    const option = {
      grid: {
        top: 10,
        bottom: 20,
        left: 30,
        right: 20
      },
      xAxis: {
        max: 85,
        axisLabel: {
          formatter: function (n: number | string) {
            if (typeof n === 'number') {
              return Math.floor(n / 10) * 10 + '';
            } else {
              return Math.floor(parseFloat(n) / 10) * 10 + '';
            }
          }
        }
      },
      yAxis: {
        type: 'category',
        inverse: true,
        axisLabel: {
          show: true,
          fontSize: 8,
          formatter: function (value: any) {
            return value
          },
        },
        animationDuration: 300,
        animationDurationUpdate: 300
      },
      //animationDuration: 0,
      animationDurationUpdate: updateFrequency,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear',
      series: [
        {
          realtimeSort: true,
          seriesLayoutBy: 'column',
          type: 'bar',
          itemStyle: {
            color: function (param: Record<string, any>) {
              return mbtiColors[param.value[0]] || '#5470c6';
            }
          },
          encode: {
            x: 1,
            y: 0,
          },
          label: {
            show: true,
            precision: 1,
            position: 'right',
            valueAnimation: true,
            fontFamily: 'monospace',
            fontSize: 8,
          }
        }
      ],
      dataset: {
        source: data.slice(1),
      }, 
      graphic: {
        elements: [
          {
            type: 'text',
            right: 20,
            bottom: 20,
            style: {
              text: `Phase ${startPhase}`,
              font: 'bolder 32px monospace',
              fill: 'rgba(100, 100, 100, 0.25)'
            },
            z: 100
          }
        ]
      }
    };

    // @ts-ignore
    myChart.setOption(option);

    for (let i = startPhase; i <= Object.keys(table).length; ++i) {
      (function (i) {
        setTimeout(function () {
          updatePhase(i);
        }, (i - 1) * updateFrequency);
      })(i);
    }

    function updatePhase(phase: number) {
      let source = [
        ['MBTI type'].concat([`Phase ${phase}`]),
      ]
      for (const [key, _] of Object.entries(mbtiColors)) {
        source.push([key, table[phase.toString()][key].toString()])
      };
      (option as any).series[0].data = source.slice(1);
      (option as any).graphic.elements[0].style.text = `Phase ${phase}`;
      // @ts-ignore
      myChart.setOption(option);
    }

    const handleResize = () => {
      // @ts-ignore
      if (!myChart) {
        // @ts-ignore
        myChart.resize();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // @ts-ignore
      if (!myChart) {
        // @ts-ignore
        myChart.dispose();
      }
    };
  }, [clicks]);

  return <div ref={chartRef} style={{ width: '100%', height: '300px' }} onClick={handleDivClick}/>;
};

