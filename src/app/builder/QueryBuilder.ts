import { Document, FilterQuery, Query } from 'mongoose';

class QueryBuilder<T extends Document> {
  public modelQuery: Query<any, T>;
  public query: Record<string, any>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    //handle filter Query

    const filterQuery: FilterQuery<T> = {};
    searchableFields.forEach((field) => {
      if (this.query[field]) {
        filterQuery[field as keyof T] = this.query[field];
      }
    });

    if (Object.keys(filterQuery).length > 0) {
      this.modelQuery = this.modelQuery.find(filterQuery);
    }

    return this;
  }
}

export default QueryBuilder;
