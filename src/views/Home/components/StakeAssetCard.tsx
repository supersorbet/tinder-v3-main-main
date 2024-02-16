import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@pancakeswap-libs/uikit'
import { NavLink } from 'react-router-dom'
import farms from 'config/constants/farms'
import { Farm } from 'state/types'
// import { useTranslation } from 'contexts/Localization'

const activeNonCakePools = farms.filter((farm) => !farm.lpSymbol.includes('CORN'))
const latestPools: Farm[] = orderBy(activeNonCakePools, ['sortOrder', 'pid'], ['desc', 'desc']).slice(0, 3)
// Always include CORN
const assets = ['CORN', ...latestPools.map((farm) => farm.lpSymbol)].join(', ')

const StakeAssetCard = () => {
  // const { t } = useTranslation()
  const assetText = 'Stake %assets% in Pools'
  const [earn, InPools] = assetText.split(assets)

  return (
    <Block className='type-1'>
      <NavLink exact activeClassName="active" to="/pools" id="pool-cta">
        <Subtitle color="#FFFFFF">
          Stake
        </Subtitle>
        <Title color='#FFFFFF'>
          CORN, WAVAX, PNG...
        </Title>
        <Subtitle color="#FFFFFF">
          In Pools
          <ArrowForwardIcon mt={70} color="text" style={{float: 'right'}} />
        </Subtitle>
      </NavLink>
    </Block>
  )
}

export default StakeAssetCard

const Block = styled.div`
  width: 350px;
  padding: 15px 24px;
  box-shadow: 1px 1px 1px rgba(23, 18, 43, 0.1);
  border-radius: 27px;
  text-align: left;
  position: relative;
  &.type-1 {
    background-image: url('/images/egg/earn.png');
    backdrop-filter: blur(5px);
    background-position: center;
    background-repeat: no-repeat;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`
const Subtitle = styled.div<{ color: string }>`
  font-size: 24px;
  line-height: 50px;

  color: ${({ color }) => color};
`
const Title = styled.div<{ color: string }>`
  font-size: 30px;
  line-height: 50px;
  font-weight: 600;
  color: ${({ color }) => color};
`