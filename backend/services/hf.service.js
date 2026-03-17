import axios from 'axios';

export const analyzeWithBERT = async (text) => {
    const response = await axios.post(
        'https://router.huggingface.co/hf-inference/models/jy46604790/Fake-News-Bert-Detect',
        { inputs: text },
        {
            headers: {
                'Authorization': `Bearer ${process.env.HF_TOKEN}`
            }
        }
    );
    return response.data;
};
