import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Flex, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import { usePriceCakeBusd } from '../../../state/hooks'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getCakeAddress } from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'

const StyledFarmStakingCard = styled(Card)`
position: relative;
overflow: hidden;
z-index: 2;
max-width: 300px;

&:before {
  content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.9;
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
  }
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => "#E9EAEB"};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`

const Divider = styled.div`
  background-color: ${({ theme }) => "#FFFFFF"};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const token = getCakeAddress();

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const eggPrice = usePriceCakeBusd().toNumber()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  const addWatchJaguarToken = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const provider = window.ethereum
    if (provider) {
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await provider.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: token,
              symbol: 'CORN',
              decimals: '18',
              image: 'https://farmersonly.farm/images/egg/3.png',
            },
          },
        })

        if (wasAdded) {
          // console.log('Token was added')
        }
      } catch (error) {
        // TODO: find a way to handle when the user rejects transaction or it fails
      }
    }
  }, [])



  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="lg" mb="24px" color="#FFFFFF">
          {TranslateString(999, 'Your Project? 👀')}
        </Heading>
        
        <CardImage src="/images/farms/xxx.png" alt="???" width={64} height={64} />
        <Flex justifyContent='space-between' alignItems='center'>
          <Text color="#FFFFFF">{TranslateString(352, 'APR')}:</Text>
          <Text color="#FFFFFF" bold style={{ display: 'flex', alignItems: 'center' }}>
                ???%
          </Text>
        </Flex>
        <Flex justifyContent='space-between'>
        <Text color="#FFFFFF">{TranslateString(318, 'Earn')}:</Text>
        <Text color="#FFFFFF" bold>???</Text>
      </Flex>
      <Flex justifyContent='space-between'>
        <Text color="#FFFFFF">{TranslateString(999, 'Your Stake')}:</Text>
        <Text mb="10px" color="#FFFFFF" bold>??? CORN</Text>
      </Flex>
      <Divider />
      <Flex justifyContent='space-between'>
        <Text color="#FFFFFF">{TranslateString(999, 'Create a pool for your token!')}</Text>
        {/* <Text color="#FFFFFF" bold style={{ fontSize: '24px' }}>{(farm.depositFeeBP / 100)}%</Text> */}
      </Flex>
        
        <Actions>
          <a href="https://t.me/FarmersOnlyDev2" target="_blank" rel="noreferrer">
        <Button id="harvest-all"  fullWidth >Apply now</Button>
      </a>
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
