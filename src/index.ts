import App from './app';
import { APP_PORT } from './config';
import { HttpException } from './exception';

(async () => {
  try {
    const app = await App();
    app.listen(APP_PORT, async () => {
      console.log(`Server is running on port ${APP_PORT}`);
      if (process.send) {
        process.send('ready');
      }
    });
  } catch (e: any) {
    throw new HttpException(`Error while starting the server : ${e.message}`);
  }
})();
