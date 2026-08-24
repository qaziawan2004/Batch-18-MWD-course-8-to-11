// import 'dotenv/config';

// import app from '../app.js';

// import { connectDB } from '../config/db.js';


// let databaseConnection;


// async function initializeDatabase() {

//     if (!databaseConnection) {

//         databaseConnection = connectDB();

//     }

//     await databaseConnection;

// }


// export default async function handler(req, res) {

//     try {

//         await initializeDatabase();

//         return app(req, res);

//     } catch (error) {

//         console.error(
//             'Vercel server error:',
//             error
//         );

//         return res.status(500).json({
//             status: false,
//             message: 'Server initialization failed.'
//         });

//     }

// }import 'dotenv/config';

import app from '../app.js';

import { connectDB } from '../config/db.js';


let databaseConnection = null;


async function initializeDatabase() {

    if (!databaseConnection) {

        databaseConnection = connectDB();

    }


    await databaseConnection;

}


export default async function handler(req, res) {

    try {

        await initializeDatabase();


        return app(req, res);

    } catch (error) {

        console.error(
            'Vercel server error:',
            error
        );


        return res.status(500).json({

            status: false,

            message:
                'Server initialization failed.'

        });

    }

}