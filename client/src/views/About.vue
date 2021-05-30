<template>
  <div>
    <h1>Worum geht's?</h1>
    <h2>Hintergrund</h2>
    <p>Heutzutage dreht sich alles um die sogenannte "Digitalisierung" - auch in der Landwirtschaft.</p>
    <p>Nahezu autonome Zugmaschinen setzen hochentwickelte Gerätschaften ein, das Controlling des Betriebs erfolgt immer mehr automatisch und das Wetter kann mehrere Tage im Voraus immer genauer vorhergesagt werden.</p>
    <p>Doch all dies, bzw. der Umstieg und die Entwicklung hierhin, sind kostspielig - und die Resultate nur schwer absehbar.</p>
    <p>Genau hier setzt dieses Projekt an. Insbesondere Klein- und Mittelständige Landwirte, die zwar interessiert aber unentschlossen sind, bekommen hier einen Einblick, welchen Vorteil Daten haben.</p>
    <p>Denn es ist richtig, dass Wetter-Vorhersagen inzwischen kostenfrei sind, doch ist die Genauigkeit dieser oft im Nachhinein nur schwer zu beurteilen.</p>
    <p>Wie viel Niederschlag ist in welcher Zeit gefallen? Und war das überhaupt auf diesem Feld?</p>
    <p>Die Relevanz dieser retrospektiven Fragen zeigt sich insbesondere bei der Bewertung von Dünge- und Pflanzenschutzmaßnahmen. Hier muss das Verhältnis zwischen Niederschlag und Trockenheit stimmen.</p>
    <p>Und genau diese Informationen gibt es hier zu finden.</p>
    <h2>Datengrundlage</h2>
    <p>Die Datengrundlage bilden die vom Deutschen Wetterdienst erhobenen, berechneten und bereitgestellten RADOLAN (Radar-Online-Aneichung) Daten.</p>
    <p>Diese sind von insgesamt 17 Wetterradaren deutschlandweit erfasste Reflektionssignale, die mit Hilfe von Niederschlagsmessern am Boden (Obrometern) geeicht werden.</p>
    <p>So entstehen hoch-präzise Daten, welche stündlich und millimetergenau für jeden Quadratkilometer in Deutschland zur Verfügung stehen.</p>
    <a href="https://www.dwd.de/DE/leistungen/radolan/radolan.html"><button>Weitere Infos</button></a>
    <h2>Funktionen</h2>
    <p>Alle Nutzer können sich die Daten für die letzten zwei Wochen jedes Rasters in Schleswig-Hosltein über den "Explore" Tab angucken</p>
    <router-link to="/explore"><button>Explore</button></router-link>
    <p>Nach der Registrierung können zusätzlich Flächen (Felder) von Nutzern angelegt werden. Anschließend können die Niederschlagsdaten für diese(s) eingesehen werden.</p>
    <p>Außerdem kann ein Datum gewählt werden, um welches herum die Daten angezeigt werden sollen.</p>
  </div>
</template>

<script lang="ts"></script>

<style lang="scss" scoped></style>
