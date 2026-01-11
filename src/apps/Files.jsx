import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Files.css';

const FILE_SYSTEM = {
    'phone': [
        { name: 'Documents', type: 'folder', items: 5 },
        { name: 'Downloads', type: 'folder', items: 12 },
        { name: 'Music', type: 'folder', items: 45 },
        { name: 'Pictures', type: 'folder', items: 128 },
        { name: 'Videos', type: 'folder', items: 8 },
        { name: 'notes.txt', type: 'file', size: '2 KB' },
        { name: 'backup.zip', type: 'file', size: '15 MB' },
    ],
    'sd card': [
        { name: 'DCIM', type: 'folder', items: 234 },
        { name: 'Music', type: 'folder', items: 156 },
        { name: 'Movies', type: 'folder', items: 12 },
    ]
};

export function Files() {
    const [currentPath, setCurrentPath] = useState('phone');
    const [selectedItem, setSelectedItem] = useState(null);

    const files = FILE_SYSTEM[currentPath] || [];

    return (
        <AppShell title="files" hideTitle>
            <div className="wp-files">
                <h1 className="wp-files-title">files</h1>

                <div className="wp-files-tabs">
                    <button
                        className={`wp-files-tab ${currentPath === 'phone' ? 'active' : ''}`}
                        onClick={() => setCurrentPath('phone')}
                    >
                        phone
                    </button>
                    <button
                        className={`wp-files-tab ${currentPath === 'sd card' ? 'active' : ''}`}
                        onClick={() => setCurrentPath('sd card')}
                    >
                        sd card
                    </button>
                </div>

                <div className="wp-files-list">
                    {files.map((item, index) => (
                        <div
                            key={index}
                            className={`wp-file-item ${selectedItem === index ? 'selected' : ''}`}
                            onClick={() => setSelectedItem(index)}
                        >
                            <div className="wp-file-icon">
                                <Icon name={item.type === 'folder' ? 'folder' : 'file'} size={24} />
                            </div>
                            <div className="wp-file-info">
                                <span className="wp-file-name">{item.name}</span>
                                <span className="wp-file-meta">
                                    {item.type === 'folder' ? `${item.items} items` : item.size}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="wp-files-bar">
                    <button className="wp-files-action">
                        <Icon name="add" size={24} />
                        <span>new folder</span>
                    </button>
                    <button className="wp-files-action" disabled={selectedItem === null}>
                        <Icon name="share" size={24} />
                        <span>share</span>
                    </button>
                    <button className="wp-files-action" disabled={selectedItem === null}>
                        <Icon name="delete" size={24} />
                        <span>delete</span>
                    </button>
                </div>
            </div>
        </AppShell>
    );
}
