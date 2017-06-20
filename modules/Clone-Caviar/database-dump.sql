CREATE TABLE resturantes (
  id integer PRIMARY KEY,
  name varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  banner_image varchar(255) NOT NULL
)

CREATE TABLE orderables (
  id integer PRIMARY KEY,
  resturante_id integer NOT NULL,
  title varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  price integer NOT NULL,
  category varchar(255) NOT NULL,
  image varchar(255)
)


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
