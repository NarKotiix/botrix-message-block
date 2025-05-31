// ==UserScript==
// @name         Botrix & Dyrobot Message Block
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Bloque certains messages sur Botrix et Dyrobot
// @author       NarKotiix
// @match        https://kick.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/NarKotiix/botrix-message-block/main/botrix-message-block.user.js
// @downloadURL  https://raw.githubusercontent.com/NarKotiix/botrix-message-block/main/botrix-message-block.user.js
// ==/UserScript==

(function () {
    'use strict';

    const observer = new MutationObserver(() => {
        const chatContainer = document.querySelector('div[data-chat-scroll-area]');
        let scrollTopAvant = null;
        if (chatContainer) {
            scrollTopAvant = chatContainer.scrollTop;
        }

        document.querySelectorAll('div.group.relative.px-2.lg\\:px-3').forEach(el => {
            const contenu = el.innerText;

            // Vérifie si le message vient de BotRix ou Dyrobot
            const estBot = /BotRix|Dyrobot/i.test(contenu);

            const estMessagePertePoints = /Résultat\s*:\s*\d+\s*\|.*@.*!.*perdu\s*\d+\s*points/i.test(contenu);
            const estMessageEmojisPerdus = /Le résultat est:\s*.*\|\s*@.*Désolé.*perdu\s*\d+\s*points/i.test(contenu);

            if (estBot && (estMessagePertePoints || estMessageEmojisPerdus)) {
                el.remove(); // Supprimer le message de l'affichage
            }
        });

        if (chatContainer && scrollTopAvant !== null) {
            chatContainer.scrollTop = scrollTopAvant;
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
