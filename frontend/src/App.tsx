import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { RootLayout } from "./layout/MainLayout";
import NotFound from "./pages/NotFound";
import Category from "./pages/Category";
import ProductById from "./pages/ProductById";
import Products from "./pages/Product";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<ProductById />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
