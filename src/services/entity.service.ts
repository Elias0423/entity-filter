import EntityRepository from '../repositories/entity.repository';
import { IFilter } from '../types/filter';
import { IEntity } from '../types/entity';

export default class EntityService {
  entityRepository: EntityRepository;
  constructor(entityRepository: EntityRepository) {
    this.entityRepository = entityRepository;
  }

  // GET ALL USERS WHO HAVE VALIDATED THEIR EMAIL
  public async filterEntities(filter: IFilter): Promise<IEntity[]> {
    if (!filter.startId || filter.startId < 1 || filter.startId > 20) throw new RangeError('Error en validación datos de entrada, startId no está en el rango de 1 a 20');
    if (!filter.endId || filter.endId < 1 || filter.endId > 20) throw new RangeError('Error en validación datos de entrada, endId no está en el rango de 1 a 20');
    if (filter.startId > filter.endId) throw new RangeError('Error en validación datos de entrada, startId es mayor a endId');

    const entities = await this.getAllEntities(filter.startId, filter.endId);

    return this.sortEntities(entities);
  }

  private async getAllEntities(startId: number, endId: number): Promise<IEntity[]> {
    const entities: IEntity[] = [];
    for (let i = startId; i <= endId; i++) {
      const entity = await this.entityRepository.getEntityByID(i);
      entities.push(entity);
    }
    return entities;
  }

  private sortEntities(entities: IEntity[]): IEntity[] {
    return entities.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  }
}
