"use client"
import { useState, useEffect } from "react";

function Header() {
  return <h1 className="header">Cookie Clicker</h1>;
}

function Stats({ cookies, cursors, grandmas }) {
  return (
    <div className="stats">
      <p>Cookies: {Math.floor(cookies)}</p>
      <p>Cursors: {cursors}</p>
      <p>Grandmas: {grandmas}</p>
    </div>
  );
}


function GameManager() {
  const [cookies, setCookies] = useState(0);
  const [cookieRate, setCookieRate] = useState(0);

  const [cursors, setCursors] = useState(0);
  const [grandmas, setGrandmas] = useState(0);

  const [cursorCost, setCursorCost] = useState(10);
  const [grandmaCost, setGrandmaCost] = useState(50);

  const [cursorUpgNum, setCursorUpgNum] = useState(0);
  const [cursorUpgCost, setCursorUpgCost] = useState(500);

  const [cookiePerSecondUpg, setcookiePerSecondUpg] = useState(0);
  const [cpsCost, setcpsCost] = useState(1000);

  const [showCursorUpg, setShowCursorUpg] = useState(false);

  // Golden cookie state: appears when cookies reach threshold
  const [showGoldenCookie, setShowGoldenCookie] = useState(false);
  const [goldenCookies, setGoldenCookies] = useState(0);
  // 2x production upgrade state
  const [cpsProd2xUpg, setCpsProd2xUpg] = useState(0);
  const [cpsProd2xCost, setCpsProd2xCost] = useState(1000);

  const [randomButtonClicked, setRandomButtonClicked] = useState(false);
  const[randomButtontimesClicked, setRandomButtonTimesClicked] = useState(0);

  // Add cookies automatically each second
  useEffect(() => {
    const timer = setInterval(() => {
      setCookies((prev) => prev + cookieRate);
    }, 1000);
    return () => clearInterval(timer);
  }, [cookieRate]);

  // Show golden cookie when cookies reach threshold (10000)
  useEffect(() => {
    if (cookies >= 10000) {
      setShowGoldenCookie(true);
    } else {
      setShowGoldenCookie(false);
    }
  }, [cookies]);

  // Auto-hide golden cookie after 10 seconds when it appears
  useEffect(() => {
    if (!showGoldenCookie) return;
    const timeout = setTimeout(() => {
      setShowGoldenCookie(false);
    }, 10000); // 10 seconds
    return () => clearTimeout(timeout);
  }, [showGoldenCookie]);

  function handleCookieClick() {
    setCookies((prev) => prev + 1);
  }

  function buyCursor() {
    if (cookies >= cursorCost) {
      setCookies((prev) => prev - cursorCost);
      setCursors((prev) => prev + 1);
      setCookieRate((prev) => prev + 1);
      setCursorCost((prev) => Math.floor(prev * 1.2));
    }
  }

  function buyGrandma() {
    if (cookies >= grandmaCost) {
      setCookies((prev) => prev - grandmaCost);
      setGrandmas((prev) => prev + 1);
      setCookieRate((prev) => prev + 5);
      setGrandmaCost((prev) => Math.floor(prev * 1.25));
    }
  }
  function buySpecialCursorUpgrade() {
    if (cursors >= 5 && cookies >= cursorUpgCost && cursorUpgNum < 1) {
      setCookies((prev) => prev - cursorUpgCost);
      setCursorUpgNum((prev) => prev + 1);
      setCookieRate((prev) => prev + 3);
    }
  }

  function buySpecialCookieUpgrade() {
    if (cookies >= cpsProd2xCost && cpsProd2xUpg < 1) {
      setCookies((prev) => prev - cpsProd2xCost);
      setCpsProd2xUpg(1);
      setCookieRate((prev) => prev * 2);
    }
  }

  function clickGoldenCookie() {
    setCookies((prev) => prev + 777);
    setGoldenCookies((prev) => prev + 1);
    setShowGoldenCookie(false);
  }
  

  return (
    <div>
      <button className="cookie upgrade" onClick={handleCookieClick}>
        <img src="/cookie.png" alt="cookie" width="150" />
      </button>


      <div>
        <button onClick={buyCursor} disabled={cookies < cursorCost} className="upgrade">
          Buy Cursor (Cost: {cursorCost})
        </button>
        <button onClick={buyGrandma} disabled={cookies < grandmaCost} className="upgrade">
          Buy Grandma (Cost: {grandmaCost})
        </button>
        {cursors >= 5 && cursorUpgNum < 1 && (
          <button
            onClick={buySpecialCursorUpgrade}
            disabled={cookies < cursorUpgCost}
            className="upgrade"
          >
            Buy CursorUpgrade (Cost: {cursorUpgCost})
          </button>
        )}
        {cookies >= 200 && cpsProd2xUpg < 1 && (
          <button
            onClick={buySpecialCookieUpgrade}
            disabled={cookies < cpsProd2xCost}
            className="upgrade"
          >
            Buy 2x Production Upgrade (Cost: {cpsProd2xCost})
          </button>
        )}
        {cookies >= 10000 && !showGoldenCookie && (
          <button
            onClick={() => setShowGoldenCookie(true)}
            className="golden-cookie upgrade">
            Golden Cookie Appears!
          </button>
        )}
        {showGoldenCookie && (
          <button
            onClick={clickGoldenCookie}
            className="golden-cookie big upgrade"
          >
            🍪 Click Me! +777 Cookies
          </button>
        )}
      </div>
      <Stats
        cookies={cookies}
        cursors={cursors}
        grandmas={grandmas}
      />
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Header />
      <GameManager />
    </div>
  );
}
