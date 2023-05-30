import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => res.send('Hello World!'));

app.listen(process.env.PORT, () =>
	console.log(`Listening on port ${process.env.PORT}`),
);
