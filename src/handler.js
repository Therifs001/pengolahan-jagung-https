const recoms = require('./recoms'); // Data atau fungsi terkait rekomendasi

module.exports = {
    getHome: () => {
        return { message: 'Welcome to Pengolahan Jagung!' };
    },
    getRecommendations: () => {
        return recoms; // Mengembalikan data rekomendasi
    }
};

