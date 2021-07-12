import React, { useState } from "react";
import CountUp from "react-countup";
import { AiOutlineClose } from "react-icons/ai";
const App = () => {
  const [inputVal, setInputVal] = useState("");
  const [channelId, setChannelId] = useState("");
  const [inputWarning, setInputWarning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [subscribers, setSubscribers] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalVideo, setTotalVideos] = useState(0);
  const apiKey = "AIzaSyDNqx1mjEKJqY26PKmREHmABeQYRvC-NXc";
  const handleInptValue = (e) => {
    setInputVal(e.target.value);
    setChannelId(
      e.target.value.replace("https://www.youtube.com/channel/", "")
    );
  };
  const handleSearch = () => {
    if (inputVal.includes("https://www.youtube.com/channel/")) {
      setInputWarning(false);
      setShowResult(true);

      fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          const { items } = data;
          setSubscribers(items[0].statistics.subscriberCount);
          setTotalViews(items[0].statistics.viewCount);
          setTotalVideos(items[0].statistics.videoCount);
          console.log(items);
        });
    } else {
      setInputWarning(true);
    }
  };

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
      <AiOutlineClose
        className="text-white text-3xl absolute top-6 right-6  cursor-pointer"
        onClick={() => {
          setShowResult(false);
        }}
      />
      <div
        className={`welcome absolute top-0 z-10 left-0 w-full h-full bg-[#222] transform flex ${
          showResult ? "scale-0" : null
        } items-center justify-center flex-col`}
      >
        <h1 className="text-white text-5xl mb-20">
          Search with youtube channel link
        </h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter Channel Link"
            value={inputVal}
            onChange={handleInptValue}
            className={`border-2 rounded ${
              inputWarning ? "border-red-500" : null
            } w-80 h-10 border-[yellow] outline-none bg-transparent px-4 text-white`}
          />
          <button
            onClick={handleSearch}
            className="border-2 flex items-center justify-center h-10 ml-4 p-2 rounded text-white transition-colors hover:bg-white hover:text-black font-bold"
          >
            Search Channel
          </button>
        </div>
      </div>
      <div className="statis flex">
        <div className="text-white text-5xl flex items-center justify-center flex-col mx-4 border-2 w-80 h-72 cursor-pointer transform transition-all hover:-translate-y-3 rounded">
          <div className="mb-3">Total Views</div>
          <CountUp
            duration={50}
            start={0}
            delay={0}
            end={totalViews}
            separator=","
          />
        </div>
        <div className="text-white text-5xl flex items-center justify-center flex-col mx-4 border-2 w-80 h-72 cursor-pointer transform transition-all hover:-translate-y-3 rounded">
          <div className="mb-3">Subscribers</div>
          <CountUp
            duration={50}
            start={0}
            delay={0}
            end={subscribers}
            separator=","
          />
        </div>
        <div className="text-white text-5xl flex items-center justify-center flex-col mx-4 border-2 w-80 h-72 cursor-pointer transform transition-all hover:-translate-y-3 rounded">
          <div className="mb-3">Total Videos</div>
          <CountUp
            duration={50}
            start={0}
            delay={0}
            end={totalVideo}
            separator=","
          />
        </div>
      </div>
    </div>
  );
};

export default App;
