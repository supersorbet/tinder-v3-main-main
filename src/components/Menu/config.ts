import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  /* {
    label: 'Farming Countdown',
    icon: 'TicketIcon',
    href: '',
  }, */
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://app.pangolin.exchange/#/swap?outputCurrency=0xFcA54c64BC44ce2E72d621B6Ed34981e53B66CaE&inputCurrency=0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', // XXXXCORN
      },
      {
        label: 'Liquidity',
        href: 'https://app.pangolin.exchange/#/add/0xFcA54c64BC44ce2E72d621B6Ed34981e53B66CaE/undefined', // XXXXCORN
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
     label: 'Dividends', // XXXXSOON
     icon: 'BondsIcon',
     href: '/dividends',
  },
  {
     label: 'NFTs (Coming Soon)', // XXXXSOON
     icon: 'NftIcon',
     href: '/nft',
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'CoinMarketCap',
        href: 'https://coinmarketcap.com/currencies/farmersonly/',
      },
      {
        label: 'Pangolin',
        href: 'https://info.pangolin.exchange/#/pair/0xc6a9dc8569ada7626b77e04445e93227d0790478', // XXXXCORN
      },
      {
        label: 'ChartEx',
        href: 'https://chartex.pro/?symbol=AVAX_PANGOLIN%3ACORN.0x66bA9619ca10bf77176AfECc2486344Fa9Bc65B3&interval=60&theme=dark', // XXXXCORN
      },
      /* {
        label: 'DexGuru',
        href: 'https://dex.guru/token/0xFcA54c64BC44ce2E72d621B6Ed34981e53B66CaE-avalanche', // XXXXCORN
      }, */
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'vfat.tools',
        href: 'https://vfat.tools/avax/farmersonly/',
      },
      {
        label: 'Github',
        href: 'https://github.com/farmersonlydefi', // XXXXGITHUB
      }, 
      {
        label: 'Docs',
        href: 'https://docs.farmersonly.farm', // XXXXGITBOOK
      }, 
    ],
  },
  /* {
    label: 'Tools',
    icon: 'NftIcon',
    items: [
      {
        label: 'VFAT Tools',
        href: 'https://vfat.tools/polygon/cornyswap/',
      },
      {
        label: 'PolyPup UI',
        href: 'https://ui.polypup.finance/address/',
      },
    ],
  }, */
  {
    label: 'Audits/Listings',
    icon: 'AuditIcon',
    items: [
      {
        label: 'RugDoc Review + KYC',
        href: 'https://rugdoc.io/project/farmersonly-2/',
      },
      {
        label: 'Paladin Audit',
        href: 'https://paladinsec.co/projects/farmersonly/',
      },
      {
        label: 'CoinMarketCap Listing',
        href: 'https://coinmarketcap.com/currencies/farmersonly/',
      },
      {
        label: 'DappRadar Listing',
        href: 'https://dappradar.com/avalanche/defi/farmersonly-finance',
      },
      {
        label: 'Ape O\'Clock Listing',
        href: 'https://www.apeoclock.com/launch/farmers-only-farm-launch-2/',
      },
      {
        label: 'TechRate Check',
        href: 'https://github.com/farmersonlydefi/farmers-audits/blob/main/FarmersOnlyMasterChef.pdf',
      }, /*
      {
        label: 'JaGo',
        href: 'https://jagosafer.io/cornyswap',
      }, */
    ],
  },
  /* {
    label: 'Audits/Checks',
    icon: 'AuditIcon',
    items: [
      {
        label: 'Techrate',
        href: 'https://github.com/cornyswap/corny-audits/blob/main/Techrate%20Check.pdf',
      },
    ],
  }, */
  {
     label: 'Report a Bug', // XXXXSOON
     icon: 'TelegramIcon',
     href: 'https://t.me/FarmersOnlyDev2',
  },
]

export default config
