<script lang="ts">
  import { onMount } from "svelte";
  import {
    activeTrackId,
    isLoadingTrack,
    playbackState,
    userPlayIntent,
  } from "@stores/player";

  interface PlaybackUpdate {
    playingURI: string;
    isPaused: boolean;
    isBuffering: boolean;
    duration: number;
    position: number;
  }

  let scriptLoaded = $state(false);
  let containerEl: HTMLDivElement | undefined = $state();

  const resetPlaybackState = () => {
    playbackState.set({
      position: 0,
      duration: 0,
    });
  };

  onMount(() => {
    if (!scriptLoaded) {
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      script.onload = () => { scriptLoaded = true; };
      document.head.appendChild(script);
    }

    const initPlayer = (IFrameAPI: any) => {
      IFrameAPI.createController(
        containerEl,
        { width: "100%", height: 0 },
        (EmbedController: any) => {
          EmbedController.addListener(
            "playback_update",
            (e: { data: PlaybackUpdate }) => {
              playbackState.set({
                position: e.data.position,
                duration: e.data.duration,
              });
            },
          );

          EmbedController.addListener("playback_started", () => {
            isLoadingTrack.set(false);
          });

          window.addEventListener("spotify:play", (e: Event) => {
            const { trackId } = (e as CustomEvent<{ trackId: string }>).detail;

            userPlayIntent.set(true);

            if (trackId !== $activeTrackId) {
              resetPlaybackState();
              isLoadingTrack.set(true);
              EmbedController.loadUri(`spotify:track:${trackId}`);
              activeTrackId.set(trackId);
              EmbedController.play();
            } else {
              EmbedController.resume();
            }
          });

          window.addEventListener("spotify:pause", () => {
            userPlayIntent.set(false);
            EmbedController.pause();
          });
        },
      );
    };

    if ((window as any).SpotifyIframeAPI) {
      initPlayer((window as any).SpotifyIframeAPI);
    } else {
      (window as any).onSpotifyIframeApiReady = initPlayer;
    }
  });
</script>

<div id="iframe-container">
  <div bind:this={containerEl} aria-hidden="true"></div>
</div>

<style>
  #iframe-container {
    background-color: transparent;
    position: fixed;
    top: 75px; /* navbar height */
    right: 0;
    pointer-events: none;
    height: 1px;
  }
</style>
