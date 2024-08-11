import { useState } from "react";
import RingLoader from "react-spinners/RingLoader";
const override = {
  display: "block",
  margin: "auto",
  borderColor: "BLACK",
};

function Loader() {
  let [color, setColor] = useState("#1bbbff");

  return (
    <div
      className="sweet-loading"
      style={{
        paddingTop: "20%",
        paddingBottom: "20%",
      }}
    >
      <RingLoader
        color={color}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
