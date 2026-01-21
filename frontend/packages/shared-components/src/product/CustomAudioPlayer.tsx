import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { Grid, IconButton, Slider, Typography } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";

export function CustomAudioPlayer({ audioSrc, duration, setDuration }: { audioSrc: string; duration: number; setDuration: Dispatch<SetStateAction<number>> }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(100);
  const [openVolume, setOpenVolume] = useState<boolean>(false);
  const audioRef = useRef(new Audio(audioSrc));

  useEffect(() => {
    const audio = audioRef.current;
    if (audioSrc) {
      audio.src = audioSrc;
      audio.load();
      audio.onloadedmetadata = () => {
        if (isNaN(audio.duration)) {
          !duration && setDuration(0);
          setCurrentTime(0);
        } else if (audio.duration === Infinity) {
          audio.currentTime = Number.MAX_SAFE_INTEGER;
          audio.ontimeupdate = () => {
            audio.ontimeupdate = null;
            !duration && setDuration(audio.duration);
            audio.currentTime = 0;
            setCurrentTime(0);
          };
        } else {
          !duration && setDuration(audio.duration);
          setCurrentTime(0);
        }
      };

      const onEnded = () => {
        setIsPlaying(false);
      };

      const onTimeUpdate = () => {
        if (audio.currentTime <= duration) setCurrentTime(audio.currentTime);
      };

      audio.addEventListener("ended", onEnded);
      audio.addEventListener("timeupdate", onTimeUpdate);

      return () => {
        audio.removeEventListener("ended", onEnded);
        audio.removeEventListener("timeupdate", onTimeUpdate);
      };
    } else {
      setDuration(0);
      audio.pause();
    }
  }, [audioSrc]);

  const togglePlayPause = () => {
    if (duration) {
      const audio = audioRef.current;
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleChangeTime = (event: Event, value: number | number[]) => {
    const audio = audioRef.current;
    if (typeof value === "number") {
      const newValue = Array.isArray(value) ? value[0] : value;
      const newTime = (newValue / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleVolume = () => {
    setOpenVolume(true);
  };

  const handleVolumeChange = (event: Event, value: number | number[]) => {
    const audio = audioRef.current;
    if (typeof value === "number") {
      audio.volume = value / 100;
      setVolume(value);
    }
  };

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      audio.pause();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (openVolume && !(event.target as HTMLElement | null)?.closest("#volume")) {
        setOpenVolume(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [openVolume]);

  return (
    <Grid container sx={{ p: "8px", backgroundColor: (theme) => theme.palette.color1[500], borderRadius: "4px", flexWrap: "nowrap", alignItems: "center" }}>
      <IconButton sx={{ color: (theme) => theme.palette.color1[100] }} onClick={togglePlayPause}>
        {isPlaying ? <PauseRoundedIcon sx={{ width: "20px", height: "20px" }} /> : <PlayArrowRoundedIcon sx={{ width: "20px", height: "20px" }} />}
      </IconButton>
      <Typography sx={{ whiteSpace: "nowrap", color: (theme) => theme.palette.primary.light, fontSize: "12px", fontWeight: "700", lineHeight: "11px" }}>
        {duration === 0 ? "-- / --" : `${formatTime(currentTime)} / ${formatTime(duration)}`}
      </Typography>
      <Slider
        value={duration > 0 ? (currentTime / duration) * 100 : 0}
        onChange={handleChangeTime}
        sx={{
          width: "100%",
          ml: "8px",
          color: (theme) => theme.palette.color1[100],
          padding: "10px 0 !important",
          "& .MuiSlider-thumb": {
            top: "6px",
            width: "10px",
            height: "10px",
            display: duration ? "block" : "none",
            "&:hover": {
              boxShadow: (theme) => `0px 0px 0px 8px ${theme.palette.color1[300]}`,
            },
            "&.Mui-active": {
              boxShadow: (theme) => `0px 0px 0px 14px ${theme.palette.color1[300]}`,
            },
          },
        }}
        size="small"
      />
      <Grid container sx={{ width: "fit-content", ml: "8px", position: "relative" }} onClick={toggleVolume} id="volume">
        <Grid
          container
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, 0)",
            bottom: "100%",
            backgroundColor: (theme) => theme.palette.color1[500],
            justifyContent: "center",
            padding: "16px 0",
            borderRadius: "4px",
            height: "80px",
            width: "36px",
            display: openVolume ? "block" : "none",
          }}
        >
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            orientation="vertical"
            sx={{
              padding: "0 13px !important",
              left: "4px",
              height: "50px",
              color: (theme) => theme.palette.color1[100],
              "& .MuiSlider-thumb": {
                left: "9px",
                width: "10px",
                height: "10px",
                "&:hover": {
                  boxShadow: (theme) => `0px 0px 0px 8px ${theme.palette.color1[300]}`,
                },
                "&.Mui-active": {
                  boxShadow: (theme) => `0px 0px 0px 14px ${theme.palette.color1[300]}`,
                },
              },
            }}
            size="small"
          />
        </Grid>
        <IconButton sx={{ color: (theme) => theme.palette.color1[100] }}>
          {volume ? <VolumeUpRoundedIcon sx={{ width: "20px", height: "20px" }} /> : <VolumeOffRoundedIcon sx={{ width: "20px", height: "20px" }} />}
        </IconButton>
      </Grid>
    </Grid>
  );
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

