import React, { useState } from 'react';

const URLShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrls, setShortUrls] = useState([]);

  function handleClick(e) {
    e.preventDefault();
    if (!originalUrl) return;
    const shortUrl = 'tinyurl.com/' + Math.random().toString(36).slice(2, 8);
    setShortUrls([
      ...shortUrls,
      {
        short: shortUrl
      }
    ]);
    setOriginalUrl('');
  }

  function copyUrl(shortUrl) {
    const tempInput = document.createElement('input');
    tempInput.value = shortUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          style={{ 
            padding: '8px',
            width: '300px',
            marginRight: '10px'
          }}
        />
        <button
          onClick={handleClick}
          style={{
            padding: '8px 16px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Shorten URL
        </button>
      </div>

      <div>
        {shortUrls.map((url, index) => (
          <div
            key={index}
            style={{
              padding: '10px',
              backgroundColor: '#f0f0f0',
              marginBottom: '10px',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ fontSize: '16px' }}>{url.short}</div>
            <button
              onClick={() => copyUrl(url.short)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                minWidth: '70px'
              }}
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default URLShortener;
