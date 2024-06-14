import { get } from "../ApiCaller";

export const fetchQuestionStack = async (id) => {
  try {
    const endpoint = `/api/v2/question-stacks/${id}`;
    console.log('Endpoint URL:', endpoint); // Log the endpoint URL
    const response = await get(endpoint, {}, {}, true);
    return response.data;
  } catch (error) {
    console.error('Error fetching question stack:', error);
    throw error;
  }
};