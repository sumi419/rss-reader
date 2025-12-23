import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import FeedList from './FeedList';
import StoryPage from './StoryPage';

function App() {
  const defaultFeedUrls = ['https://medium.com/feed/backchannel'];

  const [feeds, setFeeds] = useState([]);
  const [bookmarks, setBookmarks] = useState(
    () => JSON.parse(localStorage.getItem('bookmarks')) || []
  );

  useEffect(() => {
    async function loadFeeds() {
      let allItems = [];

      for (let url of defaultFeedUrls) {
        try {
          const response = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`
          );

          const data = await response.json();

          const items = data.items.map((item) => ({
            title: item.title,
            link: item.link,
            content: item.content || item.description
          }));

          allItems = [...allItems, ...items];
        } catch (err) {
          console.error('Failed to load:', url);
        }
      }
      setFeeds(allItems);
    }

    loadFeeds();
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  return (
    <Routes>
      <Route
        path='/'
        element={<FeedList feeds={feeds} bookmarks={bookmarks} setBookmarks={setBookmarks} />}
      />
      <Route
        path='/story/:index'
        element={<StoryPage feeds={feeds} bookmarks={bookmarks} setBookmarks={setBookmarks} />}
      />
    </Routes>
  );
}

export default App;
