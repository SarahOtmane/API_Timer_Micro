import { Application } from 'express';

const port: number = 3000;

const startService = async(app: Application) => {
    try {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log(error)
    }
}

export default startService;
