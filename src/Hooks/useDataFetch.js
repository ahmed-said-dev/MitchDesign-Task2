import { useState, useEffect } from 'react';

// Custom hook for fetching data
const useDataFetch = (category, onReceived) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data from the API
  const fetchData = async (url, options) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok && response.status !== 200) {
        const data = await response.json();
        throw new Error(data || `(${response.status}), something went wrong, please try again!`);
      }

      const data = await response.json();
      onReceived(data);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }

    setIsLoading(false);
  };

  // Fetch data when category or onReceived callback changes
  useEffect(() => {
    const options = { ...baseOptions, body: JSON.stringify({ category, products_per_page: 12 }) };
    fetchData(BASE_URL, options);
  }, [category, onReceived]);

  return { isLoading, error };
};

const BASE_URL = 'https://woosonicpwa.com/MitchAPI/filter.php';

const baseOptions = {
  method: 'POST',
  headers: {
    Origin: 'postman',
    Cookie: 'cookieName=cookieValue',
    'Content-Type': 'application/json',
  },
};

export default useDataFetch;
