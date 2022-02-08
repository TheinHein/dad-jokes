import "./App.css";
import Jokes from "./Jokes";
import { LayoutMeasuringStrategy } from "@dnd-kit/core";
const layoutMeasuringConfig = {
  strategy: LayoutMeasuringStrategy.Always,
};
function App() {
  return (
    <div className="App">
      <Jokes />
    </div>
  );
}

export default App;
