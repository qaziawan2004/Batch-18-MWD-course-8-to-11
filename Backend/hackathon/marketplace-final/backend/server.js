// import 'dotenv/config';
// import app from './app.js';
// import { connectDB } from './config/db.js';
// import { verifyMailer } from './config/mailer.js';

// const PORT = Number(process.env.PORT || 7000);

// await connectDB();

// await verifyMailer();

// app.listen(PORT, () => {
//     console.log(`MarketHub running on http://localhost:${PORT}`);
// });
import 'dotenv/config';

import app from './app.js';

import { connectDB } from './config/db.js';

import { verifyMailer } from './config/mailer.js';


const PORT = Number(
    process.env.PORT || 7000
);


if (process.env.VERCEL !== '1') {

    await connectDB();

    await verifyMailer();


    app.listen(PORT, () => {

        console.log(
            `MarketHub running on http://localhost:${PORT}`
        );

    });

}


export default app;