import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoList.css';

function VideoList(props) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function getVideos() {
      const API_KEY = 'AIzaSyA3Pad8R-7NgSM213hPpfGOoAhxfeMxluY';
      const query = props.lessonTopic;
      const result = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            key: API_KEY,
            q: query,
            type: 'video',
            part: 'id,snippet',
            maxResults: 3,
            videoDuration: 'medium',
          },
        }
      );
      console.log('getting videos');
      setVideos(result.data.items);
    }

    getVideos();
  }, [props.lessonTopic]);

  return (
    <div>
      {videos.map(video => (
        <div key={video.id.videoId} className="video-container">
          <iframe
            className="video"
            title={video.snippet.title}
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            width={320}
          ></iframe>
          <div className="video-title">{video.snippet.title}</div>
        </div>
      ))}
    </div>
  );
}

export default VideoList;
