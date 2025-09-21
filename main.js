//専門家を呼び出す準備
import { navigateTo } from './router.js';
import { setGameMode } from './state.js';
import { startGame, endGame } from './game-main.js';

//アプリ起動時の最初の仕事
navigateTo('page-home');

//アプリ内の全てのクリックを監視する大きな耳
document.body.addEventListener('click', (event) => {

    //クリックされたのが「ドアボタン」か確認
    if (event.target.matches('[data-page]')) {

        //ドアの行き先表示を読む
        const pageId = event.target.dataset.page;

        // ページを離れる前にお片付け
        const currentPage = document.querySelector('.page:not(.hidden)');
        if (currentPage && currentPage.id === 'page-game') {
            endGame();
        }

        //行き先に応じた指示を出す
        if (pageId.startsWith('game-')) {
            const mode = pageId.split('-')[1].toUpperCase();
            setGameMode(mode);
            navigateTo('page-game');
            startGame();
        } else {
            navigateTo(pageId); // その他の部屋へ案内
        }
    }
});
