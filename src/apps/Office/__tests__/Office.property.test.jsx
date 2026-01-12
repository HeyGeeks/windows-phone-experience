import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { DocumentItem } from '../components/DocumentList';
import { DocumentViewer, getViewerComponent } from '../components/DocumentViewer';
import { formatLastModified, getDocumentIcon } from '../data';

// Arbitrary for generating valid document objects
const documentArbitrary = fc.record({
    id: fc.uuid(),
    name: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
    type: fc.constantFrom('word', 'excel', 'powerpoint'),
    lastModified: fc.date({ min: new Date('2020-01-01'), max: new Date() }),
    size: fc.integer({ min: 1024, max: 10485760 }), // 1KB to 10MB
    location: fc.constantFrom('phone', 'onedrive'),
    preview: fc.string({ minLength: 0, maxLength: 500 })
});

describe('Office App Property Tests', () => {
    /**
     * Feature: windows-phone-daily-apps, Property 8: Document List Rendering with Type Icons
     * Validates: Requirements 5.2, 5.4
     * 
     * For any document object with name, type, and lastModified fields,
     * the rendered document list item SHALL contain the name, the correct
     * type-specific icon (word/excel/powerpoint), and formatted date.
     */
    it('Property 8: Document list item renders name, type icon, and last modified date', () => {
        fc.assert(
            fc.property(documentArbitrary, (document) => {
                const { container } = render(
                    <DocumentItem document={document} onClick={() => {}} />
                );

                // Check document name is rendered
                const nameElement = container.querySelector('.document-name');
                expect(nameElement).toBeInTheDocument();
                expect(nameElement.textContent).toBe(document.name);

                // Check type-specific icon is rendered with correct class
                const iconElement = container.querySelector('.document-icon');
                expect(iconElement).toBeInTheDocument();
                expect(iconElement.classList.contains(document.type)).toBe(true);

                // Check that the icon SVG is present
                const svgElement = iconElement.querySelector('svg');
                expect(svgElement).toBeInTheDocument();

                // Check last modified date is rendered
                const dateElement = container.querySelector('.document-date');
                expect(dateElement).toBeInTheDocument();
                const expectedDate = formatLastModified(document.lastModified);
                expect(dateElement.textContent).toBe(expectedDate);

                // Cleanup for next iteration
                container.remove();
            }),
            { numRuns: 100 }
        );
    });

    /**
     * Feature: windows-phone-daily-apps, Property 9: Document Viewer Type Selection
     * Validates: Requirements 5.3
     * 
     * For any document with a type of 'word', 'excel', or 'powerpoint',
     * opening the document SHALL render the viewer component corresponding to that type.
     */
    it('Property 9: Document viewer renders correct viewer component based on document type', () => {
        fc.assert(
            fc.property(documentArbitrary, (document) => {
                const { container } = render(
                    <DocumentViewer document={document} onClose={() => {}} />
                );

                // Map document types to their expected viewer test IDs
                const viewerTestIds = {
                    word: 'word-viewer',
                    excel: 'excel-viewer',
                    powerpoint: 'powerpoint-viewer'
                };

                const expectedTestId = viewerTestIds[document.type];
                
                // Check that the correct viewer component is rendered
                const viewerElement = container.querySelector(`[data-testid="${expectedTestId}"]`);
                expect(viewerElement).toBeInTheDocument();

                // Verify that other viewer types are NOT rendered
                Object.entries(viewerTestIds).forEach(([type, testId]) => {
                    if (type !== document.type) {
                        const otherViewer = container.querySelector(`[data-testid="${testId}"]`);
                        expect(otherViewer).not.toBeInTheDocument();
                    }
                });

                // Cleanup for next iteration
                container.remove();
            }),
            { numRuns: 100 }
        );
    });
});
