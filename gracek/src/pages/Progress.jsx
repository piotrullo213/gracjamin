import React, { useState, useEffect } from 'react';
import './Progress.css';

const DEFAULT_TOPICS = [
  { id: 1, text: 'Systemy operacyjne (Windows, Linux)', completed: false },
  { id: 2, text: 'Urządzenia techniki komputerowej (Płyty główne, procesory, pamięci)', completed: false },
  { id: 3, text: 'Lokalne sieci komputerowe (Protokoły, adresacja IP)', completed: false },
  { id: 4, text: 'Urządzenia sieciowe (Rutery, przełączniki, access pointy)', completed: false },
  { id: 5, text: 'Bezpieczeństwo IT (Szyfrowanie, zapory sieciowe)', completed: false },
  { id: 6, text: 'Projektowanie i montaż sieci lokalnych', completed: false }
];

export default function Progress() {
  const [topics, setTopics] = useState([]);
  const [advice, setAdvice] = useState('');
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTopics = localStorage.getItem('inf04-progress');
    if (savedTopics) {
      setTopics(JSON.parse(savedTopics));
    } else {
      setTopics(DEFAULT_TOPICS);
    }
    
    // Fetch advice of the day
    fetchAdvice();
  }, []);

  // Save to localStorage whenever topics change
  useEffect(() => {
    if (topics.length > 0) {
      localStorage.setItem('inf04-progress', JSON.stringify(topics));
    }
  }, [topics]);

  const fetchAdvice = async () => {
    try {
      setIsLoadingAdvice(true);
      const res = await fetch('https://api.adviceslip.com/advice');
      const data = await res.json();
      setAdvice(data.slip.advice);
    } catch (error) {
      setAdvice('Błąd pobierania cytatu. Niezależnie od tego - nigdy się nie poddawaj!');
    } finally {
      setIsLoadingAdvice(false);
    }
  };

  const toggleTopic = (id) => {
    setTopics(topics.map(topic => 
      topic.id === id ? { ...topic, completed: !topic.completed } : topic
    ));
  };

  const completedCount = topics.filter(t => t.completed).length;
  const progressPercentage = topics.length > 0 
    ? Math.round((completedCount / topics.length) * 100) 
    : 0;

  return (
    <div className="progress-container">
      <h1 className="title text-center mb-4">Twój Postęp - INF.04</h1>

      {/* Advice/Quote Card */}
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

      {/* Progress Section */}
      <div className="progress-section">
        <div className="progress-header">
          <h2>Gotowość do egzaminu</h2>
          <span className="progress-percentage">{progressPercentage}%</span>
        </div>
        
        <div className="progress-bar-bg mb-4">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* To-Do List */}
        <div className="todo-list">
          {topics.map(topic => (
            <div 
              key={topic.id} 
              className={`todo-item ${topic.completed ? 'completed' : ''}`}
              onClick={() => toggleTopic(topic.id)}
            >
              <input 
                type="checkbox" 
                className="todo-checkbox"
                checked={topic.completed}
                onChange={() => toggleTopic(topic.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <span className="todo-text">{topic.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
