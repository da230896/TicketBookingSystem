const sqlite3 = require("sqlite3")

const db = new sqlite3.Database("./movies-database.sqlite")

// Halls is in BCNF
// movies is in BCNF
// showtime_table is in BCNF
// reservation_status is in BCNF


const createDB = () => {

    db.serialize(() => {
        db.exec(
            `
                DROP TABLE IF EXISTS halls;
                DROP TABLE IF EXISTS movies;
                DROP TABLE IF EXISTS showtime_table;
                DROP TABLE IF EXISTS reservation_status;
                DROP TABLE IF EXISTS seat_map;
            `
        )
        db.run(      
            `CREATE TABLE IF NOT EXISTS halls (                                                     
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name CHAR(255) NOT NULL,                                              
                address_line_1 CHAR(255) NOT NULL, -- should be coordinates I feel    
                phone_number CHAR(10) NOT NULL                                        
            );`
        )
        db.run(
            `CREATE TABLE IF NOT EXISTS movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name CHAR(255) NOT NULL,
                date_of_release DATE NOT NULL
            );`
        )
        db.run(
            `-- Avoiding foreign keys since they are over head right now
             -- But id here is the show_id
            CREATE TABLE IF NOT EXISTS showtime_table (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              hall_id INTEGER NOT NULL,
              movie_id INTEGER NOT NULL,
              timing DATETIME NOT NULL
            );
            `
        )
        
        db.run(
            `CREATE TABLE IF NOT EXISTS seat_map (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                show_id INTEGER NOT NULL,
                seat_allocation INTEGER
              );
            `
        )
    
        db.run(`
            INSERT INTO halls(id, name, address_line_1, phone_number) VALUES 
                (1, 'PVR Prashant Vihar','Prashant Vihar, Delhi', '9988998899' ),
                (2, 'PVR Shalimar Bagh','Shalimar Bagh, Delhi', '9900008899' ),
                (3, 'PVR CP','Cannought Place, Delhi', '7711118899' ),
                (4, 'PVR Rajouri Garden','Rajouri Garden, Delhi', '99121238899' )
            ;
        `)
    
        db.run(`
            INSERT INTO movies(id, name, date_of_release) VALUES 
                (1, 'NomadLand','2021-06-12' ),
                (2, 'Parasite','2021-06-01' ),
                (3, 'Bad Cop','2021-06-18' ),
                (4, 'Sinister','2021-06-20' )
            ;
        `)
    
        db.run(`
            INSERT INTO showtime_table(hall_id, movie_id, timing) VALUES 
                (1, 1, '2021-06-25 10:00'),
                (1, 1, '2021-06-25 15:00'),
                (1, 1, '2021-06-25 18:00'),
                (1, 2, '2021-06-25 10:00'),
                (1, 2, '2021-06-25 15:00'),
                (1, 2, '2021-06-25 18:00'),
                (1, 3, '2021-06-25 10:00'),
                (1, 3, '2021-06-25 15:00'),
                (1, 3, '2021-06-25 18:00'),
                (1, 4, '2021-06-25 10:00'),
                (1, 4, '2021-06-25 15:00'),
                (1, 4, '2021-06-25 18:00'),
                (2, 1, '2021-06-25 11:00'),
                (2, 1, '2021-06-25 14:00'),
                (2, 1, '2021-06-25 16:00'),
                (2, 2, '2021-06-25 11:00'),
                (2, 2, '2021-06-25 14:00'),
                (2, 2, '2021-06-25 16:00'),
                (2, 3, '2021-06-25 11:00'),
                (2, 3, '2021-06-25 14:00'),
                (2, 3, '2021-06-25 16:00'),
                (2, 4, '2021-06-25 11:00'),
                (2, 4, '2021-06-25 14:00'),
                (2, 4, '2021-06-25 16:00'),
                (3, 1, '2021-06-25 12:00'),
                (3, 1, '2021-06-25 16:00'),
                (3, 1, '2021-06-25 19:00'),
                (3, 2, '2021-06-25 12:00'),
                (3, 2, '2021-06-25 16:00'),
                (3, 2, '2021-06-25 19:00'),
                (3, 3, '2021-06-25 12:00'),
                (3, 3, '2021-06-25 16:00'),
                (3, 3, '2021-06-25 19:00'),
                (3, 4, '2021-06-25 12:00'),
                (3, 4, '2021-06-25 16:00'),
                (3, 4, '2021-06-25 19:00'),
                (4, 1, '2021-06-25 8:00'),
                (4, 1, '2021-06-25 14:00'),
                (4, 1, '2021-06-25 19:00'),
                (4, 2, '2021-06-25 8:00'),
                (4, 2, '2021-06-25 14:00'),
                (4, 2, '2021-06-25 19:00'),
                (4, 3, '2021-06-25 8:00'),
                (4, 3, '2021-06-25 14:00'),
                (4, 3, '2021-06-25 19:00'),
                (4, 4, '2021-06-25 8:00'),
                (4, 4, '2021-06-25 14:00'),
                (4, 4, '2021-06-25 19:00')
            ;
        `)
    
    
        db.run(
            `
                INSERT INTO seat_map (show_id, seat_allocation) VALUES
                    (1, 6820),
                    (2, 37937),
                    (3, 12932),
                    (4, 12861),
                    (5, 56112),
                    (6, 48538),
                    (7, 19807),
                    (8, 5354),
                    (9, 14341),
                    (10, 12802),
                    (11, 26718),
                    (12, 9628),
                    (13, 772),
                    (14, 26659),
                    (15, 42420),
                    (16, 50276),
                    (17, 48295),
                    (18, 20763),
                    (19, 63501),
                    (20, 9862),
                    (21, 63676),
                    (22, 49565),
                    (23, 50381),
                    (24, 13081),
                    (25, 17570),
                    (26, 57530),
                    (27, 16047),
                    (28, 41909),
                    (29, 35841),
                    (30, 14767),
                    (31, 32173),
                    (32, 38164),
                    (33, 52124),
                    (34, 47607),
                    (35, 24419),
                    (36, 57620),
                    (37, 63611),
                    (38, 50474),
                    (39, 3487),
                    (40, 63985),
                    (41, 49965),
                    (42, 28033),
                    (43, 29698),
                    (44, 13033),
                    (45, 55047),
                    (46, 46635),
                    (47, 28307),
                    (48, 14993)
                ;
            `
        );
    
    })
}



createDB()
db.close()