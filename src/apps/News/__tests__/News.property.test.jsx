import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { ArticleCard } from '../components/ArticleCard';
import { formatTimeAgo } from '../data';

// Arbitrary for generating valid article objects
const articleArbitrary = fc.record({
    id: fc.uuid(),
    headline: fc.string({ minLength: 1, maxLength: 200 }).filter(s => s.trim().length > 0),
    source: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
    category: fc.constantFrom('headlines', 'tech', 'sports', 'business', 'entertainment'),
    imageUrl: fc.webUrl(),
    content: fc.string({ minLength: 10, maxLength: 1000 }),
    publishedAt: fc.date({ min: new Date('2020-01-01'), max: new Date() })
});

describe('News App Property Tests', () => {
    /**
     * Feature: windows-phone-daily-apps, Property 12: Article Card Rendering Completeness
     * Validates: Requirements 7.2
     * 
     * For any article object, the rendered article card SHALL contain
     * headline, source, image thumbnail, and relative time.
     */
    it('Property 12: Article card renders headline, source, image thumbnail, and relative time', () => {
        fc.assert(
            fc.property(articleArbitrary, (article) => {
                const { container } = render(
                    <ArticleCard
                        article={article}
                        onSelect={() => {}}
                    />
                );

                // Check headline is rendered
                const headlineElement = container.querySelector('.article-card-headline');
                expect(headlineElement).toBeInTheDocument();
                expect(headlineElement.textContent).toBe(article.headline);

                // Check source is rendered
                const sourceElement = container.querySelector('.article-card-source');
                expect(sourceElement).toBeInTheDocument();
                expect(sourceElement.textContent).toBe(article.source);

                // Check image thumbnail is rendered
                const imageElement = container.querySelector('.article-card-image');
                expect(imageElement).toBeInTheDocument();
                expect(imageElement.getAttribute('src')).toBe(article.imageUrl);

                // Check relative time is rendered
                const timeElement = container.querySelector('.article-card-time');
                expect(timeElement).toBeInTheDocument();
                const expectedTime = formatTimeAgo(article.publishedAt);
                expect(timeElement.textContent).toBe(expectedTime);

                // Cleanup for next iteration
                container.remove();
            }),
            { numRuns: 100 }
        );
    });
});
