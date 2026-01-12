import { useState } from 'react';
import { AppShell } from '../../components/AppShell';
import { PanoramaView } from '../../components/PanoramaView';
import { DocumentList } from './components/DocumentList';
import { DocumentViewer } from './components/DocumentViewer';
import { NewDocument } from './components/NewDocument';
import { Icon } from '../../components/Icons';
import { 
    MOCK_DOCUMENTS, 
    STORAGE_LOCATIONS,
    getRecentDocuments,
    getDocumentsByLocation
} from './data';
import './Office.css';

export function Office() {
    const [documents] = useState(MOCK_DOCUMENTS);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const recentDocuments = getRecentDocuments(documents, 8);

    const handleDocumentSelect = (document) => {
        setSelectedDocument(document);
        setIsViewerOpen(true);
    };

    const handleCloseViewer = () => {
        setIsViewerOpen(false);
        setSelectedDocument(null);
    };

    const handleLocationSelect = (location) => {
        // In a real app, this would navigate to a filtered view
        console.log('Selected location:', location);
    };

    const handleNewDocument = (template) => {
        // In a real app, this would create a new document
        console.log('Creating new document from template:', template);
    };

    const sections = [
        {
            key: 'recent',
            header: 'recent',
            content: (
                <DocumentList 
                    documents={recentDocuments}
                    onDocumentSelect={handleDocumentSelect}
                    emptyMessage="No recent documents"
                />
            )
        },
        {
            key: 'places',
            header: 'places',
            content: (
                <div className="places-list">
                    {STORAGE_LOCATIONS.map(location => (
                        <div 
                            key={location.id}
                            className="place-item"
                            onClick={() => handleLocationSelect(location)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && handleLocationSelect(location)}
                        >
                            <div className="place-icon">
                                <Icon name={location.icon} size={24} />
                            </div>
                            <span className="place-name">{location.name}</span>
                        </div>
                    ))}
                </div>
            )
        },
        {
            key: 'new',
            header: 'new',
            content: (
                <NewDocument onSelectTemplate={handleNewDocument} />
            )
        }
    ];

    return (
        <AppShell title="Office" hideTitle>
            <div className="office-app">
                <PanoramaView 
                    title="Office"
                    sections={sections}
                />
                
                {isViewerOpen && selectedDocument && (
                    <DocumentViewer 
                        document={selectedDocument}
                        onClose={handleCloseViewer}
                    />
                )}
            </div>
        </AppShell>
    );
}
