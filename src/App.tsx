import { Header } from "@/components/header/Header";
import styles from "./app.module.css";
import { NavigateMenu } from "./components/navigateMenu/NavigateMenu";




export const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <NavigateMenu />
    </div>
  );
};

export default App;
