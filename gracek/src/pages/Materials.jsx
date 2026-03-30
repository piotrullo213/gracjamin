import React, { useState } from 'react';
import './Materials.css';

const examTopics = [
    {
        id: "desktop",
        title: "Aplikacje Desktopowe (C# / WPF / WinForms)",
        description: "Projektowanie, programowanie i testowanie aplikacji okienkowych.",
        steps: [
            {
                title: "Programowanie Obiektowe (Klasy i Pola)",
                description: "Egzamin wymaga stworzenia klasy z prywatnymi polami, publicznymi właściwościami i konstruktorami.",
                code: `using System;

namespace Inf04_Egzamin {
    public class Pracownik {
        // Pola prywatne
        private string pesel;
        private int stazPracy;

        // Właściwość (Property)
        public int StazPracy {
            get { return stazPracy; }
            set { stazPracy = value; }
        }

        // Konstruktor
        public Pracownik(string pesel, int stazPracy) {
            this.pesel = pesel;
            this.stazPracy = stazPracy;
        }

        // Metoda do przetestowania
        public bool CzyPrzyslugujeNagroda() {
            return stazPracy > 5;
        }
    }
}`
            },
            {
                title: "Testy Jednostkowe (Unit Testing)",
                description: "Zadania INF.04 w C# często polegają na dopisaniu testów jednostkowych (np. w środowisku MSTest lub NUnit).",
                code: `using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Inf04_Testy {
    [TestClass]
    public class PracownikTests {
        [TestMethod]
        public void CzyPrzyslugujeNagroda_StazPowinnych_ZwracaTrue() {
            // Arrange
            var pracownik = new Pracownik("12345678901", 6);

            // Act
            bool wynik = pracownik.CzyPrzyslugujeNagroda();

            // Assert
            Assert.IsTrue(wynik);
        }
    }
}`
            },
            {
                title: "Obsługa zdarzeń GUI (WPF / WinForms)",
                description: "Połączenie logiki (Code-Behind) z interfejsem graficznym, pobieranie danych od użytkownika i ich walidacja.",
                code: `private void btnLogowanie_Click(object sender, RoutedEventArgs e) {
    string login = txtLogin.Text;
    string haslo = txtHaslo.Password; // dla PasswordBox w WPF
    
    // Walidacja danych wejściowych
    if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(haslo)) {
        MessageBox.Show("Uzupełnij wszystkie dane!");
        return;
    }
    
    // Prosta obsługa wyjątków w razie błędu aplikacji
    try {
        Zaloguj(login, haslo);
    } catch (Exception ex) {
        MessageBox.Show($"Błąd logowania: {ex.Message}");
    }
}`
            }
        ]
    },
    {
        id: "mobile",
        title: "Aplikacje Mobilne (Android / Java / Kotlin)",
        description: "Programowanie i testowanie aplikacji mobilnych w środowisku Android Studio.",
        steps: [
            {
                title: "Projektowanie układu XML (Layout)",
                description: "Projektowanie widoku XML za pomocą LinearLayout lub ConstraintLayout, nadawanie atrybutów 'id'.",
                code: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:id="@+id/textViewTytul"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="WITAJ NA INF.04"
        android:textSize="24sp" />

    <Button
        android:id="@+id/btnAkcja"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="KLIKNIJ MNIE" />

</LinearLayout>`
            },
            {
                title: "Programowanie logiki (Java Activity)",
                description: "Odnajdywanie elementów widoku przez 'findViewById' i przypisywanie event-listenerów.",
                code: `package com.egzamin.inf04;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private Button btnAkcja;
    private TextView textViewTytul;
    private int licznik = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnAkcja = findViewById(R.id.btnAkcja);
        textViewTytul = findViewById(R.id.textViewTytul);

        btnAkcja.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                licznik++;
                textViewTytul.setText("Liczba kliknięć: " + licznik);
            }
        });
    }
}`
            }
        ]
    },
    {
        id: "algorithms",
        title: "Algorytmika i Struktury Danych (Python / C++)",
        description: "Rozwiązywanie problemów algorytmicznych na czas w konsoli.",
        steps: [
            {
                title: "Algorytm szyfru Cezara (Python)",
                description: "Implementacja szyfrowania przesuwającego litery alfabetu (niezbędna znajomość ord() oraz chr()).",
                code: `def szyfruj_cezar(tekst, klucz):
    zaszyfrowany = ""
    for znak in tekst:
        # Tylko małe litery alfabetu jako uproszczenie
        if 'a' <= znak <= 'z':
            kod = ord(znak) + klucz
            if kod > ord('z'):
                kod -= 26
            zaszyfrowany += chr(kod)
        else:
            zaszyfrowany += znak
    return zaszyfrowany

