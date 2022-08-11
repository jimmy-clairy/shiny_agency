import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { StyledLink } from '../../utils/style/Atoms'
import DarkLogo from '../../assets/dark-logo.png'
import LightLogo from '../../assets/light-logo.png'
import { useTheme } from '../../utils/hooks'

const HomeLogo = styled.img`
  height: 70px;
  padding: 20px 30px;
`

const HeaderContainer = styled.header`
  // padding: 30px;
  min-height: 130px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`

const NavContainer = styled.nav`
  padding: 20px 30px;
`

function Header() {
  const { theme } = useTheme()
  return (
    <HeaderContainer>
      <Link to="/">
        <HomeLogo src={theme === 'light' ? DarkLogo : LightLogo} />
      </Link>
      <NavContainer>
        <StyledLink $theme={theme} to="/">
          Accueil
        </StyledLink>
        <StyledLink $theme={theme} to="/freelances">
          Profils
        </StyledLink>
        <StyledLink to="/survey/1" $isFullLink>
          Faire le test
        </StyledLink>
      </NavContainer>
    </HeaderContainer>
  )
}

export default Header
