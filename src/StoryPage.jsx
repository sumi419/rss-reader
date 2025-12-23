import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './App.css';

export default function StoryPage({ feeds, bookmarks, setBookmarks }) {
  const { index } = useParams();
  const itemIndex = parseInt(index);

  const item = feeds[itemIndex];

  if (!feeds.length) return <div className='container'>Loading...</div>;
  if (!item) return <div className='container'>Story not found</div>;

  const id = `item-${itemIndex}`;
  const isBookmarked = bookmarks.includes(id);
  const toggleBookmark = () =>
    setBookmarks((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]));

  return (
    <div className='container'>
      <div className='story-container story'>
        <h1>{item.title}</h1>
        {item.image && <img src={item.image} alt='' />}
        <div dangerouslySetInnerHTML={{ __html: item.content }} />
        <div className='story-controls'>
          <button onClick={toggleBookmark}>{isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}</button>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              item.link
            )}&text=${encodeURIComponent(item.title)}`}
            target='_blank'
            rel='noopener noreferrer'>
            🐥 Tweet
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(item.title)}&body=${encodeURIComponent(
              item.link
            )}`}>
            📧 Email
          </a>
        </div>
        <div style={{ marginTop: '20px' }}>
          <Link to='/'>⬅ Back to Feed List</Link>
        </div>
      </div>
    </div>
  );
}
