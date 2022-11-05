<template>
  <div class="about" style="margin-top: 1em;">
    <h1 class="title is-2">Projet Test & Sécurité - Polytech Tours</h1>

    <div class="students">
      <h2 class="title is-3">Les étudiants</h2>
      <ul>
        <li>Andrey Pividori</li>
        <li>Pauline Rouillon</li>
        <li>Jean Renaud</li>
        <li>Florian Bonnin</li>
        <li>Quentin Fievet</li>
        <li>Thomas Grageon</li>
        <li>Lou Bizeray</li>
      </ul>
    </div>

    <br />

    <div class="readme">
      <h2 class="title is-3">L'installation</h2>
      <h3 class="title is-4 code-line" data-line-start="0" data-line-end="1">
        <a id="Projet_Test_et_Scurit_0"></a>Projet Test et Sécurité
      </h3>
      <h4 class="title is-5 code-line" data-line-start="2" data-line-end="3">
        <a id="Prrequis_2"></a>Pré-requis
      </h4>
      <p class="has-line-data" data-line-start="3" data-line-end="6">
        Télécharger nodeJS :
        <a href="https://nodejs.org/en/download/"
          >https://nodejs.org/en/download/</a
        ><br />
        Télécharger gitHub :
        <a href="https://git-scm.com/downloads">https://git-scm.com/downloads</a
        ><br />
        Télécharger Vue CLI : <code>npm install -g @vue/cli</code>
      </p>
      <br />
      <h4 class="title is-5 code-line" data-line-start="7" data-line-end="8">
        <a id="Cloner_le_repository_git_7"></a>Cloner le repository git
      </h4>
      <pre><code class="has-line-data" data-line-start="9" data-line-end="11">git clone https://github.com/AndreyPividori/polytechTestAndSecurity.git</code></pre>
      <br />
      <h4 class="title is-5 code-line" data-line-start="12" data-line-end="13">
        <a id="Project_setup_12"></a>Project setup
      </h4>
      <p class="has-line-data" data-line-start="13" data-line-end="14">
        Ouvrir un terminal dans le projet et récupérer les packages
      </p>
      <pre><code class="has-line-data" data-line-start="15" data-line-end="18">cd project  
npm install  </code></pre>
      <br />
      <h5 class="title is-6 code-line" data-line-start="19" data-line-end="20">
        <a id="Compilation_et_HotFix_pour_le_dveloppement_19"></a>Compilation et
        HotFix pour le développement
      </h5>
      <pre><code class="has-line-data" data-line-start="21" data-line-end="23">npm run serve</code></pre>
      <br />
      <h5 class="title is-6 code-line" data-line-start="24" data-line-end="25">
        <a id="Compilation_et_HotFix_pour_la_MeP_24"></a>Compilation et HotFix
        pour la MeP
      </h5>
      <pre><code class="has-line-data" data-line-start="26" data-line-end="28">npm run build</code></pre>
      <br />
      <h5 class="title is-6 code-line" data-line-start="29" data-line-end="30">
        <a id="Linter_29"></a>Linter
      </h5>
      <pre><code class="has-line-data" data-line-start="31" data-line-end="33">npm run lint</code></pre>
    </div>
  </div>
</template>

<style>
li {
  list-style: square;
}
.students {
  text-align: left;
  margin-left: 40px;
}

.sources {
  text-align: left;
  margin-left: 40px;
}

.readme {
  text-align: left;
  margin-left: 40px;
}
</style>
