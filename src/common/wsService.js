import http from './http'
import user from '../store/modules/user'

export default {
  validateGgyw(swsxDm) {
      let data = {
        nsrsbh: user.state.nsrInfo.nsrsbh,
        swsxdm: swsxDm
      }
      return http.post('/api/zzblrwcx/queryZzblrw', data, {
        'Content-Type': 'application/x-www-form-urlencoded;'
      })
    },
    getSqxh() {
      return http.get('/api/upload/sqxh/generate')
    },
    getFbzlList(sqxh, swsxDm) {
      let url = '/gggn/fbzlsc_fbzlQueryListBySqxh.do?rn=' + Math.random();
      let param = {
        sqxh: sqxh,
        swsxdm: swsxDm
      }
      return http.post(url, param, {
        'Content-Type': 'application/x-www-form-urlencoded;'
      })
    },
    saveFbzlxxWithoutImageData(param) {
      let obj = Object.assign({ nsrsbh: user.state.nsrInfo.nsrsbh }, param);
      return http.post('/api/dzzl/saveFbzlxxWithoutImageData', param, {
        'Content-Type': 'application/x-www-form-urlencoded;'
      })
    }
}
