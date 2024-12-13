// policies/adminRole.policy.js

// Model User
const User = require('#models/User');

// JWT Service
const JWT = require('#services/jwt.service');

// Response factories
const { createErrorResponse } = require('#factories/responses/api');
const { Err } = require('#factories/errors');

module.exports = async (req, res, next) => {
    try {
        // Pastikan token sudah diverifikasi di middleware sebelumnya
        const token = req.token;

        // Jika tidak ada token, kembalikan error
        if (!token) {
            const err = new Err('No authentication token found');
            err.status = 401;
            throw err;
        }

        // Cari user berdasarkan ID dari token
        const user = await User.findById(token.id);

        // Jika user tidak ditemukan
        if (!user) {
            const err = new Err('User not found');
            err.status = 401;
            throw err;
        }

        // Cek apakah role adalah admin
        if (user.role !== 'admin') {
            const err = new Err('Access denied. Admin privileges required');
            err.status = 403;
            throw err;
        }

        // Tambahkan informasi user ke request untuk digunakan di controller
        req.user = user;

        // Lanjutkan ke route selanjutnya
        next();
    } catch (error) {
        // Log error untuk debugging
        console.error('Admin Role Policy Error:', error);

        // Gunakan response error factory
        return createErrorResponse({
            res, 
            error,
            status: error?.status || 403
        });
    }
};