import React, { useState, useEffect } from 'react'; // Importuję podstawowe narzędzia Reacta: useState (do pamiętania danych) i useEffect (do uruchamiania kodu w tle)
import { Link } from 'react-router-dom'; // Link służy mi do przechodzenia miedzy podstronami bez odświeżania całej strony w przeglądarce
import './Home.css'; // Podpinam mój plik ze stylami CSS, żeby strona wyglądała nowocześnie

// To jest mój główny "komponent" - czyli element budujący stronę o nazwie "Home" (Strona główna)
export default function Home() {

  // Tworzę stałą (const) o nazwie examDate, która przechowuje dokładną datę i godzinę egzaminu. Do niej będę odliczać czas.
  const examDate = new Date('2026-06-03T09:00:00');

  // Tutaj tworzę tzw. STAN (zmienną, którą React na bieżąco stąd odczytuje i odświeża). 
  // Zmienna 'timeLeft' trzyma aktualny czas do egzaminu. 
  // 'setTimeLeft' to funkcja, którą podmieniam te wartości. Na start wszystko ustawiam na okrągłe zero.
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // useEffect uruchamia się raz, od razu po załadowaniu strony. Tutaj odpalam mój zegar!
  useEffect(() => {
    // Odpalam timer (setInterval), który będzie powtarzał ten kod co 1000 milisekund (czyli równo co 1 sekundę)
    const timer = setInterval(() => {
      // Obliczam różnicę czasu: odejmuję od daty egzaminu obecny czas. Wynik otrzymuję w milisekundach.
      const difference = examDate.getTime() - new Date().getTime();

      // Tylko jeśli wynik jest na plusie (czas do egzaminu jeszcze nie minął) aktualizuję wartości licznika
      if (difference > 0) {
        // Obliczam ile dni, godzin itp. mieści się w pozostałych milisekundach i zapisuję to do mojego stanu
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)), // 1 dzień to 1000ms * 60s * 60m * 24h
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24), // reszta godzin, która nie mieści się w pełny dzień
          minutes: Math.floor((difference / 1000 / 60) % 60), // reszta minut
          seconds: Math.floor((difference / 1000) % 60) // reszta sekund
        });
      }
    }, 1000); // <- to jest wpisane opóźnienie 1 sekundy, o którym wspomniałem wyżej

    // Jeśli zmienię podstronę na inną, chcę wyłączyć mój zegar, by nie działał w tle i zżerał pamięć. Służy do tego clearInterval.
    return () => clearInterval(timer);
  }, [examDate]); // Ten nawias mówi Reactowi: zrestartuj ten timer tylko i wyłącznie wtedy, gdyby zmieniła się data egzaminu (examDate)

  // Ta sekcja "return (...)" zwraca czysty kod wizualny - HTML/JSX. To on wyświetla się na ekranie!
  return (
    <div className="container"> {/* Główny prostokąt definiujący szerokość strony (pojemnik) */}

      {/* SEKCJA 1: Powitanie i mój odliczacz (Hero) */}
      <div className="hero-section">
        <h1 className="title text-center">Przygotuj się do INF.04</h1>
        <p className="subtitle text-center mb-4">
          Twój osobisty asystent w nauce programowania, projektowania i testowania aplikacji.
        </p>

        {/* Karta, na której umieszczam zegar do egzaminu */}
        <div className="countdown-card card text-center mb-4">
          <h2 className="mb-2">Czas do egzaminu praktycznego:</h2>

          <div className="timer-grid">
            {/* Box przeznaczony na wyliczone dni */}
            <div className="timer-box">
              <span className="timer-value">{timeLeft.days}</span> {/* Tutaj bezpośrednio wyświetlam wyliczone wyżej dni z mojego stanu! */}
              <span className="timer-label">Dni</span>
            </div>
            {/* Box wyliczający godziny */}
            <div className="timer-box">
              <span className="timer-value">{timeLeft.hours}</span>
              <span className="timer-label">Godzin</span>
            </div>
            {/* Box na minuty */}
            <div className="timer-box">
              <span className="timer-value">{timeLeft.minutes}</span>
              <span className="timer-label">Minut</span>
            </div>
            {/* Box na sekundy */}
            <div className="timer-box">
              <span className="timer-value">{timeLeft.seconds}</span>
              <span className="timer-label">Sekund</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEKCJA 2: Moje kafelki/Karty z funkcjami strony */}
      <div className="features-grid">
        {/* Karta 1: Materiały */}
        <div className="card feature-card">
          <div className="feature-icon">📚</div> {/* Zwykła emotka udająca ikonę wewnątrz mojego pudełka */}
          <h3>Materiały i Algorytmy</h3>
          <p>Zapoznaj się z rozwiązaniami krok po kroku z poprzednich lat (Aplikacje, Bazy Danych, Konsola).</p>
          {/* Przycisk (Link), który używam do przeniesienia widoku na moją podstronę "/materialy" */}
          <Link to="/materialy" className="btn mt-4">Przejdź do materiałów</Link>
        </div>

        {/* Karta 2: Postępy */}
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
