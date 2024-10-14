const environmentVariable = process.env.NODE_ENV


const BaseUrlAndMessageIdsMap = {
  dev: {
    appId: 'wx163d0b4118c51f7b', // 小程序 AppID
    baseUrl: 'https://aleleya.top', // 域名
    imgUrl: 'https://aleleya.top/imgs/'
  },
  test: {
    appId: 'wx163d0b4118c51f7b',
    baseUrl: 'https://aleleya.top',
    imgUrl: 'https://aleleya.top/imgs/'
  },
  uat: {
    appId: 'wx163d0b4118c51f7b',
    baseUrl: 'https://aleleya.top',
    imgUrl: 'https://aleleya.top/imgs/'
  },
  production: {
    appId: 'wx163d0b4118c51f7b',
    baseUrl: 'https://aleleya.top',
    imgUrl: 'https://aleleya.top/imgs/'
  }
}

export default BaseUrlAndMessageIdsMap[environmentVariable]
