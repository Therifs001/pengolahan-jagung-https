const recoms = require('./recoms'); 

module.exports = {
    getHome: () => {
        return { message: 'Welcome to Pengolahan Jagung!' };
    },
    getRecommendations: () => {
        return recoms; 
    }
};
