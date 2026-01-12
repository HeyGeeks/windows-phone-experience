import { Icon } from '../../../components/Icons';
import { getDocumentIcon } from '../data';

/**
 * WordViewer - Simulated Word document viewer
 * @param {Object} props
 * @param {Object} props.document - Document object
 */
function WordViewer({ document }) {
    return (
        <div className="word-viewer" data-testid="word-viewer">
            <h1>{document.name}</h1>
            <p>{document.preview || 'Document content preview...'}</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
    );
}

/**
 * ExcelViewer - Simulated Excel spreadsheet viewer
 * @param {Object} props
 * @param {Object} props.document - Document object
 */
function ExcelViewer({ document }) {
    const columns = ['A', 'B', 'C', 'D', 'E'];
    const rows = [1, 2, 3, 4, 5, 6, 7, 8];
    
    // Sample data for the spreadsheet
    const sampleData = {
        'A1': 'Item', 'B1': 'Q1', 'C1': 'Q2', 'D1': 'Q3', 'E1': 'Q4',
        'A2': 'Sales', 'B2': '1,200', 'C2': '1,450', 'D2': '1,680', 'E2': '1,920',
        'A3': 'Costs', 'B3': '800', 'C3': '850', 'D3': '900', 'E3': '950',
        'A4': 'Profit', 'B4': '400', 'C4': '600', 'D4': '780', 'E4': '970',
        'A5': '', 'B5': '', 'C5': '', 'D5': '', 'E5': '',
        'A6': 'Total', 'B6': '=SUM', 'C6': '=SUM', 'D6': '=SUM', 'E6': '=SUM',
    };

    return (
        <div className="excel-viewer" data-testid="excel-viewer">
            <div className="excel-grid">
                {/* Header row */}
                <div className="excel-header-cell"></div>
                {columns.map(col => (
                    <div key={col} className="excel-header-cell">{col}</div>
                ))}
                
                {/* Data rows */}
                {rows.map(row => (
                    <div key={`row-${row}`} style={{ display: 'contents' }}>
                        <div className="excel-row-header">{row}</div>
                        {columns.map(col => (
                            <div key={`${col}${row}`} className="excel-cell">
                                {sampleData[`${col}${row}`] || ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * PowerPointViewer - Simulated PowerPoint presentation viewer
 * @param {Object} props
 * @param {Object} props.document - Document object
 */
function PowerPointViewer({ document }) {
    const slides = [
        { title: document.name, content: 'Click to add subtitle' },
        { title: 'Overview', content: 'Key points and objectives' },
        { title: 'Details', content: 'Supporting information' }
    ];

    return (
        <div className="powerpoint-viewer" data-testid="powerpoint-viewer">
            {slides.map((slide, index) => (
                <div key={index} className="slide">
                    <div className="slide-title">{slide.title}</div>
                    <div className="slide-content">{slide.content}</div>
                    <div className="slide-number">Slide {index + 1} of {slides.length}</div>
                </div>
            ))}
        </div>
    );
}

/**
 * Get the appropriate viewer component for a document type
 * @param {string} type - Document type (word, excel, powerpoint)
 * @returns {Function} Viewer component
 */
export function getViewerComponent(type) {
    const viewers = {
        word: WordViewer,
        excel: ExcelViewer,
        powerpoint: PowerPointViewer
    };
    return viewers[type] || WordViewer;
}

/**
 * DocumentViewer - Full-screen document viewer
 * @param {Object} props
 * @param {Object} props.document - Document to view
 * @param {Function} props.onClose - Close handler
 */
export function DocumentViewer({ document, onClose }) {
    const iconName = getDocumentIcon(document.type);
    const ViewerComponent = getViewerComponent(document.type);

    return (
        <div className="document-viewer" role="dialog" aria-label={`Viewing ${document.name}`}>
            <div className="viewer-header">
                <button 
                    className="viewer-back"
                    onClick={onClose}
                    aria-label="Close document"
                >
                    <Icon name="back" size={24} />
                </button>
                <span className="viewer-title">{document.name}</span>
                <div className={`viewer-type-icon ${document.type}`}>
                    <Icon name={iconName} size={24} />
                </div>
            </div>
            <div className="viewer-content">
                <ViewerComponent document={document} />
            </div>
        </div>
    );
}
