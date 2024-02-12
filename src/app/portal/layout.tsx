"use client";
import Sidebar from "./sidebar";
import Header from "./header";
import { useSidebar } from "../providers/Sidebarserviceprovider";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarStateOpen } = useSidebar();
  const { mini, full } = sidebarStateOpen;

  return (
    <main className="flex overflow-hidden">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{ maxWidth: "100%" }}
        toastOptions={{
          // Define default options
          className: "truncate pr-4 text-sm",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 4000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 6000,
            theme: {
              primary: "red",
              secondary: "black",
            },
          },
        }}
      />
      {/* Sidebar starts here */}
      <Sidebar />
      {/* Main  section here */}
      <main
        className={`flex flex-col w-full grow transition-none ${
          mini
            ? "md:w-[calc(100vw-var(--sidebar-mini-width))]"
            : "md:w-[calc(100vw-var(--sidebar-width))]"
        }`}
      >
        {/* Main  section header */}
        <Header />
        <section
          id="outlet"
          className="h-[calc(100vh-var(--header-height))] bg-[#f5e9eb78] pb-4 overflow-y-scroll overflow-x-hidden "
        >
          {children}
        </section>
      </main>
    </main>
  );
}
