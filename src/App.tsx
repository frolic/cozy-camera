import GlobalFeed from "./GlobalFeed.tsx";
import ImageUpload from "./ImageUpload.tsx";
import { Settings } from "./Settings.tsx";

function App() {
  return (
    <div className="max-w-xl mx-auto space-y-8">
      <Settings />
      <ImageUpload />
      <GlobalFeed />
    </div>
  );
}

export default App;
