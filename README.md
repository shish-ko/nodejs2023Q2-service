# Home Library Service

## Downloading

```
git clone git@github.com:shish-ko/nodejs2023Q2-service.git
```
## Switch to develop branch

```
git checkout docker
```

## Installing NPM modules

```
npm install
```

## Set environment variables

Add **.env** file with variables listed in _.env.example_ file

## Running application

```
docker compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.

## Testing

After application running open new terminal and enter:

```
npm run test
```
