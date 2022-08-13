import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useTheme } from '../../utils/hooks'
import { Loader } from '../../utils/style/Atoms'
import { useFetch } from '../../utils/hooks'
import { Link } from 'react-router-dom'

const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  flex-wrap: wrap;
`
const StyledLink = styled(Link)`
  text-decoration: none;
`

const PageTitle = styled.h1`
  font-size: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  text-align: center;
  padding-bottom: 30px;
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${({ theme }) => (theme === 'light' ? colors.secondary : '#ffffff')};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
`
const LoaderContainer = styled.div`
  display: flex;
  color: ${({ theme }) => (theme === 'light' ? colors.secondary : '#ffffff')};
  justify-content: center;
  align-items: center;
  font-size: 30px;
`
function Freelances() {
  const { data, isLoading, error } = useFetch(
    'http://localhost:8000/freelances'
  )

  const freelancersList = data?.freelancersList

  const { theme } = useTheme()

  if (error) {
    return <span>Oups il y a un problème</span>
  }

  return (
    <div>
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      {isLoading ? (
        <LoaderContainer theme={theme}>
          <Loader />
          Veuillez patienter
        </LoaderContainer>
      ) : (
        <CardsContainer>
          {freelancersList.map((profile) => (
            <StyledLink
              key={`freelance-${profile.id}`}
              to={`/profile/${profile.id}`}
            >
              <Card
                label={profile.job}
                title={profile.name}
                picture={profile.picture}
              />
            </StyledLink>
          ))}
        </CardsContainer>
      )}
    </div>
  )
}

export default Freelances
