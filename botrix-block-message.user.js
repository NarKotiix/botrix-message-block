// ==UserScript==
// @name         Botrix Message Block
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bloque certains messages sur Botrix
// @author       NarKotiix
// @match        https://kick.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/NarKotiix/botrix-message-block/main/botrix-message-block.user.js
// @downloadURL  https://raw.githubusercontent.com/NarKotiix/botrix-message-block/main/botrix-message-block.user.js
// ==/UserScript==

(function () {
    'use strict';

    const observer = new MutationObserver(() => {
        document.querySelectorAll('div.group.relative.px-2.lg\\:px-3').forEach(el => {
            const contenu = el.innerText;
            const estBotRix = contenu.includes('BotRix');

            const estMessagePertePoints = /Résultat\s*:\s*\d+\s*\|.*@.*!.*perdu\s*\d+\s*points/i.test(contenu);
            const estMessageCooldown = /@.+Vous pouvez utiliser cette commande à nouveau dans\s*\d+s/i.test(contenu);
            const estMessageEmojisPerdus = /Le résultat est:\s*.*\|\s*@.*Désolé.*perdu\s*\d+\s*points/i.test(contenu);

            if (estBotRix && (estMessagePertePoints || estMessageCooldown || estMessageEmojisPerdus)) {
                el.remove(); // Supprimer le message de l'affichage
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
