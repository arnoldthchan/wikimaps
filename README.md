# :round_pushpin: Wikimaps :round_pushpin:

* Jonathan Lam
* Arnold Chan
* Tak Ng

# :round_pushpin: Getting Started :round_pushpin: 

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

# :round_pushpin: Dependencies :round_pushpin:

- Bcrypt 1.0.2
- Body-parser 1.15.2 or above
- Connect-ensure-login 0.1.1 or above
- Dotenv 2.0.0 or above
- ejs 2.4.1 or above
- Express 4.13.4 or above 
- Express-session 1.15.4 or above
- Knex 0.11.10 or above
- Knex-logger 0.1.0 or above
- Morgan 1.7.0 or above
- Node 5.10.x or above
- NPM 3.8.x or above
- Passport 0.3.2 or above
