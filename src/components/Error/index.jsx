import styled from 'styled-components'
import colors from '../../utils/style/colors'
import logo404 from '../../assets/404.svg'
import { useTheme } from '../../utils/hooks'

const ErrorWrapper = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
  background-color: ${colors.background};
  align-items: center;
`

const ErrorTitle = styled.h1`
  font-weight: 300;
  color: ${({ theme }) => (theme === 'light' ? 'black' : 'white')};
`

const ErrorSubtitle = styled.h2`
  font-weight: 300;
  color: ${({ theme }) => (theme === 'light' ? 'black' : 'white')};
`

const Illustration = styled.img`
  max-width: 800px;
`

function Error() {
  const { theme } = useTheme()
  return (
    <ErrorWrapper>
      <ErrorTitle theme={theme}>Oups...</ErrorTitle>
      <Illustration src={logo404} />
      <ErrorSubtitle theme={theme}>
        Il semblerait que la page que vous cherchez n’existe pas
      </ErrorSubtitle>
    </ErrorWrapper>
  )
}

export default Error
