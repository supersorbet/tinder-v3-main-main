import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'
import { usePriceCakeWavax, usePriceWethWavax, usePriceWethUsdc, usePriceBnbBusd, usePriceUsdcUsdt, usePriceWavax, usePriceBtc, usePricePng, usePriceCakeBusd, usePriceWavaxUsdc } from '../../../../state/hooks'

interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  depositFeeBP?: number
  decimal?: number
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

const DollarValue = styled(Text)`
	font-weight: 500; 
	font-size: 13px;
  }
`


const StakeAction: React.FC<FarmCardActionsProps> = ({ stakedBalance, tokenBalance, tokenName, pid, depositFeeBP, decimal}) => {
  const TranslateString = useI18n()
  const { onStake } = useStake(pid, decimal)
  const { onUnstake } = useUnstake(pid, decimal)
	
  const rawStakedBalance = getBalanceNumber(stakedBalance, decimal)
  const displayBalance = rawStakedBalance.toLocaleString()
  const displayLpBalance = rawStakedBalance.toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 9 })
  
  // XXXXX STAKED BALANCE IN $ XXXXX
  
  const wPrice = usePriceWavax()
  const uuPrice = usePriceUsdcUsdt() 
  const wwPrice = usePriceWethWavax()
  const wuPrice = usePriceWethUsdc()
  const btcPrice = usePriceBtc()
  const bnbPrice = usePriceBnbBusd()
  const pngPrice = usePricePng()
  const cakePrice = usePriceCakeBusd()
  const wausPrice = usePriceWavaxUsdc()
  const cwPrice = usePriceCakeWavax()
  let dollarValue
  if (pid === 0) {
	dollarValue = (wPrice.toNumber()*rawStakedBalance*(10**12)).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2 })
  } else if (pid === 1) {
	dollarValue = (wuPrice.toNumber()*rawStakedBalance*(10**12)).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2 })
  } else if (pid === 2) {
	dollarValue = (btcPrice.toNumber()*rawStakedBalance*(10**2)).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2 })
  } else if (pid === 3) {
	dollarValue = (pngPrice.toNumber()*rawStakedBalance*(10**12)).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2 })
  } else if (pid === 4 || pid === 5 || pid === 6) {
	dollarValue = (uuPrice.toNumber()*rawStakedBalance).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2 })
  } else if (pid === 7) { // XXXXXXXXXXXXXX PROBLEMA CON LA 7
	dollarValue = (wausPrice.toNumber()*1.222*rawStakedBalance*(10**(-3))).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2 })
  } else if (pid === 8) {
	dollarValue = (wwPrice.toNumber()*2*rawStakedBalance*10).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2 })
  } else if (pid === 9) {
	dollarValue = (uuPrice.toNumber()*2*rawStakedBalance*(10**12)).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2 })
  } else if (pid === 10) {
	dollarValue = (cakePrice.toNumber()*rawStakedBalance).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2 })
  } else if (pid === 11) {
	dollarValue = (cakePrice.toNumber()*(uuPrice.toNumber()**(-1))*rawStakedBalance*110000).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2 }) 
	dollarValue+= " (may not be accurate)"
  } else if (pid === 12) {
	dollarValue = ((cwPrice.toNumber()*rawStakedBalance)/0.024313).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2 })
	dollarValue+= " (may not be accurate)"
  } else {
	  dollarValue = 1
  }
  
  // XXXXX STAKED BALANCE IN $ XXXXX

  const [onPresentDeposit] = useModal(<DepositModal max={tokenBalance} onConfirm={onStake} tokenName={tokenName} depositFeeBP={depositFeeBP} />)
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={tokenName} decimal={decimal}/>,
  )

  const renderStakingButtons = () => {
    return rawStakedBalance === 0 ? (
      <Button onClick={onPresentDeposit}>{TranslateString(999, 'Stake')}</Button>
    ) : (
      <IconButtonWrapper>
        <IconButton variant="tertiary" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="#FFFFFF" />
        </IconButton>
        <IconButton variant="tertiary" onClick={onPresentDeposit}>
          <AddIcon color="#FFFFFF" />
        </IconButton>
      </IconButtonWrapper>
    )
  }

let finalDisplayBalance
if (rawStakedBalance >= 1) {
	finalDisplayBalance = displayBalance
} else {
	finalDisplayBalance = displayLpBalance
}

	return (
	<>
    <Flex justifyContent="space-between" alignItems="center">
      <Heading color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>{finalDisplayBalance}</Heading>
      {renderStakingButtons()}
    </Flex>
	
<Flex justifyContent="space-between" alignItems="center">
      <DollarValue color={rawStakedBalance === 0 ? 'textDisabled' : '#DDDDDD'}>~${dollarValue}</DollarValue>
    </Flex>
	</>
  )
}

export default StakeAction
