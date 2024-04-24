import React from 'react'

interface PageContextType {
  loading: boolean;
  setLoading: (load: boolean) => void;
}

const PageContext = React.createContext<PageContextType>({
  loading: false,
  setLoading: (load) => {}
});

export default PageContext;
