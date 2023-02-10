import React from 'react';
import axios from 'axios';

import { Tooltip, Row, Column } from '@carbon/react';
import { Information } from '@carbon/icons-react';

import Card from '../Card/FavoriteCard';
import EmptySection from '../EmptySection';
import Subtitle from '../Subtitle';

import CardType from '../../types/Card';

import './styles.scss';

const FavouriteActivities = () => {
  const [cards, setCards] = React.useState<CardType[]>([]);

  const getCards = () => {
    axios.get('/mock-api/favorite-activities')
      .then((response) => {
        const newCards = response.data.favorites;
        newCards.forEach((item: CardType, i: number) => {
          const card = item;
          if (card.highlighted) {
            newCards.splice(i, 1);
            newCards.unshift(item);
          }
        });
        setCards(newCards);
      })
      .catch((error) => {
        setCards([]);
        // eslint-disable-next-line
        console.error(`Error: ${error}`);
      });
  };

  const updateCards = (index: number, card: CardType) => {
    axios.put(`/mock-api/favorite-activities/up/${index}`, card)
      .catch((error) => {
        // eslint-disable-next-line
        console.error(`Error: ${error}`);
      });
  };

  React.useEffect(() => {
    getCards();
  }, []);

  const highlightFunction = (index: number) => {
    const target = cards[index];

    // We need to remove the current highlighted card
    // if it exists, so we can submit new highlighted one
    cards.forEach((item: CardType, i: number) => {
      const card = item;
      if (card.highlighted && card.id !== target.id) {
        card.highlighted = false;
        updateCards(i, card);
      }
    });

    if (target.highlighted === false) {
      target.highlighted = true;
    } else {
      target.highlighted = false;
    }
    updateCards(index, target);
    getCards();
  };

  const deleteCard = (index:number) => {
    axios.delete(`/mock-api/favorite-activities/del/${index}`)
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
          label="You can add a shortcut to your favourite activity by clicking on the hearth icon inside each page."
        >
          <button className="tooltip-button" type="button">
            <Information />
          </button>
        </Tooltip>
      </Column>
      <Column lg={12} className="favourite-activities-cards">
        <Row>
          {(cards.length === 0) && (
            <EmptySection
              icon="Application"
              title="You don't have any favourites to show yet!"
              description="You can favourite your most used activities by clicking on the heart icon
              inside each page"
            />
          )}
          {cards.map((card, index) => (
            <Card
              key={card.id}
              icon={card.image}
              header={card.header}
              description={card.description}
              highlighted={card.highlighted}
              highlightFunction={() => { highlightFunction(index); }}
              deleteFunction={() => { deleteCard(index); }}
            />
          ))}
        </Row>
      </Column>
    </Row>
  );
};

export default FavouriteActivities;
