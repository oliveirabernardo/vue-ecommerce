<template>
  <div id="header">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-row class="navrow">
      <b-navbar-brand :to="{ name: 'home' }">
        <b-img thumbnail class="logo" src="https://i.imgur.com/bk8DZv4.png" alt="logo da box"></b-img>
        {{ title }}
      </b-navbar-brand>
      </b-row>
      <b-row class="searchrow"> 
        <b-input-group class="pesquisa">
          <b-input-group-prepend>
            <b-dropdown text="Tudo" variant="warning" class="dropdown">
              <b-dropdown-item>Eletrodomésticos</b-dropdown-item>
            </b-dropdown>
          </b-input-group-prepend>
          <b-form-input></b-form-input>
          <b-input-group-append>
            <b-button variant="info"><b-icon icon="search" font-scale="2" class="icon"></b-icon></b-button>
          </b-input-group-append>
        </b-input-group>
      </b-row>
      <b-row class="brow">

      <b-button
        active-class="active"
        tag="button"
        @click="conta()"
        class="btn btn-secondary btn-lg"
        id="cl-1"
      >
        <b-icon v-b-popover.hover.bottom="'Login'" icon="person-fill" font-scale="4" class="icon" id="cl-4"></b-icon>
      </b-button>

      <b-button id="cl-1"><b-icon icon="tools" font-scale="4" class="icon" id="cl-2"></b-icon></b-button>

      <router-link
        active-class="active"
        tag="button"
        :to="{ name: 'carrinho' }"
        class="btn btn-secondary btn-lg"
        id="cl-3"
      >
        <b-icon icon="wallet" font-scale="3" class="icon" id="cl-2"></b-icon>
        <b-badge class="badge" variant="light">{{ quantidadeNoCarrinho }}</b-badge>
      </router-link>
      </b-row>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data: function() {
    return {
      title: "Box",
    };
  },
  methods: {
    mostrarCarrinho: function() {
      this.$router.push({ name: "carrinho" });
    },
    usuarioLogado: function() {
      let user = localStorage.getItem("logado")
      return user;
    },
    conta: function() {
      localStorage.removeItem("logado")
      this.$router.push({ name: "usuario" });
    }
  },
  computed: {
    quantidadeNoCarrinho: function() {
      return this.$parent.carrinho.length;
    }
  }
};
</script>

<style scoped>

@media only screen and (min-width: 834px) {
  .navrow {width: 25% !important;}
  .brow {width: 50% !important;}
  #cl-3 {margin-right: 6px !important;}
}

.logo {
  width: 64px;
  height: auto;
}

.badge {
  position: absolute;
  top: -70px !important;
  left: 20px;
}

.brow {
  width: 100%;
  margin-top: 6px !important;
  margin: 0 auto;
}

.navrow {
  width: 100%
}

.searchrow {
  width: 100%;
  margin: 0 auto;
}

.icon {
  position: relative;
  right: 2px;
  bottom: 5px;
}

.pesquisa {
  margin-left: auto;
  vertical-align: middle;
}

#cl-4 {
  right: 12px;
  bottom: 12px;
}

.dropdown {
  height: 38px;
}

.pesquisa button {
  height: 38px !important;
  padding-bottom: unset !important;
}

#header button {
  padding-bottom: 0px !important;
  margin-left: auto;
  margin-right: auto;
  width: 89px;
  height: 70px;
}
</style>