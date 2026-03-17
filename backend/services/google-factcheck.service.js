import axios from 'axios';

export const checkGoogleFactCheck = async (text) => {
    const response = await axios.get('https://factchecktools.googleapis.com/v1alpha1/claims:search', {
        params: {
            query: text,
            key: process.env.GOOGLE_KEY,
            languageCode: 'fr'
        }
    });
    return response.data;
};
