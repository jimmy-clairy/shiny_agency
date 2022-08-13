import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useTheme } from '../../utils/hooks'
import { Loader, ErrorStyled } from '../../utils/style/Atoms'

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 90px 0;
  margin: 0 90px;
  border-radius: 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
`

const Picture = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px;
`

const Title = styled.h1`
  font-size: 25px;
  margin: 0;
  font-weight: 500;
`

const JobTitle = styled.h2`
  padding-top: 10px;
  font-size: 20px;
  margin: 0;
  font-weight: 500;
`

const Location = styled.span`
  margin-left: 15px;
  color: ${colors.secondary};
`

const Price = styled.span`
  padding-top: 10px;
  font-weight: 500;
  font-size: 20px;
`

const SkillsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
`

const Skill = styled.span`
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
  border: 1px solid
    ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
`

const Availability = styled.span`
  &:before {
    position: absolute;
    left: 0;
    top: 4px;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: ${({ available }) => (available ? 'green' : 'red')};
    content: '';
  }
  padding-left: 20px;
  position: relative;
`
const LoaderContainer = styled.div`
  display: flex;
  color: ${({ theme }) => (theme === 'light' ? colors.secondary : '#ffffff')};
  justify-content: center;
  align-items: center;
  font-size: 30px;
`

function Profile() {
  const [freelanceData, setFreelanceData] = useState({})
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [errorData, setErrorData] = useState(false)
  const { theme } = useTheme()

  const { id } = useParams()

  useEffect(() => {
    setIsLoadingData(true)
    fetch(`http://localhost:8000/freelance?id=${id}`)
      .then((res) => res.json())
      .then(({ freelanceData }) => {
        console.log(freelanceData)
        setFreelanceData(freelanceData)
        setIsLoadingData(false)
      })
      .catch((err) => {
        setErrorData(true)
        console.log(err)
      })
  }, [id])

  if (errorData) {
    return <ErrorStyled>Une erreur s'est produite</ErrorStyled>
  }

  if (isLoadingData) {
    return (
      <LoaderContainer theme={theme}>
        <Loader />
        Veuillez patienter
      </LoaderContainer>
    )
  }

  const { name, picture, location, job, skills, available, tjm } = freelanceData

  return (
    <ProfileWrapper theme={theme}>
      <Picture src={picture} alt={name} height={150} width={150} />
      <ProfileDetails theme={theme}>
        <Title>{name}</Title>
        <Location>{location}</Location>
        <JobTitle>{job}</JobTitle>
        <SkillsWrapper>
          {skills &&
            skills.map((skill) => (
              <Skill theme={theme} key={`skill-${skill}-${id}`}>
                {skill}
              </Skill>
            ))}
        </SkillsWrapper>
        <Availability>
          {available ? 'Disponible maintenant' : 'Indisponible'}
        </Availability>
        <Price>{tjm} € / jour</Price>
      </ProfileDetails>
    </ProfileWrapper>
  )
}

export default Profile
