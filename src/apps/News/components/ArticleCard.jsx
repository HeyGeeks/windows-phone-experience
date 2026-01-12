import { formatTimeAgo } from '../data';

/**
 * ArticleCard - Displays a news article preview
 * @param {Object} props
 * @param {Object} props.article - Article data object
 * @param {boolean} [props.featured=false] - Whether to display as featured article
 * @param {boolean} [props.compact=false] - Whether to display in compact mode
 * @param {Function} props.onSelect - Callback when article is selected
 */
export function ArticleCard({ article, featured = false, compact = false, onSelect }) {
    const handleClick = () => {
        onSelect(article);
    };

    const classNames = [
        'article-card',
        featured && 'featured',
        compact && 'compact'
    ].filter(Boolean).join(' ');

    return (
        <article 
            className={classNames}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
            <img
                className="article-card-image"
                src={article.imageUrl}
                alt=""
                loading="lazy"
            />
            <div className="article-card-content">
                <h3 className="article-card-headline">{article.headline}</h3>
                <div className="article-card-meta">
                    <span className="article-card-source">{article.source}</span>
                    <span className="article-card-separator">•</span>
                    <span className="article-card-time">{formatTimeAgo(article.publishedAt)}</span>
                </div>
            </div>
        </article>
    );
}
