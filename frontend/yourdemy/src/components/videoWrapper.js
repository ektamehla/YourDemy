import React, { useState, useEffect } from "react";
import Popover from "./popover";

function VideoWrapper(props) {
  const { course } = props;
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    // Function to create a YouTube player
    const createPlayer = () => {
      if (window.YT && window.YT.Player) {
        // Destroy existing player if there is one
        if (window.player) {
          window.player.destroy();
        }

        window.player = new window.YT.Player("youtube-player", {
          videoId: course.video_url.split("v=")[1],
          events: {
            onStateChange: onPlayerStateChange,
          },
        });
      }
    };

    // Load the IFrame Player API code asynchronously if it's not already available.
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }

    // Cleanup function to potentially destroy the player when the component unmounts
    return () => {
      if (window.player) {
        window.player.destroy();
      }
    };
  }, [course.video_url]); // Effect runs when course.video_url changes.

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING && props.interactive_mode) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, (props.duration*1000)); // Set a timer to show the popup after 5 minutes

      return () => clearTimeout(timer);
    }
  };
  const closePopover = () =>{
    setShowPopup(false)
  }
  return (
    <div className="video-wrapper">
      <div id="youtube-player" className="video-controller"></div>
      {showPopup && (
        <Popover type="courseDuration" setShowPopup={closePopover}/>
      )}
    </div>
  );
}

export default VideoWrapper;
