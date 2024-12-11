const articlesFacade = require('#facades/articles');
const upload = require('#utils/fileUpload');
const { createOKResponse, createErrorResponse } = require('#factories/responses/api');

module.exports = ArticlesController;

function ArticlesController() {
    const _create = async (req, res) => {
        try {
            const {title, category, description, date, createdAt, updatedAt} = req.body;
            const image = reg.file?.filename;

            const article = await articlesFacade.createArticle({
                title,
                category,
                description,
                date,
                image,
                createdAt,
                updatedAt
            });
            return createOKResponse({ res, content: article });
        } catch (error) {
            console.error('ArticlesController._create error:', error);
            return createErrorResponse({res, error: { message: error.message }, status: 400});
        }
    };

    const _getAll = async (req, res) => {
        try {
            const articles = await articlesFacade.getArticles();
            return createOKResponse({ res, content: articles });
        } catch (error) {
            console.error('ArticlesController._getAll error:', error);
            return createErrorResponse({ res, error: { message: error.message }, status: 400});
        }
    };

    const _getById = async (req, res) => {
        try {
            const { id } = req.params;
            const article = await articlesFacade.getArticleById(id);
            if (!article) throw new Error('Article not found');
            return createOKResponse({ res, content: article });
        } catch (error) {
            console.error('ArticlesController._getById error:', error);
            return createErrorResponse({ res, error: { message: error.message }, status: 400});
        }
    };

    const _update = async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;
            if (req.file) data.image = req.file.filename;

            const updateArticle = await articlesFacade.updateArticle(id, data);
            return createOKResponse({ res, content: updateArticle });
        } catch (error) {
            console.error('ArticlesController._update error:', error);
            return createErrorResponse({ res, error: { message: error.message }, status: 400});
        }
    };

    const _delete = async (req, res) => {
        try {
            const { id } = req.params;
            await articlesFacade.deleteArticle(id);
            return createOKResponse({ res, content: {message: 'Article deleted successfully'} });
        } catch (error) {
            console.error('ArticlesController._delete error:', error);
            return createErrorResponse({ res, error: { message: error.message }, status: 400});
        }
    };

    return {
        create: [upload.single('image'), _create],
        getAll: _getAll,
        getById: _getById,
        update: [upload.single('image'), _update],
        delete: _delete
    };
}