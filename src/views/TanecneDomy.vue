<template lang="pug">
  div.wrapper
    h1 Tanečné domy
    div.youtube
        iframe(width="560" height="315" src="https://www.youtube.com/embed/r6Pd_U_uDW4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen)
    div.content
      p Myšlienka Tanečných domov vznikla pred viac ako tridsiatimi rokmi. V súčasnosti je totohnutie prezentujúce tradičné tance širokej verejnosti zábavnou, mimo scénickou formou stále viac a viac v obľube. Tanečné a spevavé domy sú dnes neoddeliteľnou súčasťou festivalov a rôznych folklórnych podujatí. Je to miesto, kde sa návštevníci, ktorí boli doteraz v úlohe pasívneho diváka, stávajú aktívnou súčasťou. Zúčastnení sa zapájajú do diania a na vlastnej koži okúsia kúsok z našej tradičnej kultúry. Tieto podujatia sú určené pre laikov, ale aj pre tých, ktorí chcú zdokonaliť svoje tanečné a spevavé schopnosti. Hlavným cieľom je vrátiť tanečný a hudobný folklór konkrétnej lokality späť medzi ľudí, tak ako to bolo prirodzené pre našich predkov. Kurzy vedú profesionálni lektori. Ich úlohou je naučiť účastníkov pôvodnú štruktúru konkrétneho tanca v kombinácii s piesňami tak, aby ich dokázali slobodne kombinovať a improvizovať. Po viac organizovanej časti nasleduje voľná zábava a rozkazovanie pri muzike, na ktorej si účastníci môžu naučené kombinácie skúšať. Program podujatia dopĺňa premietanie archívnych materiálov, pri ktorých si môžu tancom unavení návštevníci oddýchnuť, započúvať sa do krásnych archaických spevov a pozrieť záznamy ľudových tancov v prevedení ich pôvodných nositeľov.
      p Na tomto mieste budeme pravidelne pridávať termíny konania Tanečných a spevavých domov z celého Slovenska.
</template>


<script>
export default {
  name: 'milovnici',
}
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
  }

  .content {
    max-width: 800px;
    text-align: justify;
    padding-bottom: 60px;
  }

  .youtube {
    margin-bottom: 20px;
  }
</style>

