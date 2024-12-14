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

    // Menambahkan klausa where untuk memastikan update diterapkan pada artikel yang benar
    Article.update(data, {
        where: { id }  
    });
    return article;
}

async function deleteArticle(id) {
    const article = await Article.findByPk(id); // Cari artikel berdasarkan primary key
    if (!article) {
        throw new Error('Article not found'); // Jika artikel tidak ditemukan, lempar error
    }
    // Gunakan where clause untuk menentukan artikel yang akan dihapus
    return Article.destroy({
        where: { id } // Kondisi untuk mencocokkan ID artikel
    });
}