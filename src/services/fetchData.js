import { fetchFromSubgraph } from '../utils/graphqlClient.js';

const EIGEN_SUBGRAPH = 'https://api.thegraph.com/subgraphs/name/eigenlayer/eigenlayer';
const LIDO_SUBGRAPH = 'https://api.thegraph.com/subgraphs/name/lido/lido';

export async function getRestakers() {
  const query = `{
    restakings(first: 10) {
      id
      amount
      restaker
      operator {
        id
      }
    }
  }`;
  const data = await fetchFromSubgraph(EIGEN_SUBGRAPH, query);
  return data?.restakings.map(r => ({
    address: r.restaker,
    amountRestaked: r.amount,
    validatorAddress: r.operator?.id || 'unknown'
  })) || [];
}

export async function getValidators() {
  const query = `{
    operators(first: 10) {
      id
      totalStake
      status
      slashEvents {
        timestamp
        amount
        reason
      }
    }
  }`;
  const data = await fetchFromSubgraph(EIGEN_SUBGRAPH, query);
  return data?.operators.map(v => ({
    operatorId: v.id,
    operatorAddress: v.id,
    totalDelegated: v.totalStake,
    status: v.status,
    slashHistory: v.slashEvents.map(e => ({
      date: new Date(parseInt(e.timestamp) * 1000).toISOString(),
      amount: e.amount,
      reason: e.reason || 'unknown'
    }))
  })) || [];
}

export async function getRewards(address) {
  const query = `{
    rewards(where: {user: "${address.toLowerCase()}"}) {
      amount
      timestamp
      operator {
        id
      }
    }
  }`;
  const data = await fetchFromSubgraph(EIGEN_SUBGRAPH, query);
  const breakdown = data?.rewards.map(r => ({
    validator: r.operator.id,
    amount: r.amount,
    timestamp: new Date(parseInt(r.timestamp) * 1000).toISOString()
  })) || [];

  const totalRewards = breakdown.reduce((acc, r) => acc + parseFloat(r.amount), 0);
  return {
    totalRewards: totalRewards.toFixed(2),
    breakdown
  };
}