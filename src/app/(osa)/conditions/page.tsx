import { A, CONTACT, LegalPage, S } from "@/components/osa/Legal";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Conditions générales — OsaLabs", description: "Les règles d’utilisation des sites et apps OsaLabs." };

export default function Conditions() {
  return (
    <LegalPage title="Conditions générales" say="Sois sympa, et tout ira bien ✌️"
      intro="Les règles du jeu pour utiliser les sites et les apps OsaLabs. Elles s’appliquent dès que tu les utilises.">
      <S t="1. Qui propose ces services">
        <p>OsaLabs regroupe des projets personnels de Yanis, étudiant, proposés gratuitement et sans but commercial : les sites osalabs.fr, OsaDrop, OsaCast, OsaParty, OsaBoard, et les apps Mac OsaNotch et OsaWallpaper. Contact : <A href={CONTACT}>github.com/osayanis</A>.</p>
      </S>

      <S t="2. Accès">
        <p>Les services sont gratuits et sans compte. Ce sont des projets personnels : ils sont fournis « en l’état », sans garantie qu’ils fonctionnent toujours ou sans interruption. Ils peuvent changer, être mis en pause ou s’arrêter à tout moment.</p>
      </S>

      <S t="3. Ce que tu t’engages à ne pas faire">
        <p>Tu restes responsable de ce que tu partages (fichiers, écran, messages, tableaux). Il est interdit d’utiliser OsaLabs pour :</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>partager des contenus illégaux, haineux, violents, pornographiques impliquant des mineurs, ou qui portent atteinte à la vie privée de quelqu’un ;</li>
          <li>diffuser des œuvres sans en avoir le droit (films, musique, logiciels…) ;</li>
          <li>harceler, menacer ou tromper d’autres personnes ;</li>
          <li>attaquer, surcharger ou détourner les services ou le serveur.</li>
        </ul>
        <p>Comme les échanges passent directement entre appareils, OsaLabs ne voit pas ce que tu envoies et ne peut pas le contrôler. En cas d’abus signalé, l’accès peut être coupé.</p>
      </S>

      <S t="4. Les apps Mac">
        <p>OsaNotch et OsaWallpaper sont gratuites. Elles ne sont pas notarisées par Apple et utilisent des interfaces non officielles de macOS (affichage sur l’écran verrouillé, au-dessus de la barre de menus) et d’Apple Music (pochettes animées) : une mise à jour de macOS peut les faire dysfonctionner. Tu les installes en connaissance de cause.</p>
        <p>OsaWallpaper peut se mettre à jour toute seule depuis GitHub ; ça se désactive dans ses réglages. Avant d’installer une mise à jour, elle vérifie que la nouvelle version est signée par le même développeur.</p>
      </S>

      <S t="5. Contenus des autres">
        <p>Les pochettes, pochettes animées, paroles et noms de morceaux affichés appartiennent à leurs artistes, labels et ayants droit. Ils sont affichés pour ton usage personnel, sur ton propre écran. OsaLabs n’est affilié ni à Apple, ni à Spotify, ni à GitHub ; leurs noms sont des marques de leurs propriétaires.</p>
      </S>

      <S t="6. Propriété">
        <p>Le code, les visuels et la mascotte d’OsaLabs appartiennent à Yanis. Le code est publié sur GitHub pour être consulté ; sauf licence indiquée dans un dépôt, il ne peut pas être réutilisé sans accord.</p>
      </S>

      <S t="7. Responsabilité">
        <p>Dans les limites permises par la loi, OsaLabs ne peut pas être tenu responsable d’une perte de données, d’une interruption ou d’un dommage lié à l’utilisation des services. Garde une copie de tes fichiers importants.</p>
      </S>

      <S t="8. Données personnelles">
        <p>Voir les pages <A href="/confidentialite">Confidentialité</A> et <A href="/cookies">Cookies</A>.</p>
      </S>

      <S t="9. Droit applicable">
        <p>Ces conditions sont soumises au droit français. En cas de désaccord, on cherche d’abord une solution à l’amiable ; à défaut, les tribunaux français sont compétents.</p>
      </S>
    </LegalPage>
  );
}
