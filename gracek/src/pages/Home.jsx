import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {

  const examDate = new Date('2026-06-03T09:00:00');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });


  useEffect(() => {
    const timer = setInterval(() => {
      const difference = examDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [examDate]);

  return (
    <div className="container">
      <div className="hero-section">
        <h1 className="title text-center">Przygotuj się do INF.04</h1>
        <p className="subtitle text-center mb-4">
          Twój osobisty asystent w nauce programowania, projektowania i testowania aplikacji.
        </p>

        <div className="countdown-card card text-center mb-4">
          <h2 className="mb-2">Czas do egzaminu praktycznego:</h2>
          <div className="timer-grid">
            <div className="timer-box">
              <span className="timer-value">{timeLeft.days}</span>
              <span className="timer-label">Dni</span>
            </div>
            <div className="timer-box">
              <span className="timer-value">{timeLeft.hours}</span>
              <span className="timer-label">Godzin</span>
            </div>
            <div className="timer-box">
              <span className="timer-value">{timeLeft.minutes}</span>
              <span className="timer-label">Minut</span>
            </div>
            <div className="timer-box">
              <span className="timer-value">{timeLeft.seconds}</span>
              <span className="timer-label">Sekund</span>
            </div>
          </div>
        </div>
      </div>

      <div className="features-grid">
        <div className="card feature-card">
          <div className="feature-icon">📚</div>
          <h3>Materiały i Algorytmy</h3>
          <p>Zapoznaj się z rozwiązaniami krok po kroku z poprzednich lat (Aplikacje, Bazy Danych, Konsola).</p>
          <Link to="/materialy" className="btn mt-4">Przejdź do materiałów</Link>
        </div>

        <div className="card feature-card">
          <div className="feature-icon">📈</div>
          <h3>Śledzenie Postępów</h3>
          <p>Odznaczaj przerobione zagadnienia i kontroluj swój poziom przygotowania do egzaminu.</p>
          <Link to="/postepy" className="btn btn-secondary mt-4">Zobacz postępy</Link>
        </div>
      </div>
    </div>
  );
}
