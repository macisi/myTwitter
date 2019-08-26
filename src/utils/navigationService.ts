import {
  NavigationActions,
  NavigationContainerComponent,
} from 'react-navigation';

let _navigator: NavigationContainerComponent;

export function setTopLevelNavigator(
  navigatorRef: NavigationContainerComponent
) {
  console.log(navigatorRef);
  _navigator = navigatorRef;
}

export function navigate(
  routeName: string,
  params?: Record<string, string | number>
) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}
