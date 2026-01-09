# Projekt - Aplikacja Recenzji FIlmów

Aplikacja webowa do zarządzania kolekcją filmów.

# Funkcjonalności

*   Przeglądanie listy filmów: Wyświetlanie wszystkich filmów w kolekcji.
*   Filtrowanie i sortowanie: Wyszukiwanie filmów po gatunku oraz sortowanie listy.
*   Dodawanie filmów: Formularz do dodawania nowych pozycji do bazy.
*   Edytowanie filmów: Możliwość aktualizacji danych istniejących filmów.
*   Usuwanie filmów: Usuwanie filmów z kolekcji.
*   Szczegóły filmu: Dedykowana strona z pełnymi informacjami o pojedynczym filmie.

# Technologie

*   Backend: Node.js, Express.js
*   Frontend: EJS (Embedded JavaScript templates)
*   Baza danych: MongoDB (z użyciem Mongoose)
*   Konteneryzacja: Docker

# Instalacja i Uruchomienie

# Krok 1: Wymagania wstępne

Na komputerze muszą być zainstalowane:
*   [Node.js](https://nodejs.org/) (wersja 18.x lub nowsza)
*   [Docker](https://www.docker.com/products/docker-desktop/)

# Krok 2: Instalacja zależności

W głównym folderze projektu uruchom komendę, aby zainstalować wszystkie wymagane pakiety:

npm install

# Krok 3: Uruchomienie bazy danych

Do uruchomienia bazy danych MongoDB użyj Dockera. W terminalu wykonaj komendę (pełny opis znajduje się w pliku `docker.txt`):

docker run -d --name mongodb-projekt -p 27017:27017 -v mongodb-data:/data/db -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=password -e MONGO_INITDB_DATABASE=movies mongo:6

Baza danych będzie dostępna pod adresem: `mongodb://user:password@localhost:27017/movies`. Aplikacja jest już skonfigurowana do używania tego adresu.

# Krok 4: Uruchomienie aplikacji

Po pomyślnym zainstalowaniu zależności i uruchomieniu bazy danych, uruchom aplikację za pomocą skryptu:

npm start

Aplikacja będzie dostępna pod adresem `http://localhost:3000`.

# Lista Endpointów

| Metoda HTTP | Ścieżka                                  | Opis                                                      |
|-------------|------------------------------------------|-----------------------------------------------------------|
| GET         | `/`                                      | Wyświetla listę wszystkich filmów.                        |
| GET         | `/?genre=...&sortBy=...&order=...`       | Wyświetla przefiltrowaną i posortowaną listę filmów.      |
| GET         | `/add`                                   | Wyświetla formularz dodawania nowego filmu.               |
| POST        | `/add`                                   | Przetwarza dane i dodaje nowy film do bazy.               |
| GET         | `/movies/:id`                            | Wyświetla stronę ze szczegółami filmu o podanym ID.       |
| GET         | `/edit/:id`                              | Wyświetla formularz edycji dla filmu o podanym ID.        |
| POST        | `/movies/:id/edit`                       | Przetwarza dane i aktualizuje film o podanym ID.          |
| POST        | `/movies/:id/delete`                     | Usuwa film o podanym ID.                                  |

# Autorzy

*  Szymon Zarychta
