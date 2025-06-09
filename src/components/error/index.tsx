import { Dispatch, ReactNode, SetStateAction, createContext, use, useState } from 'react';
import { SWRConfig } from 'swr';
import ErrorWidget from './components/error-widget';
import { RequestErrorModel } from './models/types';

interface ErrorProviderProps {
  children: ReactNode;
  errors?: RequestErrorModel[];
}

interface ErrorContextProps {
  errors: RequestErrorModel[];
  setErrors: Dispatch<SetStateAction<RequestErrorModel[]>>;
  ErrorsList: ReactNode[];
}

const ErrorContext = createContext<ErrorContextProps>({ errors: [], setErrors: () => {}, ErrorsList: [] });

export default function ErrorProvider(props: ErrorProviderProps) {
  const [errors, setErrors] = useState<RequestErrorModel[]>(props.errors || []);

  const closeError = (errorId?: string): void => {
    setErrors((prevState) => prevState.filter((err) => err.errorId !== errorId));
  };

  const ErrorsList = errors?.map((error, index) => (
    <ErrorWidget
      key={`${error.errorId}-${index}`}
      error={error}
      onClose={() => closeError(error.errorId)}
      index={index}
    />
  ));

  return (
    <ErrorContext.Provider value={{ errors, setErrors, ErrorsList }}>
      <SWRConfig
        value={{
          shouldRetryOnError: false,
          onError: (error: RequestErrorModel) => {
            setErrors((prevState) => [...prevState, error]);
          },
        }}
      >
        {props.children}
      </SWRConfig>
    </ErrorContext.Provider>
  );
}

export function useErrors() {
  return use(ErrorContext);
}
