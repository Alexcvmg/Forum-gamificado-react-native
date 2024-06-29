import { useEffect, useState } from 'react';
import { Text, Box, Heading, ScrollView } from 'native-base';
import { TopicoCard } from '../components/TopicoCard';

export function HomeScreen({ route, navigation }) {
  const [topicos_data, setTopicos_data] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const baseURL = 'https://forumpb-5520b-default-rtdb.firebaseio.com/';
  const melhoresTopicos = topicos_data.slice(0, 5);
  const { status, reloadTrigger } = route.params;

  function convertData(data) {
    if (!data) return [];
    const ids = Object.keys(data);
    let topicos = Object.values(data);
    return topicos.map((topico, index) => {
      return {
        id: ids[index],
        ...topico,
      };
    });
  }

  useEffect(() => {
    fetch(`${baseURL}/topicos.json`)
      .then(async (resp) => {
        const respTopicos = await resp.json();
        let convertedTopicos = convertData(respTopicos);
        setTopicos_data(convertedTopicos);
      })
      .catch((err) => setMessage(err.message))
      .finally((_) => setLoading(false));
  }, [reloadTrigger]);

  return (
    <Box safeArea w="100%" h={'100%'} p={1} bg={'rgba(0, 0, 0, 0.8)'}>
      {isLoading ? (
        <Text>Carregando...</Text>
      ) : message ? (
        <Text>{message}</Text>
      ) : (
        <Box w="100%" alignItems={'center'} justifyContent={'center'}>
          <Heading style={{ color: 'white' }}>Tópicos</Heading>

          {!status && <TopicoCard topicos={melhoresTopicos} logado={status} />}
          {status && (
            <ScrollView>
              <TopicoCard logado={status} topicos={topicos_data} navigation={navigation} />
            </ScrollView>
          )}
        </Box>
      )}
    </Box>
  );
}
