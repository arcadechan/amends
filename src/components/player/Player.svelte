<script lang="ts">
  import {
    activeTrackId,
    isLoadingTrack,
    playback,
    userPlayIntent,
  } from "../../stores/player";
  import "../../styles/comic-halfpoint.scss";

  interface Props {
    trackId: string;
    trackName: string;
    trackArtist: string;
    albumArtData?: {
      title: string;
      asset: {
        src: string;
        width: string;
        height: string;
        format: string;
      };
    };
    platformLinks?: {
      spotify?: string;
      youtube?: string;
      appleMusic?: string;
      deezer?: string;
      bandcamp?: string;
      soundcloud?: string;
    };
  }

  let { trackId, trackName, trackArtist, albumArtData, platformLinks }: Props =
    $props();

  let isActive = $derived($activeTrackId === trackId);
  let isPlaying = $derived(isActive && $userPlayIntent && !$isLoadingTrack);
  let isBuffering = $derived(isActive && $isLoadingTrack);

  function formatTime(ms: number): string {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, "0")}`;
  }

  function handlePlay() {
    window.dispatchEvent(
      new CustomEvent("spotify:play", { detail: { trackId } }),
    );
  }

  function handlePause() {
    window.dispatchEvent(new CustomEvent("spotify:pause"));
  }

  function platformToLabel(platform: string) {
    switch (platform) {
      case "spotify":
        return "Spotify";
      case "youtube":
        return "Youtube";
      case "appleMusic":
        return "Apple Music";
      case "deezer":
        return "Deezer";
      case "bandcamp":
        return "Bandcamp";
      case "soundcloud":
        return "SoundCloud";
      default:
        return platform;
    }
  }
</script>

<div class="player" role="region" aria-label="Music player">
  {#if albumArtData}
    <div class="player--album-art">
      <img
        src={albumArtData.asset.src}
        alt=""
        width={125}
        height={125}
        loading="lazy"
      />
    </div>
  {/if}
  <div class="player--main">
    <p class="player--track-name">{trackName}</p>
    <p class="player--track-artist">{trackArtist}</p>

    <div class="player--seek-bar">
      <div
        class="player--seek-bar-progress"
        style="width: {isActive
          ? ($playback.position / $playback.duration) * 100
          : 0}%"
      ></div>
    </div>

    <div class="player--control-and-meta">
      {#if isActive}
        <button
          class="player--toggle-btn"
          onclick={isPlaying ? handlePause : handlePlay}
          disabled={isBuffering}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {#if isBuffering}
            <img
              src="/icons/loading.svg"
              alt=""
              width={30}
              height={30}
              loading="lazy"
            />
          {:else if isPlaying}
            <img
              src="/icons/pause.png"
              alt=""
              width={30}
              height={30}
              loading="lazy"
            />
          {:else}
            <img
              src="/icons/play.svg"
              alt=""
              width={30}
              height={30}
              loading="lazy"
            />
          {/if}
        </button>

        <div class="player--time">
          <span
            >{formatTime($playback.position)} &sol; {formatTime(
              $playback.duration,
            )}</span
          >
        </div>
      {:else}
        <button
          class="player--toggle-btn"
          onclick={handlePlay}
          aria-label="Play"
        >
          <img
            src="/icons/play.svg"
            alt=""
            width={30}
            height={30}
            loading="lazy"
          />
        </button>
      {/if}
    </div>
  </div>
</div>

<div class="platform-links">
  <div class="platform-links--container">
    {#each Object.entries(platformLinks ?? {}) as [platform, link]}
      <a
        href={link}
        target="_blank"
        class="platform-links--link"
        title={`Listen on: ${platformToLabel(platform)}`}
      >
        <img
          src={`/icons/${platform}.png`}
          alt=""
          width={40}
          height={40}
          loading="lazy"
        />
        <span class="sr-only">
          {platform}
        </span>
      </a>
    {/each}
  </div>
</div>

<style lang="scss">
  :global(html.comic) {
    .player {
      border: 3px solid black;
      border-radius: 0px;
      position: relative;

      &--album-art {
        border-right: 3px solid black;
      }
    }
  }

  .player {
    display: flex;
    background-color: var(--player-background);
    border-radius: 50px var(--element-radius) var(--element-radius) 50px;
    box-shadow: var(--box-shadow);
    margin: 20px auto;
    width: 100%;
    max-width: 311px;

    &--album-art {
      height: auto;
      width: 133px;
      min-width: 125px;
      min-height: 125px;
      display: block;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--element-radius);
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
      }
    }

    &--main {
      display: flex;
      flex-direction: column;
      padding: 8px;
      width: 100%;
    }

    &--track-artist,
    &--track-name {
      line-height: 1;
      margin-top: 0;
      margin-bottom: 5px;
      color: var(--player-text);
    }

    &--track-name {
      font-size: 16px;
      font-weight: bold;
    }

    &--track-artist {
      font-size: 12px;
    }

    &--seek-bar {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.35);
      height: 7px;
      border-radius: var(--button-radius);
      margin-bottom: 10px;
      margin-top: auto;

      &-progress {
        background-color: black;
        height: 100%;
        width: 0;
        border-radius: var(--button-radius);
      }
    }

    &--control-and-meta {
      display: flex;
      align-items: center;
      gap: 20px;
      position: relative;
      height: 35px;
    }

    &--toggle-btn {
      background-color: transparent;
      border: none;
      padding: 0;
      cursor: pointer;
      height: auto;
      margin: 0;
      width: 25px;
      height: 25px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &--time {
      position: absolute;
      right: 0;
      margin-bottom: 0;
      font-size: 12px;
      color: var(--player-text);

      span {
        line-height: 1;
      }
    }

    @include screen("md") {
      max-width: 400px;

      &--track-name {
        font-size: 25px;
      }

      &--track-artist {
        font-size: 14px;
      }

      &--control-and-meta {
        justify-content: center;
      }

      &--toggle-btn {
        width: 30px;
        height: 30px;
      }
    }
  }

  .platform-links {
    display: flex;
    justify-content: center;

    &--container {
      display: flex;
      gap: 15px;
      justify-content: center;
      background-color: var(--player-background);
      margin: 0 auto;
      width: auto;
      padding: 6px;
      border-radius: var(--element-radius);
      box-shadow: var(--box-shadow);
    }

    &--link {
      text-decoration: none;
      width: 25px;
      height: 25px;

      img {
        width: 100%;
        height: 100%;
      }

      &:hover {
        transform: scale(1.15);
      }
    }
  }
</style>
