import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';


const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();

app
  .use(logger())
  .use('/', sirv('dist'))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));

  app.get('/', async (req, res) => {
    const eredivisie = await fetch('https://www.thesportsdb.com/api/v1/json/690867/search_all_teams.php?l=Dutch%20Eredivisie')
    const eredivisieData = await eredivisie.json()
  
    const Bpl = await fetch('https://www.thesportsdb.com/api/v1/json/690867/search_all_teams.php?l=English%20Premier%20League')
    const BplData = await Bpl.json()

    const LaLiga = await fetch('https://www.thesportsdb.com/api/v1/json/690867/search_all_teams.php?l=Spanish%20La%20Liga')
    const LaLigaData = await LaLiga.json()

    const Bundesliga = await fetch('https://www.thesportsdb.com/api/v1/json/690867/search_all_teams.php?l=German%20Bundesliga')
    const BundesligaData = await Bundesliga.json()

    const SerieA = await fetch('https://www.thesportsdb.com/api/v1/json/690867/search_all_teams.php?l=Italian%20Serie%20A')
    const SerieAData = await SerieA.json()

    const ChampionsLeague = await fetch('https://www.thesportsdb.com/api/v1/json/690867/search_all_teams.php?l=UEFA%20Champions%20League')
    const ChampionsLeagueData = await ChampionsLeague.json()

    const EuropaLeague = await fetch('https://www.thesportsdb.com/api/v1/json/690867/search_all_teams.php?l=UEFA%20Europa%20League')
    const EuropaLeagueData = await EuropaLeague.json()  

    const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const currentDate = `${year}-${month}-${day}`;

      const matchesResponse = await fetch(`https://www.thesportsdb.com/api/v1/json/690867/eventsday.php?d=${currentDate}&s=Soccer`);
      const matchesData = await matchesResponse.json();

      const displayedLeagues = ['Dutch Eredivisie', 'English Premier League','Spanish La Liga','Italian Serie A','German Bundesliga', 'UEFA Champions League', 'UEFA Europa League'];
      const filteredMatches = matchesData.events.filter(events => {
    return displayedLeagues.includes(events.strLeague);
});


   return res.send(renderTemplate('server/views/index.liquid', 
    { title: 'Competities', 
      eredivisieData: eredivisieData, 
      BplData: BplData,
      ChampionsLeagueData: ChampionsLeagueData,
      LaLigaData: LaLigaData,
      BundesligaData: BundesligaData,
      SerieAData: SerieAData,
      EuropaLeagueData: EuropaLeagueData, 
      matchesData: filteredMatches,
      currentDate: currentDate
    }));
  });
  
  app.get('/team/:strTeam/', async (req, res) => {
    const teamName = req.params.strTeam;
    const team = await fetch('https://www.thesportsdb.com/api/v1/json/690867/searchteams.php?t=' + teamName);
    const teamData = await team.json();
    const backgroundColour1 = teamData.teams[0].strColour1;
    const backgroundColour2 = teamData.teams[0].strColour2;

    const backgroundImages = [
    teamData.teams[0].strFanart1,
    teamData.teams[0].strFanart2,
    teamData.teams[0].strFanart3,
    teamData.teams[0].strFanart4
    ];

    const validBackgroundImages = backgroundImages.filter(image => image);
    const randomBackgroundImage = validBackgroundImages[Math.floor(Math.random() * validBackgroundImages.length)];

    // console.log(randomBackgroundImage);


    const nextGame = await fetch('https://www.thesportsdb.com/api/v1/json/690867/eventsnext.php?id=' + teamData.teams[0].idTeam);
    const nextGameData = await nextGame.json(); 

    const playedMatches = await fetch('https://www.thesportsdb.com/api/v1/json/690867/eventslast.php?id=' + teamData.teams[0].idTeam);
    const playedMatchesData = await playedMatches.json();

    const lastFiveGames = playedMatchesData.results.slice(0, 5);

    console.log(lastFiveGames);

    let gescoordeGoals = 0;
    let gescoordeTegenGoals = 0;
    lastFiveGames.forEach(game => {
      if (game.strAwayTeam === teamData.teams[0].strTeam) {
        gescoordeGoals += Number(game.intAwayScore);
        gescoordeTegenGoals += Number(game.intHomeScore);
      } else {
        gescoordeGoals += Number(game.intHomeScore);
        gescoordeTegenGoals += Number(game.intAwayScore);
      }
    });

    let gewonnenGames = 0;
    let gelijkSpelGames = 0;
    let verlorenGames = 0;
    lastFiveGames.forEach(game => {
      if (game.strAwayTeam === teamData.teams[0].strTeam) {
        gewonnenGames += Number(game.intAwayScore) > Number(game.intHomeScore) ? 1 : 0;
        gelijkSpelGames += Number(game.intAwayScore) === Number(game.intHomeScore) ? 1 : 0;
        verlorenGames += Number(game.intAwayScore) < Number(game.intHomeScore) ? 1 : 0;
      } else {
        gewonnenGames += Number(game.intHomeScore) > Number(game.intAwayScore) ? 1 : 0; 
        gelijkSpelGames += Number(game.intHomeScore) === Number(game.intAwayScore) ? 1 : 0;  
        verlorenGames += Number(game.intHomeScore) < Number(game.intAwayScore) ? 1 : 0;
      }
    }
    );  

    console.log(gewonnenGames)


    // console.log({gescoordeGoals})
    // console.log({gescoordeTegenGoals})

    return res.send(
      renderTemplate('server/views/detail.liquid', { 
        team: teamData.teams[0],
        backgroundColour1: backgroundColour1,
        backgroundColour2: backgroundColour2,
        nextGame: nextGameData.events[0],   
        lastFiveGames: lastFiveGames,
        randomBackgroundImage: randomBackgroundImage,
        gescoordeGoals: gescoordeGoals,
        gescoordeTegenGoals: gescoordeTegenGoals,
        gewonnenGames: gewonnenGames,
        gelijkSpelGames: gelijkSpelGames,
        verlorenGames: verlorenGames  
     })
    );
  });



  
    
//  APIKEY FOR SPORTSDB: 690867



  // app.get('/', async (req, res) => {
  //   const matches = await fetch('https://api.football-data.org/v4/competitions/PL/matches?status=TIMED', {
  //     headers: {
  //       'X-Auth-Token': '56a8563e25f64b1ab1a80730db11b4b4',
  //     },
  //   });
  //   const matchesData = await matches.json();
  //   console.log(matchesData);
  // });




    
    
    // const otherApi = await fetch('http://api.football-data.org/v4/competitions/2003/matches?matchday=1')

    // const matches = async () => {
    //   const url = 'http://api.football-data.org/v4/competitions/2003/matches?matchday=1';
    //   try {
    //     const response = await fetch(url)
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }

    //     const jsonData = await response.json();
    //     console.log('JSON data:', jsonData);
    //     return jsonData;
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // } 
  
  const renderTemplate = (template, data) => {
    const templateData = {
      NODE_ENV: process.env.NODE_ENV || 'production',
      ...data
    };
  
    return engine.renderFileSync(template, templateData);
  };



  
  
   
  //  Token code
  //  CLZ3Pk9BmtmynH7l7b7x4bWuarw7cJ3O2ptuU1DQvfH3uvxHYyuARaPNwepO
  
  // https://www.thesportsdb.com/free_sports_api
  //https:www.thesportsdb.com/api/v1/json/3/searchteams.php?t=Manchester_United
  
  // Livescores
  // https://www.football-data.org/coverage
  
  
