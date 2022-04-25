import { React, useRef, useState } from "react";
import Cctv from "./cctv/cctv.js";
import Briefing from "./briefing/briefing.js";
import Day from "./day/day.js";

const App = () => {
  const [showBriefing, setShowBriefing] = useState(false);
  const [showCctv, setShowCctv] = useState(false);

  const CctvRef = useRef(null);
  const BriefingRef = useRef(null);
  const scrollToBriefing = () => {
    setShowBriefing(true);
    BriefingRef.current.scrollIntoView();
  };
  const scrollToCctv = () => {
    setShowCctv(true);
    CctvRef.current.scrollIntoView();
  };

  return (
    <div>
      <Day func={scrollToBriefing} />
      <Briefing
        ref={BriefingRef}
        func={scrollToCctv}
        showBriefing={showBriefing}
      />
      <Cctv ref={CctvRef} showCctv={showCctv} />
    </div>
  );
};

export default App;