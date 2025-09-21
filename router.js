import { startGame, endGame } from './game-main.js';

const pages = document.querySelectorAll('.page');

export function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        if (page.id === pageId) {
            page.classList.remove('hidden');
        } else {
            page.classList.add('hidden');
        }
    });
}