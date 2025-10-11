# rate-repo-app

# react native intro

Traditionally, developing native iOS and Android applications has required the developer to use platform-specific programming languages and development environments. For iOS development, this means using Objective C or Swift and for Android development using JVM-based languages such as Java, Scala or Kotlin. Releasing an application for both these platforms technically requires developing two separate applications with different programming languages. This requires lots of development resources.

One of the popular approaches to unify the platform-specific development has been to utilize the browser as the rendering engine. [Cordova](https://cordova.apache.org/) is one of the most popular platforms for building cross-platform applications. It allows for developing multi-platform applications using standard web technologies - HTML5, CSS3, and JavaScript. However, Cordova applications are running within an embedded browser window in the user's device. That is why these applications can not achieve the performance nor the look-and-feel of native applications that utilize actual native user interface components.

[React Native](https://reactnative.dev/) is a framework for developing native Android and iOS applications using JavaScript and React. It provides a set of cross-platform components that behind the scenes utilize the platform's native components. Using React Native allows us to bring all the familiar features of React such as JSX, components, props, state, and hooks into native application development. On top of that, we can utilize many familiar libraries in the React ecosystem such as [React Redux](https://react-redux.js.org/), [Apollo](https://github.com/apollographql/react-apollo), [React Router](https://reactrouter.com/en/main) and many more.

For the development of our application, we will be using [Expo](https://docs.expo.io/versions/latest/). Expo is a platform that eases the setup, development, building, and deployment of React Native applications.

Note, that the _@sdk-50_ sets the project's _Expo SDK version to 50_, which supports _React Native version 0.73_. Using other Expo SDK versions might cause you trouble while following this material. Also, Expo has a [few limitations](https://docs.expo.dev/faq/#limitations) when compared to plain React Native CLI. However, these limitations do not affect the application implemented in the material.

```bash
npx create-expo-app rate-repository-app --template expo-template-blank@sdk-50

npx expo install react-native-web@~0.19.6 react-dom@18.2.0 @expo/metro-runtime@~3.1.1

npm install --save-dev eslint @babel/eslint-parser eslint-plugin-react eslint-plugin-react-native
```

In addition to emulators, there is one extremely useful way to develop React Native applications with Expo, the Expo mobile app. With the Expo mobile app, you can preview your application using your actual mobile device, which provides a bit more concrete development experience compared to emulators. To get started, install the Expo mobile app by following the instructions in the [Expo's documentation](https://docs.expo.io/get-started/installation/#2-expo-go-app-for-ios-and). Note that the Expo mobile app can only open your application if your mobile device is connected to _the same local network_ (e.g. connected to the same Wi-Fi network) as the computer you are using for development.

That might actually be enough in most cases, but sometimes we need more. React Native provides an in-app developer menu which offers several debugging options. Read more about [debugging react native applications](https://reactnative.dev/docs/debugging).

To inspect the React element tree, props, and state you can install React DevTools.

Read here about [React DevTools](https://reactnative.dev/docs/react-devtools). For more useful React Native application debugging tools, also head out to the Expo's [debugging documentation](https://docs.expo.io/workflow/debugging).

```
npx react-devtools
```

# Core components

As we can see, React is not bound to a certain environment, such as the browser environment. Instead, there are libraries such as ReactDOM that can render _a set of predefined components_, such as DOM elements, in a specific environment. In React Native these predefined components are called _core components_.

[Core components](https://reactnative.dev/docs/intro-react-native-components) are a set of components provided by React Native, which behind the scenes utilize the platform's native components. Let's implement the previous example using React Native:

Many familiar DOM elements have their React Native "counterparts". Here are some examples picked from React Native's [Core Components documentation](https://reactnative.dev/docs/components-and-apis):

- [Text](https://reactnative.dev/docs/text) component is _the only_ React Native component that can have textual children. It is similar to for example the _<strong>_ and the _<h1>_ elements.
- [View](https://reactnative.dev/docs/view) component is the basic user interface building block similar to the _<div>_ element.
- [TextInput](https://reactnative.dev/docs/textinput) component is a text field component similar to the _<input>_ element.
- [Pressable](https://reactnative.dev/docs/pressable) component is for capturing different press events. It is similar to for example the _<button>_ element.

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

The first difference is that the _Text_ component is _the only_ React Native component that can have textual children. This means that you can't, for example, replace the _Text_ component with the _View_ component in the previous example.

The second notable difference is related to the event handlers. While working with the DOM elements we are used to adding event handlers such as _onClick_ to basically any element such as _<div>_ and _<button>_. In React Native we have to carefully read the [API documentation](https://reactnative.dev/docs/components-and-apis) to know what event handlers (as well as other props) a component accepts.

Luckily React Native provides a handy component for displaying a list of data, which is the [FlatList](https://reactnative.dev/docs/flatlist) component.

# Style

On top of the property names, you might have noticed another difference in the example. In CSS numerical property values commonly have a unit such as _px_, _%_, _em_ or _rem_. In React Native all dimension-related property values such as _width_, _height_, _padding_, and _margin_ as well as font sizes are _unitless_. These unitless numeric values represent _density-independent pixels_. In case you are wondering what are the available style properties for certain core components, check the [React Native Styling Cheat Sheet](https://github.com/vhpoet/react-native-styling-cheat-sheet).

In general, defining styles directly in the _style_ prop is not considered such a great idea, because it makes components bloated and unclear. Instead, we should define styles outside the component's render function using the [StyleSheet.create](https://reactnative.dev/docs/stylesheet#create) method. The _StyleSheet.create_ method accepts a single argument which is an object consisting of named style objects and it creates a StyleSheet style reference from the given object. Here is an example of how to refactor the previous example using the _StyleSheet.create_ method:

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
      <Text style={styles.text}>Big blue text</Text>
    </View>
  );
};
```

Perhaps the most important properties of a flex container are the following:

- [flexDirection](https://css-tricks.com/almanac/properties/f/flex-direction/) property controls the direction in which the flex items are laid out within the container. Possible values for this property are _row_, _row-reverse_, _column_ (default value) and _column-reverse_. Flex direction _row_ will lay out the flex items from left to right, whereas _column_ from top to bottom. \*_-reverse_ directions will just reverse the order of the flex items.
- [justifyContent](https://css-tricks.com/almanac/properties/j/justify-content/) property controls the alignment of flex items along the main axis (defined by the _flexDirection_ property). Possible values for this property are _flex-start_ (default value), _flex-end_, _center_, _space-between_, _space-around_ and _space-evenly_.
- [alignItems](https://css-tricks.com/almanac/properties/a/align-items/) property does the same as _justifyContent_ but for the opposite axis. Possible values for this property are _flex-start_, _flex-end_, _center_, _baseline_ and _stretch_ (default value).

More on React Native's flexbox implementation can be read in the [documentation](https://reactnative.dev/docs/flexbox).

It is usually a good idea to log the server's response to be able to inspect it as we did in the _fetchRepositories_ function. You should be able to see this log message in the Expo development tools if you navigate to your device's logs as we learned in the [Debugging](https://fullstackopen.com/en/part10/introduction_to_react_native#debugging) section. If you are using the Expo's mobile app for development and the network request is failing, make sure that the computer you are using to run the server and your phone are _connected to the same Wi-Fi network_. If that's not possible either use an emulator in the same computer as the server is running in or set up a tunnel to the localhost, for example, using [Ngrok](https://ngrok.com/).

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

---

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
> 如果是纯 React Native CLI 项目，则是 `metro-react-native-babel-preset`。

---

### 📄 第三步：创建 `.env` 文件

在项目根目录（和 `package.json` 同级）新建 `.env` 文件：

```
API_URL=http://192.168.31.136:5001
```

（替换成你的本机局域网 IP）

---

### 🧠 第四步：在组件中导入

然后在你的 `RepositoryList.jsx` 里：

```
import { API_URL } from '@env'; // ✅ 正确导入
```

---

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

Once our application grows larger there might be times when certain files grow too large to manage. For example, we have component _A_ which renders the components _B_ and _C_. All these components are defined in a file _A.jsx_ in a _components_ directory. We would like to extract components _B_ and _C_ into their own files _B.jsx_ and _C.jsx_ without major refactors. We have two options:

- Create files _B.jsx_ and _C.jsx_ in the _components_ directory. This results in the following structure:

```bash
components/
  A.jsx
  B.jsx
  C.jsx
  ...copy
```

- Create a directory _A_ in the _components_ directory and create files _B.jsx_ and _C.jsx_ there. To avoid breaking components that import the _A.jsx_ file, move the _A.jsx_ file to the _A_ directory and rename it to _index.jsx_. This results in the following structure:

```bash
components/
  A/
    B.jsx
    C.jsx
    index.jsx
  ...copy
```

The first option is fairly decent, however, if components _B_ and _C_ are not reusable outside the component _A_, it is useless to bloat the _components_ directory by adding them as separate files. The second option is quite modular and doesn't break any imports because importing a path such as _./A_ will match both _A.jsx_ and _A/index.jsx_.

## Storing data in the user's device

There are times when we need to store some persisted pieces of data in the user's device. One such common scenario is storing the user's authentication token so that we can retrieve it even if the user closes and reopens our application. In web development, we have used the browser's _localStorage_ object to achieve such functionality. React Native provides similar persistent storage, the [AsyncStorage](https://react-native-async-storage.github.io/async-storage/docs/usage/).

```shell
npx expo install @react-native-async-storage/async-storage
```

The API of the _AsyncStorage_ is in many ways same as the _localStorage_ API. They are both key-value storages with similar methods. The biggest difference between the two is that, as the name implies, the operations of _AsyncStorage_ are _asynchronous_.

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

这套 `AuthStorageContext` + `AuthStorage` 实际上是 **一个全局管理登录 token 的方案**，用来解决你之前遇到的父组件和子组件登录状态不同步的问题。让我帮你拆解清楚它的作用和工作机制：

---

## 1️⃣ 核心作用

`AuthStorageContext` 是一个 **React Context**，它把 `AuthStorage` 实例提供给整个组件树。

- **AuthStorage** 封装了 **AsyncStorage** 的操作：
  - `getAccessToken()` → 获取本地 token
  - `setAccessToken()` → 保存 token
  - `removeAccessToken()` → 删除 token
- **AuthStorageContext** 提供给任何组件，通过 `useContext(AuthStorageContext)` 或者你的 `useAuthStorage()` Hook 访问 `AuthStorage`。

---

## 2️⃣ 为什么要用 Context

如果你不使用 Context，每个组件都需要自己写 AsyncStorage 逻辑：

```
const token = await AsyncStorage.getItem('auth');
```

- 代码重复
- 状态更新难以共享
- 父子组件之间不能同步登录状态

使用 Context 后：

- 父组件和子组件可以 **统一访问同一个 AuthStorage 实例**
- 登录状态可以通过 token 存在与否判断
- Apollo Client 也可以通过它获取 token，实现 **全局认证**

---

## 3️⃣ 实际工作流程

以你代码为例：

```
<AuthStorageContext.Provider value={authStorage}>
  <Main />
</AuthStorageContext.Provider>
```

- `authStorage` 是 AuthStorage 实例
- Main 或其子组件调用 `useAuthStorage()`：

```
const authStorage = useAuthStorage();
const token = await authStorage.getAccessToken();
```

- 这样就能读取父组件中统一管理的 token
- 登录成功时可以：

```
await authStorage.setAccessToken(newToken);
```

- 所有使用 `useAuthStorage()` 的组件都会看到相同的 token
- 父组件可以据此渲染不同内容（登录/未登录）

---

## 4️⃣ 与 Apollo Client 的结合

```
const apolloClient = createApolloClient(authStorage);
```

- `createApolloClient` 可以在 **每次请求 header** 里读取 token：

```
const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${await authStorage.getAccessToken()}`
  }
});
```

- 这样所有 GraphQL 请求都会带上最新的 token
- 而 token 更新在任何组件中都会生效（因为都用同一个 AuthStorage 实例）

---

## 5️⃣ 总结

`AuthStorageContext` + `AuthStorage` 的好处：

1. **统一管理 token**
   - 所有组件共享同一个 token 实例
2. **简化登录状态判断**
   - 父组件可以用 `authStorage.getAccessToken()` 判断是否已登录
3. **结合 Apollo Client**
   - 自动在请求中携带 token
4. **减少重复代码**
   - 不需要在每个组件都写 AsyncStorage 逻辑

✅ 本质上，它解决了你之前父组件和 SignInForm **状态不同步**的问题：

- 不再依赖单独 Hook 内的 `isLoggedIn`
- 父组件可以根据 **存储的 token** 判断显示用户信息或登录表单

---

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);
apolloClient 是你创建的 Apollo Client 实例

它在下面通过 ApolloProvider 提供给整个组件树：

jsx
复制代码
<ApolloProvider client={apolloClient}>
<AuthStorageContext.Provider value={authStorage}>

<Main />
</AuthStorageContext.Provider>
</ApolloProvider>
这就意味着：

在 ApolloProvider 包裹下的 任何组件或自定义 Hook，都可以通过 useApolloClient() 获取这个实例。

所以在你的 useSignIn Hook 内：

js
复制代码
import { useApolloClient } from '@apollo/client';

const apolloClient = useApolloClient();
拿到的就是这个 App.js 里创建的 apolloClient。

⚠️ 注意：

useApolloClient() 必须在 ApolloProvider 内使用，否则会返回 undefined 或报错

一旦拿到 apolloClient，你就可以执行：

js
复制代码
await apolloClient.mutate({ mutation: USER_AUTH, variables: {...} });
await apolloClient.resetStore();
这样就可以实现你之前提到的 登录后存 token + 清空缓存 + 刷新活跃 queries 的逻辑。

---

FAIL **tests**/example.test.js
● Test suite failed to run

    TypeError: Object.defineProperty called on non-object
        at Function.defineProperty (<anonymous>)
    
      at Object.<anonymous> (node_modules/jest-expo/src/preset/setup.js:47:8)

Test Suites: 1 failed, 1 total
Tests: 0 total
Snapshots: 0 total
Time: 6.663 s
Ran all test suites.

```
npm ls jest-expo expo react-native jest
rate-repository-app@1.0.0 /Users/chenruo/Documents/GitHub/rate-repo-app
├─┬ @expo/metro-runtime@3.1.3
│ └── react-native@0.73.6 deduped
├─┬ @react-native-async-storage/async-storage@1.21.0
│ └── react-native@0.73.6 deduped
├─┬ eslint-plugin-jest@29.0.1
│ └── jest@29.7.0 deduped
├─┬ expo@50.0.21
│ ├─┬ @expo/vector-icons@14.1.0
│ │ └── react-native@0.73.6 deduped
│ ├─┬ expo-asset@9.0.2
│ │ └─┬ expo-constants@15.4.6
│ │   └── expo@50.0.21 deduped
│ ├─┬ expo-file-system@16.0.9
│ │ └── expo@50.0.21 deduped
│ ├─┬ expo-font@11.10.3
│ │ └── expo@50.0.21 deduped
│ └─┬ expo-keep-awake@12.8.2
│   └── expo@50.0.21 deduped
├─┬ jest-expo@54.0.12
│ ├── expo@50.0.21 deduped
│ ├─┬ jest-watch-typeahead@2.2.1
│ │ └── jest@29.7.0 deduped
│ └── react-native@0.73.6 deduped
├── jest@29.7.0
├─┬ react-native-safe-area-context@4.14.1
│ └── react-native@0.73.6 deduped
├─┬ react-native@0.73.6
│ └─┬ @react-native/virtualized-lists@0.73.4
│   └── react-native@0.73.6 deduped
└─┬ react-router-native@6.30.0
  └── react-native@0.73.6 deduped
```

| 包名             | 版本      |
| ---------------- | --------- |
| **expo**         | `50.0.21` |
| **react-native** | `0.73.6`  |
| **jest-expo**    | `54.0.12` |
| **jest**         | `29.7.0`  |

🧨 **不兼容点：**
`jest-expo@54.x` 是为 **Expo SDK 54（React Native 0.76）** 设计的，
但你当前是 **Expo SDK 50（React Native 0.73）**。

这会导致它内部在 `node_modules/jest-expo/src/preset/setup.js` 调用 `Object.defineProperty(global.navigator, ...)` 时出错（因为旧 SDK 的 runtime 环境初始化逻辑不同）

```
npm install --save-dev jest-expo@50.0.3
rm -rf node_modules
rm package-lock.json
npm cache clean --force
npm install
```

React Native Testing Library's documentation has some good hints on [how to query different kinds of elements](https://callstack.github.io/react-native-testing-library/docs/guides/how-to-query). Another guide worth reading is Kent C. Dodds article [Making your UI tests resilient to change](https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change).

For all available queries, check the React Native Testing Library's [documentation](https://callstack.github.io/react-native-testing-library/docs/api/queries). The full list of available React Native specific matchers can be found in the [documentation](https://github.com/testing-library/jest-native#matchers) of the jest-native library. Jest's [documentation](https://jestjs.io/docs/en/expect) contains every universal Jest matcher.

The second very important React Native Testing Library concept is firing events. We can fire an event in a provided node by using the [fireEvent](https://callstack.github.io/react-native-testing-library/docs/api#fireevent) object's methods. This is useful for example typing text into a text field or pressing a button. Here is an example of how to test submitting a simple form:

----

```
Web Bundling failed 16598ms node_modules/expo/AppEntry.js (1188 modules)
Unable to resolve "graphql" from "node_modules/graphql-tag/lib/index.js"
  1 | import { __assign } from "tslib";
> 2 | import { parse } from 'graphql';
    |                        ^
  3 | var docCache = new Map();
  4 | var fragmentSourceMap = new Map();
  5 | var printFragmentWarnings = true;

Import stack:

 node_modules/graphql-tag/lib/index.js
 | import "graphql"

 node_modules/@apollo/client/core/index.js
 | import "graphql-tag"

 node_modules/@apollo/client/index.js
 | import "./core/index.js"

 App.js
 | import "@apollo/client"

 node_modules/expo/AppEntry.js
 | import "../../App"

 
 | import "./node_modules/expo/AppEntry"
```

你这个报错的核心信息是：

```
Unable to resolve "graphql" from "node_modules/graphql-tag/lib/index.js"
```

也就是说 **项目里缺少 `graphql` 包**，但是 `@apollo/client` 或 `graphql-tag` 都依赖它。

------

### 原因分析

1. 你的 `package.json` 中有：

```
"dependencies": {
  "@apollo/client": "^3.9.11",
  ...
},
"overrides": {
  "graphql": "^16.11.0"
}
```

- 你用了 `overrides` 声明 `graphql@^16.11.0`，但是并没有在 `dependencies` 里显式安装 `graphql`
- Expo / React Native 的打包器在 Web 打包时找不到 `graphql`，就报错了

1. 也可能是 **node_modules 缓存/锁文件问题**，导致 `graphql` 没有真正被安装。
