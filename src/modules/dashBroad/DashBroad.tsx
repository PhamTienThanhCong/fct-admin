import React, { useState, useEffect } from 'react';
import { Mix, MixConfig } from '@ant-design/plots';
import './DashBroad.css';
import Data from '../../components/columns/DashBroad.json';

const DashBroad: React.FC = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    setData(Data); 
  };

  if (!Object.keys(data).length) {
    return null;
  }

  const config: MixConfig = {
    tooltip: false,
    plots: [
      {
        type: 'bar',
        region: {
          start: {
            x: 0,
            y: 0,
          },
          end: {
            x: 0.45,
            y: 0.45,
          },
        },
        options: {
          data: data.bar,
          xField: 'count',
          yField: 'area',
          seriesField: 'cat',
          isStack: true,
          tooltip: {
            shared: true,
            showCrosshairs: false,
            showMarkers: false,
          },
          label: {},
          interactions: [
            {
              type: 'active-region',
            },
          ],
        },
      },
      {
        type: 'pie',
        region: {
          start: {
            x: 0.5,
            y: 0,
          },
          end: {
            x: 1,
            y: 0.45,
          },
        },
        options: {
          data: data.pie,
          angleField: 'bill',
          colorField: 'area',
          tooltip: {
            showMarkers: false,
          },
          radius: 0.85,
          label: {
            type: 'inner',
            formatter: '{name}',
            offset: '-15%',
          },
          interactions: [
            {
              type: 'element-active',
            },
          ],
        },
      },
      {
        type: 'area',
        region: {
          start: {
            x: 0,
            y: 0.5,
          },
          end: {
            x: 1,
            y: 0.95,
          },
        },
        options: {
          data: data.line,
          xField: 'time',
          yField: 'value',
          seriesField: 'area',
          line: {},
          point: {
            style: {
              r: 2.5,
            },
          },
          meta: {
            time: {
              range: [0, 1],
            },
          },
          smooth: true,
          tooltip: {
            showCrosshairs: true,
            shared: true,
          },
        },
      },
    ],
  };

  return (
    <div className='dashbroad'>
        <Mix {...config} />
    </div>
  );
};

export default DashBroad;
