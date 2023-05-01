INSERT INTO linkelstar.User (id, createdAt, updatedAt, username, name, email, emailVerified, image, balance, hashedPassword, role, status) VALUES (1, '2023-05-01 17:56:55.925', '2023-05-01 17:56:55.925', 'ameshkin2', null, 'amir.meshkin@gmail.com', null, null, null, 'JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJDJONlZ0RWs3RXBaRFFzOWJYWFk5dHckTnBkU3dBb1dHMEptWDZFU3RucW9VQ2FUMVdJL3RoMldVb1RCbnZuUjZvZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=', 'USER', 'active');
INSERT INTO linkelstar.Session (id, createdAt, updatedAt, expiresAt, handle, hashedSessionToken, antiCSRFToken, publicData, privateData, userId) VALUES (1, '2023-05-01 17:56:57.394', '2023-05-01 17:56:57.394', '2023-05-31 17:56:57.391', 'TMg92KfsroTKsiv-2s5ID4gP4vCo0Bjb:ots', '1aeeab18d2a99f90a3a1a2f922f79854515e0f6064042082c0b329c0ce6171f7', '7ALDW4l0NinZ0lnhismbKEVkYIxntDfI', '{"userId":1,"username":"ameshkin2","role":"USER"}', '{}', 1);
INSERT INTO linkelstar.Profile (id, userId, title, username, description, theme, widgets, current, createdAt, updatedAt) VALUES ('clh557bzf00039kbxvodcnxa1', 1, 'Profile Title', 'ameshkin2', null, '{}', '{}', 'yes', '2023-05-01 17:56:56.811', '2023-05-01 17:56:56.811');


INSERT INTO linkelstar.User (id, createdAt, updatedAt, username, name, email, emailVerified, image, balance, hashedPassword, role, status) VALUES (2, '2023-05-01 17:56:55.925', '2023-05-01 17:56:55.925', 'tester', null, 'tester@gmail.com', null, null, null, 'JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJDJONlZ0RWs3RXBaRFFzOWJYWFk5dHckTnBkU3dBb1dHMEptWDZFU3RucW9VQ2FUMVdJL3RoMldVb1RCbnZuUjZvZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=', 'LEVEL1', 'active');
INSERT INTO linkelstar.Session (id, createdAt, updatedAt, expiresAt, handle, hashedSessionToken, antiCSRFToken, publicData, privateData, userId) VALUES (2, '2023-05-01 17:56:57.394', '2023-05-01 17:56:57.394', '2023-05-31 17:56:57.391', 'TMg92KfsroTKsiv-2s5ID4gP4vCo0Bjb:ots', '1aeeab18d2a99f90a3a1a2f922f79854515e0f6064042082c0b329c0ce6171f7', '7ALDW4l0NinZ0lnhismbKEVkYIxntDfI', '{"userId":2,"username":"tester","role":"LEVEL1"}', '{}', 2);
INSERT INTO linkelstar.Profile (id, userId, title, username, description, theme, widgets, current, createdAt, updatedAt) VALUES ('clh557bzf00039kbxvodcnxa2', 2, 'Profile Title', 'tester', null, '{}', '{}', 'yes', '2023-05-01 17:56:56.811', '2023-05-01 17:56:56.811');
