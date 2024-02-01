export const sections = ["intro", "cybertruck", "tesla", "action-button"];
import { useEffect, useState } from "react";
import './UI.css'

export const UI = ({ section, onSectionChange }) => {
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsInit(true);
    }, 2000);
  }, []);

  return (
    <main className="main-container">
      <div className="flex justify-between text-white">
        <button
          className="hover:opacity-50 transition-opacity duration-200 cursor-pointer pointer-events-auto"
          onClick={() =>
            // onSectionChange(section === 0 ? sections.length - 1 : section - 1)
            onSectionChange(1)
          }
        >

          CYBERTRUCK
        </button>
        <button
          className="hover:opacity-50 transition-opacity duration-200 cursor-pointer pointer-events-auto"
          onClick={() =>
            // onSectionChange(section === 0 ? sections.length - 1 : section - 1)
            onSectionChange(2)
          }
        >

          TESLA
        </button>
        <div className="relative h-full">
          {sections.map((sectionItem, idx) => (
            <section key={sectionItem} className={`absolute inset-4 flex flex-col justify-${ idx === 0 ? "center" : "end"} text-center transition-opacity duration-1000 ${
                sections[section] === sectionItem && isInit ? "" : "opacity-0"
              }`}
            >
              <h1 className="text-2xl font-medium text-stone-100">
                {sectionItem === "intro"
                  ? "CARS"
                  : sectionItem === "cybertruck"
                  ? "New cybertruck body"
                  : sectionItem === "tesla"
                  ? "Professional tesla"
                  : "Action button"}
              </h1>
              <p
                className={`text-${
                  sectionItem === "intro"
                    ? "4xl md:text-6xl font-extrabold"
                    : "white"
                }`}
              >
                {sectionItem === "intro"
                  ? "cybertruck"
                  : sectionItem === "cybertruck"
                  ? "cybertruck ."
                  : sectionItem === "tesla"
                  ? "tesla."
                  : "T."}
              </p>
            </section>
          ))}
        </div>
        <button
          className="hover:opacity-50 transition-opacity duration-200 cursor-pointer pointer-events-auto"
          onClick={() =>
            onSectionChange(section === sections.length - 1 ? 0 : section + 1)
          }
        >
          NEXT
        </button>
      </div>

      <div className="botones-rel">
        {sections.map((sectionItem, idx) => (
          <div
            key={sectionItem}
            className={`rounded-full border border-stone-100 w-3 h-3 flex items-center justify-center hover:cursor-pointer hover:opacity-80 transition-opacity duration-200 pointer-events-auto ${
              section === idx ? "bg-stone-100" : ""
            }`}
            onClick={() => onSectionChange(idx)}
          ></div>
        ))}
      </div>
    </main>
  );
};