# Test działania
haslo = "inf"
print("Przed:", haslo)
print("Po:", szyfruj_cezar(haslo, 3))`
            },
            {
                title: "Wyszukiwanie Binarne w Tablicy (C++)",
                description: "Najpopularniejszy algorytm optymalizujący wyszukiwanie elementów, z podziałem zbioru na pół (log N).",
                code: `#include <iostream>
using namespace std;

// Tablica wejściowa MUSI być posortowana
int szukajBinarne(int tab[], int lewy, int prawy, int szukana) {
    while (lewy <= prawy) {
        int srodek = lewy + (prawy - lewy) / 2;
        
        if (tab[srodek] == szukana) {
            return srodek; 
        }
        
        if (tab[srodek] < szukana) {
             lewy = srodek + 1; // Szukamy w prawej połowie
        } else {
             prawy = srodek - 1; // Szukamy w lewej połowie
        }
    }
    return -1; // Nie znaleziono
}

int main() {
    int posortowanaTablica[] = {2, 3, 4, 10, 40};
    int n = sizeof(posortowanaTablica) / sizeof(posortowanaTablica[0]);
    int indeks = szukajBinarne(posortowanaTablica, 0, n - 1, 10);
    
    cout << "Znaleziono na indeksie: " << indeks;
    return 0;
}`
            },
            {
                title: "Sito Eratostenesa (Liczby Pierwsze)",
                description: "Optymalne znajdowanie wszystkich liczb pierwszych w zadanym zakresie matematycznym.",
                code: `def sito_eratostenesa(n):
    # Tworzymy tablicę wartości True, 0 i 1 nie są pierwsze
    pierwsze = [True] * (n + 1)
    pierwsze[0] = pierwsze[1] = False
    
    p = 2
    while p * p <= n:
        if pierwsze[p] == True:
            # Wykreślamy wielokrotności liczby p
            for i in range(p * p, n + 1, p):
                pierwsze[i] = False
        p += 1
        
    # Wypisywanie
    wynik = []
    for p in range(2, n + 1):
        if pierwsze[p]:
            wynik.append(p)
    return wynik

print("Liczby pierwsze do 30:", sito_eratostenesa(30))`
            }
        ]
    }
];

export default function Materials() {
    const [activeTopic, setActiveTopic] = useState(null);

    const toggleTopic = (id) => {
        if (activeTopic === id) {
            setActiveTopic(null);
        } else {
            setActiveTopic(id);
        }
    };

    return (
        <div className="materials-container">
            <h1 className="materials-title">Materiały do egzaminu INF.04</h1>

            <div className="topics-list">
                {examTopics.map((topic) => (
                    <div key={topic.id} className="topic-card">

                        <button
                            className={`topic-btn ${activeTopic === topic.id ? 'active' : ''}`}
                            onClick={() => toggleTopic(topic.id)}
                        >
                            <h2>{topic.title}</h2>
                            <span>{activeTopic === topic.id ? '▲' : '▼'}</span>
                        </button>

                        {activeTopic === topic.id && (
                            <div className="topic-content">
                                <p className="topic-desc">{topic.description}</p>

                                {topic.steps.map((step, index) => (
                                    <div key={index} className="step-box">
                                        <h3>Krok {index + 1}: {step.title}</h3>
                                        <p>{step.description}</p>
                                        <pre>
                                            <code>{step.code}</code>
                                        </pre>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
}
