import { Icon } from '../../../components/Icons';
import { formatEmailTime } from '../data';

/**
 * EmailDetail - Displays full email content with actions
 * @param {Object} props
 * @param {Object} props.email - Email object to display
 * @param {function} props.onBack - Callback to go back to list
 * @param {function} props.onReply - Callback to reply to email
 * @param {function} props.onToggleFlag - Callback to toggle flag status
 * @param {function} props.onDelete - Callback to delete email
 */
export function EmailDetail({ email, onBack, onReply, onToggleFlag, onDelete }) {
    const { sender, subject, body, timestamp, isFlagged, hasAttachment } = email;

    // Get initials for avatar placeholder
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    const handleReply = () => {
        onReply(email);
    };

    const handleReplyAll = () => {
        onReply(email);
    };

    const handleForward = () => {
        onReply(email);
    };

    const handleFlag = () => {
        onToggleFlag(email.id);
    };

    const handleDelete = () => {
        onDelete(email.id);
    };

    return (
        <div className="email-detail">
            <div className="email-detail-header">
                <button 
                    className="email-detail-back" 
                    onClick={onBack}
                    aria-label="Go back"
                >
                    <Icon name="back" size={24} />
                </button>
                <span className="email-detail-title">Email</span>
            </div>

            <div className="email-detail-content">
                <div className="email-detail-sender">
                    <div className="email-avatar">
                        {sender.avatar ? (
                            <img src={sender.avatar} alt="" />
                        ) : (
                            <span className="email-avatar-placeholder">
                                {getInitials(sender.name)}
                            </span>
                        )}
                    </div>
                    <div className="email-detail-sender-info">
                        <div className="email-detail-sender-name">{sender.name}</div>
                        <div className="email-detail-sender-email">{sender.email}</div>
                    </div>
                </div>

                <h2 className="email-detail-subject">{subject}</h2>
                
                <div className="email-detail-meta">
                    <span>{formatEmailTime(timestamp)}</span>
                    {hasAttachment && (
                        <>
                            <span>•</span>
                            <span>
                                <Icon name="attach" size={14} /> Attachment
                            </span>
                        </>
                    )}
                </div>

                <div className="email-detail-body">
                    {body}
                </div>
            </div>

            <div className="email-detail-actions">
                <button 
                    className="email-action-btn" 
                    onClick={handleReply}
                    aria-label="Reply"
                >
                    <Icon name="reply" size={24} />
                    <span>reply</span>
                </button>
                <button 
                    className="email-action-btn" 
                    onClick={handleReplyAll}
                    aria-label="Reply all"
                >
                    <Icon name="replyAll" size={24} />
                    <span>reply all</span>
                </button>
                <button 
                    className="email-action-btn" 
                    onClick={handleForward}
                    aria-label="Forward"
                >
                    <Icon name="forward" size={24} />
                    <span>forward</span>
                </button>
                <button 
                    className={`email-action-btn ${isFlagged ? 'flagged' : ''}`}
                    onClick={handleFlag}
                    aria-label={isFlagged ? 'Remove flag' : 'Add flag'}
                >
                    <Icon name="flag" size={24} />
                    <span>flag</span>
                </button>
                <button 
                    className="email-action-btn" 
                    onClick={handleDelete}
                    aria-label="Delete"
                >
                    <Icon name="delete" size={24} />
                    <span>delete</span>
                </button>
            </div>
        </div>
    );
}
