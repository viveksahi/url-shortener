
import React, { useState } from 'react';

const URLShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrls, setShortUrls] = useState([]);

  async function shortenUrlWithBitly(originalUrl) {
    const apiKey = process.env.REACT_APP_BITLY_API_KEY; // Environment variable setup
    const apiUrl = 'https://api-ssl.bitly.com/v4/shorten';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ long_url: originalUrl })
    });

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    return data.link;
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;

    try {
      const shortUrl = await shortenUrlWithBitly(originalUrl);
      setShortUrls([...shortUrls, { short: shortUrl }]);
    } catch (error) {
      console.error("Error creating short URL:", error);
    }

    setOriginalUrl('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        <button onClick={handleClick} style={{
          padding: '8px 16px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Shorten URL
        </button>
      </div>
      <div>
        {shortUrls.map((url, index) => (
          <div key={index} style={{
            padding: '10px',
            backgroundColor: '#f0f0f0',
            marginBottom: '10px',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '16px' }}>{url.short}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default URLShortener;