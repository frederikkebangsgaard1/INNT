## Demovideo
https://youtube.com/shorts/fjubY5A7CiM?is=3zk1Ew3IFduL6cMp 


## Sådan køres appen
Tager udgangspunkt i at Node er installeret og appen Expo Go på din telefon

1. Pak projektet ud, eller klon det fra GitHub.
2. Installer afhængigheder:
   ```
   npm install
   ```
3. Lav en fil ved navn `.env` i projektmappen med en TMDB-nøgle og (se nedenfor):
   ```
   EXPO_PUBLIC_TMDB_TOKEN=din_nøgle_her
   ```
4. Start appen:
   ```
   npx expo start
   ```
5. Scan QR-koden med Expo Go på din telefon.


## TMDB-nøgle
Appen henter film og serier fra TMDB, så den kræver en API-nøgle. Derfor skal du 

- Oprette din egen gratis nøgle på https://www.themoviedb.org under Settings > API, 

Nøglen skal ligge i `.env`-filen som vist nedenfor:
EXPO_PUBLIC_TMDB_TOKEN=din_nøgle_her
