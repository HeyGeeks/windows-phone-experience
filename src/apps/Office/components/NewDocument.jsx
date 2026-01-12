import { Icon } from '../../../components/Icons';
import { DOCUMENT_TEMPLATES } from '../data';

/**
 * TemplateItem - Individual template item
 * @param {Object} props
 * @param {Object} props.template - Template object
 * @param {string} props.type - Document type (word, excel, powerpoint)
 * @param {Function} props.onClick - Click handler
 */
function TemplateItem({ template, type, onClick }) {
    return (
        <div 
            className="template-item"
            onClick={() => onClick(template)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick(template)}
            aria-label={`Create new ${template.name}`}
        >
            <div className={`template-icon ${type}`}>
                <Icon name={template.icon} size={40} />
            </div>
            <span className="template-name">{template.name}</span>
        </div>
    );
}

/**
 * NewDocument - Template selection for creating new documents
 * @param {Object} props
 * @param {Function} props.onSelectTemplate - Template selection handler
 */
export function NewDocument({ onSelectTemplate }) {
    const sections = [
        { type: 'word', title: 'Word', templates: DOCUMENT_TEMPLATES.word },
        { type: 'excel', title: 'Excel', templates: DOCUMENT_TEMPLATES.excel },
        { type: 'powerpoint', title: 'PowerPoint', templates: DOCUMENT_TEMPLATES.powerpoint }
    ];

    return (
        <div className="new-document">
            {sections.map(section => (
                <div key={section.type} className="new-document-section">
                    <h3 className="new-document-header">{section.title}</h3>
                    <div className="template-grid">
                        {section.templates.map(template => (
                            <TemplateItem 
                                key={template.id}
                                template={template}
                                type={section.type}
                                onClick={onSelectTemplate}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
