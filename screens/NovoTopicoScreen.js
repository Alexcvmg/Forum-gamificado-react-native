import { useState } from 'react';
import {
  Text,
  Box,
  Input,
  Button,
  Heading,
  FormControl,
  TextArea,
} from 'native-base';

export function NovoTopicoScreen({ route, navigation }) {
  const baseUrl = 'https://forumpb-5520b-default-rtdb.firebaseio.com/';

  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { status, action } = route.params;

  function salvarTopico() {
    if (title.trim() === '') {
      setMessage('O título não pode ficar em branco.');
      return;
    }
    setLoading(true);
    const topico = {
      username: status.nome,
      title: title,
      description: description,
      comments: {},
      likes: 0,
      dislikes: 0,
    };

    fetch(`${baseUrl}/topicos.json`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(topico),
    })
      .then((_) => {
        action();
        setTitle('');
        setDescription('');
        setMessage('');
      })
      .catch((error) => setMessage(error.message))
      .finally(() => {
        setLoading(false);
        navigation.navigate('home');
      });
  }

  return (
    <Box safeArea w="100%" h="100%" bg={'rgba(0, 0, 0, 0.8)'} p={10}>
      <Box
        justifyContent="center"
        alignItems="center"
        bg="white"
        p={4}
        marginTop={50}
        borderWidth={1}
        borderColor="#254560"
        borderRadius={5}>
        <Heading>Criar novo tópico</Heading>
        <FormControl width="100%" marginTop={2}>
          <FormControl.Label>Título:</FormControl.Label>
          <Input
            id="title"
            value={title}
            onChangeText={(valor) => setTitle(valor)}
          />
        </FormControl>
        <FormControl width="100%" marginTop={2}>
          <FormControl.Label htmlFor="description">
            Descrição:
          </FormControl.Label>
          <TextArea
            id="description"
            value={description}
            onChangeText={(valor) => setDescription(valor)}
          />
        </FormControl>
        <Button
          width="50%"
          marginTop={5}
          bg="#254560"
          borderRadius={5}
          _text={{ color: 'white', fontWeight: 'bold' }}
          onPress={salvarTopico}
          disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar'}
        </Button>
        {message && <Text style={{ color: 'red' }}>{message}</Text>}
      </Box>
    </Box>
  );
}
