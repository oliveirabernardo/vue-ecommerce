<template>
  <div class="cl-1" v-if="produtoPorId(id)">
    <ul>
      <li>
        <b-row align-v="center" class="item">
          <b-card
            v-bind:key="produtoPorId(id).id"
            :id="produtoPorId(id).id"
            :img-src="produtoPorId(id).imagem"
            img-alt="Imagem"
            border-variant="dark"
            img-left
            class="itemcard"
          >
          <b-row>
            <b-card-text class="avaliacao">
              <b-row>
              <span v-for="n in 5" :key="n" class="stars">
                <b-icon
                  icon="star-fill"
                  variant="warning"
                  font-scale="2"
                  v-if="calcularAvaliacao(produtoPorId(id)) >= n"
                ></b-icon>
                <b-icon
                  icon="star-half"
                  variant="warning"
                  font-scale="2"
                  v-else-if="Math.ceil(Math.round(calcularAvaliacao(produtoPorId(id)) * 10) / 10) >= n && Math.ceil(Math.round(calcularAvaliacao(produtoPorId(id)) * 10) / 10) >= Math.round(calcularAvaliacao(produtoPorId(id)))"
                ></b-icon>
                <b-icon icon="star" font-scale="2" variant="warning" v-else></b-icon>
              </span>
              </b-row>
              <b-row>
              {{ Math.round(calcularAvaliacao(produtoPorId(id)) * 10) / 10 }} de 5
              </b-row>
            </b-card-text>
          </b-row>
          <b-row>
            <b-jumbotron class="jumbo">
              <template v-slot:header>{{ produtoPorId(id).titulo }}</template>

              <template v-slot:lead>{{ produtoPorId(id).descricao }}</template>

              <hr class="my-4" />

              <b-card-text style="color: maroon">{{ produtoPorId(id).valor | formatarPreco("R$") }}</b-card-text>

              <b-card-text
                v-if="produtoPorId(id).estoqueDisponivel - qtdProdutoCarrinho(produtoPorId(id)) === 0"
                style="color: red"
              >Indisponível</b-card-text>
              <b-card-text
                v-else-if="produtoPorId(id).estoqueDisponivel - qtdProdutoCarrinho(produtoPorId(id)) < 5"
                style="color: orange"
              >Apenas {{ produtoPorId(id).estoqueDisponivel - qtdProdutoCarrinho(produtoPorId(id)) }} itens no estoque.</b-card-text>
              <b-card-text v-else style="color: green;">Em estoque</b-card-text>

              <b-button
                href="#"
                @click="adicionarAoCarrinho(produtoPorId(id))"
                v-if="temEstoque(produtoPorId(id))"
                variant="success"
                size="lg"
                tabindex="1"
              >Comprar</b-button>

              <b-button href="#" v-else variant="secondary" disabled>Comprar</b-button>
            </b-jumbotron>
            </b-row>
          </b-card>
        </b-row>
        <b-row>
          <b-card border-variant="dark" class="avaliar" v-show="this.editando">
            <form @submit.prevent="submit">

              <b-form-input hidden v-model="produto" :value="id"></b-form-input>

              <b-form-input hidden v-model="usuario" :value="usuario"></b-form-input>

              <label for="estrelas">Classificação: {{ estrelas }}</label>
              <b-form-input id="estrelas" v-model="estrelas" type="range" min="1" max="5" tabindex="3"></b-form-input>

                  <label for="comentario">Conte sua experiência:</label>
                  <b-form-textarea
                    id="comentario"
                    placeholder="Digite seu comentário"
                    rows="3"
                    max-rows="8"
                    v-model="comentario"
                    tabindex="4"
                  ></b-form-textarea>

            <b-button type="submit" value="Submit" variant="info" tabindex="5">Avaliar</b-button>
            </form>
          </b-card>

          <b-col id="comm-produto">

          <b-card
            v-for="avaliacao in produtoPorId(id).avaliacao"
            v-bind:key="avaliacao.id"
            :id="avaliacao.id"
            class="comentarios-produto"
          >

          <b-row>
            <b-card-title>{{ avaliacao.usuario }}</b-card-title>
              <b-row class="comm-options">
              <b-button v-if="avaliacao.usuario == usuario" @click="editComentario(avaliacao.id)" variant="none"><b-icon icon="pencil" variant="secondary" font-scale="2"></b-icon></b-button>
              <b-button v-if="avaliacao.usuario == usuario" @click="deletarComentario({ produtoId: avaliacao.produto, avaliacaoId: avaliacao.id })" variant="none"><b-icon icon="x" variant="secondary" font-scale="2"></b-icon></b-button>
            </b-row>
            </b-row>
            <b-row>
            <b-card-text>
              <span v-for="n in 5" :key="n">
                <b-icon
                  icon="star-fill"
                  variant="warning"
                  font-scale="2"
                  v-if="avaliacao.estrelas >= n"
                ></b-icon>
                <b-icon icon="star" font-scale="2" variant="warning" v-else></b-icon>
              </span>
            </b-card-text>
            </b-row>
            <b-row>
            <b-card-text>{{ avaliacao.comentario }}</b-card-text>
            </b-row>
            
          </b-card>
          
          <router-view></router-view>
          </b-col>
        </b-row>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Produto",
  data: function() {
    return { id: this.$route.params.id, usuario: localStorage.getItem("logado"), comentario: "", produto: 1, estrelas: 1, editando: true
    };
  },
  computed: {
    ...mapGetters(["allProdutos", "produtoPorId"]),
    tamanhoNome() {
      return this.usuario.length > 2 ? true : false;
    }
  },
  created() {
    this.getProdutos()
  },
  methods: {
    editar: function() {
      this.$router.push({
        name: "editar-produto",
        params: { id: this.$route.params.id }
      });
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
    editComentario(idComentario) {
      this.editando = false;
      this.$router.push({ name: 'editar-comentario' , params: { id: this.id, idC: idComentario } });
    },
    submit() {
      let addCom = 
        {
          usuario: "", comentario: "", estrelas: 1, produto: 1
        }
      addCom.usuario = this.usuario;
      addCom.estrelas = parseInt(this.estrelas);
      addCom.comentario = this.comentario;
      addCom.produto = this.id;
      this.addComentario(addCom);
    },
    adicionarAoCarrinho: function(produto) {
      this.$parent.carrinho.push(produto.id);
    },
    temEstoque: function(produto) {
      return (
        produto.estoqueDisponivel > this.qtdProdutoCarrinho(produto)
      );
    },
    calcularAvaliacao: function(produto) {
      let nota = 0;
      for (let avaliacoes of produto.avaliacao) {
        nota += avaliacoes.estrelas;
      }
      nota = nota / produto.avaliacao.length;
      if (isNaN(nota)) {nota = 0;}
      return nota;
    },
    ...mapActions(["getProdutos","addComentario","deletarComentario","editarComentario"])
  }
};
</script>

<style>


[class*="cl-"] {
  width: 100%;
}

@media only screen and (min-width: 834px) {
  .cl-1 {width: 100%;}
  .comentarios-produto {width: 10%;}
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

.itemcard {
  width: 100%;
}

.itemcard img {
  width: 50%;
  height: 50%;
}
</style>