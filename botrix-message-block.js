// ==UserScript==
// @name         Masquer messages BotRix (Kick Chat)
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Masque les messages spécifiques de BotRix dans le chat Kick (perte de points, cooldown, emojis aléatoires perdants)
// @author       TonNom
// @match        https://kick.com/*
// @grant        none
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
