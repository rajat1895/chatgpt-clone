import { Configuration, OpenAIApi } from 'openai';

import FormSection from './Components/FormSection';
import AnswerSection from './Components/AnswerSection';
import { useState } from 'react';

const App = () => {
    const configuration = new Configuration({
        apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);

    const [storedValues, setStoredValues] = useState([]);

    const generateResponse = async (newQuestion, setNewQuestion) => {
        let options = {
            model: 'text-davinci-003',
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ['/'],
        };

        let completeOptions = {
            ...options,
            prompt: newQuestion,
        };

        const response = await openai.createCompletion(completeOptions);
        console.log(response.data.choices[0].text);

        if (response.data.choices) {
            setStoredValues([
                {
                    question: newQuestion,
                    answer: response.data.choices[0].text,
                },
                ...storedValues,
            ]);
            setNewQuestion('');
        }
    };

    return (
        <div>
            <div className="header-section">
                <h1>ChatGPT CLONE 🤖</h1>
                    <p>
                        Hi I am your Virtual Assistant to answer your Questions. I am based on OpenAI's ChatGPT-4 Api.
                    </p>
            </div>

            <FormSection generateResponse={generateResponse} />

            <AnswerSection storedValues={storedValues} />
        </div>
    );
};

export default App;