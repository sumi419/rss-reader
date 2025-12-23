import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export default function FeedList({ feeds, bookmarks, setBookmarks }) {
  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      if (prev.includes(id)) {
        // Already bookmarked remove it
        return prev.filter((b) => b !== id);
      } else {
        // Not bookmarked add it
        return [...prev, id];
      }
    });
  };

  return (
    <div className='container'>
      <h1>📰 RSS Reader</h1>
      {feeds &&
        feeds.map((item, index) => {
          console.log('item', item.content);
          const id = `item-${index}`;
          return (
            <div key={id} className='feed-item'>
              {item.image && <img src={item.image} alt='' />}
              <div className='feed-title'>
                <Link to={`/story/${index}`}>{item.title}</Link>
              </div>
              <button onClick={() => toggleBookmark(id)}>
                {bookmarks.includes(id) ? '★' : '☆'}
              </button>
            </div>
          );
        })}
    </div>
  );
}
