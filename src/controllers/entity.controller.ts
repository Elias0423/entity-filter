import { Request, Response } from 'express';
import EntityService from '../services/entity.service';
import ResponseDto from '../types/responseDto';

export default class EntityController {
  entityService: EntityService;
  constructor(entityService: EntityService) {
    this.entityService = entityService;
  }

  filterEntity = () => async (req: Request, res: Response): Promise<void> => {
    let response: ResponseDto;
    try {
      const result = await this.entityService.filterEntities(req.body);
      response = new ResponseDto(200, result);
    } catch (error) {
      if (error instanceof Error) response = new ResponseDto(404, { Error: error.message });
      else if (error instanceof RangeError) response = new ResponseDto(400, { Error: error.message });
      else response = new ResponseDto(400, { Error: error });
    }
    res.status(response.code).json(response.data);
  };
}
