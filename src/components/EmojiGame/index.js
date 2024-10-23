import "./index.css";
import NavBar from "../NavBar";
import EmojiCard from "../EmojiCard";
import WinOrLoseCard from "../WinOrLoseCard";
import { useState } from "react";

const EmojiGame = (props) => {
  const { emojisList } = props;

  const [isGameInProgress, setIsGameInProgress] = useState(true);
  const [clickedEmojiList, setClickedEmojiList] = useState([]);
  const [topScore, setTopScore] = useState(0);

  // const clickEmoji = (id) => {
  //   emojisList.find((eachEmoji) => {
  //     if (eachEmoji.id === id) {
  //       setClickedEmojiList([...clickedEmojiList, eachEmoji]);
  //     }
  //   });
  // };
  // console.log(clickedEmojiList);'

  const resetGame = () => {
    setIsGameInProgress(true);
    setClickedEmojiList([]);
  };

  const renderScoreCard = () => {
    const isWon = clickedEmojiList.length === emojisList.length;
    return (
      <>
        <WinOrLoseCard
          isWon={isWon}
          onClickPlayAgain={resetGame}
          score={clickedEmojiList.length}
        />
      </>
    );
  };

  const finishGameAndSetTopScore = (currentScore) => {
    let newTopScore = topScore;

    if (currentScore > newTopScore) {
      newTopScore = currentScore;
    }
    setTopScore(newTopScore);
    setIsGameInProgress(false);
  };

  const clickEmoji = (id) => {
    const isEmojiPresent = clickedEmojiList.includes(id);
    const clickedEmojiListLength = clickedEmojiList.length;
    if (isEmojiPresent) {
      finishGameAndSetTopScore(clickedEmojiListLength);
    } else {
      if (emojisList.length - 1 === clickedEmojiListLength) {
        finishGameAndSetTopScore(emojisList.length);
      }
      setClickedEmojiList([...clickedEmojiList, id]);
    }
  };

  const getShuffledEmojiList = () => {
    return emojisList.sort(() => Math.random() - 0.5);
  };

  const renderEmojiList = () => {
    const shuffledEmojiList = getShuffledEmojiList();
    return (
      <>
        <ul className="emojis-list-container">
          {shuffledEmojiList.map((eachEmoji) => (
            <EmojiCard
              key={eachEmoji.id}
              emojiDetails={eachEmoji}
              clickEmoji={clickEmoji}
            />
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="app-container">
      <NavBar
        currentScore={clickedEmojiList.length}
        isGameInProgress={isGameInProgress}
        topScore={topScore}
      />
      <div className="emoji-game-body">
        {isGameInProgress ? renderEmojiList() : renderScoreCard()}
      </div>
    </div>
  );
};

export default EmojiGame;
