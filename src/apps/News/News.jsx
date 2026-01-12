import { useState } from 'react';
import { AppShell } from '../../components/AppShell';
import { PanoramaView } from '../../components/PanoramaView';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';
import { MOCK_ARTICLES, getArticlesByCategory } from './data';
import './News.css';

export function News() {
    const [articles] = useState(MOCK_ARTICLES);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleArticleSelect = (article) => {
        setSelectedArticle(article);
    };

    const handleCloseDetail = () => {
        setSelectedArticle(null);
    };

    const headlineArticles = getArticlesByCategory(articles, 'headlines');
    const techArticles = getArticlesByCategory(articles, 'tech');
    const sportsArticles = getArticlesByCategory(articles, 'sports');
    const businessArticles = getArticlesByCategory(articles, 'business');
    const entertainmentArticles = getArticlesByCategory(articles, 'entertainment');

    const renderArticleList = (articleList, showFeatured = false) => {
        if (articleList.length === 0) {
            return <div className="article-list-empty">No articles available</div>;
        }

        return (
            <div className="article-list">
                {articleList.map((article, index) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        featured={showFeatured && index === 0}
                        compact={!showFeatured || index > 0}
                        onSelect={handleArticleSelect}
                    />
                ))}
            </div>
        );
    };

    const sections = [
        {
            key: 'headlines',
            header: 'headlines',
            content: renderArticleList(headlineArticles, true)
        },
        {
            key: 'tech',
            header: 'technology',
            content: renderArticleList(techArticles)
        },
        {
            key: 'sports',
            header: 'sports',
            content: renderArticleList(sportsArticles)
        },
        {
            key: 'business',
            header: 'business',
            content: renderArticleList(businessArticles)
        },
        {
            key: 'entertainment',
            header: 'entertainment',
            content: renderArticleList(entertainmentArticles)
        }
    ];

    return (
        <AppShell title="news" hideTitle>
            <div className="news-app">
                <PanoramaView
                    title="news"
                    sections={sections}
                />

                {selectedArticle && (
                    <ArticleDetail
                        article={selectedArticle}
                        onClose={handleCloseDetail}
                    />
                )}
            </div>
        </AppShell>
    );
}
