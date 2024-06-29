import { useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CadastroScreen } from './screens/CadastroScreen';
import { NovoTopicoScreen } from './screens/NovoTopicoScreen';
import { DetalhesTopicoScreen } from './screens/DetalhesTopicoScreen';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const [usuarios, setUsuarios] = useState([
    {
      nome: 'Alex',
      email: 'alexcfcv@hotmail.com',
      senha: '123456',
      logado: false,
    },
    {
      nome: 'Tobias',
      email: 'tobiascv@gmail.com',
      senha: '123456',
      logado: true,
    },
  ]);
  const [userAtivo, setUserAtivo] = useState({});
  const [controle, setControle] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const BottomTab = createBottomTabNavigator();

  const controleNovoTopico = () => {
    setControle((prev) => prev + 1);
  };

  function cadastrarUsuario(values) {
    const copiasUsers = usuarios.slice();
    const novoUsuario = {
      nome: values.nome,
      email: values.email,
      senha: values.senha,
      logado: true,
    };
    copiasUsers.push(novoUsuario);
    setUsuarios(copiasUsers);
    setUserAtivo(novoUsuario);
  }

  function deslogarUsuario() {
    setUserAtivo({});
  }

  function logarUsuario(usuario) {
    usuario.logado = true;
    setUserAtivo(usuario);
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <BottomTab.Navigator>
          <BottomTab.Screen
            name="home"
            component={HomeScreen}
            options={{
              headerShown: false,
              title: 'Home',
              tabBarIcon: ({ focused, color, size }) => (
                <Entypo name={'home'} size={size} color={color} />
              ),
            }}
            initialParams={{
              reloadTrigger: controle,
              status: userAtivo.logado,
            }}
          />

          {!userAtivo.logado && (
            <BottomTab.Screen
              name="cadastrar"
              component={CadastroScreen}
              options={{
                headerShown: false,
                title: 'Cadastro',
                tabBarIcon: ({ focused, color, size }) => (
                  <FontAwesome name="user-plus" size={size} color={color} />
                ),
              }}
              initialParams={{ action: cadastrarUsuario }}
            />
          )}

          {!userAtivo.logado && (
            <BottomTab.Screen
              name="login"
              component={LoginScreen}
              options={{
                headerShown: false,
                title: 'Login',
                tabBarIcon: ({ focused, color, size }) => (
                  <Entypo name="login" size={size} color={color} />
                ),
              }}
              initialParams={{ users: usuarios, action: logarUsuario }}
            />
          )}

          {userAtivo.logado && (
            <BottomTab.Screen
              name="novoTopico"
              component={NovoTopicoScreen}
              options={{
                headerShown: false,
                title: 'Novo Topico',
                tabBarIcon: ({ focused, color, size }) => (
                  <Entypo name="new-message" size={size} color={color} />
                ),
              }}
              initialParams={{ status: userAtivo, action: controleNovoTopico }}
            />
          )}

          {userAtivo.logado && (
            <BottomTab.Screen
              name="detalhes"
              component={DetalhesTopicoScreen}
              options={{
                headerShown: false,
                title: 'Detalhes Topico',
                tabBarIcon: ({ focused, color, size }) => (
                  <FontAwesome name="tasks" size={size} color={color} />
                ),
              }}
              initialParams={{ status: userAtivo }}
            />
          )}
        </BottomTab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
