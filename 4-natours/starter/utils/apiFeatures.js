class APIFeatures {
  // query -> instance of Query class
  // queryString -> req.query
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // 1A) FILTERING
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) ADVANCED FILTERING
    // to pass operator like greater than i query string, the standard method is: duration[gte]=5
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));

    /**
     * here we find JSON.parse(this.queryString) as
     *  { duration: { '$gt': '5' }, difficulty: 'easy' }
     * and this.queryString as  "{"duration":{"$gt":"5"},"difficulty":"easy"}"
     *
     * inside the {} we can give the key of object as a string also, but the whole wrapper brackets i.e. {} shouldn't be written inside "".
     */

    return this;
  }

  // 2) SORTING
  sort() {
    // ?sort=price,-duration
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else this.query = this.query.sort('-createdAt');

    return this;
  }

  // FIELD LIMITING
  limitFields() {
    // ?fields=name,duration,difficulty,price
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else this.query = this.query.select('-__v');
    return this;
  }

  // PAGINATION
  paginate() {
    // ?page=3&limit=10
    const limit = +this.queryString.limit || 100;
    const page = +this.queryString.page || 1;
    const skip = limit * (page - 1);
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
