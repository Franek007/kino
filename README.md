# Netflix 2.0 — Platforma Streamingowa (Mini-Projekt)

Netflix 2.0 to nowoczesna, responsywna aplikacja typu One-Page imitująca platformę streamingową z filmami. Projekt został stworzony od zera, bez użycia gotowych frameworków CSS.

## Główne funkcjonalności

* **Separacja danych i dynamiczne renderowanie:** Treść strony (baza filmów) nie jest wpisana w HTML. Dane są przechowywane w pliku JavaScript jako tablica obiektów i dynamicznie renderowane przy użyciu metody `.map()`.
* **Filtrowanie w czasie rzeczywistym:** Wygodne przyciski kategorii (*Wszystkie, Sci-Fi, Akcja, Komedia*), które błyskawicznie filtrują wyświetlane kafelki bez przeładowywania strony.
* **System Ulubionych (LocalStorage):** Możliwość dodawania i usuwania filmów z listy ulubionych. Wybór użytkownika jest zapisywany w pamięci przeglądarki (`localStorage`), dzięki czemu licznik i stan przycisków nie zerują się po odświeżeniu strony.

## Demo:
* https://franek007.github.io/kino/
---

## Autor
* **Franciszek Rubinowicz 4b**
