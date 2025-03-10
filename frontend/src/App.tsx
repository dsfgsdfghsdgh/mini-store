import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { RootLayout } from "./layout/MainLayout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          
        </Route>
      </Routes>
    </>
  );
}

export default App;
