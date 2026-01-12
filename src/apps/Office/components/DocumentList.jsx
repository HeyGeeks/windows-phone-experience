import { Icon } from '../../../components/Icons';
import { formatLastModified, getDocumentIcon } from '../data';

/**
 * DocumentItem - Individual document list item
 * @param {Object} props
 * @param {Object} props.document - Document object
 * @param {Function} props.onClick - Click handler
 */
export function DocumentItem({ document, onClick }) {
    const iconName = getDocumentIcon(document.type);
    const formattedDate = formatLastModified(document.lastModified);

    return (
        <div 
            className="document-item"
            onClick={() => onClick(document)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick(document)}
            aria-label={`${document.name}, ${document.type} document, modified ${formattedDate}`}
        >
            <div className={`document-icon ${document.type}`}>
                <Icon name={iconName} size={32} />
            </div>
            <div className="document-info">
                <span className="document-name">{document.name}</span>
                <div className="document-meta">
                    <span className="document-date">{formattedDate}</span>
                    <span className="document-location">
                        <Icon name={document.location === 'onedrive' ? 'onedrive' : 'phone'} size={14} />
                        {document.location === 'onedrive' ? 'OneDrive' : 'Phone'}
                    </span>
                </div>
            </div>
        </div>
    );
}

/**
 * DocumentList - List of documents with Metro styling
 * @param {Object} props
 * @param {Array} props.documents - Array of document objects
 * @param {Function} props.onDocumentSelect - Document selection handler
 * @param {string} [props.emptyMessage] - Message to show when list is empty
 */
export function DocumentList({ documents, onDocumentSelect, emptyMessage = 'No documents' }) {
    if (!documents || documents.length === 0) {
        return (
            <div className="empty-state">
                <Icon name="folder" size={64} className="empty-state-icon" />
                <p className="empty-state-text">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="document-list" role="list">
            {documents.map(document => (
                <DocumentItem 
                    key={document.id}
                    document={document}
                    onClick={onDocumentSelect}
                />
            ))}
        </div>
    );
}
