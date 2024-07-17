import Taro from '@tarojs/taro'
// import api from "../api/login";

const BASE_URL = process.env.TARO_APP_API

/**
 * @param {Object} props
 * @description 针对搜索值做统一处理
 */
const convertParams = (props) => {
  const newParams = {};
  for (const index in props) {
    const item = props[index];
    const type = typeof item;
    if (item || item === false || item === 0) {
      if (item && type === 'string') {
        newParams[index] = item.replace(/\s/g, '');
      }
      if (Object.prototype.toString.call(item) === '[object Object]') {
        newParams[index] = convertParams(item)
      } else {
        newParams[index] = item;
      }
    }
  }
  return newParams;
};

interface configData {
  contentType?: string
}

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '请求资源不存在。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const baseOptions = (url: string, params: object = {}, method = 'get', config: configData = {}) => {
  const { contentType } = config
  Taro.showLoading({ title: "", mask: false });
  const option: any = {
    url: BASE_URL + url,
    data: params,
    method: method,
    timeout: 10000,
    header: { 'content-type': contentType || 'application/json;charset=UTF-8', Authorization: Taro.getStorageSync('token') },
    success(response) {
      Taro.hideLoading();
      const data = response.data;
      if (data.code === 200) return data
      if (data.code === 403) return removeSorage()
      Taro.showToast({
        icon: 'none',
        duration: 3000,
        title: data.msg || '',
      })
      return data
    },
    error(err) {
      Taro.hideLoading();
      if (err.statusCode === 403) return removeSorage()
      Taro.showToast({
        icon: 'none',
        duration: 3000,
        title: codeMessage[err.statusCode] || '',
      })
      return Promise.reject(err)
    }
  }
  return Taro.request(option)
}


const request = async (url: string, params: object = {}, method = 'get', config?) => {
  params = convertParams(params)
  try {
    const res = await baseOptions(url, params, method, config)
    return res.data
  } catch (err) {
    throw new Error(err)
  }
}

// 获取当前用户个人信息
const getUserInfo = async () => {
  // const res = await api.userinfo();
  // if (res.code !== 200) return false;
  // const data = res.data
  // if (!data.vipType) {
  //   Taro.setStorageSync("vipTypeOpen", true);
  // }
  // Taro.setStorageSync("userInfo", data);
  // return true
};

const removeSorage = () => {
  Taro.removeStorage({ key: 'userInfo' })
  Taro.removeStorage({ key: 'token' })
  location.reload()
}

export { request, getUserInfo, removeSorage }

