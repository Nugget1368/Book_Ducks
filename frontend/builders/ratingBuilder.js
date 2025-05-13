export class RatingBuilder {
    constructor() {
        this.book = null;
        this.average = 0;
        this.ratings = [];
    }

    setBook(book) {
        this.book = {
            bookId: book.id
        };
        return this;
    }

    setAverage(average) {
        this.average = average;
        return this;
    }

    setRatings(ratings) {
        this.ratings = ratings.map(rating => {
            return {
                value: rating.value,
                profileId: rating.profileId
            };
        });
        return this;
    }
    build() {
        return this;
    }
}