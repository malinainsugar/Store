import { QueryClient, QueryClientProvider } from 'react-query';
import {FC, useState} from 'react';
import Sidebar from './components/Sidebar.tsx'
import Content from './components/Content.tsx';

const queryClient = new QueryClient(); 

const App: FC = () => {
  const [activeButton, setActiveButton] = useState('products');

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };
  
  return (
      <QueryClientProvider client={queryClient}>
          <Sidebar activeButton={activeButton} onButtonClick={handleButtonClick} />
          <Content activeButton={activeButton} />
      </QueryClientProvider>
  )
}

export default App
