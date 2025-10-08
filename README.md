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
