# Process verslag API - Jamie Hart

In de eerste les hebben we in inventarisatie gedaan voor welke content en web API's interessant zouden zijn 
om te gebruiken voor het vak. 

| Web API's                  | Content API's               
|----------------------------|-----------------------
| Vibration                  | Youtube
| Geolocation                | Weather
| Remote playback            | Shazam
| localStorage               | ticketmaster       
| Fetch                      | tripadvisor
| touch events               | trustpilot
| picture in picture         | OpenAI
| Ink API                    | Polygon
| Share API                  | Spotify
|                            | [Football-data](https://www.thesportsdb.com/) 


## Week 1: Plan voor de site

Ik wil een pagina maken voor football wedstrijden en teams, waarbij je de aankomende wedstrijden kan zien, 
maar ook teams tegenover elkaar kan zetten en statistieken kan vergelijken. 
En voorgaande uitslagen per team in alle competities.

De opmaak van de site verandert aan de hand van welke teams er open staan en welke primaire kleuren deze teams hebben. 

Idee om kaartjes voor de teams te maken om het visueel beter te maken kan ook nog.
Gegevens uit Content API die ik minimaal wil gebruiken.
- Team naam
- Logo van het team
- Kleuren van de club
- uitslagen

- Uitslagen van vorige wedstrijden
- Aankomende wedstrijden
- aantal gescoorde doelpunten en welke minuut etc. 


## Week 2: Data ophalen en styling

Deze week ben ik vooral gaan kijken naar de styling, van de pagina. Ik heb de titel Bet Helper eraan gegeven en de styling van TOTO.
Ik heb besloten om op de detail pagina alle teams te weergeven en dan als daarop geklikt wordt de eerst volgende wedstrijd voor dat team en 
de afgelopen 5-10 resultaten. 
En bovenaan de pagina wil ik de wedstrijden van de huidige dag die gespeeld gaan worden zodat de gebruiker weet welke wedstrijden eraan komen en welke
teams wedstrijden hebben waar ze naar kunnen kijken.

Vanuit daar wil ik dan het aantal gescoorde doelpunten optellen, de odds en een paar andere statistieken aangeven om te bepalen welk team de meeste 
kans heeft om te winnen.

Declan zei bij het voortgang gesprek van maandag dat ik de naam iets letterlijker moest nemen en zorgen dat ik met de site mensen echt kan helpen om 
de juiste keuze te maken, door mensen te testen op wat zij denken dat de score geworden was van voorgaande wedstrijden. Meer dus de data die uit de api komt 
niet alleen in beeld brengen, maar gebruiken om een andere dingen te laten zien die helpen bij de bet zetten. 


## Week 3: API en Data gebruiken.

Het is gelukt om de primaire kleuren van de clubs in liquid te gebruiken om de styling van de pagina aan te passen aan de hand van welk team er geselecteerd
wordt door de gebruiker. Nu moet ik werken aan de Live wedstrijden op de index pagina te displayen en de aankomende wedstrijden op de detail pagina te zetten
voor de teams. 

Bovenaan de index pagina staan nu alle wedstrijden van de datum van de dag dat je kijkt. maar alleen van de belangrijkste competities, waarvan ook alle teams
eronder afgebeeld zijn en een detail pagina hebben.

Daarnaast heeft elke detail pagina nu de eerst volgende wedstrijd van het team van de detail pagina en eronder de laatste 5 wedstrijden en de resultaten ervan.
Ik wil ook nog dat de wedstrijden in kleur aangeven of het winst verlies of gelijkspel is geworden, maar die data staat niet in de api, dus dat moet met het aantal
doelpunten voor het team van de pagina als die meer, gelijk, of minder is dan die van het andere team. 

Toen heb ik van Mike een beetje het idee ovegenomen om de achtergrond te laten veranderen elke keer als de pagina reload. Dus ik ging kijken of elk team 4
fanart afbeeldingen in de API had en dat was zo, dus toen kon ik die afbeeldingen ophalen uit de API en randomizen voor de achtergrond.

Ik merk dat ik sinds deze week steeds meer begrijp hoe ik data ophaal en in de liquid zet en het dus ook steeds meer zelf kan. Ik maak nu ook veel
meer vooruitgang dan de eerste 2 weken, maar ik weet nog niet of het genoeg is om aan alle eisen te voldoen.


## Week 4: Web API's en statistieken

Deze laatste week moet ik nog de web api's kiezen en erin zetten en wil ik nog een aantal statistieken uit de football api halen en goed opstellen, 
zoals gescoorde goals en tegen goals, gewonnen, gelijkspel en verloren in de laatste 5 wedstrijden, stand in de competitie, etc.

Ik ben er wel achter gekomen dat de data in de api niet altijd helemaal accuraat is. Het geeft niet direct gewonnen of verloren aan, alleen gescoorde
doelpunten, maar dus niet uitslag van penalties. 

De web API's die gebruikt zijn, zijn Canvas API, waarmee ik voetballen op de achtergrond laat regenen aan de hand van hoeveel goals het team
op de pagina gescoord heeft.
En de tweede is de view transitions API, waarmee ik de overgang van index naar detail mooier maak door het logo van het team die aangeklikt wordt
verplaats en meeschaalt naar het logo van dat team bovenaan de detail pagina. 

Met beide API's had ik een beetje moeite ookal ging de Canvas veel makkelijker dan de View transitions. Bij de canvas het ik een deel van de code 
via chat opgevraagd om te kijken hoe het eruit zou komen te zien. Daarna heb ik een setTimeOut toegevoegd zodat de animatie maar 5 seconden loopt
omdat een constante animatie een beetje teveel was, en gezorgt dat de ballen in beeld blijven als de timeOut afloopt en niet opeens verdwijnen. 
Daarna heb ik gezorgt dat het aantal doelpunten dat in het scherm komt afkomstig is uit het aantal gescoorde doelpunten die in de liquid getoond werd 
en opgehaald werd in de server. 
Dus hoe meer goals het team gescoord heeft, hoe meer ballen op de achtergrond. 

Met de view transitions was het mij eerst niet duidelijk hoe het werkte. In meerdere youtube filmpjes en codepens werd er heel uitgebreid, met javascript
gewerkt en kon ik niet zien wat, wat deed. 
De fade out had ik wel al in CSS erin, maar het verplaatsen van de afbeelding werkte niet. Eerst had ik de view-transition-name in de html/liquid gezet,
maar toen ik met Sanne ernaar keek wees hij mij erop dat dit gewoon in de css moest en dat alle javascript niet nodig was.
Dit was later pas nodig toen ik een class pas op de img wilde zetten als deze geklikt werd, omdat maar 1 element hetzelfde view-transition name mocht hebben
en als alle img's dezelfde class hadden, deze automatisch dezelfde name kregen.

Ik heb dit eerst voor een team gehard code, om het werkend te krijgen en toen dynamisch gemaakt en voor alle teams en competities gedaan.


https://rajputrajesh-448.gumroad.com/ for fonts