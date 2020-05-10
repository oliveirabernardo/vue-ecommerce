<template>
  <div class="cl-1">
    <ul>
      <li>
        <b-row class="item">
          <b-card
            v-for="produto in allProdutos"
            v-bind:key="produto.id"
            :title="produto.titulo"
            :id="produto.id"
            :img-src="produto.imagem"
            img-alt="Imagem"
            img-top
            class="listaProdutos"
          >
            <b-card-text>{{ produto.descricao }}</b-card-text>

            <b-card-text
              v-if="produto.estoqueDisponivel - qtdProdutoCarrinho(produto) === 0">
                Indisponível
            </b-card-text>
            <b-card-text
              v-else-if="produto.estoqueDisponivel - qtdProdutoCarrinho(produto) < 5">
                Apenas {{ produto.estoqueDisponivel - qtdProdutoCarrinho(produto) }} itens no estoque.
            </b-card-text>
            <b-card-text
              v-else>
                Em estoque
            </b-card-text>

            <b-card-text>{{ produto.valor | formatarPreco("R$") }}</b-card-text>

            <b-card-text class="avaliacao">
              <b-row>
              <span v-for="n in 5" :key="n" class="stars">
                <b-icon
                  icon="star-fill"
                  variant="warning"
                  font-scale="2"
                  v-if="calcularAvaliacao(produto) >= n"
                ></b-icon>
                <b-icon
                  icon="star-half"
                  variant="warning"
                  font-scale="2"
                  v-else-if="Math.ceil(Math.round(calcularAvaliacao(produto) * 10) / 10) >= n && Math.ceil(Math.round(calcularAvaliacao(produto) * 10) / 10) >= Math.round(calcularAvaliacao(produto))"
                ></b-icon>
                <b-icon icon="star" font-scale="2" variant="warning" v-else></b-icon>
              </span>
              </b-row>
              <b-row>
              {{ Math.round(calcularAvaliacao(produto) * 10) / 10 }} de 5
              </b-row>
            </b-card-text>
            

            <b-button variant="success" @click="comprar(produto.id)" :tabindex="produto.id" role="button">Comprar</b-button>
          </b-card>
        </b-row>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'Home',
  data() {
    return {
      show: false
    }
  },
  methods: {
    ...mapActions(["getProdutos"]),
    adicionarAoCarrinho: function(produto) {
      this.$parent.carrinho.push(produto.id);
    },
    qtdProdutoCarrinho: function(produto) {
      var quantidade = 0;
      for (let i = 0; i < this.$parent.carrinho.length; i++) {
        if (produto.id == this.$parent.carrinho[i]) {
          quantidade++;
        }
      }
      return quantidade;
    },
    checarAvaliacao(n, produto) {
      return produto.avaliacao - n >= 0;
    },
    removeProdutoLista: function(id){
      this.produto = this.produto.filter(elem => elem.id != id)
      return this.allProdutos
    },
    calcularAvaliacao: function(produto) {
      let nota = 0;
      for (let avaliacoes of produto.avaliacao) {
        nota += avaliacoes.estrelas;
      }
      nota = nota/produto.avaliacao.length;

      return nota;
    },
    comprar: function(id) {
      this.$router.push({ name: "produto", params: {id: id} });
    },

  },
  computed: {
    ...mapGetters(["allProdutos"]),
      quantidadeNoCarrinho: function() {
      return this.$parent.carrinho.length;
    }
  },
  created() {
    this.getProdutos();
  }
}
</script>

<style scoped>


[class*="cl-"] {
  width: 100%;
}

@media only screen and (min-width: 834px) {
  .cl-1 {width: 100%;}
  .comentarios-produto {width: 10%;}
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

.listaProdutos {
  margin: 0 auto;
  width: 20rem;
}

.listaProdutos img {
  margin-right: 0px;
  width: 99%;
}



.jumbo {
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  line-height: 1.2em;
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

.comm-options button{
  margin-right: 16px;
}

#comm-produto {
  margin-top: 32px;
  padding-right: 0px;
}

#comm-produto div{
  margin-left: 0px;
  justify-content: space-between;
}

.display-3 {
  font-size: 1.5em !important;
}

.comentarios-produto {
  width: 100%;
}

.comentarios-produto div{
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


</style>
