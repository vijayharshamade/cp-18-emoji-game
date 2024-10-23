import "./index.css";

const EmojiCard = (props) => {
  const { emojiDetails, clickEmoji } = props;
  const { id, emojiName, emojiUrl } = emojiDetails;
  const onClickEmojiCard = () => {
    clickEmoji(id);
  };
  return (
    <>
      <li className="emoji-item">
        <button type="button" className="emoji-btn">
          <img
            className="emoji-icon"
            src={emojiUrl}
            alt={emojiName}
            onClick={onClickEmojiCard}
          />
        </button>
      </li>
    </>
  );
};

export default EmojiCard;
