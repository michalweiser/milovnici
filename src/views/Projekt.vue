<template lang="pug">
  div.wrapper
    h1 O projekte
    div.content
      p Vitajte na našom webe, priatelia!
      p Nachádzate sa na portáli, ktorý vás prevedie svetom tradičnej ľudovej kultúry. A bude to poriadna folklórna nálož! Človek bol v minulosti s folklórom bezprostredne spätý. Pusťte ho do svojho života aj vy a spoznávajte jeho zákutia tak, ako sa vám núkajú – v jednoduchosti a kráse.
      p Na webe nájdete mapu Slovenska, rozdelenú do etnografických regiónov. Kurzorom myši sa môžete túlať regiónmi a spoznávať pestrú kultúru a rozmanitý folklór. Virtuálne navštívte najvýraznejšie folklórne obce a oboznámte sa s ich špecifikami. V zložke Archív sa môžete započúvať do krásnych archaických spevov alebo si pozrieť záznamy ľudových tancov v prevedení ich pôvodných nositeľov. Ak na mapke natrafíte na ikonu Objavuj, dozviete sa zaujímavosti o múzeách, kultúrnych pamiatkach a iných miestach prezentujúcich tradičnú kultúru. Unavilo Vás čítanie? Odhaľte v sebe skryté dieťa a poďte sa s nami zahrať. V zložke Hry nájdete interaktívne aktivity, pri ktorých sa nie len zabavíte, ale sa aj niečo nové naučíte.
      p Na blogu sa môžete dočítať novinky z folklórneho prostredia. V časti Tanečné domy nájdete kalendár folklórnych tanečných zábav, škôl a kurzov ľudových tancov z celého Slovenska.
      p Našim zámerom bolo vytvorenie portálu, ktorý fundovane popularizuje ľudovú kultúru. Preto sme do svojho tímu pribrali odborníkov z radov etnológov, etnochoreológov a etnomuzikológov, ktorí sa podieľajú na obsahu webu.
      p
        i „Dakedi každi kraj bul inši običaj, inša ciśeň, inša piśeň, inša miśeľ, inša chiška, inša miska i variška.“ 
        span Toto často prízvukoval Ján Lazorík, zanietený propagátor ľudovej kultúry. Veríme, že týmto projektom prispejeme k ukážke rôznorodosti našej kultúry a k zachovaniu toho, čo nám zanechali naši predkovia.
      p
        i Milovníci :)
      div.podpora
        h1 Podporili nás
        div.content.logos
          div.logo
            img.fpu-logo(src="/img/fpu.jpg")
          div.logo
            img.kkc-logo(src="/img/kkc.jpg")
          div.logo
            img.kosice-logo(src="/img/kosice.jpg")
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

  .fpu-logo {
    width: 170px;
  }

  .kkc-logo {
    width: 140px;
  }

  .kosice-logo {
    width: 170px;
  }

  .logos {
      display: flex;
      margin-top: 50px;
      justify-content: space-between;
  }

  .logo {
      margin: 0 30px;
  }

  .podpora {
      margin-top: 50px;
      text-align: center;
  }
</style>

