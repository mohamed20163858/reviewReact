const Total = (props) => {
  return (
    <p style={{ fontWeight: "bold" }}>
      total of {props.parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
      exercises
    </p>
  );
};
export default Total;
