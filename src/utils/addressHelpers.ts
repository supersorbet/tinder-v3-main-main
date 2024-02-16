import addresses from 'config/constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID

export const getCakeAddress = () => {
  return addresses.cake[chainId]
}
export const getMasterChefAddress = () => {
  return addresses.masterChef[chainId]
}
export const getSousChefAddress = () => {
  return addresses.sousChef[chainId]
}
export const getMulticallAddress = () => {
  return addresses.multiCall[chainId]
}
export const getWbnbAddress = () => {
  return addresses.weth[chainId]
}
export const getLotteryAddress = () => {
  return addresses.lottery[chainId]
}
export const getLotteryTicketAddress = () => {
  return addresses.lotteryNFT[chainId]
}
