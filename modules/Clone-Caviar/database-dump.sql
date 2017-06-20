CREATE TABLE resturantes (
  id integer PRIMARY KEY,
  name varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  banner_image varchar(510) NOT NULL
);

INSERT INTO
  resturantes
VALUES
  (
    1,
    "Souley Vegan",
    "Mind. Body. Soul.",
    "https://img.trycaviar.com/F9BQ7oUEveXALqPfMzdZ1yALc-M=/1680x1120/https://s3.amazonaws.com/trycaviar.com/offers/2632/98054-201512112252.jpg"
  ),
  (
    2,
    "Homeroom",
    "Mac & Cheese Specialists.",
    "https://img.trycaviar.com/x7pgux2UGo3J3wY_QrD3lITEmnk=/1680x1120/https://s3.amazonaws.com/trycaviar.com/offers/151/9049.jpg"
  )
;

CREATE TABLE orderables (
  id integer PRIMARY KEY,
  resturante_id integer NOT NULL,
  title varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  price integer NOT NULL,
  category varchar(255) NOT NULL,
  image varchar(510)
);

INSERT INTO
  orderables (
    resturante_id,
    title,
    description,
    price,
    category,
    image
  )
VALUES
  (
    1,
    "Fried Okra",
    "Comes with our house dipping sauce and lemon wedges.",
    825,
    "Appetizers",
    "https://img.trycaviar.com/5A71k0rxaVsDAjnq6WBd3aHwL9U=/350x233/https://s3.amazonaws.com/trycaviar.com/offers/2632/98050-201512112252.jpg"
  ),
  (
    1,
    "House Cut Seasoned French Fries",
    "Basket of house-cut seasoned french fries served with house dipping sauce. Gluten-free.",
    400,
    "Appetizers",
    "https://img.trycaviar.com/W5ZlX-YojwBPNI_DRECcPrwo1BQ=/350x233/https://s3.amazonaws.com/trycaviar.com/offers/placeholder/food-v2.png"
  )
;
