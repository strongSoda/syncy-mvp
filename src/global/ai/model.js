import React from "react";
import { Configuration, OpenAIApi } from "openai";

async function query(prompt, maxTokens = 200) {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: maxTokens,
    temperature: 1,
  });
  return response.data.choices[0].text;
}

export async function createReachout(influencer, brandUserProfile) {
//   if (!apiKey || apiKey.length === 0) {
//     console.warn("No openai key set. Returning precanned response");

//     return `Hello ${influencer?.fullName.split(" ")[0]}!,

// It's great to meet you! We're currently in the process of sourcing influencers for our client. 
// We'd be looking to schedule a call with you to discuss a paid collaboration. Would this be of interest?

// Cheers,

// `;
//   }

  return await query(
    `
    Your goal is to reach out to influencers that match a given interest or category.
    
    You are creating an initial reach out message with the goal of getting the influencer to respond to you about getting on a call to discuss about running an influencer marketing campaign.
    Be kind and sincere in the message. Personalise the message.
    
    Please return an email that you would send to the influencer.

    Below is the Influencer's information:
    --------------------
    Name: ${influencer?.fullName}. Use their first name in the message.
    Bio: ${influencer?.bio}
    Followers: ${influencer?.followers} followers.
    --------------------

    Keep the email short and sweet. The goal is to get the influencer to respond to you. Include the subject line in the response.

    Write the email on behalf of the person below.
    --------------------
    Name: ${brandUserProfile?.first_name} ${brandUserProfile?.last_name}.
    Job Title: ${brandUserProfile?.job_title}.
    Company Name: ${brandUserProfile?.company_name}
    Company Description: ${brandUserProfile?.company_description}.
    Company Website: ${brandUserProfile?.company_website}.
    Company Address: ${brandUserProfile?.company_address}.
    --------------------

    Please return the result in a valid JSON object as below. Do not include any text in the output string other than the valid JSON object neither after the JSON not before it. If you cannot return a valid JSON array, please return an empty object.
    
    {
      "subject": "",
      "body": "html of body",
      "plain_text_body": "body in plain text" 
    }
    
    Note: Format the body as html. Format the plain_text_body with new line characters for line breaks.
    `
    ,
    500
  );
}

export async function getCategories(keyword, allCategories) {
  // if (!apiKey || apiKey.length === 0) {
  //   console.warn("No openai key set. Returning precanned response");
  //   return [
  //     "Mom Influencers",
  //     "Baby Toys Influencers",
  //     "Lifestyle Influencers",
  //   ];
  // }

  const raw = await query(
    `
    You are a large neural network trained on a large corpus of text from the internet.
    Your goal is to help a human to find influencers that match a given keyword. You are aiming to return the right category of influencer.
    Please return a list of categories with up to 3 categories. The answer should be in the format:
    ["category1", "category2", "category3"]
    
    The categories returned should only be from the list of categories below and should be relevant to the keyword.:
    ${allCategories}

    Please ensure the answer is a valid json array. If you cannot return a valid JSON array, please return an empty array.

    Please return a list of categories for the keyword "${keyword}".
    `,
    100
  );

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse response", raw);
    return [];
  }
}

export function ModelConfiguration({ openAiKey, setOpenAiKey }) {
  const [showModelConfig, setShowModelConfig] = React.useState(false);

  return (
    <div className="model-config">
      {!showModelConfig && (
        <div onClick={() => setShowModelConfig(true)}>⚙️</div>
      )}
      {showModelConfig && (
        <div className="model-config__content">
          <div className="model-config__header">
            <h3>Model Configuration</h3>
            <button onClick={() => setShowModelConfig(false)}>x</button>
          </div>
          <div className="model-config__input">
            <label>OpenAI API Token</label>
            <input
              value={openAiKey}
              onChange={(e) => setOpenAiKey(e.target.value)}
            ></input>
          </div>
        </div>
      )}
    </div>
  );
}

export default query;