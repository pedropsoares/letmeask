import { QuestionProps } from "../../types/questionsProps.type";

import cx from "classnames";

import "./styles.scss";

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) {
  return (
    <div
      className={cx(
        "question",
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered },
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
