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


interface EChartsComponentProps {
  table: Record<string, Record<string, number>>;
};
export const EChartsComponent: React.FC<EChartsComponentProps> = ({table}: EChartsComponentProps) => {
  const chartRef = useRef(null);
  const updateFrequency = 1700;
  const [clicks, setClicks] = useState(0);
  // @ts-ignore
  let myChart = null;

  const handleDivClick = () => {
    setClicks(clicks + 1);
  }
  // select the top 8 types in table
  const phaseNum = Object.keys(table).length;
  const finalTable = table[phaseNum.toString()];
  const topMBTI = Object.entries(finalTable).sort((a, b) => b[1] - a[1]).slice(0, 8).map((x) => x[0]);
  const newTable: Record<string, Record<string, number>> = {};
  for (let i = 1; i <= phaseNum; ++i) {
    newTable[i.toString()] = {};
    for (const [key, value] of Object.entries(table[i.toString()])) {
      if (topMBTI.includes(key)) {
        newTable[i.toString()][key] = value;
      }
    }
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
    for (const key of topMBTI) {
      data.push([key, newTable[startPhase.toString()][key].toString()])
    };

    myChart.clear()

    const option = {
      grid: {
        top: 10,
        bottom: 20,
        left: 35,
        right: 20
      },
      xAxis: {
        max: 90,
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
          fontSize: 12,
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
            fontSize: 12,
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
              font: 'bolder 40px monospace',
              fill: 'rgba(100, 100, 100, 0.5)'
            },
            z: 100
          }
        ]
      }
    };

    // @ts-ignore
    myChart.setOption(option);

    for (let i = startPhase; i <= Object.keys(newTable).length; ++i) {
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
      for (const key of topMBTI) {
        source.push([key, newTable[phase.toString()][key].toString()])
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

