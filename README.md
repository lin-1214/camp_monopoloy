# 2022_camp

This is the website of game "Monopoly" in NTUEE camp for freshman!

By rayray2002, jerry1249756 and hackhaha1

## Development
### Frontend
```bash
cd frontend
yarn start
```

### Backend
```bash
cd backend
yarn initdata
yarn server
```
## Deployment
### Local
```bash
yarn build-frontend
yarn start
```

### Docker
Image: [rayray2002/monopoly](https://hub.docker.com/r/rayray2002/monopoly)
#### Build and Push
```bash
bash scripts/build_and_push.sh
```

#### Run
```bash
# Simple
docker-compose up -d
# Pull and Run
bash scripts/run.sh
```

#### Init
```bash
bash scripts/initdb.sh
```
