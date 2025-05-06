import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configurations';

export class UserListAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.serviceUrl}/api/user`;
  }

  read(payload) {
    console.log('inside read of apollo server data sources ::', payload);
    return this.get('/list', payload);
  }

  readEmail(payload) {
    console.log('inside read email of apollo server data sources ::', payload);
    return this.get('/emails', payload);
  }

  readOne(id) {
    console.log('inside getOne of apollo server data sources ::', id);
    return this.get(`/${id}`);
  }

  getCount() {
    console.log('inside getCount of apollo server data sources');
    return this.get('/count');
  }

  update(payload) {
    console.log('inside Update of apollo server data sources ::', payload);
    return this.put(`/${payload.originalId}`, payload);
  }

  remove(id) {
    console.log('inside remove of apollo server data sources ::', id);
    return this.delete(`/${id}`);
  }

}
