import { useEffect, useState } from 'react';

import {
  Text,
  Box,
  Input,
  Button,
  Heading,
  FormControl,
  TextArea,
  ScrollView,
} from 'native-base';

export function DetalhesTopicoScreen({ route, navigation }) {
  const [selectedTopico, setSelectedTopico] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [novoComentario, setNovoComentario] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const { status, id } = route.params;

  const baseURL = 'https://forumpb-5520b-default-rtdb.firebaseio.com/';

  function convertData(data) {
    const ids = Object.keys(data);
    let topicos = Object.values(data);
    return topicos.map((topico, index) => {
      return {
        id: ids[index],
        ...topico,
      };
    });
  }

  const fetchTopico = () => {
    setLoading(true);
    fetch(`${baseURL}/topicos/${id}.json`)
      .then(async (resp) => {
        const topico = await resp.json();
        setSelectedTopico({ id, ...topico });
      })
      .catch((err) => setMessage(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTopico();
  }, [id]);

  const adicionarComentario = () => {
    if (novoComentario.trim() !== '') {
      const novoComentarioObj = {
        username: status.nome,
        comment: novoComentario,
        likes: 0,
        dislikes: 0,
      };

      fetch(`${baseURL}/topicos/${id}/comments.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoComentarioObj),
      })
        .then((response) => response.json())
        .then((data) => {
          setSelectedTopico((prevTopico) => ({
            ...prevTopico,
            comments: {
              ...(prevTopico.comments || {}),
              [data.name]: novoComentarioObj,
            },
          }));
          setNovoComentario('');
        })
        .catch((error) =>
          console.error('Erro ao adicionar comentário:', error)
        );
    }
  };

  const handleDeleteTopic = () => {
    if (status.nome === selectedTopico.username) {
      fetch(`${baseURL}/topicos/${id}.json`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            navigation.navigate('home');
          } else {
            throw new Error('Falha ao excluir o tópico');
          }
        })
        .catch((error) => console.error('Erro ao excluir o tópico:', error));
    }
  };

  const handleEditarTopico = () => {
    if (status.nome === selectedTopico.username) {
      const updateTopico = {
        ...selectedTopico,
        title: editTitle ? editTitle : selectedTopico.title,
        description: editDescription
          ? editDescription
          : selectedTopico.description,
      };

      fetch(`${baseURL}/topicos/${id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateTopico),
      })
        .then((response) => response.json())
        .then((data) => {
          setSelectedTopico(updateTopico);
          setIsEditing(false);
        })
        .catch((error) => console.error('Erro ao editar o tópico:', error));
    }
  };

  return (
    <ScrollView w="100%" h="100%" p={1} bg={'rgba(0, 0, 0, 0.8)'} mt={10}>
      {isLoading ? (
        <Text>Carregando...</Text>
      ) : message ? (
        <Text>{message}</Text>
      ) : (
        <Box>
          {isEditing ? (
            <Box
              justifyContent="center"
              alignItems="center"
              bg="white"
              p={4}
              marginTop={50}
              borderWidth={1}
              borderColor="#254560"
              borderRadius={5}>
              <Heading>Editar Tópico</Heading>
              <FormControl width="100%" marginTop={2}>
                <FormControl.Label>Título:</FormControl.Label>
                <Input
                  type="text"
                  value={editTitle}
                  onChangeText={(valor) => setEditTitle(valor)}
                  placeholder="Editar título"
                />
              </FormControl>
              <FormControl width="100%" marginTop={2}>
                <FormControl.Label>Descrição:</FormControl.Label>
                <TextArea
                  value={editDescription}
                  onChangeText={(valor) => setEditDescription(valor)}
                  placeholder="Editar descrição"
                />
              </FormControl>
              <Box flexDirection={'row'} gap={10}>
                <Button
                  width="40%"
                  marginTop={5}
                  bg="#254560"
                  borderRadius={5}
                  _text={{ color: 'white', fontWeight: 'bold' }}
                  onPress={handleEditarTopico}>
                  Salvar
                </Button>
                <Button
                  width="40%"
                  marginTop={5}
                  bg="#254560"
                  borderRadius={5}
                  _text={{ color: 'white', fontWeight: 'bold' }}
                  onPress={() => setIsEditing(false)}>
                  Cancelar
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
              py={5}
              borderBottomWidth={2}
              borderBottomColor={'#666'}
              gap={2}
              bg={'#444444'}
              w={'100%'}
              justifyContent={'center'}
              alignItems={'start'}>
              <Heading style={{ color: 'rgb(111,168,220)' }}>
                {selectedTopico.title}
              </Heading>
              <Text style={{ color: 'white', fontSize: 18 }}>
                Autor: {selectedTopico.username}
              </Text>
              <Text style={{ color: 'white', fontSize: 18 }}>
                Descrição: {selectedTopico.description}
              </Text>
              {status.nome === selectedTopico.username && (
                <Box
                  flexDirection={'row'}
                  gap={5}
                  w={'100%'}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <Button
                    width="40%"
                    marginTop={5}
                    bg="#254560"
                    borderRadius={5}
                    _text={{ color: 'white', fontWeight: 'bold' }}
                    onPress={() => setIsEditing(true)}>
                    Editar
                  </Button>
                  <Button
                    width="40%"
                    marginTop={5}
                    bg="#254560"
                    borderRadius={5}
                    _text={{ color: 'white', fontWeight: 'bold' }}
                    onPress={handleDeleteTopic}>
                    Excluir
                  </Button>
                </Box>
              )}
              <Box
                width="100%"
                bg="#254560"
                h={5}
                bg={'rgba(0, 0, 0, 0.8)'}></Box>
              <Box w={'100%'} gap={5}>
                <Heading style={{ color: 'rgb(111,168,220)' }}>
                  Comentários:
                </Heading>
                {selectedTopico.comments &&
                  Object.entries(selectedTopico.comments).map(
                    ([commentId, comentario]) => (
                      <Box
                        key={commentId}
                        w={'100%'}
                        gap={2}
                        borderBottomWidth={2}
                        borderBottomColor={'#666'}
                        justifyContent={'center'}
                        alignItems={'flex-start'}>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                          Usuário: {comentario.username}
                        </Text>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                          Comentário: {comentario.comment}
                        </Text>
                      </Box>
                    )
                  )}
              </Box>
              {status.logado && (
                <Box
                  p={5}
                  alignItems={'flex-end'}
                  justifyContent={'center'}
                  w={'100%'}>
                  <Input
                    w={'100%'}
                    bg={'white'}
                    placeholder="Digite o comentário"
                    type="text"
                    color={'black'}
                    value={novoComentario}
                    onChangeText={(valor) => setNovoComentario(valor)}
                  />
                  <Button
                    width="40%"
                    marginTop={5}
                    bg="#254560"
                    borderRadius={5}
                    _text={{ color: 'white', fontWeight: 'bold' }}
                    onPress={adicionarComentario}>
                    Comentar
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </ScrollView>
  );
}
