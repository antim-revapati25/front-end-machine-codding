import { useState } from "react";
import Interest from "./Interest";
import Profile from "./Profile";
import Setting from "./Setting";
import "./components.css";

const TabForm = () => {
  // config driven UI for scallability
  const config = [
    {
      name: "Profile",
      component: Profile,
      validate: () => {
        return true;
      },
    },
    {
      name: "Interest",
      component: Interest,
      validate: () => {
        return true;
      },
    },
    {
      name: "Setting",
      component: Setting,
      validate: () => {
        return true;
      },
    },
  ];

  //   default 0th index tab is active
  const [activeTab, setActiveTab] = useState(0);
  const ActiveTabComponent = config[activeTab].component;

  const handlePrev = () => {
    setActiveTab((prev) => prev - 1);
  };
  const handleNext = () => {
    setActiveTab((prev) => prev + 1);
  };
  const handleSubmit = () => {
    alert("Submitted");
  };

  const handleClick = (index) => {
    setActiveTab(index);
  };
  return (
    <>
      <div className="parent">
        {config.map((item, index) => {
          return (
            <div
              key={index}
              className="child"
              onClick={() => handleClick(index)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <ActiveTabComponent />

      {activeTab > 0 && <button onClick={handlePrev}>Prev</button>}
      {activeTab < config.length - 1 && (
        <button onClick={handleNext}>Next</button>
      )}
      {activeTab == config.length - 1 && (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </>
  );
};

export default TabForm;
