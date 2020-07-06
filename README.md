# Last FM API Wrapper

LastFM is a music service to keep track of everything you listen, as well as recommendations and information about artists, songs, gigs, etc.

This project is to create a simple wrapper for the LastFM API.

## Reasons behind the project

The [Last FM API](https://www.last.fm/api/) is not that easy to follow, since they don't follow a lot of good practices while using a rest API.

So I created this wrapper that makes easy the use of the API, using more a REST standarized API for nomenclature and parameters. Also making it easy to include your token.
Right now it has my user hardcoded, but shouldn't be that hard to make it parameritized.

This application is deployed using Heroku, and can be found [here](https://lastfm-api.herokuapp.com/api-docs/)

## How To Run

I included several useful scripts in the package.json.
First you would need to install all the dependencies with:

```bash
npm run install
```

After that you will need to create your file `.env` following the `.exampleenv` file. Here you need to set your LASTFM token and your hostname (which can be localhost if your are running it locally) and the PORT if you want to specify it. Then, you can use:

```bash
npm run dev
```

That should run the project using hot reloads with `nodemon`, and then you can go to: `<hostname>:<port>/api-docs`

## Why Do You Include The Dist Folder

In order to have an easy deploy to Heroku (a simple `npm start`), I need the compiled version of the project (meaning after babel process it). So I left it there, as the only thing I need to do is:

```bash
git push heroku master
```
