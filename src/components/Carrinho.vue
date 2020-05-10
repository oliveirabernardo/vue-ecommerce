<template>
  <div class="carrinho">
    <div class="cl-1">
      <ul>
        <li>
          <b-row align-v="center" class="item">
            <b-card
              v-for="idProduto in this.$parent.carrinho"
              v-bind:key="idProduto"
              :id="idProduto"
              border-variant="dark"
              class="itemcard"
            >
              <b-row>
                <b-img
                  fluid
                  img-alt="Imagem"
                  img-left
                  :src="produtoPorId(idProduto).imagem"
                  class="itemImg"
                ></b-img>

                <b-jumbotron class="jumbo">
                  <template v-slot:header>{{ produtoPorId(idProduto).titulo }}</template>

                  <hr class="my-4" />

                  <b-card-text
                    style="color: maroon"
                  >{{ produtoPorId(idProduto).valor | formatarPreco("R$") }}</b-card-text>
                </b-jumbotron>
              </b-row>
            </b-card>
          </b-row>
          <b-button variant="success" class="order" @click="submitFormulario()">Finalizar pedido</b-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Carrinho",
  computed: {
    ...mapGetters(["produtoPorId"])
  },
  methods: {
    submitFormulario() {
      this.$parent.carrinho = []
      alert("Pedido finalizado");
    }
  }
};
</script>

<style scoped>
[class*="cl-"] {
  width: 100%;
}

@media only screen and (min-width: 834px) {
  .cl-1 {
    width: 100%;
  }
  .comentarios-produto {
    width: 10%;
  }
  .itemcard img {
    width: 100%;
    height: 100%;
  }
  .jumbo {
    line-height: 4em;
  }
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.jumbo {
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  line-height: 0em;
  width: 80%;
}

.cl-1 {
  margin-top: 1em;
  margin-left: -7px;
}

.cl-1 ul {
  list-style-type: none;
  padding-left: 0;
}

.comm-options {
  margin-left: auto;
}

.comm-options button {
  margin-right: 16px;
}

#comm-produto {
  margin-top: 32px;
  padding-right: 0px;
}

.order {
  margin: 0 auto;
  display: block;
  margin-top: 32px;
}

#comm-produto div {
  margin-left: 0px;
  justify-content: space-between;
}

.display-3 {
  font-size: 1.5em !important;
}

.comentarios-produto {
  width: 100%;
}

.comentarios-produto div {
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 4px;
}

.card-text {
  font-weight: bold;
}

.item {
  margin-left: 0px !important;
}

.avaliacao {
  width: auto;
  padding-left: 16px;
  padding-right: 16px;
}

.comentarios {
  padding: 0px !important;
  padding-bottom: 16px !important;
}

.avaliar {
  width: 100%;
  margin-top: 2em;
  line-height: 2em;
  margin-left: 15px;
}

.itemcard {
  width: 100%;
}

.itemcard img {
  width: 20%;
  height: 20%;
}
</style>
