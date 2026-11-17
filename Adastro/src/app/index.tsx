
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Alert
} from 'react-native';

type Aluno = {
  id: string;
  nome: string;
  curso: string;
};

export default function App() {

  // Estados do aplicativo
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [alunos, setAlunos] = useState<Aluno[]>([]);
   const [alunoEditando, setAlunoEditando] = useState(null);
  const [mensagem, setMensagem] = useState('');

  // CREATE e UPDATE
  function salvarAluno() {

    // Validar campos
    if (nome.trim() === '' || curso.trim() === '') {
      setMensagem('Preencha o nome e o curso!');
      return;
    }

    // Verificar se está editando ou cadastrando
    if (alunoEditando !== null) {

      // UPDATE: atualizar aluno pelo ID
      const listaAtualizada = alunos.map((aluno) => {
        if (aluno.id === alunoEditando) {
          return {
            ...aluno,
            nome: nome,
            curso: curso
          };
        }

        return aluno;
      });

      setAlunos(listaAtualizada);

      Alert.alert('Sucesso', 'Aluno atualizado!');

      setAlunoEditando(null);

    } else {

      // CREATE: cadastrar novo aluno
      const novoAluno = {
        id: Date.now().toString(),
        nome: nome,
        curso: curso
      };

      setAlunos([...alunos, novoAluno]);

      Alert.alert('Sucesso', 'Aluno cadastrado!');
    }

    // Limpar campos
    setNome('');
    setCurso('');
  }

  // READ: listar alunos usando FlatList
  function renderizarAluno({ item }: { item: Aluno }) {
    return (
      <View style={styles.alunoContainer}>

        <View style={styles.dadosAluno}>
          <Text style={styles.nomeAluno}>
            {item.nome}
          </Text>

          <Text style={styles.cursoAluno}>
            Curso: {item.curso}
          </Text>

          <Text style={styles.idAluno}>
            ID: {item.id}
          </Text>
        </View>

        <View style={styles.botoesAluno}>

          {/* Botão EDITAR */}
          <Pressable
            style={styles.botaoEditar}
            onPress={() => editarAluno(item)}
          >
            <Text style={styles.textoBotao}>
              Editar
            </Text>
          </Pressable>

          {/* Botão EXCLUIR */}
          <Pressable
            style={styles.botaoExcluir}
            onPress={() => excluirAluno(item.id)}
          >
            <Text style={styles.textoBotao}>
              Excluir
            </Text>
          </Pressable>

        </View>
      </View>
    );
  }

  // UPDATE: carregar dados para edição
  function editarAluno(aluno: { id: any; nome: any; curso: any; }) {
    setNome(aluno.nome);
    setCurso(aluno.curso);
    setAlunoEditando(aluno.id);
  }

  // DELETE: excluir aluno pelo ID
 function excluirAluno(id) {

  const novaLista = alunos.filter(
    (aluno) => aluno.id !== id
  );

  setAlunos(novaLista);

  // Se o aluno excluído estava sendo editado,
  // limpar os campos e cancelar a edição.
  if (alunoEditando === id) {
    setNome('');
    setCurso('');
    setAlunoEditando(null);
  }

  Alert.alert(
    'Sucesso',
    'Aluno excluído com sucesso!'
  );
}
  // Cancelar edição
  function cancelarEdicao() {
    setNome('');
    setCurso('');
    setAlunoEditando(null);
  }

  // Interface do aplicativo
  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Cadastro de Alunos
      </Text>

      <Text style={styles.subtitulo}>
        Gerenciamento de alunos
      </Text>

      {/* Campo NOME */}
      <TextInput
        style={styles.input}
        placeholder="Nome do aluno"
        value={nome}
        onChangeText={setNome}
      />

      {/* Campo CURSO */}
      <TextInput
        style={styles.input}
        placeholder="Curso"
        value={curso}
        onChangeText={setCurso}
      />

      {/* Botão CADASTRAR / SALVAR */}
      <Pressable
        style={styles.botaoPrincipal}
        onPress={salvarAluno}
      >
        <Text style={styles.textoBotao}>
          {alunoEditando !== null
            ? 'Salvar Alterações'
            : 'Cadastrar Aluno'}
        </Text>
      </Pressable>

      {/* Botão CANCELAR EDIÇÃO */}
      {alunoEditando !== null && (
        <Pressable
          style={styles.botaoCancelar}
          onPress={cancelarEdicao}
        >
          <Text style={styles.textoBotao}>
            Cancelar Edição
          </Text>
        </Pressable>
      )}

      {/* Título da lista */}
      <Text style={styles.tituloLista}>
        Alunos Cadastrados ({alunos.length})
      </Text>

      {/* READ: exibição da lista */}
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarAluno}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>
            Nenhum aluno cadastrado.
          </Text>
        }
      />

    </View>
  );
}

// Estilização
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F2F4F8',
    padding: 20,
    paddingTop: 55
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1D3557',
    textAlign: 'center'
  },

  subtitulo: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16
  },

  botaoPrincipal: {
    backgroundColor: '#2878D0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },

  botaoCancelar: {
    backgroundColor: '#777777',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },

  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D3557',
    marginTop: 20,
    marginBottom: 12
  },

  alunoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2878D0'
  },

  dadosAluno: {
    marginBottom: 12
  },

  nomeAluno: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222'
  },

  cursoAluno: {
    fontSize: 15,
    color: '#555555',
    marginTop: 5
  },

  idAluno: {
    fontSize: 12,
    color: '#888888',
    marginTop: 5
  },

  botoesAluno: {
    flexDirection: 'row',
    gap: 10
  },

  botaoEditar: {
    flex: 1,
    backgroundColor: '#E6A23C',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center'
  },

  botaoExcluir: {
    flex: 1,
    backgroundColor: '#D9534F',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center'
  },

  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15
  },

  listaVazia: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 25,
    fontSize: 15
  }

});
