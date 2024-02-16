import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'

const StyledCakeContracts = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 13px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeContracts = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms();
  const eggPrice = usePriceCakeBusd();
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = eggPrice.times(circSupply);

  let cornPerSecond = 0;
  if(farms && farms[0] && farms[0].cornPerSecond){
    cornPerSecond = new BigNumber(farms[0].cornPerSecond).div(new BigNumber(10).pow(18)).toNumber();
  }

  return (
    <StyledCakeContracts>
      <CardBody>
        <Heading size="xl" mb="24px" color="#FFFFFF">
          {TranslateString(999, 'Contracts')}
        </Heading>
        <Row>
          <Text fontSize="14px" color="#FFFFFF">{TranslateString(999, 'CORN Coin')}</Text>
          <a target="_blank" rel="noreferrer noopener" href="https://cchain.explorer.avax.network/address/0xFcA54c64BC44ce2E72d621B6Ed34981e53B66CaE/contracts" color="#fb2141">0xFcA54c64BC44ce2E72d621B6Ed34981e53B66CaE</a> {/* XXXXCORN */}
        </Row>
        <Row>
          <Text fontSize="14px" color="#FFFFFF">{TranslateString(999, 'MasterChef')}</Text>
        <a target="_blank" rel="noreferrer noopener" href="https://cchain.explorer.avax.network/address/0x27271ECd985F1B666e51209B033d93ddC5a36076/contracts" color="#fb2141">0x27271ECd985F1B666e51209B033d93ddC5a36076</a> {/* XXXXMASTERCHEF */}
        </Row>
        <Row>
          <Text fontSize="14px" color="#FFFFFF">{TranslateString(999, 'Timelock')}</Text>
        <a target="_blank" rel="noreferrer noopener" href="https://cchain.explorer.avax.network/address/0xc14BFa11c072d5e5735092CEe376Be905B9D7359/contracts" color="#fb2141">0xc14BFa11c072d5e5735092CEe376Be905B9D7359</a> {/* XXXXTIMELOCK */}
        </Row>
		<Row>
          <Text fontSize="14px" color="#FFFFFF">{TranslateString(999, 'LiqLocker')}</Text>
        <a target="_blank" rel="noreferrer noopener" href="https://cchain.explorer.avax.network/address/0xAfbD20B5E79fAdBc0c0B9AbA64cBb5d27D995bFD/contracts" color="#fb2141">0xAfbD20B5E79fAdBc0c0B9AbA64cBb5d27D995bFD</a> {/* XXXXLOCKER */}
        </Row>
      </CardBody>
    </StyledCakeContracts>
  )
}

export default CakeContracts
