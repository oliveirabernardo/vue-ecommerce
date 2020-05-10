import axios from "axios";

const state = {
    produtos:[]
  };
  const getters = {
    allProdutos: state => state.produtos,
    produtoPorId: (state) => (id) => (state.produtos.filter(p => p.id == id))[0],
  };

  const actions = {
    getProdutos({ commit }) {
        axios.get(
            "http://localhost:3000/produtos"
          ).then((response) => {
            commit('getProduto', response.data);
        });
    },
    addProduto({commit} , novoproduto){
      commit('addProduto', novoproduto);
    },
    addComentario({ commit }, novoComentario) {
      commit("addComentario", novoComentario);
    },
    deletarComentario({ commit }, { produtoId, avaliacaoId }) {
      commit("deletarComentario", { produtoId, avaliacaoId });
    },
    editarComentario({ commit }, editComentario) {
      commit("editarComentario", editComentario);
    },
    
  };
  const mutations = {
    getProduto: (state, produto) => (state.produtos = produto),
    addProduto: (state, novoproduto) => state.produtos.push(novoproduto),
    deletarComentario: (state, { produtoId, avaliacaoId }) =>
    (state.produtos[produtoId-1].avaliacao = state.produtos[produtoId-1].avaliacao.filter(a => a.id !== avaliacaoId)),
    addComentario: (state, novoComentario) => {
      const index = state.produtos.findIndex(p => p.id === novoComentario.produto)
      if (index !== -1) {
        novoComentario.id = state.produtos[index].avaliacao.length+1;
        state.produtos[index].avaliacao.splice(state.produtos[index].avaliacao.length, 0, novoComentario);
        }
    },
    editarComentario: (state, editComentario) => {
      const index = state.produtos.findIndex(p => p.id === editComentario.produto)
      if (index !== -1) {
        state.produtos[index].avaliacao.splice(editComentario.id-1, 1, editComentario);
        }
    },
  };
 
  export default {
    state,
    getters,
    actions,
    mutations,
  };
  