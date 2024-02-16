import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Heading } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd, usePriceWethWavax, usePriceWethUsdc } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Hero from './components/Hero'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'

export interface FarmsProps{
  tokenMode?: boolean
  dividendsMode?: boolean
}

let wPrice
let uPrice

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeBusd()
  wPrice = usePriceWethWavax()
  uPrice = usePriceWethUsdc()
  const bnbPrice = usePriceBnbBusd()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const {tokenMode} = farmsProps;
  const {dividendsMode} = farmsProps;


  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X')
  
  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  
    

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }
        const cakeRewardPerBlock = new BigNumber(farm.cornPerSecond || 1).times(new BigNumber(farm.poolWeight)).div(new BigNumber(10).pow(18))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = cakePrice.times(cakeRewardPerYear);

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0);

        if (farm.quoteTokenSymbol === QuoteToken.USDC) {
          totalValue = totalValue.times(bnbPrice);
        }

        /* if (farm.pid === 13) {
          totalValue = totalValue.times(16.91**3);
        } */
		if (farm.pid === 8) {
			totalValue = totalValue.times(bnbPrice.times(1/1.142));
		}
		
		else if (farm.quoteTokenSymbol === QuoteToken.WAVAX) { // CORN-WAVAX e USDC-WAVAX
          totalValue = totalValue.times(61.060365);
        } 
		
		else if (farm.pid === 9) { // USDC.e-USDT.e
			totalValue = totalValue.times(10.202**10);
		}
		
		else { // TUTTE LE ALTRE
          totalValue = totalValue.times(1/80.2);
        } 
		
		/* if (farm.pid === 5) {
          totalValue = totalValue.times(10**12);
        } */

        if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
          totalValue = totalValue.times(cakePrice);
        }

        if(totalValue.comparedTo(0) > 0){
          apy = apy.div(totalValue.div(4)); // XXXXX APR MODIFIER, PORTA A div(2) SE NON C'é IL BUG DEL DOUBLE HARVEST
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          cakePrice={cakePrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [account, cakePrice, ethereum, bnbPrice],
  )



  return (
    <>
    <Hero tokenMode={tokenMode} dividendsMode={dividendsMode}/>
    <Page>
      {/* <Heading as="h1" size="lg" color="primary" mb="50px" style={{ textAlign: 'center' }}>
        {
          tokenMode ?
            TranslateString(10002, 'Stake tokens to earn CORN')
            :
          TranslateString(320, 'Stake LP tokens to earn CORN')
        }
      </Heading>
      <Heading as="h2" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
        {TranslateString(10000, 'Deposit Fee will be used to buyback CORN')}
      </Heading> */}
      <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly}/>
      <div>
        <Divider />
        <FlexLayout>
          <Route exact path={`${path}`}>
            {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsList(inactiveFarms, true)}
          </Route>
        </FlexLayout>
      </div>
      {/* <Image src="/images/egg/LogoTextNewDark.png" alt="illustration" width={1218} height={198} responsive /> */}
      </Page>
      </>
  )


}


export default Farms
