// Mock email data for Windows Phone 8.1 Email App

export const MOCK_EMAILS = [
    {
        id: '1',
        sender: {
            name: 'Microsoft Account',
            email: 'account@microsoft.com',
            avatar: null
        },
        recipients: ['user@outlook.com'],
        subject: 'Welcome to your new Windows Phone!',
        body: `Hello,

Welcome to your new Windows Phone! We're excited to have you join the Windows Phone family.

Your Microsoft account is now set up and ready to use. You can access your email, calendar, contacts, and more across all your devices.

Here are some tips to get started:
• Customize your Start Screen with live tiles
• Download apps from the Windows Phone Store
• Sync your photos with OneDrive
• Set up Cortana, your personal assistant

If you have any questions, visit support.microsoft.com.

Best regards,
The Microsoft Team`,
        preview: 'Welcome to your new Windows Phone! We\'re excited to have you join...',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        isRead: false,
        isFlagged: false,
        hasAttachment: false
    },
    {
        id: '2',
        sender: {
            name: 'Sarah Johnson',
            email: 'sarah.johnson@email.com',
            avatar: 'https://i.pravatar.cc/100?img=5'
        },
        recipients: ['user@outlook.com'],
        subject: 'Project Update - Q4 Review',
        body: `Hi,

I wanted to give you a quick update on the Q4 project review.

The team has completed the initial analysis and we're on track to meet our deadlines. I've attached the preliminary report for your review.

Key highlights:
• Revenue targets exceeded by 12%
• Customer satisfaction improved to 94%
• New product launch scheduled for next month

Let me know if you have any questions or need additional information.

Thanks,
Sarah`,
        preview: 'I wanted to give you a quick update on the Q4 project review...',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        isRead: false,
        isFlagged: true,
        hasAttachment: true
    },
    {
        id: '3',
        sender: {
            name: 'LinkedIn',
            email: 'notifications@linkedin.com',
            avatar: null
        },
        recipients: ['user@outlook.com'],
        subject: 'You have 5 new connection requests',
        body: `You have new connection requests waiting for you on LinkedIn.

People want to connect with you:
• John Smith - Software Engineer at Tech Corp
• Emily Davis - Product Manager at StartupXYZ
• Michael Brown - CEO at Innovation Labs
• Lisa Wilson - UX Designer at Creative Agency
• David Lee - Data Scientist at Analytics Inc

Log in to LinkedIn to accept or ignore these requests.

Best,
The LinkedIn Team`,
        preview: 'You have new connection requests waiting for you on LinkedIn...',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        isRead: true,
        isFlagged: false,
        hasAttachment: false
    },
    {
        id: '4',
        sender: {
            name: 'Mom',
            email: 'mom@family.com',
            avatar: 'https://i.pravatar.cc/100?img=1'
        },
        recipients: ['user@outlook.com'],
        subject: 'Sunday dinner plans',
        body: `Hi sweetie,

Just wanted to confirm our plans for Sunday dinner. Your dad and I are thinking of making your favorite - lasagna!

Can you come around 5pm? Let me know if you're bringing anyone.

Also, don't forget to call your grandmother. She's been asking about you.

Love,
Mom`,
        preview: 'Just wanted to confirm our plans for Sunday dinner...',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        isRead: true,
        isFlagged: true,
        hasAttachment: false
    },
    {
        id: '5',
        sender: {
            name: 'Amazon',
            email: 'ship-confirm@amazon.com',
            avatar: null
        },
        recipients: ['user@outlook.com'],
        subject: 'Your order has shipped!',
        body: `Your Amazon order has shipped!

Order #123-4567890-1234567

Items in this shipment:
• Wireless Bluetooth Headphones - Black
• USB-C Charging Cable (2-pack)

Estimated delivery: Tomorrow by 8pm

Track your package at amazon.com/orders

Thank you for shopping with Amazon!`,
        preview: 'Your Amazon order has shipped! Order #123-4567890...',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        isRead: true,
        isFlagged: false,
        hasAttachment: false
    },
    {
        id: '6',
        sender: {
            name: 'Alex Chen',
            email: 'alex.chen@work.com',
            avatar: 'https://i.pravatar.cc/100?img=3'
        },
        recipients: ['user@outlook.com', 'team@work.com'],
        subject: 'Meeting notes from today',
        body: `Hi team,

Here are the notes from today's meeting:

Action Items:
1. Complete design review by Friday
2. Schedule user testing sessions
3. Update project timeline
4. Prepare demo for stakeholders

Next meeting: Thursday at 2pm

Let me know if I missed anything.

Best,
Alex`,
        preview: 'Here are the notes from today\'s meeting. Action Items...',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        isRead: false,
        isFlagged: false,
        hasAttachment: true
    },
    {
        id: '7',
        sender: {
            name: 'Netflix',
            email: 'info@netflix.com',
            avatar: null
        },
        recipients: ['user@outlook.com'],
        subject: 'New arrivals you might like',
        body: `Based on your viewing history, we think you'll love these new titles:

New Movies:
• The Adventure Begins
• Mystery at Midnight
• Comedy Hour Special

New Series:
• Tech Tales Season 2
• The Great Escape
• Documentary Now

Start watching at netflix.com

Happy streaming!
The Netflix Team`,
        preview: 'Based on your viewing history, we think you\'ll love these...',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
        isRead: true,
        isFlagged: false,
        hasAttachment: false
    },
    {
        id: '8',
        sender: {
            name: 'Bank of America',
            email: 'alerts@bankofamerica.com',
            avatar: null
        },
        recipients: ['user@outlook.com'],
        subject: 'Your monthly statement is ready',
        body: `Your monthly statement for account ending in 1234 is now available.

Statement Period: December 1 - December 31

Summary:
• Beginning Balance: $5,432.10
• Total Deposits: $3,200.00
• Total Withdrawals: $2,150.75
• Ending Balance: $6,481.35

View your full statement by logging into your account at bankofamerica.com.

Thank you for banking with us.`,
        preview: 'Your monthly statement for account ending in 1234 is now...',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
        isRead: true,
        isFlagged: false,
        hasAttachment: true
    }
];

// Helper function to get unread count
export function getUnreadCount(emails) {
    return emails.filter(email => !email.isRead).length;
}

// Helper function to filter emails
export function filterEmails(emails, filter) {
    switch (filter) {
        case 'unread':
            return emails.filter(email => !email.isRead);
        case 'flagged':
            return emails.filter(email => email.isFlagged);
        case 'all':
        default:
            return emails;
    }
}

// Helper function to format timestamp
export function formatEmailTime(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
        return `${minutes}m ago`;
    } else if (hours < 24) {
        return `${hours}h ago`;
    } else if (days === 1) {
        return 'Yesterday';
    } else if (days < 7) {
        return `${days} days ago`;
    } else {
        return timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
}
