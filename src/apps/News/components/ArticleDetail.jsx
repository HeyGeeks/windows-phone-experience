import { ICONS } from '../../../components/Icons';
import { formatTimeAgo } from '../data';

/**
 * ArticleDetail - Full article view with hero image and formatted text
 * @param {Object} props
 * @param {Object} props.article - Article data object
 * @param {Function} props.onClose - Callback to close the detail view
 */
export function ArticleDetail({ article, onClose }) {
    return (
        <div className="article-detail">
            <header className="article-detail-header">
                <button 
                    className="article-detail-back"
                    onClick={onClose}
                    aria-label="Go back"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d={ICONS.back} />
                    </svg>
                    <span>back</span>
                </button>
            </header>

            <div className="article-detail-content">
                <img
                    className="article-detail-hero"
                    src={article.imageUrl}
                    alt=""
                />

                <div className="article-detail-body">
                    <h1 className="article-detail-headline">{article.headline}</h1>
                    
                    <div className="article-detail-meta">
                        <span className="article-detail-source">{article.source}</span>
                        <span>•</span>
                        <span className="article-detail-time">{formatTimeAgo(article.publishedAt)}</span>
                    </div>

                    <div className="article-detail-text">
                        {article.content.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
