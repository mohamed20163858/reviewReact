import { useState } from "react";
const Header = ({ title }) => {
  return <h1>{title}</h1>;
};
const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};
const GivenFeedback = ({
  handleGoodClick,
  handleNeutralClick,
  handleBadClick,
}) => {
  return (
    <div>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
    </div>
  );
};
const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header title="give feedback" />
      <GivenFeedback
        handleGoodClick={() => setGood(good + 1)}
        handleNeutralClick={() => setNeutral(neutral + 1)}
        handleBadClick={() => setBad(bad + 1)}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
