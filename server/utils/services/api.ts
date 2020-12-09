import axios from 'axios'

var config = require('../config.js');

export default () => {
  return axios.create({
    baseURL: `${config.host}:${config.port}`
  })
}
