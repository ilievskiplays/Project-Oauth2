/// <reference types="@altv/types-server" />
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const envFileVariables = [
    'NzUzNjk0MTA3MzY0MjI5MjEx.X1p6Vg.9ksbYFIX8GvDYcNHjOffTywzZOA',
    '753694107364229211',
    'QAUuoNpgGZ0oj1Wt51n76FAX8eq5b4G9',
    'https://dungeonsoframpage.wixsite.com/drpg/home-1',
    '737967060801421423',
    '777212929849294888',
    'ENABLE_WHITELIST',
];

let allValid = true;

if (!fs.existsSync('.env')) {
    console.error(`Missing '.env' in your base server directory. Please edit variables.`);
    console.error(`File was created the file for you.`);

    for (let i = 0; i < envFileVariables.length; i++) {
        const variable = envFileVariables[i];

        if (variable !== 'ENABLE_WHITELIST') {
            fs.appendFileSync(`.env`, `\n${variable}=`);
            continue;
        }

        fs.appendFileSync(`.env`, `\n${variable}=true`);
    }

    process.exit(1);
}

if (process.env['ENABLE_WHITELIST'] && process.env['ENABLE_WHITELIST'] !== 'false') {
    for (let i = 0; i < envFileVariables.length; i++) {
        if (!process.env[envFileVariables[i]]) {
            console.error(
                `${envFileVariables[i]} is missing from your '.env' file in your main directory. Read the README.md for instructions.`
            );

            allValid = false;
        }
    }

    if (!allValid) {
        console.error(`Please fix the above errors. Then restart your server.`);
        process.exit(1);
    }

    console.log(`[Whitelist] Whitelist is ENABLED.`);
    import('./bot');
    import('./verify');
    import('./express');
} else {
    if (!process.env['CLIENT_ID']) {
        console.error(`CLIENT_ID does not have a value in the '.env' file. Add the value then restart your server.`);
        process.exit(1);
    }

    if (!process.env['CLIENT_SECRET']) {
        console.error(
            `CLIENT_SECRET does not have a value in the '.env' file. Add the value then restart your server.`
        );
        process.exit(1);
    }

    if (!process.env['REDIRECT_IP']) {
        console.error(`REDIRECT_IP does not have a value in the '.env' file. Add the value then restart your server.`);
        process.exit(1);
    }

    console.log(`[Whitelist] Whitelist is NOT ENABLED. Starting in Discord Auth Only mode.`);
    import('./verify');
    import('./express');
}
