import { useState } from 'react';
import { getDayAbbreviation, formatNumber, formatDistance } from '../data';

export function HistoryChart({ weeklyData, monthlyData }) {
    const [viewMode, setViewMode] = useState('weekly');
    const [metric, setMetric] = useState('steps');

    const data = viewMode === 'weekly' ? weeklyData : monthlyData;
    
    const getMetricValue = (item) => {
        switch (metric) {
            case 'steps': return item.steps;
            case 'calories': return item.calories;
            case 'distance': return item.distance;
            default: return item.steps;
        }
    };

    const formatValue = (value) => {
        if (metric === 'distance') {
            return formatDistance(value);
        }
        return formatNumber(value);
    };

    const maxValue = Math.max(...data.map(getMetricValue));

    return (
        <div className="history-chart">
            <div className="chart-controls">
                <div className="view-toggle">
                    <button 
                        className={viewMode === 'weekly' ? 'active' : ''}
                        onClick={() => setViewMode('weekly')}
                    >
                        Week
                    </button>
                    <button 
                        className={viewMode === 'monthly' ? 'active' : ''}
                        onClick={() => setViewMode('monthly')}
                    >
                        Month
                    </button>
                </div>
                <div className="metric-toggle">
                    <button 
                        className={metric === 'steps' ? 'active' : ''}
                        onClick={() => setMetric('steps')}
                    >
                        Steps
                    </button>
                    <button 
                        className={metric === 'calories' ? 'active' : ''}
                        onClick={() => setMetric('calories')}
                    >
                        Cal
                    </button>
                    <button 
                        className={metric === 'distance' ? 'active' : ''}
                        onClick={() => setMetric('distance')}
                    >
                        Dist
                    </button>
                </div>
            </div>

            <div className="chart-container">
                <div className="chart-bars">
                    {data.map((item, index) => {
                        const value = getMetricValue(item);
                        const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
                        
                        return (
                            <div key={index} className="chart-bar-wrapper">
                                <div 
                                    className="chart-bar"
                                    style={{ height: `${height}%` }}
                                    title={formatValue(value)}
                                />
                                <span className="chart-label">
                                    {viewMode === 'weekly' 
                                        ? getDayAbbreviation(item.date)
                                        : item.date.getDate()
                                    }
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="chart-summary">
                <div className="summary-item">
                    <span className="summary-label">Average</span>
                    <span className="summary-value">
                        {formatValue(Math.round(data.reduce((sum, item) => sum + getMetricValue(item), 0) / data.length))}
                    </span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Best</span>
                    <span className="summary-value">{formatValue(maxValue)}</span>
                </div>
            </div>
        </div>
    );
}
