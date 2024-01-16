import "./app-list.css";

const AppList = ({ children }) => {
  return (
    <section className="app-list">
      <div className="app-list-container">{children}</div>
    </section>
  );
};

export default AppList;
