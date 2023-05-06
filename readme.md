# User Api

### User Api - "/register"

- Schema = {name: String, email: String, password: String, isAdmin: Boolean}

### User Api - "/login"

- Schema = {email: String, password: String}

# Books Api

### Books Api - "/books"

- Post request - Schema = {
  title: String,
  author: String,
  category: String,
  price: Number,
  quantity: Number
  }
- Get request - Fetchs all data in Books document from Mongo

### Books Api - "/books/:id"

- Get request will fetch book with the id
- Patch request will change the data of the book
- Delete request will delete the data of the book from database

### Books Api - "/books?category=``"

- This will fetch all the books in the category provided in url from database

### Books Api - "/books?category=`&author=`"

- This will fetch all the books in the category and also with author provided in url from database

# Order Api

### Order Api - "/order"

- This url will let user to order books from database

### Order Api - "/orders"

- This will let admin check for all orders placed
