// src/handler.js
const notes = require('./notes'); // Data atau fungsi terkait catatan

module.exports = {
    getHome: () => {
        return { message: 'Welcome to Pengolahan Jagung!' };
    },
    getRecommendations: () => {
        return notes; // Mengembalikan data rekomendasi atau catatan
    }
};
