import { useEffect, useRef, useState } from "react";
import "./App.css";

interface Tab {
  label: string;
}

interface IndicatorStyle {
  left: number;
  width: number;
}

interface TabProps {
  tab: Tab;
  index: number;
  isActive: boolean;
  onClick: () => void;
  ref: (el: HTMLLIElement | null) => void;
}

const TABS: Tab[] = [
  { label: "Home" },
  { label: "About" },
  { label: "Contact" },
  { label: "Very long tab name" },

];

const TabItem = ({
  tab,
  index,
  isActive,
  onClick,
  ref,
}: TabProps) => (
  <li
    key={index}
    ref={ref}
    role="tab"
    aria-selected={isActive}
    aria-controls={`tab-panel-${index}`}
    tabIndex={isActive ? 0 : -1}
    className="relative"
    onClick={onClick}
  >
    <div
      className={`
        block px-4 py-2 
        transition-colors duration-200 
        cursor-pointer
        ${isActive 
          ? "text-gray" 
          : "hover:text-gray-600 hover:bg-gray-50 rounded-md"
        }
      `}
    >
      {tab.label}
    </div>
  </li>
);

function App() {
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({ left: 0, width: 0 });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const activeTabElement = tabsRef.current[activeTab];
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="relative">
      <ul
        className="flex space-x-2 text-sm font-bold"
        role="tablist"
      >
        {TABS.map((tab, index) => (
          <TabItem
            key={index}
            tab={tab}
            index={index}
            isActive={activeTab === index}
            onClick={() => setActiveTab(index)}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
          />
        ))}
      </ul>

      <div
        className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }}
      />
    </div>
  );
}

export default App;
