import { React, useState } from "react";
import * as Scroll from "react-scroll";
import Investigation from "./investigation/investigation.js";
import Briefing from "./briefing/briefing.js";
import Day from "./day/day.js";
import Result from "./result/result.js";

const Element = Scroll.Element;

const Story = () => {
  //states for show/hide contents
  const [showBriefing, setShowBriefing] = useState(false);
  const [showInvestigation, setShowInvestigation] = useState(false);
  const [showResult, setShowResult] = useState(false);

  //scroll functions
  const scrollToBriefing = () => {
    setShowBriefing(true);
    Scroll.scroller.scrollTo("Briefing", {
      duration: 800,
      delay: 50,
      smooth: true,
    });
  };

  const scrollToInvestigation = () => {
    setShowInvestigation(true);
    Scroll.scroller.scrollTo("Investigation", {
      duration: 800,
      delay: 50,
      smooth: true,
    });
  };

  const scrollToResult = () => {
    setShowResult(true);
    Scroll.scroller.scrollTo("Result", {
      duration: 800,
      delay: 50,
      smooth: true,
    });
  };

  return (
    <div>
      <Day func={scrollToBriefing} />
      <Element name="Briefing">
        <Briefing func={scrollToInvestigation} showBriefing={showBriefing} />
      </Element>
      <Element name="Investigation">
        <Investigation
          func={scrollToResult}
          showInvestigation={showInvestigation}
        />
      </Element>
      <Element name="Result">
        <Result showResult={showResult}></Result>
      </Element>
    </div>
  );
};

export default Story;
