import axios from 'axios';

const api = "https://api.pandascore.co/lol/series?token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU";

const instance = axios.create({
  baseURL: api,
});

export default instance;