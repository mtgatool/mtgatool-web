/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { WrapperInner, WrapperOuter } from '../wrapper';
import keyArt from '../../images/key-art.jpg';
import css from './metagame.css';
import TopTitle from '../title';
import { ManaCost } from '../card-tile';

const METAGAME_URL = 'https://mtgatool.com/api/get_metagame.php';
const STATE_IDLE = 0;
const STATE_DOWNLOAD = 1;
const STATE_ERROR = 2;
/*
const EVENTS = [
  {
    name: 'Standard BO1',
    link: 'BO1',
  },
  {
    name: 'Standard BO3',
    link: 'BO3',
  },
  {
    name: 'Historic BO1',
    link: 'HBO1',
  },
  {
    name: 'Historic BO3',
    link: 'HBO3',
  },
];
*/
function Metagame(props) {
  const { setImage } = props;
  const [queryState, setQueryState] = React.useState(STATE_IDLE);
  const [metagameData, setMetagameDataa] = React.useState(null);

  const getMetagameData = () => {
    setQueryState(STATE_DOWNLOAD);
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        setQueryState(xhr.status);
      } else {
        try {
          const jsonData = JSON.parse(xhr.responseText);
          setMetagameDataa(jsonData);
          setQueryState(STATE_IDLE);
        } catch (e) {
          console.log(e);
          setQueryState(STATE_ERROR);
        }
      }
    };
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && queryState !== STATE_ERROR) {
        setQueryState(STATE_IDLE);
      }
    };
    xhr.open('GET', METAGAME_URL);
    xhr.send();
  };

  React.useEffect(() => {
    getMetagameData();
    setImage(keyArt);
  }, []);

  return (
    <WrapperOuter style={{ minHeight: 'calc(100vh - 5px)' }}>
      <TopTitle title={'Metagame (' + queryState + ')'} />
      <WrapperInner>
        <div className={css['metagame-div']}>
          {metagameData && metagameData.meta ? (
            metagameData.meta.map((arch, index) => {
              return <Archetype key={arch.name + index} arch={arch} />;
            })
          ) : (
            <></>
          )}
        </div>
      </WrapperInner>
    </WrapperOuter>
  );
}

function Archetype(props) {
  const { arch } = props;

  const cardImage =
    'https://img.scryfall.com/cards/art_crop/front/8/a/8a81e889-490b-4aeb-8e84-ea9a390bb8fe.jpg?1572893192';
  const tileStyle = {
    backgroundImage: `url(${cardImage})`,
  };

  const winrate = ((arch.wins + arch.losses) / arch.total) * 100;
  return (
    <div className={css['archetype-div']}>
      <div className={css['archetype-tile']} style={tileStyle}></div>
      <div className={css['archetype-name']}>{arch.name}</div>
      <div className={css['archetype-colors']}>
        <ManaCost colors={arch.colors} />
      </div>
      <div className={css['archetype-desc']}>
        {winrate.toFixed(2) + '% winrate'}
      </div>
      <div className={css['archetype-desc']}>{arch.matches + ' matches'}</div>
    </div>
  );
}

export default Metagame;
