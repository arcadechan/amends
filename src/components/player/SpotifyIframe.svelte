<script lang="ts">
  import { onMount } from "svelte";
  import {
    activeTrackId,
    isLoadingTrack,
    playback,
    userPlayIntent,
  } from "@stores/player.ts";

  interface PlaybackUpdate {
    playingURI: string;
    isPaused: boolean;
    isBuffering: boolean;
    duration: number;
    position: number;
  }

  let containerEl: HTMLDivElement | undefined = $state();

  const resetPlaybackState = () => {
    playback.set({
      position: 0,
      duration: 0,
    });
  };

  onMount(() => {
    (window as any).onSpotifyIframeApiReady = (IFrameAPI: any) => {
      IFrameAPI.createController(
        containerEl,
        { width: "100%", height: 0 },
        (EmbedController: any) => {
          EmbedController.addListener(
            "playback_update",
            (e: { data: PlaybackUpdate }) => {
              playback.set({
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
  });
</script>

<div bind:this={containerEl} aria-hidden="true"></div>
