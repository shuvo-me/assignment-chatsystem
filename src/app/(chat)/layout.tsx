import Sidebar from "@/components/sidebar/Sidebar";

export default function ChatLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="h-screen w-screen flex flex-col bg-slate-100 dark:bg-[#0B0E14] text-slate-900 dark:text-[#E2E8F0] overflow-hidden font-sans transition-colors duration-150">
      {/* Main App Container */}
      <main className="flex-1 flex overflow-hidden p-0 sm:p-2 md:p-3 lg:p-4 max-w-[1600px] w-full mx-auto">
        <div className="flex-1 flex bg-white dark:bg-[#151921] sm:rounded-2xl sm:shadow-xl sm:border sm:border-slate-200 dark:sm:border-[#1E293B] overflow-hidden relative">
          {/* Left Sidebar (Conversations) */}
          <Sidebar />
          {children}
        </div>
      </main>
    </div>
  );
}
