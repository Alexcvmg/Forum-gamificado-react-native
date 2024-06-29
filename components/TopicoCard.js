import { Text, Box, Heading } from 'native-base';
import { TouchableOpacity } from 'react-native';

export function TopicoCard(props) {
  const { logado, navigation, topicos } = props;

  const handleDetalhes = (topicoId) => {
    navigation.navigate('detalhes', { id: topicoId});
  };

  return (
    <Box w={'100%'} h={'100%'} justifyContent={'center'} alignItems={'center'}>
      {topicos.map((topico, index) => (
        <Box
          key={index}
          p={5}
          borderBottomWidth={2}
          borderBottomColor={'#666'}
          gap={10}
          bg={'#444444'}
          w={'100%'}
          justifyContent={'center'}
          alignItems={'start'}>
          <Box>
            {logado ? (
              <TouchableOpacity onPress={() => handleDetalhes(topico.id)}>
                <Heading style={{ color: 'rgb(111,168,220)' }}>
                  {' '}
                  {topico.title}
                </Heading>
              </TouchableOpacity>
            ) : (
              <Heading style={{ color: 'rgb(111,168,220)' }}>
                {topico.title}
              </Heading>
            )}

            <Text style={{ color: 'white', fontSize: 18 }}>
              Autor: {topico.username}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
