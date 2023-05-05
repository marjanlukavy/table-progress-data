import StudentTable from "@/components/StudentTable";
import { defaultTheme, Provider, SSRProvider } from "@adobe/react-spectrum";

const Home = () => (
  <SSRProvider>
    <Provider theme={defaultTheme}>
      <StudentTable />
    </Provider>
  </SSRProvider>
);

export default Home;
