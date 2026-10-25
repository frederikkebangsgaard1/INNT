# Min Watchlist

## Demovideo
1. Udgave (godkendelsesopgave 1): https://youtube.com/shorts/IwAcrCi0Ta8?si=zQwC2mH3yhPAVMAQ
2. Udgave (godkendelsesopgave 2): https://youtube.com/shorts/fjubY5A7CiM?is=3zk1Ew3IFduL6cMp


## Nyt i 2. udgave 
Ændringerne bygger på feedbacken fra første brugertest og fra godkendelsesopgave 1. De vigtigste ændringer er:
- **Listerne gemmes** på telefonen med AsyncStorage, så de ikke forsvinder, når appen lukkes
- **Ny skærm: Anbefalinger.** Fra en films detaljeside kan man trykke "Se lignende titler" og få anbefalinger fra TMDB
- **Mere info på detaljesiden:** varighed, genrer og skuespillere
- **Bekræftelse før man fjerner** en film fra en liste
- **Opdateret forside:** tryk på "Set" i overblikket for at gå til Set-listen, og opret nye lister med "+ Ny liste", hvor man vælger navn, emoji og farve fra start
- **Ryd søgning:** kryds i søgefeltet, så man nemt kan starte forfra
- **Fake door test:** knappen "Del listen med venner" måler interessen for delte lister, før funktionen bygges
- Al styling er samlet i `styles/GlobalStyle.js`


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