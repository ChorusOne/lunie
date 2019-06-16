const dev = process.env.NODE_ENV === `development`
const stargate =
  process.env.STARGATE ||
  (dev ? `http://18.194.115.235:1317` : `https://stargate.lunie.io`)

const rpc =
  process.env.RPC || (dev ? `18.194.115.235:26657` : `https://rpc.lunie.io:26657`)

export default {
  name: `Lunie`,
  development: dev,
  network: process.env.NETWORK || `local-testnet`,
  stargate,
  rpc,
  google_analytics_uid: process.env.GOOGLE_ANALYTICS_UID || "",
  sentry_dsn: process.env.SENTRY_DSN || "",
  node_halted_timeout: 120000,
  block_timeout: 10000,
  default_gas_price: dev ? 1e-9 : 2.5e-8, // recommended from Cosmos Docs
  version: process.env.RELEASE,

  // Ledger
  CosmosAppTestModeAllowed: false
}
