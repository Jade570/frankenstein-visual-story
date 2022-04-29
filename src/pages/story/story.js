import { React, useState } from "react";
import * as Scroll from "react-scroll";
import { useParams } from "react-router-dom";
import Investigation from "./investigation/investigation.js";
import Briefing from "./briefing/briefing.js";
import Day from "./day/day.js";
import Result from "./result/result.js";
import sample from "./src/sample1.json";
import NotFound from "../../NotFound";

const Element = Scroll.Element;

const Story = () => {
  let params = useParams();

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
  if (sample[params.day - 1]) {
    return (
      <>
        <Day func={scrollToBriefing} day={params.day} />
        <Element name="Briefing">
          <Briefing
            func={scrollToInvestigation}
            showBriefing={showBriefing}
            data={sample[params.day - 1].briefing}
          />
        </Element>
        <Element name="Investigation">
          <Investigation
            func={scrollToResult}
            showInvestigation={showInvestigation}
            data={sample[params.day - 1].investigation}
          />
        </Element>
        <Element name="Result">
          <Result showResult={showResult}></Result>
        </Element>
      </>
    );
  } else {
    return <NotFound />;
  }
};

export default Story;
