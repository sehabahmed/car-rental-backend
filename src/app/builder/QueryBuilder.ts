import { FilterQuery, Query, Document } from "mongoose";

class QueryBuilder<T extends Document> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

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

    // Handle filter query
    const filterQuery: FilterQuery<T> = {};
    searchableFields.forEach((field) => {
      if (this.query[field]) {
        (filterQuery as Record<string, unknown>)[field] = this.query[field];
      }
    });

    if (Object.keys(filterQuery).length > 0) {
      this.modelQuery = this.modelQuery.find(filterQuery);
    }

    return this;
  }
}

export default QueryBuilder;