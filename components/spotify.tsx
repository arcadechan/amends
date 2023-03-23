// import { useState, useEffect } from "react";

const Spotify = (props: any): JSX.Element =>
{
  return (
    <>
      <h4>{ props.spotifyCode }</h4>
      {!!props.previewUrl && (
        <audio controls src={props.previewUrl}></audio>
      )}
    </>
  )
}

export default Spotify