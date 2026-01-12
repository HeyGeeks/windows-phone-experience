// Mock article data for Windows Phone 8.1 News App

export const MOCK_ARTICLES = [
    {
        id: 'article-1',
        headline: 'Tech Giants Announce Major AI Breakthroughs',
        source: 'Tech Daily',
        category: 'tech',
        imageUrl: 'https://picsum.photos/seed/tech1/800/400',
        content: `The world's leading technology companies have unveiled groundbreaking advances in artificial intelligence that promise to reshape industries from healthcare to transportation.

In a series of announcements this week, major tech firms demonstrated new AI capabilities that can understand and generate human-like text, create realistic images, and solve complex scientific problems.

Industry analysts predict these developments will accelerate the adoption of AI across all sectors of the economy, creating new opportunities while also raising important questions about the future of work.

"We're witnessing a pivotal moment in the history of technology," said one industry expert. "The pace of innovation in AI is unprecedented."`,
        publishedAt: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
        id: 'article-2',
        headline: 'Global Markets Rally on Economic Optimism',
        source: 'Financial Times',
        category: 'headlines',
        imageUrl: 'https://picsum.photos/seed/finance1/800/400',
        content: `Stock markets around the world surged today as investors responded positively to new economic data suggesting stronger-than-expected growth.

The rally was broad-based, with gains seen across technology, healthcare, and financial sectors. Trading volumes were above average as institutional investors increased their positions.

Central bank officials indicated they remain committed to supporting economic recovery while monitoring inflation closely.`,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    {
        id: 'article-3',
        headline: 'Championship Finals Set After Dramatic Semifinals',
        source: 'Sports Network',
        category: 'sports',
        imageUrl: 'https://picsum.photos/seed/sports1/800/400',
        content: `In a thrilling conclusion to the semifinal round, the stage is now set for what promises to be an epic championship showdown.

Both finalists advanced after nail-biting matches that went down to the wire, delighting fans with spectacular plays and dramatic comebacks.

The championship game is scheduled for next weekend, with record viewership expected.`,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4) // 4 hours ago
    },
    {
        id: 'article-4',
        headline: 'New Smartphone Features Revolutionary Camera System',
        source: 'Gadget Review',
        category: 'tech',
        imageUrl: 'https://picsum.photos/seed/phone1/800/400',
        content: `The latest flagship smartphone has been unveiled, featuring a camera system that industry experts are calling a game-changer for mobile photography.

The device incorporates advanced computational photography techniques and a new sensor design that dramatically improves low-light performance.

Early reviews praise the phone's ability to capture professional-quality images in challenging conditions.`,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6) // 6 hours ago
    },
    {
        id: 'article-5',
        headline: 'Scientists Discover New Species in Deep Ocean',
        source: 'Science Today',
        category: 'headlines',
        imageUrl: 'https://picsum.photos/seed/ocean1/800/400',
        content: `Marine biologists have announced the discovery of several previously unknown species during a deep-sea expedition.

The creatures were found at depths exceeding 3,000 meters, in an environment previously thought to be too extreme for complex life forms.

The discovery highlights how much remains unknown about Earth's oceans and the importance of continued exploration.`,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 8) // 8 hours ago
    },
    {
        id: 'article-6',
        headline: 'Electric Vehicle Sales Surge to Record Highs',
        source: 'Auto Weekly',
        category: 'business',
        imageUrl: 'https://picsum.photos/seed/ev1/800/400',
        content: `Electric vehicle sales have reached unprecedented levels, with manufacturers reporting strong demand across all market segments.

The surge is attributed to improved battery technology, expanded charging infrastructure, and growing environmental awareness among consumers.

Industry forecasts suggest electric vehicles could account for the majority of new car sales within the next decade.`,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12 hours ago
    },
    {
        id: 'article-7',
        headline: 'Award Season Kicks Off with Surprise Nominations',
        source: 'Entertainment Weekly',
        category: 'entertainment',
        imageUrl: 'https://picsum.photos/seed/movie1/800/400',
        content: `The entertainment industry is buzzing following the announcement of this year's award nominations, which included several unexpected choices.

Independent films and streaming productions made a strong showing, reflecting the changing landscape of content creation and distribution.

The ceremony is scheduled for next month, with anticipation building for what promises to be an exciting event.`,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
    },
    {
        id: 'article-8',
        headline: 'Historic Trade Agreement Signed Between Nations',
        source: 'World News',
        category: 'headlines',
        imageUrl: 'https://picsum.photos/seed/trade1/800/400',
        content: `Leaders from multiple countries have signed a landmark trade agreement that is expected to boost economic cooperation and reduce barriers to commerce.

The agreement covers a wide range of sectors including technology, agriculture, and services, and includes provisions for environmental protection.

Economists predict the deal will create significant opportunities for businesses and consumers in participating nations.`,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 36) // 1.5 days ago
    },
    {
        id: 'article-9',
        headline: 'Underdog Team Stuns Favorites in Playoff Upset',
        source: 'Sports Network',
        category: 'sports',
        imageUrl: 'https://picsum.photos/seed/sports2/800/400',
        content: `In one of the biggest upsets of the season, a lower-seeded team has defeated the tournament favorites in a stunning playoff victory.

The game featured exceptional performances from several players who rose to the occasion under pressure.

The victory has reinvigorated the team's fanbase and created new storylines heading into the next round.`,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
    },
    {
        id: 'article-10',
        headline: 'Startup Raises Record Funding for Clean Energy',
        source: 'Business Insider',
        category: 'business',
        imageUrl: 'https://picsum.photos/seed/energy1/800/400',
        content: `A clean energy startup has secured the largest funding round in the sector's history, signaling strong investor confidence in sustainable technology.

The company plans to use the funds to scale production of its innovative energy storage solutions and expand into new markets.

The investment reflects growing momentum behind the transition to renewable energy sources.`,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 72) // 3 days ago
    }
];

// Helper function to format relative time
export function formatTimeAgo(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) {
        return 'Just now';
    } else if (minutes < 60) {
        return `${minutes}m ago`;
    } else if (hours < 24) {
        return `${hours}h ago`;
    } else if (days === 1) {
        return 'Yesterday';
    } else if (days < 7) {
        return `${days}d ago`;
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
}

// Get articles by category
export function getArticlesByCategory(articles, category) {
    if (category === 'headlines') {
        // Headlines includes all categories, sorted by recency
        return [...articles].sort((a, b) => b.publishedAt - a.publishedAt);
    }
    return articles
        .filter(article => article.category === category)
        .sort((a, b) => b.publishedAt - a.publishedAt);
}

// Get featured article (most recent headline)
export function getFeaturedArticle(articles) {
    const headlines = getArticlesByCategory(articles, 'headlines');
    return headlines[0] || null;
}

// Get category display name
export function getCategoryDisplayName(category) {
    const names = {
        headlines: 'headlines',
        tech: 'technology',
        sports: 'sports',
        business: 'business',
        entertainment: 'entertainment'
    };
    return names[category] || category;
}
