import { useState } from 'react';
import { Icon } from '../../../components/Icons';
import { formatNumber, formatDistance } from '../data';

export function GoalsEditor({ goals, onSave }) {
    const [editedGoals, setEditedGoals] = useState({ ...goals });
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (field, value) => {
        const numValue = Math.max(1, parseInt(value) || 1);
        setEditedGoals(prev => ({ ...prev, [field]: numValue }));
    };

    const handleSave = () => {
        onSave(editedGoals);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedGoals({ ...goals });
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <div className="goals-editor">
                <div className="goals-list">
                    <GoalItem
                        icon="steps"
                        label="Daily Steps"
                        value={formatNumber(goals.dailySteps)}
                    />
                    <GoalItem
                        icon="flame"
                        label="Daily Calories"
                        value={formatNumber(goals.dailyCalories)}
                    />
                    <GoalItem
                        icon="map"
                        label="Daily Distance"
                        value={formatDistance(goals.dailyDistance)}
                    />
                </div>
                <button 
                    className="edit-goals-btn"
                    onClick={() => setIsEditing(true)}
                >
                    Edit Goals
                </button>
            </div>
        );
    }

    return (
        <div className="goals-editor editing">
            <div className="goals-form">
                <div className="goal-input-group">
                    <label>
                        <Icon name="steps" size={20} />
                        Daily Steps
                    </label>
                    <input
                        type="number"
                        value={editedGoals.dailySteps}
                        onChange={(e) => handleChange('dailySteps', e.target.value)}
                        min="1"
                    />
                </div>
                <div className="goal-input-group">
                    <label>
                        <Icon name="flame" size={20} />
                        Daily Calories
                    </label>
                    <input
                        type="number"
                        value={editedGoals.dailyCalories}
                        onChange={(e) => handleChange('dailyCalories', e.target.value)}
                        min="1"
                    />
                </div>
                <div className="goal-input-group">
                    <label>
                        <Icon name="map" size={20} />
                        Daily Distance (m)
                    </label>
                    <input
                        type="number"
                        value={editedGoals.dailyDistance}
                        onChange={(e) => handleChange('dailyDistance', e.target.value)}
                        min="1"
                    />
                </div>
            </div>
            <div className="goals-actions">
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
}

function GoalItem({ icon, label, value }) {
    return (
        <div className="goal-item">
            <Icon name={icon} size={24} />
            <div className="goal-info">
                <span className="goal-label">{label}</span>
                <span className="goal-value">{value}</span>
            </div>
        </div>
    );
}
