import React, { useState, useEffect, useRef } from "react";
import "./Training.css";
import Editor from "../Editor/Editor";
import { useSelector } from "react-redux";
import NoCard from "../NoCards/NoCard";
function Training() {
  const cards = useSelector((state) => state.cards.cards);
  const [counter, setCounter] = useState(0);
  const [card, setCard] = useState(cards[counter]);
  const [finished, setFinished] = useState(false);
  const [content, setContent] = useState("");
  const [showbuttons, setShowButtons] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [readonly, setReadOnly] = useState(false);
  let select = card?.selected.substring(0, card?.selected.length - 1);
  let clearRef = useRef(null);
  const placeholder = card?.text.replace(
    select,
    "{<Type Your Selected Code!!>}"
  );
  //console.log("sdsd",placeholder );
  useEffect(() => {
    if (cards?.length === counter) setFinished(true);
    else setCard(cards[counter]);
  }, [counter]);
  const handleSumbit = () => {
    setReadOnly(true);
    checkCorrect();
    setShowButtons(true);
  };
  const handleNext = () => {
    if (counter < cards?.length) setCounter(counter + 1);
    setReadOnly(false);
    setShowButtons(false);
  };
  const handleAnotherShot = () => {
    setReadOnly(false);
    setShowButtons(false);
  };
  const checkCorrect = () => {
    if (content.trim() === card.selected.trim()) setCorrect(true);
    else setCorrect(false);
  };
  if (finished) {
    return (<NoCard inTrain/>)
  }
  return (
    <div>
      <div className="main-container-tr">
        <div className="container-tr">
          <div className="tr1">
            <div>
            <p className="t-card-heading">{card?.wul}</p>
            <p className="t-card-language">{card?.language}</p>
            </div>
            <div className="card-counter">
                        <h2>Card {counter+1}</h2>
          </div>
          </div>
          
          <div className="tr2">
            { !showbuttons&&<Editor 
              clearRef={clearRef}
              readonly={readonly}
              placeholder={placeholder}
              getContent={(content) => setContent(content)}
            />}
            {showbuttons && (
              <div className="result">
                {correct ? (
                  <div className="yours">Yours:{content}</div>
                ) : (
                  <>
                    <div className="yours1">yours:{content}</div>
                    <div className="original">Original:{card?.selected}</div>
                  </>
                )}
              </div>
            )}
          </div>

          {showbuttons && (
            <>
              <div className="tr2-5">
                <div>
                  <button className="btn-tr3" onClick={handleNext}>
                    Next
                  </button>
                </div>
                <div>  
                  <button className="btn-tr3" onClick={handleAnotherShot}>
                    Give another shot
                  </button>
                </div>
              </div>
            </>
          )}
          {!showbuttons && (
            <div className="tr3">
              <button className="btn-tr3" onClick={handleSumbit}>
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Training;
