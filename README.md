# EigenLayer Restaking Info API

## 🚀 Description
This REST API fetches and serves EigenLayer restaking data like user restakings, validator metadata, and rewards.

## 📦 Endpoints
- `GET /restakers`: Returns users and stETH restaked to validators.
- `GET /validators`: Lists validators with stake, status, and slashing info.
- `GET /rewards/:address`: Returns total rewards and breakdown by validator.

## 🔧 Setup
```bash
npm install
npm start
```

## 📡 Data Sources
- [EigenLayer Subgraph](https://thegraph.com/)
- [Lido Subgraph](https://thegraph.com/)

## 📁 Notes
- The project currently fetches real-time data directly from subgraphs.
- For performance, you can cache results using MongoDB or Redis (not mandatory).

## 🧪 Sample Usage
```
curl http://localhost:3000/restakers
curl http://localhost:3000/validators
curl http://localhost:3000/rewards/0xYourAddressHere
```

## 🧠 Assumptions
- Slash reasons may be `null` in data; replaced with 'unknown'.
- Rewards are aggregated per operator from subgraph logs.