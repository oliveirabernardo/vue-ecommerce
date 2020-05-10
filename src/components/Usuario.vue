<template>
  <div class="cl-1">
    <b-tabs content-class="tabs">
      <b-tab title="Login" class="tab" active>
        <b-card border-variant="dark" class="cadastro">
          <form @submit.prevent="submitLogin">
            <label for="usuario">Nome:</label>
            <b-form-input
              v-model="usuario"
              :state="tamanhoNome"
              placeholder="Digite seu nome"
              trim
              tabindex="2"
            ></b-form-input>
            <b-form-invalid-feedback>Informe seu nome</b-form-invalid-feedback>

            <label for="usuario">Senha:</label>
            <b-form-input
              type="password"
              v-model="senha"
              placeholder="Digite sua senha"
              trim
              tabindex="2"
            ></b-form-input>

            <hr />

            <b-button type="submit" value="Submit" variant="primary" tabindex="5">Login</b-button>
          </form>
        </b-card>
      </b-tab>

      <b-tab title="Cadastro" class="tab">
        <b-card border-variant="dark" class="cadastro">
          <form @submit.prevent="submitCadastro">
            <label for="usuario">Nome:</label>
            <b-form-input
              v-model="usuario"
              :state="tamanhoNome"
              placeholder="Digite seu nome"
              trim
              tabindex="2"
            ></b-form-input>
            <b-form-invalid-feedback>Informe seu nome</b-form-invalid-feedback>

            <label for="usuario">Senha:</label>
            <b-form-input
              type="password"
              v-model="senha"
              placeholder="Digite sua senha"
              trim
              tabindex="2"
            ></b-form-input>

            <hr />

            <b-button type="submit" value="Submit" variant="primary" tabindex="5">Cadastrar</b-button>
          </form>
        </b-card>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "Usuario",
  data() {
    return {
      usuario: "",
      senha: ""
    };
  },
  computed: {
    tamanhoNome() {
      return this.usuario.length > 2 ? true : false;
    }
  },
  created() {},
  methods: {
    submitLogin() {
      let users = JSON.parse(localStorage.getItem("users"));
      if (users.length >= 1) {
        for (let user of users) {
          if (user !== null) {
            if (user.usuario == this.usuario && user.senha == this.senha) {
              localStorage.setItem("logado", user.usuario);
              alert("Logado como " + user.usuario);
              this.$router.push({ name: "home" });
            }
          }
        }
      } else {
        alert("Usuario não cadastrado");
      }
    },
    submitCadastro() {
      let registered = {
        users: [
          { usuario: "aaa", senha: "aaa" },
          { usuario: "bbb", senha: "bbb" }
        ]
      };
      let cadastro = { usuario: this.usuario, senha: this.senha };
      if (registered.users.length < 1) {
        registered.users.push(cadastro);
        localStorage.setItem("users", JSON.stringify(cadastro));
      } else if (registered.users.length >= 1) {
        let usuarios = JSON.parse(localStorage.getItem("users"))
        usuarios.push(cadastro);
        localStorage.setItem("users", JSON.stringify(usuarios));
      }
    }
  }
};
</script>

<style>
.cadastro {
  margin-top: 0px;
  margin-left: 0px;
}
</style>