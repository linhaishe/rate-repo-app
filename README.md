# rate-repo-app
# react native intro

Traditionally, developing native iOS and Android applications has required the developer to use platform-specific programming languages and development environments. For iOS development, this means using Objective C or Swift and for Android development using JVM-based languages such as Java, Scala or Kotlin. Releasing an application for both these platforms technically requires developing two separate applications with different programming languages. This requires lots of development resources.

One of the popular approaches to unify the platform-specific development has been to utilize the browser as the rendering engine. [Cordova](https://cordova.apache.org/) is one of the most popular platforms for building cross-platform applications. It allows for developing multi-platform applications using standard web technologies - HTML5, CSS3, and JavaScript. However, Cordova applications are running within an embedded browser window in the user's device. That is why these applications can not achieve the performance nor the look-and-feel of native applications that utilize actual native user interface components.

[React Native](https://reactnative.dev/) is a framework for developing native Android and iOS applications using JavaScript and React. It provides a set of cross-platform components that behind the scenes utilize the platform's native components. Using React Native allows us to bring all the familiar features of React such as JSX, components, props, state, and hooks into native application development. On top of that, we can utilize many familiar libraries in the React ecosystem such as [React Redux](https://react-redux.js.org/), [Apollo](https://github.com/apollographql/react-apollo), [React Router](https://reactrouter.com/en/main) and many more.

For the development of our application, we will be using [Expo](https://docs.expo.io/versions/latest/). Expo is a platform that eases the setup, development, building, and deployment of React Native applications. 

Note, that the *@sdk-50* sets the project's *Expo SDK version to 50*, which supports *React Native version 0.73*. Using other Expo SDK versions might cause you trouble while following this material. Also, Expo has a [few limitations](https://docs.expo.dev/faq/#limitations) when compared to plain React Native CLI. However, these limitations do not affect the application implemented in the material.

```bash
npx create-expo-app rate-repository-app --template expo-template-blank@sdk-50

npx expo install react-native-web@~0.19.6 react-dom@18.2.0 @expo/metro-runtime@~3.1.1

npm install --save-dev eslint @babel/eslint-parser eslint-plugin-react eslint-plugin-react-native
```

In addition to emulators, there is one extremely useful way to develop React Native applications with Expo, the Expo mobile app. With the Expo mobile app, you can preview your application using your actual mobile device, which provides a bit more concrete development experience compared to emulators. To get started, install the Expo mobile app by following the instructions in the [Expo's documentation](https://docs.expo.io/get-started/installation/#2-expo-go-app-for-ios-and). Note that the Expo mobile app can only open your application if your mobile device is connected to *the same local network* (e.g. connected to the same Wi-Fi network) as the computer you are using for development.

That might actually be enough in most cases, but sometimes we need more. React Native provides an in-app developer menu which offers several debugging options. Read more about [debugging react native applications](https://reactnative.dev/docs/debugging).

To inspect the React element tree, props, and state you can install React DevTools.

Read here about [React DevTools](https://reactnative.dev/docs/react-devtools). For more useful React Native application debugging tools, also head out to the Expo's [debugging documentation](https://docs.expo.io/workflow/debugging).

```
npx react-devtools
```

# Core components

As we can see, React is not bound to a certain environment, such as the browser environment. Instead, there are libraries such as ReactDOM that can render *a set of predefined components*, such as DOM elements, in a specific environment. In React Native these predefined components are called *core components*.

[Core components](https://reactnative.dev/docs/intro-react-native-components) are a set of components provided by React Native, which behind the scenes utilize the platform's native components. Let's implement the previous example using React Native:

Many familiar DOM elements have their React Native "counterparts". Here are some examples picked from React Native's [Core Components documentation](https://reactnative.dev/docs/components-and-apis):

- [Text](https://reactnative.dev/docs/text) component is *the only* React Native component that can have textual children. It is similar to for example the *<strong>* and the *<h1>* elements.
- [View](https://reactnative.dev/docs/view) component is the basic user interface building block similar to the *<div>* element.
- [TextInput](https://reactnative.dev/docs/textinput) component is a text field component similar to the *<input>* element.
- [Pressable](https://reactnative.dev/docs/pressable) component is for capturing different press events. It is similar to for example the *<button>* element.

```react
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});

```

The first difference is that the *Text* component is *the only* React Native component that can have textual children. This means that you can't, for example, replace the *Text* component with the *View* component in the previous example.

The second notable difference is related to the event handlers. While working with the DOM elements we are used to adding event handlers such as *onClick* to basically any element such as *<div>* and *<button>*. In React Native we have to carefully read the [API documentation](https://reactnative.dev/docs/components-and-apis) to know what event handlers (as well as other props) a component accepts.

 Luckily React Native provides a handy component for displaying a list of data, which is the [FlatList](https://reactnative.dev/docs/flatlist) component.

# Style

On top of the property names, you might have noticed another difference in the example. In CSS numerical property values commonly have a unit such as *px*, *%*, *em* or *rem*. In React Native all dimension-related property values such as *width*, *height*, *padding*, and *margin* as well as font sizes are *unitless*. These unitless numeric values represent *density-independent pixels*. In case you are wondering what are the available style properties for certain core components, check the [React Native Styling Cheat Sheet](https://github.com/vhpoet/react-native-styling-cheat-sheet).

In general, defining styles directly in the *style* prop is not considered such a great idea, because it makes components bloated and unclear. Instead, we should define styles outside the component's render function using the [StyleSheet.create](https://reactnative.dev/docs/stylesheet#create) method. The *StyleSheet.create* method accepts a single argument which is an object consisting of named style objects and it creates a StyleSheet style reference from the given object. Here is an example of how to refactor the previous example using the *StyleSheet.create* method:

```jsx
import { Text, View, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    color: 'blue',
    fontSize: 24,
    fontWeight: '700',
  },
});

const BigBlueText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Big blue text
      </Text>
    </View>
  );
};
```

Perhaps the most important properties of a flex container are the following:

- [flexDirection](https://css-tricks.com/almanac/properties/f/flex-direction/) property controls the direction in which the flex items are laid out within the container. Possible values for this property are *row*, *row-reverse*, *column* (default value) and *column-reverse*. Flex direction *row* will lay out the flex items from left to right, whereas *column* from top to bottom. **-reverse* directions will just reverse the order of the flex items.
- [justifyContent](https://css-tricks.com/almanac/properties/j/justify-content/) property controls the alignment of flex items along the main axis (defined by the *flexDirection* property). Possible values for this property are *flex-start* (default value), *flex-end*, *center*, *space-between*, *space-around* and *space-evenly*.
- [alignItems](https://css-tricks.com/almanac/properties/a/align-items/) property does the same as *justifyContent* but for the opposite axis. Possible values for this property are *flex-start*, *flex-end*, *center*, *baseline* and *stretch* (default value).

More on React Native's flexbox implementation can be read in the [documentation](https://reactnative.dev/docs/flexbox).

It is usually a good idea to log the server's response to be able to inspect it as we did in the *fetchRepositories* function. You should be able to see this log message in the Expo development tools if you navigate to your device's logs as we learned in the [Debugging](https://fullstackopen.com/en/part10/introduction_to_react_native#debugging) section. If you are using the Expo's mobile app for development and the network request is failing, make sure that the computer you are using to run the server and your phone are *connected to the same Wi-Fi network*. If that's not possible either use an emulator in the same computer as the server is running in or set up a tunnel to the localhost, for example, using [Ngrok](https://ngrok.com/).

```node
Web Bundling failed 1402ms (node_modules/expo/AppEntry.js)
Unable to resolve "@env" from "components/RepositoryList.jsx"
› Detected a change in babel.config.js. Restart the server to see the new results. You may need to clear the bundler cache with the --clear flag for your changes to take effect.
› Stopped server
➜  rate-repo-app git:(main) ✗ npx expo start -c
```

### 🧩 第一步：安装插件

请在项目根目录下执行：

```
npm install react-native-dotenv
```

或者用 yarn：

```
yarn add react-native-dotenv
```

> ⚠️ 注意：**不要安装 `dotenv`**（那是 Node.js 用的），必须是 `react-native-dotenv`

------

### ⚙️ 第二步：修改 `babel.config.js`

打开项目根目录的 `babel.config.js` 文件，添加以下内容：

```
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // 如果你是 Expo 项目
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',  // 这里的名字必须和你 import 时一致
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
```

> 🔥 Expo 项目默认的 preset 是 `babel-preset-expo`
>  如果是纯 React Native CLI 项目，则是 `metro-react-native-babel-preset`。

------

### 📄 第三步：创建 `.env` 文件

在项目根目录（和 `package.json` 同级）新建 `.env` 文件：

```
API_URL=http://192.168.31.136:5001
```

（替换成你的本机局域网 IP）

------

### 🧠 第四步：在组件中导入

然后在你的 `RepositoryList.jsx` 里：

```
import { API_URL } from '@env'; // ✅ 正确导入
```

------

### 🧹 第五步：清除缓存并重新运行

React Native 有缓存机制，所以需要**清除缓存后重启**。

执行以下命令：

```
npx expo start -c
```

或者如果是 React Native CLI 项目：

```
npx react-native start --reset-cache
```

### Evolving the structure

Once our application grows larger there might be times when certain files grow too large to manage. For example, we have component *A* which renders the components *B* and *C*. All these components are defined in a file *A.jsx* in a *components* directory. We would like to extract components *B* and *C* into their own files *B.jsx* and *C.jsx* without major refactors. We have two options:

- Create files *B.jsx* and *C.jsx* in the *components* directory. This results in the following structure:

```bash
components/
  A.jsx
  B.jsx
  C.jsx
  ...copy
```

- Create a directory *A* in the *components* directory and create files *B.jsx* and *C.jsx* there. To avoid breaking components that import the *A.jsx* file, move the *A.jsx* file to the *A* directory and rename it to *index.jsx*. This results in the following structure:

```bash
components/
  A/
    B.jsx
    C.jsx
    index.jsx
  ...copy
```

The first option is fairly decent, however, if components *B* and *C* are not reusable outside the component *A*, it is useless to bloat the *components* directory by adding them as separate files. The second option is quite modular and doesn't break any imports because importing a path such as *./A* will match both *A.jsx* and *A/index.jsx*.

## Storing data in the user's device

There are times when we need to store some persisted pieces of data in the user's device. One such common scenario is storing the user's authentication token so that we can retrieve it even if the user closes and reopens our application. In web development, we have used the browser's *localStorage* object to achieve such functionality. React Native provides similar persistent storage, the [AsyncStorage](https://react-native-async-storage.github.io/async-storage/docs/usage/).

```shell
npx expo install @react-native-async-storage/async-storage
```

The API of the *AsyncStorage* is in many ways same as the *localStorage* API. They are both key-value storages with similar methods. The biggest difference between the two is that, as the name implies, the operations of *AsyncStorage* are *asynchronous*.

```
import AsyncStorage from '@react-native-async-storage/async-storage';

class ShoppingCartStorage {
  constructor(namespace = 'shoppingCart') {
    this.namespace = namespace;
  }

  async getProducts() {
    const rawProducts = await AsyncStorage.getItem(
      `${this.namespace}:products`,
    );

    return rawProducts ? JSON.parse(rawProducts) : [];
  }

  async addProduct(productId) {
    const currentProducts = await this.getProducts();
    const newProducts = [...currentProducts, productId];

    await AsyncStorage.setItem(
      `${this.namespace}:products`,
      JSON.stringify(newProducts),
    );
  }

  async clearProducts() {
    await AsyncStorage.removeItem(`${this.namespace}:products`);
  }
}

const doShopping = async () => {
  const shoppingCartA = new ShoppingCartStorage('shoppingCartA');
  const shoppingCartB = new ShoppingCartStorage('shoppingCartB');

  await shoppingCartA.addProduct('chips');
  await shoppingCartA.addProduct('soda');

  await shoppingCartB.addProduct('milk');

  const productsA = await shoppingCartA.getProducts();
  const productsB = await shoppingCartB.getProducts();

  console.log(productsA, productsB);

  await shoppingCartA.clearProducts();
  await shoppingCartB.clearProducts();
};

doShopping();
```

## env

#### ✅ 方式 1（推荐）：`react-native-dotenv`

安装：

```
npm install react-native-dotenv
```

在 `babel.config.js` 里加上插件：

```
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
      }],
    ],
  };
};
```

然后重启项目：

```
expo start -c
```

```
import { GRAPHQL_URL } from '@env';
```

