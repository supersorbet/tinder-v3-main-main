import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import styled from 'styled-components'
import { useFarmUser } from 'state/hooks'
import useStake from '../../../../hooks/useStake'
import { usePriceCakeBusd } from '../../../../state/hooks'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
  decimal?: number
}

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const DollarValue = styled(Text)`
	font-weight: 500; 
	font-size: 13px;
  }
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid, decimal}) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const { onStake } = useStake(pid, decimal)
  const { stakedBalance } = useFarmUser(pid)

  const rawEarningsBalance = getBalanceNumber(earnings.times(2), decimal) // XXXXXX RIMUOVI IL TIMES(2) SE NN C'é IL BUG DEL DOUBLE HARVEST
  let displayBalance
  
  if (rawEarningsBalance < 1) {
	displayBalance = rawEarningsBalance.toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 8 });
  } else {
	  	displayBalance = rawEarningsBalance.toLocaleString();
  }
  
  const cakePrice = usePriceCakeBusd()
  const dollarValue = (cakePrice.toNumber()*rawEarningsBalance).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 4 })
  
  /* const canHarvest = lockup.isEqualTo(0)
  const harvestBlank = stakedBalance.isEqualTo(0)
  
  
  
  const harvestTime = new Date(lockup.toNumber() * 1000).toISOString().substr(11, 8);
  
  let harvestHelper 
  if (canHarvest || harvestBlank) {
	  harvestHelper = "Harvest"
  }
  else 
  {
	  harvestHelper = harvestTime
  } */

  return (
    <Flex mb='8px' justifyContent='space-between' alignItems='center'>
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
	  
      <BalanceAndCompound>
        {pid === 10 ?  // COMPOUND PID PIDCOMPOUND COMPOUNDPID
          <Button
            disabled={rawEarningsBalance === 0 || pendingTx} // || !canHarvest
            size='sm'
            variant='secondary'
            marginBottom='15px'
            onClick={async () => {
              setPendingTx(true)
              await onStake(rawEarningsBalance.toString())
              setPendingTx(false)
            }}
          >
            {TranslateString(999, 'Compound')}
          </Button>
          : null}
		  <Flex justifyContent="space-between" alignItems="center">
      <DollarValue color={rawEarningsBalance === 0 ? 'textDisabled' : '#DDDDDD'}>~${dollarValue}</DollarValue>
    </Flex>
        <Button
          disabled={rawEarningsBalance === 0 || pendingTx} // || !canHarvest
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            setPendingTx(false)
          }}
        >
		{/* {canHarvest || harvestBlank ?
		  harvestHelper
		  :
		  harvestTime
		} */ }
		  Harvest
        </Button>
      </BalanceAndCompound>
    </Flex>
  )
}

export default HarvestAction
