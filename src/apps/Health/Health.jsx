import { useState } from 'react';
import { AppShell } from '../../components/AppShell';
import { PanoramaView } from '../../components/PanoramaView';
import { TodayView } from './components/TodayView';
import { HistoryChart } from './components/HistoryChart';
import { GoalsEditor } from './components/GoalsEditor';
import { 
    MOCK_TODAY_DATA, 
    MOCK_HEALTH_GOALS,
    MOCK_WEEKLY_DATA,
    MOCK_MONTHLY_DATA
} from './data';
import './Health.css';

export function Health() {
    const [todayData] = useState(MOCK_TODAY_DATA);
    const [goals, setGoals] = useState(MOCK_HEALTH_GOALS);
    const [weeklyData] = useState(MOCK_WEEKLY_DATA);
    const [monthlyData] = useState(MOCK_MONTHLY_DATA);

    const handleSaveGoals = (newGoals) => {
        setGoals(newGoals);
    };

    const sections = [
        {
            key: 'today',
            header: 'today',
            content: (
                <TodayView 
                    data={todayData}
                    goals={goals}
                />
            )
        },
        {
            key: 'history',
            header: 'history',
            content: (
                <HistoryChart 
                    weeklyData={weeklyData}
                    monthlyData={monthlyData}
                />
            )
        },
        {
            key: 'goals',
            header: 'goals',
            content: (
                <GoalsEditor 
                    goals={goals}
                    onSave={handleSaveGoals}
                />
            )
        }
    ];

    return (
        <AppShell title="health" hideTitle>
            <div className="health-app">
                <PanoramaView 
                    title="health"
                    sections={sections}
                />
            </div>
        </AppShell>
    );
}
