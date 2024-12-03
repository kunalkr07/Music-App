import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faSearch,
  faPlay,
  faPause
} from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
  const [song, Setsong] = useState([]);
  const [search, setSearch] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());
  const [songTitle, setsongTitle] = useState("");
  const [previewUrl, setpreviewUrl] = useState("");
  const [id, setid] = useState("");
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0); // Offset for pagination
  const [limitdata, setlimitdata] = useState(1);
  const [fetchedIds, setFetchedIds] = useState(new Set()); // Set to track fetched song IDs
  // Function to fetch data with a timeout
  const fetchDataWithTimeout = (url, options, timeoutDuration) => {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeoutDuration)
    );
    const fetchRequest = fetch(url, options);
    return Promise.race([fetchRequest, timeout]);
  };

  const getData = async (initial = "javed ali", limitdata) => {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${initial}&limit=${limitdata}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "df058c5faemsh2bc8f88f421d507p101ce6jsnb0c88027595e",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await fetchDataWithTimeout(url, options, 2000);
      const parsedData = await response.json();
      // Filter out songs that are already fetched based on their ID
      const newSongs = parsedData.data.filter(
        (song) => !fetchedIds.has(song.id)
      );
      setOffset((prevOffset) => prevOffset + limitdata); // Update offset for next fetch
      // Add the IDs of the newly fetched songs to the set
      const newFetchedIds = new Set(fetchedIds);
      newSongs.forEach((song) => newFetchedIds.add(song.id));
      setFetchedIds(newFetchedIds); // Update fetched IDs
      Setsong(parsedData.data);
      setlimitdata(limitdata + 5);
      // console.log(limitdata)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Detect scroll to load more data
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        // If scrolled to the bottom, fetch more data
        if (!loading) {
          // Prevent multiple calls while loading
          getData();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup event listener
    };
  }, [loading]);

  useEffect(() => {
    getData();

    // Sync progress
    const updateProgress = () => setCurrentTime(audioRef.current.currentTime);

    // Set duration on metadata load
    const setAudioDuration = () => setDuration(audioRef.current.duration);

    // Add event listeners
    audioRef.current.addEventListener("timeupdate", updateProgress);
    audioRef.current.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateProgress);
      audioRef.current.removeEventListener("loadedmetadata", setAudioDuration);
      audioRef.current.pause();
    };
  }, []);

  const handleChange = (e) => setSearch(e.target.value);

  const getSearch = (e) => {
    e.preventDefault();
    getData(search);
  };

  const togglePlayPause = (previewUrl, id) => {
    if (audioRef.current.src !== previewUrl) {
      audioRef.current.src = previewUrl;
      audioRef.current.play();
      const songDetail = song.find((song) => song.id === id);
      if (songDetail) {
        const { title, artist } = songDetail;
        setsongTitle(title);
        setpreviewUrl(previewUrl);
        setid(id);
      }
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (time) =>
    isNaN(time) ? "00:00" : new Date(time * 1000).toISOString().substr(14, 5);

  return (
    <div className="content">
      {/* Right Section */}
      <div className="right-section">
        <div className="search-bar">
          <FontAwesomeIcon icon={faHeadphones} className="icon" />
          <input
            type="search"
            placeholder="Search music, tracks, albums"
            onChange={handleChange}
            value={search}
          />
          <button onClick={getSearch}>
            <FontAwesomeIcon icon={faSearch} className="icon" />
          </button>
        </div>

        {/* Music List */}
        <div className="music-list">
          {song.length > 0 ? (
            song.map((song) => (
              <div
                className="card"
                key={song.id}
                onClick={() => togglePlayPause(song.preview, song.id)}
              >
                <div className="card-body">
                  <img
                    src={song.album.cover_medium}
                    className="card-img-top"
                    alt={song.title}
                  />
                  <span className="card-title">{song.title}</span>
                  <p className="card-artist">Artist: {song.artist.name}</p>
                 
                </div>
              </div>
            ))
          ) : (
            <div className="banner">
              <h2>𝕮𝖆𝖙𝖊𝖗𝖕𝖎𝖑𝖑𝖊𝖗 𝕸𝖚𝖘𝖎𝖈</h2>
              <div className="loading-banner">
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
              </div>
            </div>
          )}


        </div>
        <div className="player-container">
          <div className="player">
            <p> {songTitle}</p>
          <div className="progress-section">
          <p>{formatTime(currentTime)}</p>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSliderChange}
            />
            <p>{formatTime(duration)}</p>
          </div>
           
           <div className="player-btn">
           <button>
              <FontAwesomeIcon
                icon={isPlaying ? faPause : faPlay}
                onClick={() => togglePlayPause(previewUrl, id)}
              />
            </button>
           </div>
          </div>
        </div>

       
      </div>
      
    </div>
  );
}
