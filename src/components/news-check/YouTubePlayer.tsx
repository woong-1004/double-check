"use client";

import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

interface YouTubePlayerProps {
  videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
  const opts: YouTubeProps["opts"] = {
    width: "100%", // 100%로 변경
    height: "100%", // 추가된 부분
    playerVars: {
      autoplay: 0, // 0: no autoplay, 1: autoplay
      controls: 1, // 0: no controls, 1: show controls
      modestbranding: 1, // Hide YouTube logo as much as possible
      rel: 0, // Do not show related videos at the end
    },
  };

  return (
    <YouTube videoId={videoId} opts={opts} className="w-full aspect-video" />
  );
};

export default YouTubePlayer;
