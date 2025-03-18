import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { RootLayout } from "./components/layout/MainLayout";
import NotFound from "./pages/NotFound";
import Category from "./pages/Category";
import ProductById from "./pages/ProductById";
import Products from "./pages/Product";
import SignUp from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import { CheckAuth } from "./components/layout/CheckAuth";
import { useAppDispatch, useTypedSelector } from "./store/store";
import { useEffect } from "react";
import { checkAuth } from "./store/auth/authSlice";
import Loading from "./components/app-ui/Loading";
import Cart from "./pages/Cart";

function App() {
  const { isAuthenticated, isLoading } = useTypedSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Loading />;

  return (
    <Routes>
      {/* Protected Routes - Wrapped with CheckAuth */}
      <Route element={<CheckAuth isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="category/:id" element={<Category />} />
          <Route path="product" element={<Products />} />
          <Route path="product/:id" element={<ProductById />} />
          <Route path="cart" element={<Cart />} />


          {/* Public Routes */}
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
