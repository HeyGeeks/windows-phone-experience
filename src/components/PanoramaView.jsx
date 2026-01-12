import { useRef } from 'react';
import './PanoramaView.css';

/**
 * PanoramaView - Windows Phone 8.1 wide scrolling canvas
 * @param {Object} props
 * @param {string} props.title - Panorama title displayed at the top
 * @param {Array<{key: string, header: string, content: React.ReactNode}>} props.sections - Panorama sections
 * @param {string} [props.backgroundImage] - Optional background image URL
 */
export function PanoramaView({ title, sections, backgroundImage }) {
    const containerRef = useRef(null);

    const backgroundStyle = backgroundImage
        ? {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'local',
        }
        : {};

    return (
        <div className="panorama-view" style={backgroundStyle}>
            {backgroundImage && <div className="panorama-overlay" />}
            <div className="panorama-title">{title}</div>
            <div 
                ref={containerRef}
                className="panorama-container"
                role="region"
                aria-label={title}
            >
                <div className="panorama-scroll">
                    {sections.map((section) => (
                        <section
                            key={section.key}
                            className="panorama-section"
                            aria-labelledby={`section-${section.key}`}
                        >
                            <h2 
                                id={`section-${section.key}`}
                                className="panorama-section-header"
                            >
                                {section.header}
                            </h2>
                            <div className="panorama-section-content">
                                {section.content}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
