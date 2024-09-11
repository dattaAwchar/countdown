import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countdownEndDate, setCountdownEndDate] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const savedEndDate = localStorage.getItem('countdownEndDate');
    if (savedEndDate) {
      const endDate = new Date(savedEndDate);
      setCountdownEndDate(endDate);
      startCountdown(endDate);
    }
  }, []);

  const startCountdown = (endDate) => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        localStorage.removeItem('countdownEndDate');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  };

  const handleStart = () => {
    const daysInput = document.getElementById('daysInput').value;
    if (daysInput && daysInput > 0) {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + parseInt(daysInput));
      setCountdownEndDate(endDate);
      localStorage.setItem('countdownEndDate', endDate);
      startCountdown(endDate);
    } else {
      alert('Please enter a valid number of days.');
    }
  };

  return (
    <div className="App">
      <h1>Enter Days for Countdown</h1>
      <input type="number" id="daysInput" placeholder="Enter number of days" />
      <button onClick={handleStart}>Start Countdown</button>
      <div id="countdown">
        <p>{timeLeft.days} Days</p>
        <p>{timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</p>
      </div>
    </div>
  );
}

export default App;
