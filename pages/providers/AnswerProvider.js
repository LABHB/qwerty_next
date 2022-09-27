import {
  createContext,
  useState
} from "react";


export const AnswerContext = createContext({});

export const AnswerProvider = (props) => {
  const { children } = props;
  const [answer1, setAnswer1] = useState(null);
  const [answer2, setAnswer2] = useState(null);
  const [answer3, setAnswer3] = useState(null);
  const [answer4, setAnswer4] = useState(null);
  return (
    <AnswerContext.Provider value={{ answer1,answer2, answer3,answer4, setAnswer1,setAnswer2,setAnswer3,setAnswer4 }}>
      {children}
    </AnswerContext.Provider>
  );
};
