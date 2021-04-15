import { Service } from "typedi";
import { EntityTarget, getRepository, Repository } from "typeorm";

@Service()
export default class BaseService {
  protected initializeModelRepository<T>(entityClass: EntityTarget<T>): Repository<T> {
    return getRepository(entityClass);
  }
}
