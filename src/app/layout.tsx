import QueryClientProvider from "@/components/queryClient/QueryClientProvider";
import { ChatProvider } from "@/context/ChatContext";
import { ThemeProvider } from "@/context/ThemeContext";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Chat System — Realtime Messaging",
    template: "%s · Chat System",
  },
  description:
    "Production-style realtime chat: direct and group conversations, live delivery over socket.io, optimistic sends, emoji reactions, and full group administration.",
  applicationName: "Chat System",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1F5F9" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0E14" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <QueryClientProvider>
          <ThemeProvider>
            <ChatProvider>{children}</ChatProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
