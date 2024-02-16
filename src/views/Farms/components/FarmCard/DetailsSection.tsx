import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from '@pancakeswap-libs/uikit'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Address } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { usePriceWethWavax, usePriceWethUsdc, usePriceBnbBusd } from '../../../../state/hooks'

export interface ExpandableSectionProps {
  isTokenOnly?: boolean
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: BigNumber
  lpLabel?: string
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  otherExchange?: string
  tokenAddresses: Address
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => "#FFFFFF"};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

let totalValueUSDCUSDT

let totalValueWAVAXWETH

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  isTokenOnly,
  bscScanAddress,
  removed,
  totalValueFormated,
  lpLabel,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
  otherExchange
}) => {
  const TranslateString = useI18n()
  const wwPrice = usePriceWethWavax()
  const wuPrice = usePriceWethUsdc()
  const bnbPrice = usePriceBnbBusd()
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })

  let externalLink = isTokenOnly ?
    `https://app.pangolin.exchange/#/swap/${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
    :
    `https://app.pangolin.exchange/#/add/${liquidityUrlPathParts}`;
  
  if (otherExchange === 'PolyZap') {
    externalLink = isTokenOnly ?
    `https://polyzap.app/#/swap/${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
    :
    `https://polyzap.app/#/add/${liquidityUrlPathParts}`;
  }

    totalValueUSDCUSDT = totalValueFormated
    ? `$${Number(new BigNumber(totalValueFormated).times(10**12)).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'
	
	const totalValueUSDC = totalValueFormated
	? `$${Number(new BigNumber(totalValueFormated).times(70)).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'
	
	const totalValueCORNWAVAX = totalValueFormated
    ? `$${Number(new BigNumber(totalValueFormated).times(70)).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

    const totalValueCorn = totalValueFormated
    ? `$${Number(totalValueFormated).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'
	
	totalValueWAVAXWETH = totalValueFormated
	? `$${Number(new BigNumber(totalValueFormated).times(bnbPrice)).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

    
  // const totalValueString = Number(totalValueser).toLocaleString(undefined, { maximumFractionDigits: 0 })
  
  let totalValueFinal

  if (lpLabel === 'USDC.e-USDT.e LP') { // XXXXXX
	totalValueFinal = totalValueUSDCUSDT
	} else if (lpLabel === 'CORN-WAVAX LP') {
    totalValueFinal = totalValueCORNWAVAX
	} else if (lpLabel === 'USDC.e') {
    totalValueFinal = totalValueUSDC
	} else if (lpLabel === 'WAVAX-WETH.e LP') {
    totalValueFinal = totalValueWAVAXWETH
	} else {
	totalValueFinal = totalValueCorn
	}

  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text color="#FFFFFF">{TranslateString(316, 'Stake')}:</Text>
        <StyledLinkExternal href={
          externalLink
        }>
          {lpLabel}
        </StyledLinkExternal>
      </Flex>
      {!removed && (
        <Flex justifyContent="space-between">
          <Text color="#FFFFFF">{TranslateString(23, 'Total Liquidity')}:</Text>
          <Text color="#FFFFFF">{totalValueFinal}</Text>
        </Flex>
      )}
      <Flex justifyContent="flex-start">
        <Link external href={bscScanAddress} bold={false}>
          {TranslateString(356, 'View on Avax Explorer')}
        </Link>
      </Flex>
    </Wrapper>
  )
	
}

export const totalValueUU = totalValueUSDCUSDT
export const totalValueWW = totalValueWAVAXWETH

export default DetailsSection
