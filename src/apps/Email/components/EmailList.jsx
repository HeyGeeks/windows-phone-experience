import { Icon } from '../../../components/Icons';
import { formatEmailTime } from '../data';

/**
 * EmailList - Displays a list of emails with sender, subject, preview
 * @param {Object} props
 * @param {Array} props.emails - Array of email objects
 * @param {function} props.onEmailSelect - Callback when email is selected
 * @param {function} props.onCompose - Callback to compose new email
 * @param {string} [props.emptyMessage] - Message to show when list is empty
 */
export function EmailList({ emails, onEmailSelect, onCompose, emptyMessage = 'No emails' }) {
    if (emails.length === 0) {
        return (
            <div className="email-list">
                <div className="email-list-empty">
                    <Icon name="inbox" size={64} className="email-list-empty-icon" />
                    <span className="email-list-empty-text">{emptyMessage}</span>
                </div>
                <button className="email-fab" onClick={onCompose} aria-label="Compose new email">
                    <Icon name="add" size={24} />
                </button>
            </div>
        );
    }

    return (
        <div className="email-list">
            {emails.map(email => (
                <EmailItem 
                    key={email.id} 
                    email={email} 
                    onClick={() => onEmailSelect(email)}
                />
            ))}
            <button className="email-fab" onClick={onCompose} aria-label="Compose new email">
                <Icon name="add" size={24} />
            </button>
        </div>
    );
}

/**
 * EmailItem - Individual email list item
 * @param {Object} props
 * @param {Object} props.email - Email object
 * @param {function} props.onClick - Click handler
 */
function EmailItem({ email, onClick }) {
    const { sender, subject, preview, timestamp, isRead, isFlagged, hasAttachment } = email;
    
    // Get initials for avatar placeholder
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    return (
        <div 
            className={`email-item ${!isRead ? 'unread' : ''}`}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick()}
            aria-label={`Email from ${sender.name}: ${subject}`}
        >
            {!isRead && <div className="email-unread-indicator" aria-hidden="true" />}
            
            <div className="email-avatar">
                {sender.avatar ? (
                    <img src={sender.avatar} alt="" />
                ) : (
                    <span className="email-avatar-placeholder">
                        {getInitials(sender.name)}
                    </span>
                )}
            </div>
            
            <div className="email-content">
                <div className="email-header">
                    <span className="email-sender">{sender.name}</span>
                    <div className="email-meta">
                        {isFlagged && (
                            <Icon name="flag" size={14} className="email-flag" aria-label="Flagged" />
                        )}
                        {hasAttachment && (
                            <Icon name="attach" size={14} className="email-attachment" aria-label="Has attachment" />
                        )}
                        <span className="email-time">{formatEmailTime(timestamp)}</span>
                    </div>
                </div>
                <span className="email-subject">{subject}</span>
                <span className="email-preview">{preview}</span>
            </div>
        </div>
    );
}

// Export for testing
export { EmailItem };
