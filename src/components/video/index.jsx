/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import css from './video.css';
import videoSource from '../../images/2213.webm';

function PlayPause(props) {
  const { state } = props;
  return (
    <div
      className={
        css['video-button'] +
        ' ' +
        (state ? css['button-pause'] : css['button-play'])
      }
    />
  );
}

PlayPause.propTypes = {
  state: PropTypes.bool,
};

function Video() {
  const [playing, setPlaying] = React.useState(true);
  const videoRef = React.useRef(null);

  const onButtonClick = () => {
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
    setPlaying(!playing);
  };

  React.useEffect(() => {
    videoRef.current.play();
    videoRef.current.addEventListener('click', onButtonClick);
  }, []);

  return (
    <div className={css['video-container']}>
      <div className={css['video-div']}>
        <video
          ref={videoRef}
          className={css['video-div']}
          id="myvideo"
          src={videoSource}
          type="video/webm"
          autoPlay=""
          loop=""
          muted=""
        />
        <PlayPause state={playing} />
      </div>
    </div>
  );
}

export default Video;
