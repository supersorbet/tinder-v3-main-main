import BigNumber from 'bignumber.js'
import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmsPublicDataAsync, fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync } from './actions'
import { State, Farm, Pool } from './types'
import { QuoteToken } from '../config/constants/types'

const ZERO = new BigNumber(0)

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    // dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])
}

// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
	lockup: farm.userData ? new BigNumber(farm.userData.lockup) : new BigNumber(0),
  }
}


// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolFromPid = (sousId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return pool
}

// Prices

export const usePriceWavaxUsdc = (): BigNumber => {
  const pid = 5; // WAVAX-USDC LP : DEFAULT 7
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceBnbBusd = (): BigNumber => {
  const pid = 7; // WAVAX-USDC LP : DEFAULT 7
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceCakeBusd = (): BigNumber => {
  const pid = 11; // CORN-USDC LP : DEFAULT 11
  const farm = useFarmFromPid(pid);
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO;
}

export const usePriceUsdcUsdt = (): BigNumber => {
  const pid = 9; // CORN-USDC LP : DEFAULT 11
  const farm = useFarmFromPid(pid);
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO;
}

export const usePriceWethWavax = (): BigNumber => {
  const pid = 8; // CORN-USDC LP : DEFAULT 11
  const farm = useFarmFromPid(pid);
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO;
}

export const usePriceWethUsdc = (): BigNumber => {
  const pid = 1; // CORN-USDC LP : DEFAULT 11
  const farm = useFarmFromPid(pid);
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO;
}

export const usePriceWavax = (): BigNumber => {
  const pid = 0; // CORN-USDC LP : DEFAULT 11
  const farm = useFarmFromPid(pid);
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO;
}

export const usePriceBtc = (): BigNumber => {
  const pid = 2; // CORN-USDC LP : DEFAULT 11
  const farm = useFarmFromPid(pid);
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO;
}

export const usePricePng = (): BigNumber => {
  const pid = 3; // CORN-USDC LP : DEFAULT 11
  const farm = useFarmFromPid(pid);
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO;
}

export const usePriceCakeWavax = (): BigNumber => {
  const pid = 12; // CORN-USDC LP : DEFAULT 11
  const farm = useFarmFromPid(pid);
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO;
}

export const useTotalValue = (): BigNumber => {
  const farms = useFarms();
  const bnbPrice = usePriceBnbBusd();
  const cakePrice = usePriceCakeBusd();
  const uuPrice = usePriceUsdcUsdt();
  const wwPrice = usePriceWethWavax();
  const wuPrice = usePriceWethUsdc();
  let value = new BigNumber(0);
  for (let i = 0; i < farms.length; i++) {
    const farm = farms[i]
    if (farm.lpTotalInQuoteToken) {
      let val;

      /* if (farm.pid === 5) {
        value = value.plus((bnbPrice.times(farm.lpTotalInQuoteToken).times(10**12)));
      } */

	  /* if (farm.pid === 8) {
		value = value.plus(bnbPrice.times(farm.lpTotalInQuoteToken));
	  } 
      else */ if (farm.pid === 4) {
        value = value.plus(uuPrice.times(farm.lpTotalInQuoteToken))
      }
      else if (farm.quoteTokenSymbol === QuoteToken.WAVAX) {
        value = value.plus(bnbPrice.times(farm.lpTotalInQuoteToken));
      } 
      else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
        value = value.plus(cakePrice.times(farm.lpTotalInQuoteToken));
      } 
	  else if (farm.pid === 9) { // USDC.e-USDT.e
		value = value.plus(uuPrice.times(farm.lpTotalInQuoteToken).times(10**12));
	  }
      else {
        value = value.plus(farm.lpTotalInQuoteToken); // USDC etc
      } 


      // value = value.plus(val);

    }
  }
  const output = value.toString() === Infinity.toString() ? new BigNumber(0): value;
  return output;
}
