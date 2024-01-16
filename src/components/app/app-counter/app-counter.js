import "./app-counter.css";

const AppCounter = ({ length }) => {
  return (
    <p className="app-counter">
      Task count: <span className="app-counter__length">{length}</span>
    </p>
  );
};

export default AppCounter;
