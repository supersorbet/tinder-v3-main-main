// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { Button, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import Container from 'components/layout/Container'
import Hero from './components/Hero'
import Title from './components/Title'

const Content = styled(Container)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr minmax(auto, 436px);
  }
`

const Block = styled.div`
  margin-bottom: 32px;
`

const MainImage = styled.img`
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`

const MobileImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 136px;
  padding: 16px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`

const LiquidityLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
`

const Vaults = () => {
  const TranslateString = useI18n()

  return (
    <>
    <Hero />
    <Page>
      {/* <Content> */}
        <div>
          <Block>
            <Title as="h2">{TranslateString(999, 'Coming Soon to FarmersOnly Finance.')}</Title>
            <Text mb={3}>
              {TranslateString(
                504,
                'New Unique Vaults on Avalanche.',
              )}
            </Text>
          </Block>
        </div>
      {/* </Content> */}
      </Page>
      </>
  )
}

export default Vaults
