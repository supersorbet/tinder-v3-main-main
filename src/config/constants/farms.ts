import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [

  {
    pid: 11,
    risk: 5,
    lpSymbol: 'CORN-USDC.e LP',
    otherExchange: 'Pangolin',
    decimal: 18,
    lpAddresses: {
      43114: '0xc6a9dc8569ada7626b77e04445e93227d0790478' // XXXXCORN-USDC
    },
    tokenSymbol: 'CORN',
    tokenAddresses: {
      43114: '0xFcA54c64BC44ce2E72d621B6Ed34981e53B66CaE' // XXXXCORN
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },

  {
    pid: 12,
    risk: 5,
    lpSymbol: 'CORN-WAVAX LP',
    otherExchange: 'Pangolin',
    decimal: 18,
    lpAddresses: {
      43114: '0x66ba9619ca10bf77176afecc2486344fa9bc65b3' // XXXXCORN-WAVAX
    },
    tokenSymbol: 'CORN',
    tokenAddresses: {
      43114: '0xFcA54c64BC44ce2E72d621B6Ed34981e53B66CaE' // XXXXCORN
    },
    quoteTokenSymbol: QuoteToken.WAVAX,
    quoteTokenAdresses: contracts.wavax,
  },

    {
    pid: 10,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'CORN',
    decimal: 18,
    lpAddresses: {
      43114: '0xc6a9dc8569ada7626b77e04445e93227d0790478' // XXXXCORN-USDC
    },
    tokenSymbol: 'CORN',
    tokenAddresses: {
      43114: '0xFcA54c64BC44ce2E72d621B6Ed34981e53B66CaE' // XXXXCORN
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },

  {
    pid: 7,
    risk: 5,
    lpSymbol: 'WAVAX-USDC.e LP',
    otherExchange: 'Pangolin',
    decimal: 18,
    lpAddresses: {
      43114: '0xbd918ed441767fe7924e99f6a0e0b568ac1970d9',
    },
    tokenSymbol: 'WAVAX',
    tokenAddresses: {
      43114: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },

  {
    pid: 8,
    risk: 5,
    lpSymbol: 'WAVAX-WETH.e LP',
    otherExchange: 'Pangolin',
    decimal: 18,
    lpAddresses: {
      43114: '0x7c05d54fc5cb6e4ad87c6f5db3b807c94bb89c52',
    },
    tokenSymbol: 'WETH.e',
    tokenAddresses: {
      43114: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    },
    quoteTokenSymbol: QuoteToken.WAVAX,
    quoteTokenAdresses: contracts.wavax,
  },

  {
    pid: 9,
    risk: 5,
    lpSymbol: 'USDC.e-USDT.e LP',
    otherExchange: 'Pangolin',
    decimal: 18,
    lpAddresses: {
      43114: '0xc13e562d92f7527c4389cd29c67dabb0667863ea',
    },
    tokenSymbol: 'USDT.e',
    tokenAddresses: {
      43114: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },

  {
    pid: 0,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'WAVAX',
    decimal: 18,
    lpAddresses: {
      43114: '0xbd918ed441767fe7924e99f6a0e0b568ac1970d9'
    },
    tokenSymbol: 'WAVAX',
    tokenAddresses: {
      43114: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  }, 

  {
    pid: 1,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'WETH.e',
    decimal: 18,
    lpAddresses: {
      43114: '0xd3c14566bba068ec07f8cc768ec65614f71d49dc'
    },
    tokenSymbol: 'WETH.e',
    tokenAddresses: {
      43114: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },

  { 
    pid: 2,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'WBTC.e',
    decimal: 8,
    lpAddresses: {
      43114: '0x2d8d5a8d1f82b28a6f50674802e39e7bdad466a4'
    },
    tokenSymbol: 'WBTC.e',
    tokenAddresses: {
      43114: '0x50b7545627a5162F82A992c33b87aDc75187B218'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  }, 

  {
    pid: 3,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'PNG',
    decimal: 18,
    lpAddresses: {
      43114: '0xc33ac18900b2f63dfb60b554b1f53cd5b474d4cd'
    },
    tokenSymbol: 'PNG',
    tokenAddresses: {
      43114: '0x60781C2586D68229fde47564546784ab3fACA982'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },

  {
    pid: 4,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'USDT.e',
    decimal: 6,
    lpAddresses: {
      43114: '0xc13e562d92f7527c4389cd29c67dabb0667863ea'
    },
    tokenSymbol: 'USDT.e',
    tokenAddresses: {
      43114: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },

  {
    pid: 5,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'USDC.e',
    decimal: 6,
    lpAddresses: {
      43114: '0xbd918ed441767fe7924e99f6a0e0b568ac1970d9'
    },
    tokenSymbol: 'USDC.e',
    tokenAddresses: {
      43114: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664'
    },
    quoteTokenSymbol: QuoteToken.WAVAX,
    quoteTokenAdresses: contracts.wavax,
  },

  {
    pid: 6,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'DAI.e',
    decimal: 18,
    lpAddresses: {
      43114: '0x221caccd55f16b5176e14c0e9dbaf9c6807c83c9'
    },
    tokenSymbol: 'DAI.e',
    tokenAddresses: {
      43114: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },

]

export default farms
