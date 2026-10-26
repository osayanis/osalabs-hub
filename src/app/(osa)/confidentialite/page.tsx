import { A, CONTACT, LegalPage, Row, S } from "@/components/osa/Legal";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Confidentialité — OsaLabs", description: "Ce que les sites et apps OsaLabs font de tes données : pas de compte, pas de pub, pas de statistiques." };

export default function Confidentialite() {
  return (
    <LegalPage title="Confidentialité" say="Ici, on ne garde presque rien 🤫"
      intro="Ce que les sites et les apps OsaLabs font de tes données, dit simplement. En résumé : pas de compte, pas de publicité, pas de statistiques, rien n’est vendu.">
      <S t="Qui est responsable ?">
        <p>OsaLabs est un ensemble de projets personnels faits par Yanis, étudiant, à titre non commercial. C’est lui qui décide de la façon dont les rares données décrites ici sont traitées.</p>
        <p>Pour toute question ou demande : <A href={CONTACT}>github.com/osayanis</A>.</p>
      </S>

      <S t="Ce qui est concerné">
        <p>Les sites osalabs.fr, osadrop.osalabs.fr, osacast.osalabs.fr, osaparty.osalabs.fr, osaboard.osalabs.fr et notch.osalabs.fr, ainsi que les apps Mac OsaNotch et OsaWallpaper.</p>
      </S>

      <S t="Les journaux du serveur">
        <p>Comme presque tous les sites, le serveur web (nginx) note chaque visite : adresse IP, date et heure, page demandée, navigateur utilisé et code de réponse.</p>
        <p>Ces journaux servent uniquement à faire tourner les sites et à les protéger des attaques (intérêt légitime). Ils sont <strong className="text-white/85">supprimés automatiquement au bout de 14 jours</strong> et ne sont jamais croisés avec autre chose.</p>
        <p>Les sites sont hébergés sur un serveur loué chez YorkHost.</p>
      </S>

      <S t="Service par service">
        <div className="space-y-2.5">
          <Row k="OsaDrop">Les fichiers voyagent directement d’un appareil à l’autre (WebRTC, chiffré). Le serveur ne voit que le code de la session et ton adresse IP, le temps de vous mettre en relation. Il ne stocke aucun fichier. Pour trouver le chemin entre vos appareils, ton navigateur contacte un serveur STUN de Google, qui voit ton adresse IP.</Row>
          <Row k="OsaCast">Le partage d’écran passe directement entre navigateurs, chiffré. Si une connexion directe est impossible, le flux chiffré peut transiter par un relais public (Open Relay, de Metered), qui ne peut pas le lire. Rien n’est enregistré.</Row>
          <Row k="OsaParty">Ton pseudo, tes messages et tes réactions passent par le serveur pour être partagés avec le salon. Ils restent en mémoire tant que le salon existe, puis disparaissent. Ton pseudo est retenu dans ton navigateur (voir la page Cookies).</Row>
          <Row k="OsaBoard">Le contenu du tableau passe par le serveur pour être partagé en direct, puis disparaît : rien n’est sauvegardé côté serveur. L’export se fait dans un fichier, chez toi. Certains blocs contactent des services externes quand tu les utilises (Open-Meteo pour la météo, sql.js.org pour le bloc base de données).</Row>
          <Row k="osalabs.fr (accueil)">La bulle GitHub affiche une photo de profil chargée depuis github.com et un calendrier de contributions chargé depuis github-contributions-api.jogruber.de. Ces services voient ton adresse IP.</Row>
          <Row k="Apps Mac (OsaNotch, OsaWallpaper)">Elles fonctionnent sur ton Mac et n’envoient rien à OsaLabs. Pour fonctionner, elles contactent directement : ipapi.co (position approximative à partir de ton adresse IP, seulement si tu n’as pas choisi de ville), Open-Meteo (météo), Apple (recherche iTunes et pages Apple Music, avec le nom de l’artiste et de l’album, pour les pochettes), LRCLIB (titre et artiste, pour les paroles) et GitHub (mises à jour). OsaNotch se connecte aussi aux serveurs OsaDrop, OsaCast et OsaParty quand tu utilises ces fonctions.</Row>
        </div>
      </S>

      <S t="Ce qu’on ne fait pas">
        <p>Pas de compte, pas de publicité, pas d’outil de statistiques, pas de pistage, pas de revente ni de partage de données. Les fichiers, écrans et tableaux que tu partages ne sont ni lus ni conservés.</p>
      </S>

      <S t="Tes droits">
        <p>Selon le RGPD, tu peux demander l’accès à tes données, leur correction ou leur suppression, t’opposer à leur traitement ou demander sa limitation. Comme presque rien n’est conservé, il n’y a souvent rien à retrouver ; seuls les journaux du serveur (14 jours) peuvent contenir ton adresse IP.</p>
        <p>Écris via <A href={CONTACT}>GitHub</A>. Si tu estimes que tes droits ne sont pas respectés, tu peux saisir la <A href="https://www.cnil.fr/fr/plaintes">CNIL</A>.</p>
      </S>

      <S t="Changements">
        <p>Si quelque chose change (un nouveau service, une nouvelle donnée), cette page sera mise à jour et sa date aussi.</p>
      </S>
    </LegalPage>
  );
}
