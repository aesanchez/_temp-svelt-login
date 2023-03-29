CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password_hash CHAR(60) NOT NULL,
  cuil VARCHAR(11) NOT NULL
);

CREATE UNIQUE INDEX email_idx ON users (email);
CREATE UNIQUE INDEX cuil_idx ON users (cuil);
