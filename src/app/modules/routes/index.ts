import { Router } from "express";
import { userRoutes } from "../users/user.route";
import { CarRoutes } from "../car/car.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/cars',
        route: CarRoutes
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;