import { useState } from 'react';
import { AppShell } from '../../components/AppShell';
import { PivotControl } from '../../components/PivotControl';
import { EmailList } from './components/EmailList';
import { EmailDetail } from './components/EmailDetail';
import { ComposeEmail } from './components/ComposeEmail';
import { MOCK_EMAILS, filterEmails, getUnreadCount } from './data';
import './Email.css';

export function Email() {
    const [emails, setEmails] = useState(MOCK_EMAILS);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [isComposing, setIsComposing] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    const handleEmailSelect = (email) => {
        // Mark as read when opened
        if (!email.isRead) {
            setEmails(prev => prev.map(e => 
                e.id === email.id ? { ...e, isRead: true } : e
            ));
        }
        setSelectedEmail(email);
    };

    const handleBack = () => {
        setSelectedEmail(null);
        setIsComposing(false);
    };

    const handleCompose = () => {
        setIsComposing(true);
        setSelectedEmail(null);
    };

    const handleSend = (emailData) => {
        // In a real app, this would send the email
        console.log('Sending email:', emailData);
        setIsComposing(false);
    };

    const handleToggleFlag = (emailId) => {
        setEmails(prev => prev.map(e => 
            e.id === emailId ? { ...e, isFlagged: !e.isFlagged } : e
        ));
    };

    const handleDelete = (emailId) => {
        setEmails(prev => prev.filter(e => e.id !== emailId));
        setSelectedEmail(null);
    };

    const handleReply = (email) => {
        setIsComposing(true);
        setSelectedEmail(null);
    };

    // Show compose view
    if (isComposing) {
        return (
            <ComposeEmail 
                onBack={handleBack}
                onSend={handleSend}
                replyTo={selectedEmail}
            />
        );
    }

    // Show email detail view
    if (selectedEmail) {
        return (
            <EmailDetail 
                email={selectedEmail}
                onBack={handleBack}
                onReply={handleReply}
                onToggleFlag={handleToggleFlag}
                onDelete={handleDelete}
            />
        );
    }

    // Show email list with pivot control
    const unreadCount = getUnreadCount(emails);
    
    const pivotItems = [
        {
            key: 'all',
            label: 'all',
            content: (
                <EmailList 
                    emails={filterEmails(emails, 'all')}
                    onEmailSelect={handleEmailSelect}
                    onCompose={handleCompose}
                />
            )
        },
        {
            key: 'unread',
            label: `unread${unreadCount > 0 ? ` (${unreadCount})` : ''}`,
            content: (
                <EmailList 
                    emails={filterEmails(emails, 'unread')}
                    onEmailSelect={handleEmailSelect}
                    onCompose={handleCompose}
                    emptyMessage="No unread emails"
                />
            )
        },
        {
            key: 'flagged',
            label: 'flagged',
            content: (
                <EmailList 
                    emails={filterEmails(emails, 'flagged')}
                    onEmailSelect={handleEmailSelect}
                    onCompose={handleCompose}
                    emptyMessage="No flagged emails"
                />
            )
        }
    ];

    return (
        <AppShell title="email" hideTitle>
            <div className="email-app">
                <h1 className="email-title">Outlook</h1>
                <PivotControl 
                    items={pivotItems}
                    activeKey={activeTab}
                    onSelect={setActiveTab}
                />
            </div>
        </AppShell>
    );
}
