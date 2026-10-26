import { A, LegalPage, Row, S } from "@/components/osa/Legal";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookies — OsaLabs", description: "Aucun cookie de suivi sur les sites OsaLabs." };

export default function Cookies() {
  return (
    <LegalPage title="Cookies" say="Pas de cookies, juste des miettes 🍪"
      intro="Pourquoi tu ne vois aucun bandeau de cookies sur les sites OsaLabs : il n’y a rien à accepter.">
      <S t="Aucun cookie de suivi">
        <p>Les sites OsaLabs ne déposent <strong className="text-white/85">aucun cookie</strong> : ni mesure d’audience, ni publicité, ni bouton de réseau social. C’est pour ça qu’il n’y a pas de bandeau à accepter.</p>
        <p>Les polices d’écriture sont servies par osalabs.fr lui-même : aucun appel à Google Fonts.</p>
      </S>

      <S t="Ce qui est gardé dans ton navigateur">
        <div className="space-y-2.5">
          <Row k="OsaParty · « osaparty:name »">Ton pseudo, retenu dans le stockage local de ton navigateur pour que tu n’aies pas à le retaper. Il ne quitte ton appareil que lorsque tu rejoins un salon. C’est toi qui le demandes en le tapant : la loi ne demande pas de consentement pour ce type de stockage.</Row>
        </div>
        <p>Pour l’effacer : supprime les données du site osaparty.osalabs.fr dans les réglages de ton navigateur.</p>
      </S>

      <S t="Contenus d’autres sites">
        <p>L’accueil affiche la photo de profil GitHub de Yanis et son calendrier de contributions, chargés depuis github.com et github-contributions-api.jogruber.de. Ces sites reçoivent ton adresse IP comme pour toute image ; OsaLabs ne leur demande de déposer aucun cookie. Leurs propres règles s’appliquent, par exemple la <A href="https://docs.github.com/fr/site-policy/privacy-policies/github-general-privacy-statement">déclaration de confidentialité de GitHub</A>.</p>
      </S>

      <S t="Et si ça change ?">
        <p>Si un jour un cookie non indispensable devait apparaître, un choix clair te serait proposé avant, et cette page serait mise à jour. Voir aussi la page <A href="/confidentialite">Confidentialité</A>.</p>
      </S>
    </LegalPage>
  );
}
