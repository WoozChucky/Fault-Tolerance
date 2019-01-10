import {IBaseEntity} from "./BaseEntity";

/**
 *
 */
export interface IRepository<TEntity extends IBaseEntity<TKey>, TKey> {

    /**
     *
     * @param entity
     * @constructor
     */
    Add(entity : TEntity) : TEntity;

    /**
     *
     * @param index
     * @constructor
     */
    GetByIndex(index : number) : TEntity | null;

    /**
     *
     * @param key
     * @constructor
     */
    GetByKey(key : TKey) : TEntity | null;

    /**
     *
     * @constructor
     */
    GetAll() : TEntity[];

    /**
     *
     * @param key
     * @param entity
     * @constructor
     */
    Update(key : TKey, entity : TEntity) : void;

    /**
     *
     * @param key
     * @constructor
     */
    Remove(key : TKey | TEntity) : TEntity | null;
}

/**
 *
 */
export class Repository<TEntity extends IBaseEntity<TKey>, TKey> implements IRepository<TEntity, TKey>{

    /**
     *
     */
    protected Source : TEntity[];

    /**
     *
     * @param src
     */
    public constructor(src : TEntity[]) {
        this.Source = src;
    }

    /**
     *
     * @param entity
     * @constructor
     */
    public Add(entity: TEntity): TEntity {
        this.Source.push(entity);
        return entity;
    }

    /**
     *
     * @param index
     * @constructor
     */
    public GetByIndex(index: number): TEntity | null {
        return this.Source[index] || null;
    }

    /**
     *
     * @param key
     * @constructor
     */
    public GetByKey(key: TKey): TEntity | null {
        return this.Source.find((entity : TEntity) => entity.Id === key) || null;
    }

    public GetAll() : TEntity[] {
        return this.Source;
    }

    /**
     *
     * @param key
     * @constructor
     */
    public Remove(key: TKey | TEntity): TEntity | null {

        let entity : TEntity | null;

        let result = [];

        if (key as TKey !== null) {
            entity = this.GetByKey(key as TKey);

            result = this.Source.splice(this.Source.indexOf(key as TEntity), 1);
        } else if (key as TEntity !== null) {
            result = this.Source.splice(this.Source.indexOf(key as TEntity), 1);
        }

        return result.length > 0 ? key as TEntity : null;
    }

    /**
     *
     * @param key
     * @param entity
     * @constructor
     */
    public Update(key: TKey, entity: TEntity): void {
    }

}