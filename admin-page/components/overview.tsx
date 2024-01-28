"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface OverviewProps {
  data: any[]
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active = false, payload = [] }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
        <p>{payload[0].name}: {payload[0].value} €</p>
      </div>
    );
  }

  return null;
};

export const Overview: React.FC<OverviewProps> = ({
  data = []
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
};
