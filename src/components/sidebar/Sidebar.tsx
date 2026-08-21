"use client";
import { LogOut } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import ConversationList from "./ConversationList";
import ConversationSearch from "./ConversationSearch";
import { SidebarHeader } from "./SidebarHeader";

const Sidebar = () => {
  const { activeConversation, logout } = useChat();
  return (
    <section
      aria-label="Conversations"
      className={`w-full md:w-80 lg:w-96 flex flex-col bg-white dark:bg-[#151921] border-r border-slate-200 dark:border-[#1E293B] flex-shrink-0 transition-all ${
        activeConversation ? "hidden md:flex" : "flex"
      }`}
    >
      <SidebarHeader />
      <ConversationSearch />
      <ConversationList />
      <div className="flex-shrink-0 border-t border-slate-200 dark:border-[#1E293B] p-3">
        <button
          id="btn-sign-out"
          onClick={() => logout()}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-500/20 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </section>
  );
};

export default Sidebar;
