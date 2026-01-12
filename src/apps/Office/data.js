// Mock document data for Windows Phone 8.1 Office Hub App

export const MOCK_DOCUMENTS = [
    {
        id: 'doc-1',
        name: 'Project Proposal',
        type: 'word',
        lastModified: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        size: 245760, // bytes
        location: 'onedrive',
        preview: 'This document outlines the project proposal for Q1 2024...'
    },
    {
        id: 'doc-2',
        name: 'Budget Report 2024',
        type: 'excel',
        lastModified: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        size: 156432,
        location: 'onedrive',
        preview: 'Annual budget breakdown and financial projections...'
    },
    {
        id: 'doc-3',
        name: 'Team Presentation',
        type: 'powerpoint',
        lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        size: 2048576,
        location: 'phone',
        preview: 'Quarterly team update presentation slides...'
    },
    {
        id: 'doc-4',
        name: 'Meeting Notes',
        type: 'word',
        lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        size: 45678,
        location: 'phone',
        preview: 'Notes from the weekly team standup meeting...'
    },
    {
        id: 'doc-5',
        name: 'Sales Data Q4',
        type: 'excel',
        lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        size: 892345,
        location: 'onedrive',
        preview: 'Q4 sales performance data and analytics...'
    },
    {
        id: 'doc-6',
        name: 'Product Launch',
        type: 'powerpoint',
        lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
        size: 3567890,
        location: 'onedrive',
        preview: 'Product launch strategy and timeline...'
    },
    {
        id: 'doc-7',
        name: 'Employee Handbook',
        type: 'word',
        lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
        size: 567890,
        location: 'phone',
        preview: 'Company policies and employee guidelines...'
    },
    {
        id: 'doc-8',
        name: 'Inventory Tracker',
        type: 'excel',
        lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
        size: 234567,
        location: 'phone',
        preview: 'Current inventory levels and reorder points...'
    }
];

// Document templates for creating new documents
export const DOCUMENT_TEMPLATES = {
    word: [
        { id: 'word-blank', name: 'Blank document', icon: 'word' },
        { id: 'word-letter', name: 'Letter', icon: 'word' },
        { id: 'word-resume', name: 'Resume', icon: 'word' },
        { id: 'word-report', name: 'Report', icon: 'word' }
    ],
    excel: [
        { id: 'excel-blank', name: 'Blank workbook', icon: 'excel' },
        { id: 'excel-budget', name: 'Budget', icon: 'excel' },
        { id: 'excel-calendar', name: 'Calendar', icon: 'excel' },
        { id: 'excel-invoice', name: 'Invoice', icon: 'excel' }
    ],
    powerpoint: [
        { id: 'ppt-blank', name: 'Blank presentation', icon: 'powerpoint' },
        { id: 'ppt-business', name: 'Business', icon: 'powerpoint' },
        { id: 'ppt-education', name: 'Education', icon: 'powerpoint' },
        { id: 'ppt-photo', name: 'Photo album', icon: 'powerpoint' }
    ]
};

// Storage locations
export const STORAGE_LOCATIONS = [
    { id: 'phone', name: 'Phone', icon: 'phone' },
    { id: 'onedrive', name: 'OneDrive', icon: 'onedrive' }
];

/**
 * Format file size to human readable string
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export function formatFileSize(bytes) {
    if (bytes < 1024) {
        return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    } else {
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
}

/**
 * Format last modified date to human readable string
 * @param {Date} date - Last modified date
 * @returns {string} Formatted date string
 */
export function formatLastModified(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) {
        return 'Just now';
    } else if (minutes < 60) {
        return `${minutes}m ago`;
    } else if (hours < 24) {
        return `${hours}h ago`;
    } else if (days === 1) {
        return 'Yesterday';
    } else if (days < 7) {
        return `${days} days ago`;
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
}

/**
 * Get icon name for document type
 * @param {string} type - Document type (word, excel, powerpoint)
 * @returns {string} Icon name
 */
export function getDocumentIcon(type) {
    const iconMap = {
        word: 'word',
        excel: 'excel',
        powerpoint: 'powerpoint'
    };
    return iconMap[type] || 'file';
}

/**
 * Get recent documents sorted by last modified date
 * @param {Array} documents - Array of documents
 * @param {number} limit - Maximum number of documents to return
 * @returns {Array} Recent documents
 */
export function getRecentDocuments(documents, limit = 10) {
    return [...documents]
        .sort((a, b) => b.lastModified - a.lastModified)
        .slice(0, limit);
}

/**
 * Get documents by location
 * @param {Array} documents - Array of documents
 * @param {string} location - Storage location (phone, onedrive)
 * @returns {Array} Filtered documents
 */
export function getDocumentsByLocation(documents, location) {
    return documents.filter(doc => doc.location === location);
}

/**
 * Get documents by type
 * @param {Array} documents - Array of documents
 * @param {string} type - Document type (word, excel, powerpoint)
 * @returns {Array} Filtered documents
 */
export function getDocumentsByType(documents, type) {
    return documents.filter(doc => doc.type === type);
}
