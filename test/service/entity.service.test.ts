import EntityRepository from '../../src/repositories/entity.repository';
import EntityService from '../../src/services/entity.service';
import { IEntity } from '../../src/types/entity';
import { IFilter } from '../../src/types/filter';

const entityRepository = new EntityRepository();
const entityService = new EntityService(entityRepository);

describe('TEST ENTITY SERVICE', () => {
  describe('FILTER ENTITIES', () => {
    let filter: IFilter;
    beforeEach(() => {
      filter = { startId: 1, endId: 5 };
    });
    it('when startId in the filter is less than 1, it should be an error', async () => {
      filter.startId = 0;
      try {
        await entityService.filterEntities(filter);
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(RangeError);
        expect(e).toHaveProperty('message', 'Error en validación datos de entrada, startId no está en el rango de 1 a 20');
      }
    });
    it('when startId in the filter is higher than 20, it should be an error', async () => {
      filter.startId = 21;
      try {
        await entityService.filterEntities(filter);
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(RangeError);
        expect(e).toHaveProperty('message', 'Error en validación datos de entrada, startId no está en el rango de 1 a 20');
      }
    });
    it('when endId in the filter is less than 1, it should be an error', async () => {
      filter.endId = 0;
      try {
        await entityService.filterEntities(filter);
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(RangeError);
        expect(e).toHaveProperty('message', 'Error en validación datos de entrada, endId no está en el rango de 1 a 20');
      }
    });
    it('when endId in the filter is higher than 20, it should be an error', async () => {
      filter.endId = 21;
      try {
        await entityService.filterEntities(filter);
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(RangeError);
        expect(e).toHaveProperty('message', 'Error en validación datos de entrada, endId no está en el rango de 1 a 20');
      }
    });
    it('when startId is higher than endId, it should be an error', async () => {
      filter.startId = 5;
      filter.endId = 1;
      try {
        await entityService.filterEntities(filter);
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(RangeError);
        expect(e).toHaveProperty('message', 'Error en validación datos de entrada, startId es mayor a endId');
      }
    });
    it('when the filters are ok, it should return a list of entities with length equal to endId - startId + 1', async () => {
      const entityMock: IEntity = { entityId: 1, name: 'Test', identificationNumber: '1234', expirationDate: '2023-12-31', contactName: 'Test', contactMail: 'test@tes.com', logo: 'test.png' };
      jest.spyOn(entityRepository, 'getEntityByID').mockResolvedValue(entityMock);

      const entities = await entityService.filterEntities(filter);

      expect(entities).toBeInstanceOf(Array<IEntity>);
      expect(entities).toHaveLength(filter.endId - filter.startId + 1);
    });
  });
});
