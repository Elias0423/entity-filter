import axios from 'axios';
import { IEntity, IEntityResponse } from '../types/entity';
import config from '../utils/config';

export default class EntityRepository {
  async getEntityByID(entityId: number): Promise<IEntity> {
    const url = `${config.SERVICE_URL}entities/${entityId}`;
    const response: IEntityResponse = (await axios.get(url)).data;
    if (response.code === 'F132') {
      const { entityId, name, identificationNumber, expirationDate, contactName, contactMail, logo } = response.data;
      return { entityId, name, identificationNumber, expirationDate, contactName, contactMail, logo };
    }
    if (response.code === 'F133') throw new Error('Error no se encuentran datos para rango especificado');
    throw new Error(response.message);
  }
}
