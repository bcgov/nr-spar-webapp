import React, { useState } from 'react';

import {
  Tooltip,
  Row,
  Column,
  Loading
} from '@carbon/react';
import { Information } from '@carbon/icons-react';

import Card from '../Card/FavouriteCard';
import EmptySection from '../EmptySection';
import Subtitle from '../Subtitle';

import CardType from '../../types/Card';

import api from '../../api-service/api';
import ApiConfig from '../../api-service/ApiConfig';

import './styles.scss';

const FavouriteActivities = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getCards = () => {
    const url = ApiConfig.favouriteActivities;
    api.get(url)
      .then((response) => {
        console.log(response);
        const newCards = response.data.favourites || response.data;
        newCards.forEach((item: CardType, i: number) => {
          const card = item;
          if (card.highlighted) {
            newCards.splice(i, 1);
            newCards.unshift(item);
          }
        });
        setCards(newCards);
        setLoading(false);
      })
      .catch((error) => {
        setCards([]);
        setLoading(false);
        // eslint-disable-next-line
        console.error(`Error: ${error}`);
      });
  };

  const updateCards = (index: string, card: CardType) => {
    const url = `${ApiConfig.favouriteActivities}/${index}`;
    api.put(url, card)
      .then(() => {
        getCards();
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(`Error: ${error}`);
      });
  };

  if (cards.length === 0) {
    getCards();
  }

  // useEffect(() => {
  //   getCards();
  //   setInterval(() => {
  //     getCards();
  //   }, 3 * 60 * 1000);
  // }, []);

  const highlightFunction = (index: number) => {
    const target = cards[index];

    if (target.highlighted === false) {
      // We need to remove the current highlighted card
      // if it exists, so we can submit new highlighted one
      cards.forEach((item: CardType) => {
        const card = item;
        if (card.highlighted && card.id !== target.id) {
          card.highlighted = false;
          updateCards(card.id, card);
        }
      });
      target.highlighted = true;
    } else {
      target.highlighted = false;
    }

    updateCards(target.id, target);
  };

  const deleteCard = (index: string) => {
    const url = `${ApiConfig.favouriteActivities}/${index}`;
    api.delete(url)
      .then(() => {
        getCards();
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(`Error: ${error}`);
      });
  };

  return (
    <Row className="favourite-activities">
      <Column lg={4} className="favourite-activities-title">
        <h2>My favourite activities</h2>
        <Subtitle text="Quick access to your favourite activities." className="favourite-activities-subtitle" />
        <Tooltip
          className="favourite-activity-tooltip"
          align="top"
          label="You can add a shortcut to your favourite activity by clicking on the heart icon inside each page."
        >
          <button className="tooltip-button" type="button">
            <Information />
          </button>
        </Tooltip>
      </Column>
      <Column lg={12} className="favourite-activities-cards">
        <Row>
          {loading && <Loading withOverlay={false} />}
          {
            ((cards.length === 0) ? (
              <EmptySection
                icon="Application"
                title="You don't have any favourites to show yet!"
                description="You can favourite your most used activities by clicking on the heart icon
                inside each page"
              />
            ) : cards.map((card) => (
              <Card
                key={card.id}
                icon={card.image}
                header={card.header}
                description={card.description}
                highlighted={card.highlighted}
                highlightFunction={() => { highlightFunction(Number(card.id)); }}
                deleteFunction={() => { deleteCard(card.id); }}
                link={card.link}
              />
            )))
          }
        </Row>
      </Column>
    </Row>
  );
};

export default FavouriteActivities;
