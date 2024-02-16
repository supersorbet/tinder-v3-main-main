import React, { useContext } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd } from 'state/hooks'
import { Menu as UikitMenu } from '@pancakeswap-libs/uikit'
import config from './config'

const RDBadge = styled.a`
position: fixed;
right: 0px;
bottom: 0px;
`

const RDLiq = styled.a`
position: fixed;
right: 15px;
bottom: 110px;
`

const KYC = styled.a`
position: fixed;
right: 15px;
bottom: 202px;
`

const JSBadge = styled.a`
position: fixed;
right: 20px;
bottom: 304px;
`

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  // const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()

  return (
    <>
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      // isDark={isDark}
      // toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd.toNumber()}
      links={config}
      priceLink="https://info.pangolin.exchange/#/pair/0xc6a9dc8569ada7626b77e04445e93227d0790478" // XXXXCORN
      {...props}
    />
    {/* <RDBadge  target="_blank" rel="noreferrer" href="https://rugdoc.io/project/farmersonly-2/"><img width={250} src="https://rugdoc.io/assets/2021/06/rugdoc-review-badge-with-glow.png" alt="rugdoc badge" /></RDBadge>
    <RDLiq  target="_blank" rel="noreferrer" href="https://rugdoc.io/project/farmersonly-2/"><img width={218} src="https://farmersonly.farm/images/egg/RugDoc-LiqLock-Badge.png" alt="rugdoc liq locked" /></RDLiq>
	<KYC  target="_blank" rel="noreferrer" href="https://rugdoc.io/project/farmersonly-2/"><img width={218} src="https://farmersonly.farm/images/egg/kyc.png" alt="rugdoc kyc" /></KYC>
    <JSBadge  target="_blank" rel="noreferrer" href="https://jagosafer.io/farmersonly"><img width={208} src="https://jagosafer.io/flags/greenflag.svg" alt="jago badge" /></JSBadge>    */}  
</>
  )
}

export default Menu
