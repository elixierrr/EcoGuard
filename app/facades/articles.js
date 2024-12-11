const Article = require ('#models/Article');

module.exports = {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle
};

async function createArticle(data) {
    return Article.create(data);
}

async function getArticles() {
    return Article.findAll();
}

async function getArticleById(id) {
    return Article.findByPk(id);
}

async function updateArticle(id, data) {
    const article = await Article.findByPk(id);
    if (!article) throw new Error('Article not found');
    return Article.update(data);
}

async function deleteArticle(id) {
    const article = await Article.findByPk(id);
    if (!article) throw new Error('Article not found')
    return Article.destroy();
}