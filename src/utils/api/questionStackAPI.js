import { getAd, get } from "../ApiCaller";

export const fetchQuestionStack = async (id) => {
  try {
    const endpoint = `/api/v2/question-stacks/${id}`;
    console.log('Endpoint URL:', endpoint); // Log the endpoint URL

    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Include the token in the headers
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const response = await getAd(endpoint, {}, headers);
    return response.data;
  } catch (error) {
    console.error('Error fetching question stack:', error);
    throw error;
  }
};

export const fetchQuestions = async (roomCode) => {
  try {
    const endpoint = `/question/get-by-room?room_code=${roomCode}`;
    // console.log('Endpoint URL:', endpoint); // Log the full endpoint URL

    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Include the token in the headers
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Ensure Content-Type is set if needed
    };

    const response = await get(endpoint, {}, headers);

    if (response.status !== 200) {
      console.log(response);
      throw new Error('Network response was not ok');
    }

  
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const fetchAQuestion = async (questionId) => {
  try {
    // Validate UUID
    //console.log('Question ID:', questionId); // Log the question ID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(questionId)) {
      throw new Error(`Invalid UUID format: ${questionId}`);
    }
    const endpoint = `/question/get?question_id=${questionId}`;
    
    //console.log('Endpoint URL:', endpoint); // Log the full endpoint URL

    const token = localStorage.getItem('token');

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await get(endpoint, {}, headers);

    if (response.status !== 200) {
      console.log(response);
      throw new Error('Network response was not ok');
    }

    //console.log('Fetched question:', response.data); // Log the fetched data
    return response.data;
  } catch (error) {
    console.error('Error fetching question:', error);
    throw error;
  }
};
