import { Box, Input, Button, Heading, FormControl } from 'native-base';
import * as yup from 'yup';
import { Formik } from 'formik';

const textosPlace = {
  textEmail: 'Digite seu email',
  textSenha: 'Digite a senha',
  textNome: 'Digite o nome',
};

const valoresIniciais = {
  nome: '',
  email: '',
  senha: '',
  confirmarSenha: '',
};

const cadastroSchema = yup.object({
  nome: yup
    .string()
    .required('O nome é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: yup
    .string()
    .required('O email é obrigatório')
    .email('Digite um email válido'),
  senha: yup
    .string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmarSenha: yup
    .string()
    .required('É obrigatório confirmar a senha.')
    .oneOf([yup.ref('senha'), null], 'As senhas não são iguais'),
});

export function CadastroScreen({route, navigation}) {
  const { action } = route.params;
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
        <Formik
          validationSchema={cadastroSchema}
          initialValues={valoresIniciais}
          onSubmit={(values) => {
            action(values);
            navigation.navigate('home', {status: true});
          }}>
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <>
              <Heading>Tela de Cadastro</Heading>
              <FormControl
                width="100%"
                marginTop={2}
                isInvalid={errors.nome && touched.nome}>
                <FormControl.Label>Nome:</FormControl.Label>
                <Input
                  placeholder={textosPlace.textNome}
                  type={'text'}
                  value={values.nome}
                  onChangeText={handleChange('nome')}
                  name={'nome'}
                />
                <FormControl.ErrorMessage>
                  {errors.nome}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                width="100%"
                marginTop={2}
                isInvalid={errors.email && touched.email}>
                <FormControl.Label>Email:</FormControl.Label>
                <Input
                  placeholder={textosPlace.textEmail}
                  type={'text'}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  name={'email'}
                />
                <FormControl.ErrorMessage>
                  {errors.email}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                width="100%"
                marginTop={2}
                isInvalid={errors.senha && touched.senha}>
                <FormControl.Label>Senha:</FormControl.Label>
                <Input
                  placeholder={textosPlace.textSenha}
                  type={'password'}
                  value={values.senha}
                  onChangeText={handleChange('senha')}
                  name={'senha'}
                />
                <FormControl.ErrorMessage>
                  {errors.senha}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                width="100%"
                marginTop={2}
                isInvalid={errors.confirmarSenha && touched.confirmarSenha}>
                <FormControl.Label>Confirmar Senha:</FormControl.Label>
                <Input
                  placeholder={textosPlace.textSenha}
                  type={'password'}
                  value={values.confirmarSenha}
                  onChangeText={handleChange('confirmarSenha')}
                  name={'confirmarSenha'}
                />
                <FormControl.ErrorMessage>
                  {errors.confirmarSenha}
                </FormControl.ErrorMessage>
              </FormControl>

              <Button
                width="50%"
                marginTop={5}
                bg="#254560"
                borderRadius={5}
                _text={{ color: 'white', fontWeight: 'bold' }}
                onPress={handleSubmit}>
                Enviar
              </Button>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
