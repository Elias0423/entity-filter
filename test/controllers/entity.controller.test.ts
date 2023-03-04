/* eslint-disable no-underscore-dangle */
import mocks from 'node-mocks-http';
import EntityController from '../../src/controllers/entity.controller';
import EntityRepository from '../../src/repositories/entity.repository';
import EntityService from '../../src/services/entity.service';
import { IEntity } from '../../src/types/entity';

const entityRepository = new EntityRepository();
const entityService = new EntityService(entityRepository);
const entityController = new EntityController(entityService);

describe('TEST ENTITY CONTROLLER', () => {
  let req = mocks.createRequest();
  let res = mocks.createResponse();

  beforeEach(() => {
    req = mocks.createRequest();
    res = mocks.createResponse();
  });

  describe('FILTER ENTITY', () => {
    it('when it finds entities, it should return status code 200 and the number of entities found', async () => {
      const entityMock: IEntity = { entityId: 1, name: 'Test', identificationNumber: '1234', expirationDate: '2023-12-31', contactName: 'Test', contactMail: 'test@tes.com', logo: 'test.png' };
      jest.spyOn(entityService, 'filterEntities').mockResolvedValue([entityMock]);

      await entityController.filterEntity()(req, res);

      expect(res._getStatusCode()).toEqual(200);
      expect(res._getJSONData()).toHaveLength(1);
    });
  });
});
