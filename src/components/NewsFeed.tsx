import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import SwipeButton from './SwipeButton';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const NewsFeed: React.FC = () => {
  const [index, setIndex] = useState(-1);

  const { data, error } = useSWR(
    'https://newsapi.org/v2/top-headlines?country=in&apiKey=d643da2e83dd46bbbea7394653bdc9b6',
    fetcher
  );

  useEffect(() => {
    console.log('Index updated:', index);
  }, [index]);

  const handleNewsClick = () => {
    if (data && data.articles) {
      setIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % data.articles.length;
        console.log('Setting new index:', newIndex);
        return newIndex;
      });
    }
  };

  if (error) return <div>Error fetching news</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>{index !== -1 ? 'Latest News' : 'Welcome to the news app'}</h1>
        {index !== -1 && data.articles && (
          <div style={styles.newsContainer}>
            {data.articles[index].urlToImage && (
              <img src={data.articles[index].urlToImage} style={styles.image} alt="news" />
            )}
            <h2 style={styles.title}>{data.articles[index].title}</h2>
            <p style={styles.description}>{data.articles[index].content}</p>
            <p style={styles.author}>Author-{data.articles[index].author}</p>
            <p style={styles.author}>Published At-{data.articles[index].publishedAt}</p>
          </div>
        )}
        <SwipeButton onSwipeComplete={handleNewsClick} />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
    fontFamily: 'Sans-Serif',
    textAlign: 'center',
  },
  newsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    height: '600px',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    color: '#000000',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    borderColor: '#ddd',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: '250px',
    borderRadius: '13px',
    objectFit: 'cover', // Cast to the appropriate type
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: 'black',
    fontFamily: 'Sans-Serif',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    color: '#36454F',
    fontFamily: "inherit",
    overflowY: 'auto' as 'auto', // Cast to the appropriate type
    flex: 1,
  },
  author: {
    fontSize: 13,
    marginTop: 'auto', // Pushes the author's name to the bottom
    fontWeight: 500,
    color: 'grey',
    fontFamily: "inherit",
    alignSelf: 'flex-end', // Aligns the author's name to the end
    textAlign: 'left', // Aligns the text to the right
    width: '100%', // Ensures the text stretches across the container 
  },
};

export default NewsFeed;
