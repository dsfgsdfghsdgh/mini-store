import Footer from "@/components/app-ui/Footer";
import Header from "@/components/app-ui/Header";
import React from "react";
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
  return (
    <main>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </main>
  );
}
