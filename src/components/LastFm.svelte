<script lang="ts">
  import { onMount } from "svelte";
  import type { LastFmTrack, LastFmRecentTracksResponse } from "@type/lastfm";

  interface Props {
    apiKey: string;
  }

  const { apiKey }: Props = $props();
  let recentTrack: LastFmTrack | null = $state(null);

  const CACHE_KEY = "lastfm_recent_track";
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  function getCached(): LastFmTrack | null {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    try {
      const { data } = JSON.parse(cached);
      return data as LastFmTrack;
    } catch {
      return null;
    }
  }

  function setCache(data: LastFmTrack) {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data }),
    );
  }

  function timeAgo(timestamp: string): string {
    const seconds = Math.floor(Date.now() / 1000) - parseInt(timestamp);

    if (seconds < 30) return "just now";
    if (seconds < 90) return "a minute ago";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 5400) return "an hour ago"; // up to 1.5 hours
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 172800) return "yesterday";
    return `${Math.floor(seconds / 86400)} days ago`;
  }

  onMount(async () => {
    const cached = getCached();
    const cachedTimestamp = cached
      ? JSON.parse(localStorage.getItem(CACHE_KEY) ?? "{}").timestamp
      : null;

    if (cached && cachedTimestamp && Date.now() - cachedTimestamp < CACHE_DURATION) {
      recentTrack = cached;
      return;
    }

    const user = "Arcade-Chan";

    const url = new URL("https://ws.audioscrobbler.com/2.0");
    url.searchParams.append("method", "user.getrecenttracks");
    url.searchParams.append("user", user);
    url.searchParams.append("limit", "1");
    url.searchParams.append("api_key", apiKey);
    url.searchParams.append("format", "json");

    try {
      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: LastFmRecentTracksResponse = await res.json();

      if (data?.recenttracks?.track && data.recenttracks.track.length > 0) {
        recentTrack = data.recenttracks.track[0];
        setCache(recentTrack);
      }
    } catch {
      const stale = getCached();
      if (stale) recentTrack = stale;
    }
  });
</script>

{#if recentTrack}
  <a href={recentTrack.url} target="_blank">
    <div class="last-fm">
      <div class="last-fm--inner-container">
        <div class="last-fm--album-art">
          <img
            src={recentTrack.image[2]["#text"]}
            alt=""
            aria-hidden="true"
            width={64}
            height={64}
            loading="lazy"
          />
        </div>
        <div class="last-fm--track-info">
          <p>
            {#if recentTrack["@attr"]?.nowplaying === "true"}
              <span>Listening to:</span>
            {:else}
              <span>Last listened to:</span>
            {/if}
            <span class="last-fm--info">
              &ldquo;{recentTrack.name}&rdquo;
            </span>
            by
            <span class="last-fm--info">
              &ldquo;{recentTrack.artist["#text"]}&rdquo;
            </span>
            as heard on
            <span class="last-fm--info">
              &ldquo;{recentTrack.album["#text"]}&rdquo;
            </span>
            {#if !recentTrack.hasOwnProperty("@attr")}
              <span>&lpar;{timeAgo(recentTrack.date.uts)}&rpar;</span>
            {/if}
          </p>
        </div>
      </div>
    </div>
  </a>
{/if}

<style lang="scss">
  a {
    display: block;
    background-color: var(--color-banner-background);
    color: var(--color-banner-text);
    text-decoration-color: var(--color-banner-text);
    border-radius: 0px;
    font-weight: 400;

    &:visited {
      color: var(--color-banner-text);
    }

    &:hover {
      background-color: var(--color-banner-text);
      color: var(--color-banner-background);
      text-decoration-color: var(--color-banner-background);
    }
  }

  .last-fm {
    &--inner-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      max-width: 954px;
      padding: 8px;
      margin: 0 auto;
    }

    &--album-art {
      width: 25px;
      height: 25px;
      min-width: 25px;
      min-height: 25px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &--track-info {
      font-size: 12px;

      p {
        margin: 0;
      }
    }

    &--info {
      font-weight: bold;
    }

    @include screen("md") {
      &--inner-container {
        gap: 20px;
      }
    }
  }
</style>
