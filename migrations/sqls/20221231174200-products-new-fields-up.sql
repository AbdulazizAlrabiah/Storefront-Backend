ALTER TABLE products 
    ADD image_link VARCHAR(2048),
    ADD description VARCHAR(256);
UPDATE products SET image_link = 'https://live.staticflickr.com/8851/17294556256_6fdfd1e4e7_b.jpg', description = 'Healthy for you bones' WHERE id = 1;
UPDATE products SET image_link = 'https://live.staticflickr.com/3908/15180739526_023e791372_b.jpg', description = 'Great source of protein' WHERE id = 2;
UPDATE products SET image_link = 'https://live.staticflickr.com/8657/15892078650_051c2f1d8c_b.jpg', description = 'Yummy' WHERE id = 3;
UPDATE products SET image_link = 'https://live.staticflickr.com/2330/2158166547_3c6ccb1dd2_b.jpg', description = 'Don''t forget the bread' WHERE id = 4;
UPDATE products SET image_link = 'https://live.staticflickr.com/8150/29724787531_aea861417b_b.jpg', description = 'Grill it!' WHERE id = 5;
UPDATE products SET image_link = 'https://live.staticflickr.com/5445/17521101345_ec6dbc96c1_b.jpg', description = 'Good source of vitamin C' WHERE id = 6;
UPDATE products SET image_link = 'https://live.staticflickr.com/5644/22160270409_6e7e39e812_b.jpg', description = 'An Apple a day keeps the doctor away' WHERE id = 7;
UPDATE products SET image_link = 'https://live.staticflickr.com/8786/28436442721_d89614d6d9_b.jpg', description = 'Always fresh!' WHERE id = 8;
UPDATE products SET image_link = 'https://live.staticflickr.com/3910/14952783368_06dcfe4112_b.jpg', description = 'Good vibes' WHERE id = 9;
UPDATE products SET image_link = 'https://live.staticflickr.com/3768/14291128981_72becb6668_b.jpg', description = 'Summer vibes' WHERE id = 10;