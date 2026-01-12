import { Icon } from '../../../components/Icons';
import { calculateProgress, formatDistance, formatNumber } from '../data';

export function TodayView({ data, goals }) {
    const stepsProgress = calculateProgress(data.steps, goals.dailySteps);
    const caloriesProgress = calculateProgress(data.calories, goals.dailyCalories);
    const distanceProgress = calculateProgress(data.distance, goals.dailyDistance);

    return (
        <div className="today-view">
            <div className="progress-cards">
                <ProgressCard
                    icon="steps"
                    label="Steps"
                    value={formatNumber(data.steps)}
                    goal={formatNumber(goals.dailySteps)}
                    progress={stepsProgress}
                    color="#60A917"
                />
                <ProgressCard
                    icon="flame"
                    label="Calories"
                    value={formatNumber(data.calories)}
                    goal={formatNumber(goals.dailyCalories)}
                    progress={caloriesProgress}
                    color="#FA6800"
                />
                <ProgressCard
                    icon="map"
                    label="Distance"
                    value={formatDistance(data.distance)}
                    goal={formatDistance(goals.dailyDistance)}
                    progress={distanceProgress}
                    color="#1BA1E2"
                />
            </div>
            
            <div className="active-minutes">
                <Icon name="heart" size={20} />
                <span className="active-minutes-value">{data.activeMinutes}</span>
                <span className="active-minutes-label">active minutes</span>
            </div>
        </div>
    );
}

function ProgressCard({ icon, label, value, goal, progress, color }) {
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="progress-card">
            <div className="progress-ring-container">
                <svg className="progress-ring" viewBox="0 0 100 100">
                    <circle
                        className="progress-ring-bg"
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        strokeWidth="6"
                    />
                    <circle
                        className="progress-ring-fill"
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        strokeWidth="6"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{ stroke: color }}
                    />
                </svg>
                <div className="progress-ring-content">
                    <Icon name={icon} size={24} />
                </div>
            </div>
            <div className="progress-info">
                <span className="progress-value">{value}</span>
                <span className="progress-label">{label}</span>
                <span className="progress-goal">of {goal}</span>
            </div>
        </div>
    );
}
