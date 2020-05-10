<template>
  <div>
    <b-card border-variant="warning" class="avaliar">
            <form @submit.prevent="submitEdit">

              <b-form-input hidden v-model="cAvaliacao.produto" :value="id"></b-form-input>

              <b-form-input hidden v-model="cAvaliacao.usuario" :value="0"></b-form-input>

              <label for="estrelas">Classificação: {{ cAvaliacao.estrelas }}</label>
              <b-form-input id="estrelas" v-model="cAvaliacao.estrelas" type="range" min="1" max="5" tabindex="3"></b-form-input>

                  <label for="comentario">Conte sua experiência:</label>
                  <b-form-textarea
                    id="comentario"
                    placeholder="Digite seu comentário"
                    rows="3"
                    max-rows="8"
                    v-model="cAvaliacao.comentario"
                    tabindex="4"
                  ></b-form-textarea>

            <b-button type="submit" value="Submit" variant="info" tabindex="5">Editar</b-button>
            </form>
          </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "EditarComentario",
  data() {
    return {
      id:this.$route.params.id,
      idC:this.$route.params.idC,
      cAvaliacao: {
          id: 0, usuario: "", comentario: "", estrelas: 1, produto: 1
        }
    }
  },
  computed: {
    ...mapGetters(["produtoPorId"]),
  },
  created() {
    this.cAvaliacao = this.produtoPorId(this.id).avaliacao[this.idC-1]
  },
  methods: {
    ...mapActions(["editarComentario"]),
    submitEdit() {
        let editCom = 
        {
          id: 0, usuario: "", comentario: "", estrelas: 1, produto: 1
        }
      editCom.id =  this.idC;
      editCom.usuario = localStorage.getItem("logado")
      editCom.estrelas = parseInt(this.cAvaliacao.estrelas);
      editCom.comentario = this.cAvaliacao.comentario;
      editCom.produto = this.cAvaliacao.produto;
      this.editarComentario(editCom);
      this.$router.push({ name: "produto", params: {id: this.id} });
      this.$parent.editando = true;
    }
  }
}
</script>

<style>

</style>