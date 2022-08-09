import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useEffect, useState } from 'react'
import { Loader } from '../../utils/style/Atoms'

const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  flex-wrap: wrap;
`

const PageTitle = styled.h1`
  font-size: 30px;
  color: black;
  text-align: center;
  padding-bottom: 30px;
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
`
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`
function Freelances() {
  const [freelanceProfiles, setFreelanceProfiles] = useState([])
  const [dataLoading, setDataLoading] = useState(false)

  useEffect(() => {
    setDataLoading(true)
    fetch('http://localhost:8000/freelances')
      .then((res) => res.json())
      .then(({ freelancersList }) => {
        console.log(freelancersList)
        setFreelanceProfiles(freelancersList)
        setDataLoading(false)
      })
      .catch((error) => console.log(error))
  }, [])
  return (
    <div>
      <PageTitle>Trouvez votre prestataire</PageTitle>
      <PageSubtitle>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      {dataLoading ? (
        <LoaderContainer>
          <Loader />
          Veuillez patienter
        </LoaderContainer>
      ) : (
        <CardsContainer>
          {freelanceProfiles.map((profile) => (
            <Card
              key={profile.id}
              label={profile.job}
              title={profile.name}
              picture={profile.picture}
            />
          ))}
        </CardsContainer>
      )}
    </div>
  )
}

export default Freelances
