import React, { useState, useMemo, useRef } from 'react';
import { staticRecipes } from './recipes';
import TinderCard from 'react-tinder-card';
import styles from '../../styles/Home.module.css';

const Card = () => {
  const [currentIndex, setCurrentIndex] = useState(staticRecipes.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(() =>
    Array(staticRecipes.length)
      .fill(0)
      .map(() => React.createRef()), 
    [] //dependencies array, useMemo will only recompute the memoized value when one of these dependencies has changed. In this case, it's empty, meaning it computes once.
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < staticRecipes.length - 1;
  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    //TODO: when quickly swipe and restore multiple times the same card,
    //it happens multiple outOfFrame events are queued and the card disappear
    //during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < staticRecipes.length) {
      await childRefs[currentIndex].current.swipe(dir); //swipe the card
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

return (
  <div>
  <div className={styles.cardContainer}>
    {staticRecipes.map((recipe, index) => (
      <TinderCard 
        ref={childRefs[index]}
        className='swipe'
        key={recipe.id}
        onSwipe={(dir) => swiped(dir, recipe.name, index)}
        onCardLeftScreen={() => outOfFrame(recipe.name, index)}
      >3
        <div className={styles.card}>
          <h2>{recipe.title}</h2>
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
          </ul>
          <h3>Instructions:</h3>
          <p>{recipe.instructions}</p>
        </div>
      </TinderCard>
    ))}
  </div>
  </div>
);
}

export default Card;