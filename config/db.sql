
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user'
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category_id INT,
  image_url VARCHAR(255),
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE ratings (
  user_id INT,
  news_id INT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  PRIMARY KEY (user_id, news_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
);

CREATE TABLE user_hobbies (
  user_id INT,
  category_id INT,
  PRIMARY KEY (user_id, category_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Insert contoh kategori
INSERT INTO categories (name) VALUES
('Teknologi'), ('Olahraga'), ('Hiburan'), ('Politik'), ('Kesehatan'),
('Bisnis'), ('Sains'), ('Pendidikan'), ('Travel'), ('Kuliner'),
('Musik'), ('Film'), ('Gaming'), ('Fashion'), ('Otomotif'),
('Lingkungan'), ('Sosial'), ('Ekonomi'), ('Agama'), ('Budaya');
