import Footer from "@/components/app-ui/Footer";
import Header from "@/components/app-ui/Header";
import { productService } from "@/store/features/productSlice";
import { useAppDispatch } from "@/store/store";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export function RootLayout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(productService());
  }, [dispatch]);

  return (
    <main>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </main>
  );
}
