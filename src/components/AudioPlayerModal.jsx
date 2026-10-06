import { useEffect, useRef, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { baseUrl } from '../data/booksData';

export default function AudioPlayerModal() {
  const { activeAudioBook, closeAudioPlayer, addToCart } = useStore();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') closeAudioPlayer();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeAudioPlayer]);

  if (!activeAudioBook) return null;

  const audioSrc = activeAudioBook.audioFilesUri?.[0]
    ? `${baseUrl}${activeAudioBook.audioFilesUri[0]}`
    : null;

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  }

  function handleTimeUpdate() {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }

  function handleLoadedMetadata() {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  }

  function handleSeek(e) {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }

  function handleVolumeChange(e) {
    const val = Number(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      setIsMuted(val === 0);
    }
  }

  function toggleMute() {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
  }

  function formatTime(secs) {
    if (isNaN(secs) || secs < 0) return '0:00';
    const mins = Math.floor(secs / 60);
    const remaining = Math.floor(secs % 60);
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="audio-player-title"
      onClick={closeAudioPlayer}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-b from-slate-900 to-indigo-950 p-6 text-white shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAudioPlayer}
          aria-label="Close audio player"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-white/20 hover:text-white"
        >
          ✕
        </button>

        {/* Audio Element */}
        {audioSrc && (
          <audio
            ref={audioRef}
            src={audioSrc}
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}

        {/* Header Tag */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-400">
          <span className="flex h-2.5 w-2.5 rounded-full bg-violet-400 animate-pulse" />
          <span>Audiobook Player</span>
        </div>

        {/* Album / Book Art & Meta */}
        <div className="mt-5 flex items-center gap-5">
          <img
            src={`${baseUrl}${activeAudioBook.coverPhotoUri}`}
            alt={activeAudioBook.title}
            className="h-28 w-24 rounded-xl bg-slate-800 object-cover shadow-md"
            onError={(e) => {
              e.currentTarget.src = '/book-placeholder.svg';
            }}
          />
          <div className="flex-1 overflow-hidden">
            <h3
              id="audio-player-title"
              dir="rtl"
              className="font-urdu truncate text-2xl font-bold leading-relaxed text-amber-200"
            >
              {activeAudioBook.title}
            </h3>
            <p dir="rtl" className="font-urdu truncate text-sm text-slate-300">
              {activeAudioBook.author?.name}
            </p>
            {activeAudioBook.narrator && (
              <p className="mt-1 text-xs text-violet-300">
                🎙️ Narrator: <span className="font-semibold text-white">{activeAudioBook.narrator}</span>
              </p>
            )}
            <span className="mt-2 inline-block rounded-full bg-violet-500/20 px-2.5 py-0.5 text-[11px] font-bold text-violet-300">
              AUDIO STREAM
            </span>
          </div>
        </div>

        {/* Scrubber / Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="mt-1.5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-amber-400"
            aria-label="Seek audio"
          />
        </div>

        {/* Main Controls */}
        <div className="mt-6 flex items-center justify-between">
          {/* Mute button */}
          <button
            type="button"
            onClick={toggleMute}
            className="rounded-full bg-white/10 p-2.5 text-sm text-slate-300 transition hover:bg-white/20"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? '🔇' : '🔊'}
          </button>

          {/* Center Playback Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime -= 15;
              }}
              className="rounded-full bg-white/10 p-2 text-sm text-slate-300 transition hover:bg-white/20"
              title="Rewind 15s"
            >
              ⏪ 15s
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-2xl text-slate-950 shadow-lg shadow-amber-400/30 transition hover:scale-105 active:scale-95"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            <button
              type="button"
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime += 15;
              }}
              className="rounded-full bg-white/10 p-2 text-sm text-slate-300 transition hover:bg-white/20"
              title="Fast Forward 15s"
            >
              15s ⏩
            </button>
          </div>

          {/* Add to Cart quick button */}
          <button
            type="button"
            onClick={() => addToCart(activeAudioBook)}
            className="rounded-full bg-white/10 p-2.5 text-sm text-amber-300 transition hover:bg-white/20"
            title="Save to Cart"
          >
            🛒+
          </button>
        </div>

        {/* Volume slider */}
        <div className="mt-5 flex items-center gap-3 rounded-xl bg-white/5 px-4 py-2">
          <span className="text-xs text-slate-400">Volume</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-amber-400"
            aria-label="Audio volume"
          />
        </div>
      </div>
    </div>
  );
}
