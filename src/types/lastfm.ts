export type LastFmTrack = {
    "@attr": {
        nowplaying: string;
    };
    album: {
        "#text": string;
        mbid: string;
    };
    artist: {
        "#text": string;
        mbid: string;
    };
    date: {
        "#text": string;
        uts: string;
    };
    image: {
        "#text": string;
        size: "small" | "medium" | "large" | "extralarge";
    }[];
    mbid: string;
    name: string;
    streamable: string;
    url: string;
};

export type LastFmRecentTracksResponse = {
    recenttracks?: {
        "@attr": {
        page: string;
        perPage: string;
        total: string;
        totalPages: string;
        user: string;
        };
        track?: LastFmTrack[];
    };
};