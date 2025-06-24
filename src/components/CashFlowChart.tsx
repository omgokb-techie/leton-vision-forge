
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, ComposedChart } from 'recharts';

const cashFlowData = [
  {
    month: 'Oct 2024',
    inflow: 25000,
    outflow: -18000,
    net: 7000,
    projected: false
  },
  {
    month: 'Nov 2024', 
    inflow: 32000,
    outflow: -22000,
    net: 10000,
    projected: false
  },
  {
    month: 'Dec 2024',
    inflow: 28000,
    outflow: -16000,
    net: 12000,
    projected: false
  },
  {
    month: 'Jan 2025',
    inflow: 35000,
    outflow: -26500,
    net: 8500,
    projected: true
  },
  {
    month: 'Feb 2025',
    inflow: 42000,
    outflow: -28000,
    net: 14000,
    projected: true
  },
  {
    month: 'Mar 2025',
    inflow: 48000,
    outflow: -25500,
    net: 22500,
    projected: true
  },
  {
    month: 'Apr 2025',
    inflow: 38000,
    outflow: -23000,
    net: 15000,
    projected: true
  },
  {
    month: 'May 2025',
    inflow: 45000,
    outflow: -28500,
    net: 16500,
    projected: true
  }
];

export const CashFlowChart = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: €{Math.abs(entry.value).toLocaleString()}
              {entry.dataKey === 'net' && (
                <span className={entry.value >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {entry.value >= 0 ? ' (profit)' : ' (loss)'}
                </span>
              )}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <h3 className="text-sm font-medium text-green-700 mb-1">Total Inflows (YTD)</h3>
          <p className="text-2xl font-bold text-green-800">
            €{cashFlowData.reduce((sum, item) => sum + item.inflow, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
          <h3 className="text-sm font-medium text-red-700 mb-1">Total Outflows (YTD)</h3>
          <p className="text-2xl font-bold text-red-800">
            €{Math.abs(cashFlowData.reduce((sum, item) => sum + item.outflow, 0)).toLocaleString()}
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-700 mb-1">Net Cash Flow (YTD)</h3>
          <p className="text-2xl font-bold text-blue-800">
            €{cashFlowData.reduce((sum, item) => sum + item.net, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Cash Flow Analysis</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Inflows</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Outflows</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Net Flow</span>
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={cashFlowData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#666"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#666"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Bars for inflows and outflows */}
            <Bar 
              dataKey="inflow" 
              name="Inflows" 
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="outflow" 
              name="Outflows" 
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
            />
            
            {/* Line for net flow */}
            <Line 
              type="monotone" 
              dataKey="net" 
              name="Net Flow"
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
              strokeDasharray="0"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Future Projections Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">Liquidity Outlook</h4>
            <p className="text-blue-700 text-sm">
              Based on current projections, cash flow remains positive throughout the forecast period. 
              The strongest months are projected to be February and March 2025. Monitor actual vs 
              projected performance to identify any potential liquidity challenges early.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
