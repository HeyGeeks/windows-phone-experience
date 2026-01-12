import { useState } from 'react';
import { Icon } from '../../../components/Icons';

/**
 * ComposeEmail - Email composition form with Metro styling
 * @param {Object} props
 * @param {function} props.onBack - Callback to go back
 * @param {function} props.onSend - Callback to send email
 * @param {Object} [props.replyTo] - Email being replied to (optional)
 */
export function ComposeEmail({ onBack, onSend, replyTo }) {
    const [to, setTo] = useState(replyTo ? replyTo.sender.email : '');
    const [subject, setSubject] = useState(replyTo ? `Re: ${replyTo.subject}` : '');
    const [body, setBody] = useState(replyTo ? `\n\n---\nFrom: ${replyTo.sender.name}\n${replyTo.body}` : '');

    const canSend = to.trim().length > 0 && subject.trim().length > 0;

    const handleSend = () => {
        if (canSend) {
            onSend({
                to: to.split(',').map(email => email.trim()),
                subject,
                body
            });
        }
    };

    return (
        <div className="compose-email">
            <div className="compose-header">
                <button 
                    className="compose-back" 
                    onClick={onBack}
                    aria-label="Cancel"
                >
                    <Icon name="close" size={24} />
                </button>
                <span className="compose-title">New Email</span>
                <button 
                    className="compose-send" 
                    onClick={handleSend}
                    disabled={!canSend}
                    aria-label="Send email"
                >
                    <Icon name="forward" size={24} />
                </button>
            </div>

            <div className="compose-form">
                <div className="compose-field">
                    <label className="compose-label" htmlFor="compose-to">To:</label>
                    <input
                        id="compose-to"
                        type="email"
                        className="compose-input"
                        placeholder="recipient@email.com"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        autoComplete="email"
                    />
                </div>

                <div className="compose-field">
                    <label className="compose-label" htmlFor="compose-subject">Subject:</label>
                    <input
                        id="compose-subject"
                        type="text"
                        className="compose-input"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>

                <div className="compose-body-container">
                    <textarea
                        id="compose-body"
                        className="compose-body"
                        placeholder="Write your message..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        aria-label="Email body"
                    />
                </div>
            </div>
        </div>
    );
}
