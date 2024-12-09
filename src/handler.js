const recoms = require('./recoms');

module.exports = {
    // Handler untuk route home
    getHome: (request, h) => {
        return h.response({ message: 'Welcome to Pengolahan Jagung!' }).code(200);
    },

    // Handler untuk route mendapatkan semua rekomendasi
    getRecommendations: (request, h) => {
        return h.response(recoms).code(200); 
    },

    // Handler untuk mendapatkan rekomendasi berdasarkan ID
    getRecommendationById: (request, h) => {
        const { id } = request.params;
        const numericId = Number(id); // Konversi ID ke angka jika diperlukan

        const recommendation = recoms.find(recom => recom.id === numericId);

        if (!recommendation) {
            return h.response({
                error: true,
                message: 'selamat datang',
            }).code(404);
        }

        return h.response(recommendation).code(200);
    },
};
