class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // search products by name
    search() {
        const name = this.queryStr.name
            ? {
                name: {
                    $regex: this.queryStr.name,
                    $options: "i",
                },
            }
            : {};
        this.query = this.query.find({ ...name });
        return this;
    };

    // products filter by category,price
    filter() {
        const queryStrCopy = { ...this.queryStr };

        //Removing some fields for category
        const removeFields = ["name", "page", "limit"];

        removeFields.forEach((key) => delete queryStrCopy[key]);

        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    };

    // pagination
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;
