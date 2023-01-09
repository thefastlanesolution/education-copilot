import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoList.css';

function VideoList(props) {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

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
            maxResults: 5,
            videoDuration: 'medium',
          },
        }
      );
      console.log('getting videos');
      setVideos(result.data.items);
    }

    getVideos();
  }, [props.lessonTopic]);

  const handlePreviousButtonClick = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  const handleNextButtonClick = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  <script src="https://www.youtube.com/iframe_api"></script>;

  return (
    <div>
      {videos.length > 0 && (
        <div
          key={videos[currentVideoIndex].id.videoId}
          className="video-container"
        >
          <iframe
            className="video"
            title={videos[currentVideoIndex].snippet.title}
            src={`https://www.youtube.com/embed/${videos[currentVideoIndex].id.videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            width={'100%'}
            height={200}
          ></iframe>
          <div className="video-title">
            {videos[currentVideoIndex].snippet.title}
          </div>
          <div className="buttoncontainer-yt">
            {currentVideoIndex > 0 && (
              <button
                onClick={handlePreviousButtonClick}
                className="prevbutton"
              >
                Previous
              </button>
            )}
            {currentVideoIndex < videos.length - 1 && (
              <button onClick={handleNextButtonClick} className="nextbutton">
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoList;
