import { useState } from 'react';
import { Text, Box, Input, Button, Heading, FormControl } from 'native-base';

const textosPlace = {
  textEmail: 'Digite seu email',
  textSenha: 'Digite a senha',
};

export function LoginScreen({ route, navigation }) {
  const [email, setEmail] = useState('alexcfcv@hotmail.com'.toLowerCase());
  const [senha, setSenha] = useState('123456');
  const [erro, setErro] = useState('');
  const { users, action } = route.params;

  function fazerLogin() {
    const usuarioLogado = users.filter(
      (user) => user.email === email && user.senha === senha
    );
    if (usuarioLogado.length > 0) {
      action(usuarioLogado[0]);
      navigation.navigate('home', { status: true });
      setErro('');
      setEmail('');
      setSenha('');
    } else {
      setErro('Email ou senha inválido!');
    }
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
        <Heading>Login</Heading>
        <FormControl width="100%" marginTop={2}>
          <FormControl.Label>Email:</FormControl.Label>
          <Input
            value={email}
            type="email"
            onChangeText={(valor) => setEmail(valor)}
            placeholder={textosPlace.textEmail}
          />
        </FormControl>
        <FormControl width="100%" marginTop={2}>
          <FormControl.Label>Senha</FormControl.Label>
          <Input
            value={senha}
            type="password"
            onChangeText={(valor) => setSenha(valor)}
            placeholder={textosPlace.textSenha}
          />
        </FormControl>
        <Button
          width="50%"
          marginTop={5}
          bg="#254560"
          borderRadius={5}
          _text={{ color: 'white', fontWeight: 'bold' }}
          onPress={fazerLogin}>
          Entrar
        </Button>

        {erro && (
          <Text style={{ color: 'red', justifyContent: 'center' }}>{erro}</Text>
        )}
      </Box>
    </Box>
  );
}
