import React, { useState } from 'react';

import {
  Column,
  IconButton
} from '@carbon/react';
import { Favorite, FavoriteFilled } from '@carbon/icons-react';

import Subtitle from '../Subtitle';

import CardType from '../../types/Card';

import api from '../../api-service/api';
import ApiConfig from '../../api-service/ApiConfig';

import './styles.scss';

interface PageTitleProps {
  title: string;
  subtitle: string;
  favourite?: boolean;
  activity?: string;
}

const PageTitle = ({
  title,
  subtitle,
  favourite,
  activity
}: PageTitleProps) => {
  const [isFavouriteButtonPressed, setFavouriteButton] = useState(false);
  const [favouriteActivityId, setFavouriteActivityId] = useState('0');

  const getFavouriteActivities = () => {
    const url = ApiConfig.favouriteActivities;
    api.get(url)
      .then((response) => {
        const newCards = response.data.favourites || response.data;
        newCards.forEach((item: CardType) => {
          const card = item;
          if (card.activity === activity) {
            setFavouriteActivityId(card.id);
            setFavouriteButton(true);
          }
        });
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(`Error: ${error}`);
      });
  };

  getFavouriteActivities();

  const favoritePage = (pageActivity: string) => {
    const url = ApiConfig.favouriteActivities;
    const data = { activity: pageActivity };
    api.post(url, data)
      .then(() => {
        setFavouriteButton(true);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(`Error: ${error}`);
      });
  };

  const unfavoritePage = (index: string) => {
    const url = `${ApiConfig.favouriteActivities}/${index}`;
    api.delete(url)
      .then(() => {
        setFavouriteButton(false);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(`Error: ${error}`);
      });
  };

  return (
    <Column sm={4} md={4} className="title-section">
      <div className={favourite ? 'title-favourite' : 'title-no-favourite'}>
        <h1>{title}</h1>
        {favourite && (
          <IconButton
            kind="ghost"
            label={isFavouriteButtonPressed ? 'Unfavourite' : 'Favourite'}
            align="right"
            onClick={isFavouriteButtonPressed
              ? () => { unfavoritePage(favouriteActivityId); }
              : () => {
                if (activity) {
                  favoritePage(activity);
                }
              }}
          >
            {isFavouriteButtonPressed ? (<FavoriteFilled size={28} />) : (<Favorite size={28} />)}
          </IconButton>
        )}
      </div>
      <Subtitle text={subtitle} />
    </Column>
  );
};

export default PageTitle;
