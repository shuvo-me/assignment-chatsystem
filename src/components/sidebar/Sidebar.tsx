"use client";
import { useChat } from "@/context/ChatContext";
import ConversationList from "./ConversationList";
import ConversationSearch from "./ConversationSearch";
import { SidebarHeader } from "./SidebarHeader";

const Sidebar = () => {
  const { activeConversation } = useChat();
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
    </section>
  );
};

export default Sidebar;
