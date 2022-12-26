import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VideoList(props) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function getVideos() {
      const API_KEY = 'AIzaSyA3Pad8R-7NgSM213hPpfGOoAhxfeMxluY';
      const query = 'Introduction to the California Gold Rush';
      const result = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            key: API_KEY,
            q: query,
            type: 'video',
            part: 'id,snippet',
            maxResults: 3,
            order: 'viewCount',
          },
        }
      );

      setVideos(result.data.items);
    }

    getVideos();
  }, [props.lessonTopic]);

  return (
    <div>
      {videos.map(video => (
        <div key={video.id.videoId}>
          <h2>{video.snippet.title}</h2>
          <p>{video.snippet.description}</p>
          <iframe
            title={video.snippet.title}
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
}

export default VideoList;
