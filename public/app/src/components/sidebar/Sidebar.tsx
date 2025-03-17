
import { 
  FileCode, 
  Search, 
  ChevronDown, 
  Edit, 
  MessageSquare, 
  Sparkles, 
  Settings, 
  BugIcon, 
  Crown, 
  PanelLeft
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  username: string;
}

export const Sidebar = ({ username }: SidebarProps) => {
  const [journalsOpen, setJournalsOpen] = useState(true);
  const [spacesOpen, setSpacesOpen] = useState(true);

  return (
    <aside className="bg-sidebar min-w-[250px] h-full border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-medium text-gray-700">Hi, {username}</h2>
          <div className="flex gap-3">
            <button className="text-sidebar-icon hover:text-gray-800 transition-colors">
              <MessageSquare size={18} />
            </button>
            <button className="text-sidebar-icon hover:text-gray-800 transition-colors">
              <Edit size={18} />
            </button>
          </div>
        </div>

        <div className="sidebar-item mb-1">
          <FileCode size={16} />
          <span>Praxis</span>
          <PanelLeft size={14} className="ml-auto" />
        </div>
        
        <div className="sidebar-item mb-1">
          <Edit size={16} />
          <span>Open Canvas</span>
        </div>
        
        <div className="sidebar-item mb-6">
          <Search size={16} />
          <span>Search</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="sidebar-section">
          <div 
            className="sidebar-header cursor-pointer"
            onClick={() => setJournalsOpen(!journalsOpen)}
          >
            <span>JOURNALS</span>
            <ChevronDown size={16} className={`transition-transform ${journalsOpen ? "" : "-rotate-90"}`} />
          </div>
          {journalsOpen && (
            <div className="mt-1">
              {[1, 2, 3].map((_, i) => (
                <div className="sidebar-item" key={`journal-${i}`}>
                  <Edit size={16} />
                  <span>Untitled</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sidebar-section">
          <div 
            className="sidebar-header cursor-pointer"
            onClick={() => setSpacesOpen(!spacesOpen)}
          >
            <span>SPACES</span>
            <ChevronDown size={16} className={`transition-transform ${spacesOpen ? "" : "-rotate-90"}`} />
          </div>
          {spacesOpen && (
            <div className="mt-1">
              <div className="sidebar-item active">
                <MessageSquare size={16} />
                <span>hu</span>
              </div>
              <div className="sidebar-item">
                <MessageSquare size={16} />
                <span>test</span>
              </div>
              <div className="sidebar-item">
                <MessageSquare size={16} />
                <span>hey</span>
              </div>
              <div className="sidebar-item">
                <MessageSquare size={16} />
                <span>hellow d</span>
              </div>
              <div className="sidebar-item">
                <MessageSquare size={16} />
                <span>test</span>
              </div>
              <div className="sidebar-item active">
                <MessageSquare size={16} />
                <span>chellow</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-2 mt-auto">
        <div className="sidebar-item">
          <Crown size={16} />
          <span>Get Premium</span>
        </div>
        <div className="sidebar-item">
          <Settings size={16} />
          <span>Settings</span>
        </div>
        <div className="sidebar-item">
          <BugIcon size={16} />
          <span>Report Bug</span>
        </div>
      </div>
    </aside>
  );
};
