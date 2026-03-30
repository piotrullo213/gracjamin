import React, { useState, useEffect } from 'react';
import './Progress.css';

// Domyślna lista tematów do nauki, jeśli użytkownik wchodzi do aplikacji po raz pierwszy
const DEFAULT_TOPICS = [
  { id: 1, text: 'Systemy operacyjne (Windows, Linux)', completed: false },
  { id: 2, text: 'Urządzenia techniki komputerowej (Płyty główne, procesory, pamięci)', completed: false },
  { id: 3, text: 'Lokalne sieci komputerowe (Protokoły, adresacja IP)', completed: false },
  { id: 4, text: 'Urządzenia sieciowe (Rutery, przełączniki, access pointy)', completed: false },
  { id: 5, text: 'Bezpieczeństwo IT (Szyfrowanie, zapory sieciowe)', completed: false },
  { id: 6, text: 'Projektowanie i montaż sieci lokalnych', completed: false }
];

export default function Progress() {
  // Stan przechowujący aktualną listę tematów (pobraną z przeglądarki lub wgraną domyślnie)
  const [topics, setTopics] = useState([]);
  
  // Stan przechowujący wylosowany cytat motywacyjny (Advice) pobrany z zewnętrznego API
  const [advice, setAdvice] = useState('');
  
  // Stan boolowski (true/false) informujący, czy dane z zewnętrznego API właśnie się pobierają
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(true);

  // useEffect wykonujący się tylko raz podczas ładowania (montowania) komponentu
  useEffect(() => {
    // 1. Odczytujemy zapisane dane o postępach powiązane z kluczem w `localStorage`
    const savedTopics = localStorage.getItem('inf04-progress');
    if (savedTopics) {
      // Przypisanie odczytanych starych danych z tekstu z powrotem na obiekt JS
      setTopics(JSON.parse(savedTopics));
    } else {
      // Jeśli użytkownik jest nowy, ładujemy bazową listę z domyślnie pustym postępem
      setTopics(DEFAULT_TOPICS);
    }
    
    // 2. Automatycznie wysyłamy żądanie o motywację do zewnętrznej usługi
    fetchAdvice();
  }, []);

  // useEffect triggerujący zapisanie do localStorage KAŻDORAZOWO, kiedy ulegnie zmianie układ listy topics
  useEffect(() => {
    // Pomijamy pierwszy render upewniając się, że nie nadpiszemy przez pomyłkę historii pustą tablicą
    if (topics.length > 0) {
      localStorage.setItem('inf04-progress', JSON.stringify(topics));
    }
  }, [topics]); // Zależność [topics] jest mechanizmem nasłuchiwania na modyfikacje listy zadań

  // Asynchroniczna funkcja łącząca się z zewnętrznym darmowym API
  const fetchAdvice = async () => {
    try {
      setIsLoadingAdvice(true);
      const res = await fetch('https://api.adviceslip.com/advice'); // Pobieranie requestu
      const data = await res.json(); // Parsowanie wyniku odpowiedz z serwisu na format JSON
      setAdvice(data.slip.advice); // Finalny cytat pobrany z nadesłanej paczki obkietu data (zawiera slip.advice)
    } catch (error) {
      // Wrzuca alternatywny motywujący wpis, w razie gdyby użytkownik był offline
      setAdvice('Błąd pobierania cytatu. Niezależnie od tego - nigdy się nie poddawaj!');
    } finally {
      setIsLoadingAdvice(false); // Komponent jest załadowany bez strachu, można zrzucić znacznik z napisem o ładowaniu 
    }
  };

  // Metoda szukająca w naszej liście odpowiedniego pojęcia i negująca jego stan `completed` na ten przeciwny 
  const toggleTopic = (id) => {
    setTopics(topics.map(topic => 
      topic.id === id ? { ...topic, completed: !topic.completed } : topic
    ));
  };

  // Aktualizuje dynamicznie ilość skończonych tematów (wyszczotkowane wpisy za pomocą filtra true dla zadania)
  const completedCount = topics.filter(t => t.completed).length;
  
  // Złożenie i wyliczenie ile % z całokształtu stanowi ukończona partia tematów
  const progressPercentage = topics.length > 0 
    ? Math.round((completedCount / topics.length) * 100) 
    : 0;

  return (
    <div className="progress-container">
      <h1 className="title text-center mb-4">Twój Postęp - INF.04</h1>

      {/* Kontener dla asynchronicznej karty (karta do wymogu dotyczącego zewnętrznego API) */}
      <div className="card quote-card">
        {isLoadingAdvice ? (
          <p className="quote-text">Ładowanie motywacji...</p>
        ) : (
          <>
            <p className="quote-text">"{advice}"</p>
            <p className="quote-author">Advice of the day</p>
          </>
        )}
      </div>

      {/* Główna obszerna sekcja Paska Postępu z listą To-Do */}
      <div className="progress-section">
        <div className="progress-header">
          <h2>Gotowość do egzaminu</h2>
          <span className="progress-percentage">{progressPercentage}%</span>
        </div>
        
        {/* Tło do naszego paska Progresu */}
        <div className="progress-bar-bg mb-4">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercentage}%` }} // Dynamiczne uaktualnie css z pomocą zmiennej style
          ></div>
        </div>

        {/* Dynamicznie wykreowana wewnątrz React.js check-lista. Elementy mapowane pod siebie. */}
        <div className="todo-list">
          {topics.map(topic => (
            <div 
              key={topic.id} 
              // Klasa 'completed' decyduje w CSS czy element ma być wyszarzony + przekreślony tekst
              className={`todo-item ${topic.completed ? 'completed' : ''}`}
              onClick={() => toggleTopic(topic.id)} // Przypisanie funkcji przełączania po wciśnięciu KAŻDEGO obszaru przycisku
            >
              <input 
                type="checkbox" 
                className="todo-checkbox"
                checked={topic.completed}
                onChange={() => toggleTopic(topic.id)}
                onClick={(e) => e.stopPropagation()} // Zapobiega "double trigger event", tzn kliknięć które nie trafiałyby pod kontrolę głównego Diva boxa
              />
              <span className="todo-text">{topic.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
