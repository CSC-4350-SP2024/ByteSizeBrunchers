import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';

const Card = () => {
  const [cards, setCards] = useState([
    {
      id: '1',
      title: 'Delicious Pasta',
      ingredients: ['Pasta', 'Tomato Sauce', 'Garlic', 'Basil', 'Olive Oil'],
      instructions: 'Boil the pasta. In a separate pan, sauté garlic in olive oil, add tomato sauce and basil. Mix the cooked pasta into the sauce.'
    },
    {
    id: '2',
    title: 'Hearty Vegetable Soup',
    ingredients: ['Carrots', 'Potatoes', 'Onions', 'Garlic', 'Vegetable Broth', 'Salt', 'Pepper'],
    instructions: 'Chop all the vegetables into bite-sized pieces. In a large pot, sauté onions and garlic until translucent. Add the rest of the vegetables, broth, salt, and pepper. Simmer until vegetables are tender.'
    }

  ]); 

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
  console.log(myIdentifier + ' left the screen');
  setCards(cards => cards.filter(card => card.id !== myIdentifier));
  };
return (
  <div style={{backgroundColor: '#555555', position: 'relative'}}>
    {cards.map((card) => (
      <TinderCard 
        key={card.id} 
        onSwipe={onSwipe} 
        onCardLeftScreen={() => onCardLeftScreen(card.id)} 
        preventSwipe={['up', 'down']}
      >
        <div style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'white'}}>
          <h2>{card.title}</h2>
          <h3>Ingredients:</h3>
          <ul>
            {card.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
          </ul>
          <h3>Instructions:</h3>
          <p>{card.instructions}</p>
        </div>
      </TinderCard>
    ))}
  </div>
);
}

export default Card;