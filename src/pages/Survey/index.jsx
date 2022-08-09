import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  margin: 30px;
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`
const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
`
export default function Survey() {
  const { questionNumber } = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  const [questions, setQuestions] = useState({})
  const [dataLoading, setDataLoading] = useState(false)
  // Appel API
  useEffect(() => {
    setDataLoading(true)
    fetch('http://localhost:8000/survey')
      .then((res) => res.json())
      .then(({ surveyData }) => {
        console.log(surveyData)
        setQuestions(surveyData)
        setDataLoading(false)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {dataLoading ? (
        <LoaderContainer>
          <Loader /> Veuillez patienter
        </LoaderContainer>
      ) : (
        <QuestionContent>{questions[questionNumber]}</QuestionContent>
      )}
      <LinkWrapper>
        <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
        {questions[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  )
}
