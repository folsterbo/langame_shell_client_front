import Vue from 'vue';
import VueRouter from 'vue-router';

import TheApplications from '../components/specific/TheApplications'
import TheGames from '../components/specific/TheGames'
import GameEdit from '../components/specific/TheGames/GameEdit'
import GameCreate from '../components/specific/TheGames/GameCreate'
import ThePrograms from '../components/specific/ThePrograms'
import ProgramEdit from '../components/specific/ThePrograms/ProgramEdit'
import ProgramCreate from '../components/specific/ThePrograms/ProgramCreate'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/applications/games',
    },
    {
        path: '/applications/games',
        component: TheApplications,
        children: [
            {
                path: '/applications/games',
                component: TheGames,
            },
            {
                path: '/applications/games/:id',
                component: GameEdit,
            },
            {
                path: '/applications/game-create',
                component: GameCreate,
            },
            {
                path: '/applications/programs',
                component: ThePrograms,
            },
            {
                path: '/applications/programs/:id',
                component: ProgramEdit,
            },
            {
                path: '/applications/program-create',
                component: ProgramCreate,
            },
        ]
    },
];

const router = new VueRouter(
    {
        mode: 'history',
        routes,
    },
);

export default router;