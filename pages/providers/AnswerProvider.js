import {
  createContext,
  useState
} from "react";


export const AnswerContext = createContext({});

export const AnswerProvider = (props) => {
  const { children } = props;
  const [answer1, setAnswer1] = useState(null);
  const [answer1_1, setAnswer1_1] = useState(null);
  const [answer2_1, setAnswer2_1] = useState(null);
  const [answer2_2, setAnswer2_2] = useState(null);
  const [answer2, setAnswer2] = useState(null);
  const [answer3, setAnswer3] = useState(null);
  const [answer4, setAnswer4] = useState(null);
  const [answer4_1, setAnswer4_1] = useState(null);
  const [answer5, setAnswer5] = useState(null);
  const [answer5_1, setAnswer5_1] = useState(null);
  const [answer6, setAnswer6] = useState(null);
  const [answer6_1, setAnswer6_1] = useState(null);
  const [answer6_2, setAnswer6_2] = useState(null);
  const [schedule, setSchedule] = useState(null);

  return (
    <AnswerContext.Provider value={{ answer1,answer1_1,answer2,answer2_1,answer2_2, answer3,answer4,answer4_1,answer5,answer5_1,answer6,answer6_1,answer6_2,schedule ,setAnswer1, setAnswer1_1,setAnswer2,setAnswer2_1,setAnswer2_2,setAnswer3,setAnswer4,setAnswer4_1,setAnswer5,setAnswer5_1,setAnswer6,setAnswer6_1,setAnswer6_2,setSchedule}}>
      {children}
    </AnswerContext.Provider>
  );
};