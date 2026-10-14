import { useState } from "react";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  function handleClick() {
    setIsDark((prevIsDark) => !prevIsDark);
  }

  return (
    <section className={isDark ? "bg-dark" : "bg-light"}>
      <button onClick={handleClick}>
        {isDark ? "Black Theme" : "White Theme"}
      </button>
      <section className="content">
        <h1>
          Welcome To A <br /> Spoon Project ...
        </h1>
      </section>
    </section>
  );
}