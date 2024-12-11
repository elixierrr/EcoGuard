import React from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetail = () => {
  const { articleId } = useParams();

  // Example data - Replace with dynamic data from API or state
  const articles = [
    {
      id: '1',
      title: '10 Ways to Reduce Plastic Waste',
      content: `Plastic waste is one of the most pressing environmental issues. In this article, we will explore ten practical ways to reduce plastic consumption:

1. Use reusable bags instead of single-use plastic bags.
2. Switch to a reusable water bottle and coffee cup.
3. Avoid products with excessive plastic packaging.
4. Support businesses that use sustainable packaging.
5. Recycle correctly and learn your local recycling rules.
6. Avoid single-use plastic straws, utensils, and plates.
7. Choose biodegradable or compostable alternatives.
8. Shop in bulk to minimize packaging waste.
9. Spread awareness about the impact of plastic waste.
10. Support bans and regulations on single-use plastics.

By implementing these steps, we can collectively reduce plastic waste and protect our planet.`,
      author: 'Jane Doe',
      date: '2023-11-15',
      image: 'https://via.placeholder.com/800x400',
    },
    {
      id: '2',
      title: 'The Impact of Air Pollution',
      content: `Air pollution has severe health and environmental effects. This article delves into its causes, impacts, and potential solutions.`,
      author: 'John Smith',
      date: '2023-10-20',
      image: 'https://via.placeholder.com/800x400',
    },
    {
      id: '3',
      title: 'Water Conservation Tips',
      content: `Water is a finite resource. Discover essential tips to conserve water in your daily life.`,
      author: 'Emily Davis',
      date: '2023-09-10',
      image: 'https://via.placeholder.com/800x400',
    },
  ];

  const article = articles.find((a) => a.id === articleId);

  if (!article) {
    return <div className="container my-5 text-center">Article not found.</div>;
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card border-0 shadow" style={{ borderRadius: '10px' }}>
            <img
              src={article.image}
              alt={article.title}
              className="card-img-top"
              style={{ borderRadius: '10px 10px 0 0', maxHeight: '400px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h1 className="text-success mb-3" style={{ fontSize: '28px' }}>{article.title}</h1>
              <p className="text-muted mb-4">
                By <strong>{article.author}</strong> on {new Date(article.date).toLocaleDateString()}
              </p>
              <p style={{ whiteSpace: 'pre-line', fontSize: '18px', lineHeight: '1.8', color: '#555' }}>
                {article.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
